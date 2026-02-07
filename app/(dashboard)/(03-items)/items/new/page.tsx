"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import { initialProducts } from "@/app/(dashboard)/data/products";
import { createCategory, listCategories } from "@/app/services/categories";
import { listItemBrands } from "@/app/services/itemBrands";
import { createItemType, listItemTypes } from "@/app/services/itemTypes";
import { createItemUnit, listItemUnits } from "@/app/services/itemUnits";
import { createItem } from "@/app/services/items";
import { extractList } from "@/app/services/http";

type Option = { id: string | number; name: string };
type CategoryOption = Option & { parentId?: string | number | null };

const fallbackUnits: Option[] = [
  { id: "unit-piece", name: "قطعة" },
  { id: "unit-box", name: "علبة" },
  { id: "unit-pack", name: "عبوة" },
  { id: "unit-carton", name: "كرتون" },
  { id: "unit-kg", name: "كيلو" },
  { id: "unit-gram", name: "جرام" },
  { id: "unit-liter", name: "لتر" },
  { id: "unit-meter", name: "متر" },
];

const productCategoryOptions: CategoryOption[] = Array.from(
  new Map(
    initialProducts
      .map((product) => product.category?.trim())
      .filter((name): name is string => Boolean(name))
      .map((name) => [name.toLowerCase(), name])
  ).values()
).map((name, index) => ({
  id: `product-category-${index + 1}`,
  name,
  parentId: null,
}));

const mergeCategoriesByName = (primary: CategoryOption[], fallback: CategoryOption[]) => {
  const seen = new Set(
    primary
      .map((category) => category.name.trim().toLowerCase())
      .filter((name) => name)
  );
  const merged = [...primary];
  fallback.forEach((category) => {
    const key = category.name.trim().toLowerCase();
    if (!key || seen.has(key)) {
      return;
    }
    seen.add(key);
    merged.push(category);
  });
  return merged;
};

const mergeOptionsByName = (primary: Option[], fallback: Option[]) => {
  const seen = new Set(
    primary
      .map((option) => option.name.trim().toLowerCase())
      .filter((name) => name)
  );
  const merged = [...primary];
  fallback.forEach((option) => {
    const key = option.name.trim().toLowerCase();
    if (!key || seen.has(key)) {
      return;
    }
    seen.add(key);
    merged.push(option);
  });
  return merged;
};

const branchOptions = [
  "الإلكترونيات",
  "مغسلة سيارات",
  "نشاط المطاعم",
  "نشاط الصالون",
  "نشاط الكوفي / الديوانية",
  "نشاط سوبرماركت",
  "مغسلة ملابس",
];

const Page = () => {
  const [itemImageName, setItemImageName] = useState("");
  const [catalogName, setCatalogName] = useState("");
  const [itemImageFile, setItemImageFile] = useState<File | null>(null);
  const [catalogFile, setCatalogFile] = useState<File | null>(null);
  const itemImageInputRef = useRef<HTMLInputElement | null>(null);
  const catalogInputRef = useRef<HTMLInputElement | null>(null);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [brands, setBrands] = useState<Option[]>([]);
  const [types, setTypes] = useState<Option[]>([]);
  const [units, setUnits] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    mainCategoryId: "",
    subCategoryId: "",
    unitId: "",
    saleUnitId: "",
    purchaseUnitId: "",
    typeId: "",
    brandId: "",
  });
  const [itemForm, setItemForm] = useState({
    name: "",
    nameAlt: "",
    code: "",
    slug: "",
    altCode: "",
    cost: "0",
    price: "",
    minQty: "0",
    summary: "",
    details: "",
    hasVariants: false,
    isStock: false,
    isFeatured: false,
    isHidden: false,
    taxRate: "",
    taxMethod: "",
    typeName: "",
  });

  const mapOptionList = (payload: any): Option[] =>
    extractList<any>(payload as any).map((entry: any, index: number) => ({
      id: entry.id ?? entry.uuid ?? entry.code ?? entry._id ?? `${index + 1}`,
      name: entry.name ?? "غير محدد",
    }));

  const mapCategoryList = (payload: any): CategoryOption[] =>
    extractList<any>(payload as any).map((entry: any, index: number) => {
      const id = entry.id ?? entry.uuid ?? entry.code ?? entry._id ?? `${index + 1}`;
      const rawParent =
        entry.parent_id ??
        entry.parentId ??
        entry.parent?.id ??
        entry.main_category_id ??
        entry.mainCategoryId ??
        entry.category_id ??
        entry.categoryId ??
        null;
      const parentId = rawParent === id ? null : rawParent;
      return {
        id,
        name: entry.name ?? "غير محدد",
        parentId,
      };
    });

  const pickValidId = (current: string, options: Option[]) => {
    if (current && options.some((option) => String(option.id) === String(current))) {
      return current;
    }
    return options.length ? String(options[0].id) : "";
  };

  const fetchLookups = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const [typesRes, brandsRes, unitsRes, categoriesRes] = await Promise.all([
        listItemTypes({ pagination: "on", limit_per_page: 100 }),
        listItemBrands({ pagination: "on", limit_per_page: 100 }),
        listItemUnits({ pagination: "on", limit_per_page: 100 }),
        listCategories({ pagination: "on", limit_per_page: 100 }),
      ]);
      const nextTypes = mapOptionList(typesRes);
      const nextBrands = mapOptionList(brandsRes);
      const nextUnits = mapOptionList(unitsRes);
      const resolvedUnits = nextUnits.length ? nextUnits : fallbackUnits;
      const nextCategories = mapCategoryList(categoriesRes);
      const mergedCategories = mergeCategoriesByName(nextCategories, productCategoryOptions);
      setTypes(nextTypes);
      setBrands(nextBrands);
      setUnits(resolvedUnits);
      setCategories(mergedCategories);
      setForm((prev) => {
        const mainOptions = mergedCategories.filter((category) => !category.parentId);
        const mainCandidates = mainOptions.length ? mainOptions : mergedCategories;
        const nextMain = pickValidId(prev.mainCategoryId, mainCandidates);
        const subOptions = mergedCategories.filter(
          (category) => category.parentId && String(category.parentId) === String(nextMain)
        );
        const nextSub = subOptions.length
          ? pickValidId(prev.subCategoryId, subOptions)
          : mergedCategories.some((category) => category.parentId)
            ? ""
            : nextMain;
        return {
          ...prev,
          typeId: pickValidId(prev.typeId, nextTypes),
          brandId: pickValidId(prev.brandId, nextBrands),
          unitId: pickValidId(prev.unitId, resolvedUnits),
          saleUnitId: pickValidId(prev.saleUnitId, resolvedUnits),
          purchaseUnitId: pickValidId(prev.purchaseUnitId, resolvedUnits),
          mainCategoryId: nextMain,
          subCategoryId: nextSub,
        };
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("تعذر تحميل بيانات الأصناف المساعدة.");
      const mergedCategories = mergeCategoriesByName([], productCategoryOptions);
      setCategories(mergedCategories);
      setUnits(fallbackUnits);
      setForm((prev) => {
        const mainOptions = mergedCategories.filter((category) => !category.parentId);
        const mainCandidates = mainOptions.length ? mainOptions : mergedCategories;
        const nextMain = pickValidId(prev.mainCategoryId, mainCandidates);
        const subOptions = mergedCategories.filter(
          (category) => category.parentId && String(category.parentId) === String(nextMain)
        );
        const nextSub = subOptions.length
          ? pickValidId(prev.subCategoryId, subOptions)
          : mergedCategories.some((category) => category.parentId)
            ? ""
            : nextMain;
        return {
          ...prev,
          mainCategoryId: nextMain,
          subCategoryId: nextSub,
          unitId: pickValidId(prev.unitId, fallbackUnits),
          saleUnitId: pickValidId(prev.saleUnitId, fallbackUnits),
          purchaseUnitId: pickValidId(prev.purchaseUnitId, fallbackUnits),
        };
      });
    } finally {
      setIsLoading(false);
    }
  };

  const mainCategories = useMemo(() => {
    const topLevel = categories.filter((category) => !category.parentId);
    return topLevel.length ? topLevel : categories;
  }, [categories]);

  const hasHierarchy = useMemo(() => categories.some((category) => category.parentId), [categories]);

  const subCategories = useMemo(() => {
    if (!form.mainCategoryId) {
      return [];
    }
    if (hasHierarchy) {
      return categories.filter((category) => String(category.parentId) === String(form.mainCategoryId));
    }
    const main = mainCategories.find((category) => String(category.id) === String(form.mainCategoryId));
    return main ? [main] : [];
  }, [categories, form.mainCategoryId, hasHierarchy, mainCategories]);

  const handleItemImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setItemImageName(file ? file.name : "");
    setItemImageFile(file);
  };

  const handleCatalogChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setCatalogName(file ? file.name : "");
    setCatalogFile(file);
  };

  const updateItemForm = (field: keyof typeof itemForm, value: string | boolean) => {
    setItemForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateItem = async () => {
    const name = itemForm.name.trim();
    if (!name) {
      setErrorMessage("يرجى إدخال اسم الصنف.");
      return;
    }
    if (!itemForm.typeName.trim() || !form.unitId) {
      setErrorMessage("يرجى إدخال نوع الصنف ووحدة الصنف.");
      return;
    }
    const rawCategoryId = form.subCategoryId || form.mainCategoryId;
    if (!rawCategoryId) {
      setErrorMessage("يرجى اختيار التصنيف.");
      return;
    }
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const normalizedType = itemForm.typeName.trim().toLowerCase();
      let typeId = types.find((type) => type.name.trim().toLowerCase() === normalizedType)?.id;
      if (!typeId) {
        await createItemType({ name: itemForm.typeName.trim(), status: "active" });
        const refreshed = mapOptionList(
          await listItemTypes({ pagination: "on", limit_per_page: 100, search: itemForm.typeName.trim() })
        );
        const match = refreshed.find((type) => type.name.trim().toLowerCase() === normalizedType);
        if (match) {
          typeId = match.id;
          setTypes((prev) => mergeOptionsByName(prev, refreshed));
        }
      }
      if (!typeId) {
        setErrorMessage("تعذر إنشاء نوع الصنف.");
        return;
      }

      let unitId: string = String(form.unitId);
      const unitOption = units.find((unit) => String(unit.id) === String(form.unitId));
      if (unitOption && String(unitOption.id).startsWith("unit-")) {
        const unitName = unitOption.name.trim();
        await createItemUnit({ name: unitName, code: `U-${Date.now().toString().slice(-4)}` });
        const refreshedUnits = mapOptionList(
          await listItemUnits({ pagination: "on", limit_per_page: 100, search: unitName })
        );
        const matchUnit = refreshedUnits.find((unit) => unit.name.trim().toLowerCase() === unitName.toLowerCase());
        if (matchUnit) {
          unitId = String(matchUnit.id);
          setUnits((prev) => mergeOptionsByName(prev, refreshedUnits));
        }
      }
      if (!unitId) {
        setErrorMessage("تعذر إنشاء وحدة الصنف.");
        return;
      }

      let categoryId: string | number = rawCategoryId;
      const selectedCategory = categories.find((category) => String(category.id) === String(rawCategoryId));
      if (selectedCategory && String(selectedCategory.id).startsWith("product-category-")) {
        await createCategory({ name: selectedCategory.name });
        const refreshedCategories = mapCategoryList(
          await listCategories({ pagination: "on", limit_per_page: 100, search: selectedCategory.name })
        );
        const matchCategory = refreshedCategories.find(
          (category) => category.name.trim().toLowerCase() === selectedCategory.name.trim().toLowerCase()
        );
        if (matchCategory) {
          categoryId = matchCategory.id;
          setCategories((prev) => mergeCategoriesByName(prev, refreshedCategories));
        }
      }
      if (String(categoryId).startsWith("product-category-")) {
        setErrorMessage("تعذر إنشاء التصنيف.");
        return;
      }

      await createItem({
        name,
        item_type_id: typeId,
        item_unit_id: unitId,
        brand_id: form.brandId || undefined,
        category_id: categoryId,
        code: itemForm.code.trim() || undefined,
        purchase_price: itemForm.cost ? Number(itemForm.cost) : 0,
        sale_price: itemForm.price ? Number(itemForm.price) : undefined,
        max_bill_quantity: itemForm.minQty ? Number(itemForm.minQty) : 0,
        notify_quantity: itemForm.minQty ? Number(itemForm.minQty) : 0,
        image: itemImageFile ?? undefined,
      });
      setSuccessMessage("تم إضافة الصنف بنجاح.");
      setItemForm((prev) => ({
        ...prev,
        name: "",
        nameAlt: "",
        code: "",
        slug: "",
        altCode: "",
        cost: "0",
        price: "",
        minQty: "0",
        summary: "",
        details: "",
      }));
      setItemImageName("");
      setCatalogName("");
      setItemImageFile(null);
      setCatalogFile(null);
      if (itemImageInputRef.current) {
        itemImageInputRef.current.value = "";
      }
      if (catalogInputRef.current) {
        catalogInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      const message = error instanceof Error && error.message ? error.message : "تعذر حفظ الصنف.";
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchLookups();
    const handleFocus = () => {
      fetchLookups();
    };
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <DashboardShell title="إضافة الصنف" subtitle="الأصناف / إضافة الصنف" hideHeaderFilters>
      {errorMessage ? (
        <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </div>
      ) : null}
      {successMessage ? (
        <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}
      <section className="space-y-5">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm text-(--dash-muted)">
          الرجاء إدخال المعلومات أدناه. تسميات الحقول التي تحمل علامة * هي حقول إجبارية.
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <div className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={itemForm.hasVariants}
                  onChange={(event) => updateItemForm("hasVariants", event.target.checked)}
                  className="h-4 w-4"
                />
                <span className="text-(--dash-muted)">هذا الصنف لديه بدائل متعددة بمقاسات متعددة و / أو ألوان</span>
              </div>
              <div className="mt-4 grid gap-4">
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">التصنيفات الرئيسية *</span>
                  <select
                    value={form.mainCategoryId}
                    onChange={(event) => {
                      const nextMain = event.target.value;
                      const children = categories.filter((category) => String(category.parentId) === String(nextMain));
                      const nextSub = children.length
                        ? String(children[0].id)
                        : hasHierarchy
                          ? ""
                          : nextMain;
                      setForm((prev) => ({
                        ...prev,
                        mainCategoryId: nextMain,
                        subCategoryId: nextSub,
                      }));
                    }}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  >
                    {mainCategories.length === 0 ? (
                      <option>لا توجد تصنيفات</option>
                    ) : (
                      mainCategories.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))
                    )}
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">التصنيف الفرعي *</span>
                  <select
                    value={form.subCategoryId}
                    onChange={(event) => setForm((prev) => ({ ...prev, subCategoryId: event.target.value }))}
                    disabled={isLoading || subCategories.length === 0 || !hasHierarchy}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  >
                    {subCategories.length === 0 ? (
                      <option>{hasHierarchy ? "لا توجد فئات فرعية" : "نفس التصنيف الرئيسي"}</option>
                    ) : (
                      subCategories.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))
                    )}
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">وحدة الصنف *</span>
                  <select
                    value={form.unitId}
                    onChange={(event) => {
                      const nextValue = event.target.value;
                      setForm((prev) => ({
                        ...prev,
                        unitId: nextValue,
                        saleUnitId: nextValue,
                        purchaseUnitId: nextValue,
                      }));
                    }}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  >
                    {units.length === 0 ? (
                      <option>لا توجد وحدات</option>
                    ) : (
                      units.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))
                    )}
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">وحدة البيع الافتراضية</span>
                  <select
                    value={form.saleUnitId}
                    onChange={(event) => setForm((prev) => ({ ...prev, saleUnitId: event.target.value }))}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  >
                    {units.length === 0 ? (
                      <option>لا توجد وحدات</option>
                    ) : (
                      units.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))
                    )}
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">وحدة الشراء الافتراضية</span>
                  <select
                    value={form.purchaseUnitId}
                    onChange={(event) => setForm((prev) => ({ ...prev, purchaseUnitId: event.target.value }))}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  >
                    {units.length === 0 ? (
                      <option>لا توجد وحدات</option>
                    ) : (
                      units.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))
                    )}
                  </select>
                </label>
                <button type="button" className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
                  وحدات إضافية
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <h3 className="text-sm font-semibold text-(--dash-text)">مبلغ التكلفة وحد الحد الأعلى للفروع</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead className="bg-(--dash-primary) text-white">
                    <tr>
                      <th className="px-3 py-2 text-right font-semibold">اسم الفرع</th>
                      <th className="px-3 py-2 text-right font-semibold">مبلغ التكلفة</th>
                      <th className="px-3 py-2 text-right font-semibold">تنبيهات كميات المخزون</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branchOptions.map((branch) => (
                      <tr key={branch} className="border-t border-(--dash-border)">
                        <td className="px-3 py-2">{branch}</td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            className="w-full rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1 text-xs"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            className="w-full rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1 text-xs"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <h3 className="text-sm font-semibold text-(--dash-text)">إتاحة الصنف في الفروع</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead className="bg-(--dash-primary) text-white">
                    <tr>
                      <th className="px-3 py-2 text-right font-semibold">اسم الفرع</th>
                      <th className="px-3 py-2 text-right font-semibold">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branchOptions.map((branch) => (
                      <tr key={branch} className="border-t border-(--dash-border)">
                        <td className="px-3 py-2">{branch}</td>
                        <td className="px-3 py-2">
                          <select className="w-full rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1 text-xs">
                            <option>نعم</option>
                            <option>لا</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <div className="grid gap-4">
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">نوع الصنف *</span>
                  <input
                    type="text"
                    value={itemForm.typeName ?? ""}
                    onChange={(event) => updateItemForm("typeName", event.target.value)}
                    placeholder="اكتب نوع الصنف"
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">اسم الصنف *</span>
                  <input
                    type="text"
                    value={itemForm.name}
                    onChange={(event) => updateItemForm("name", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">اسم الصنف باللغة الثانية</span>
                  <input
                    type="text"
                    value={itemForm.nameAlt}
                    onChange={(event) => updateItemForm("nameAlt", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">كود الصنف *</span>
                  <input
                    type="text"
                    value={itemForm.code}
                    onChange={(event) => updateItemForm("code", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">اسم مختصر للصنف</span>
                  <input
                    type="text"
                    value={itemForm.slug}
                    onChange={(event) => updateItemForm("slug", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">كود بديل</span>
                  <input
                    type="text"
                    value={itemForm.altCode}
                    onChange={(event) => updateItemForm("altCode", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">الماركة</span>
                  <select
                    value={form.brandId}
                    onChange={(event) => setForm((prev) => ({ ...prev, brandId: event.target.value }))}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  >
                    {brands.length === 0 ? (
                      <option>لا توجد ماركات</option>
                    ) : (
                      brands.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))
                    )}
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">تكلفة الصنف بدون ضريبة *</span>
                  <input
                    type="text"
                    value={itemForm.cost}
                    onChange={(event) => updateItemForm("cost", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">سعر الصنف *</span>
                  <input
                    type="text"
                    value={itemForm.price}
                    onChange={(event) => updateItemForm("price", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">ضريبة الصنف *</span>
                  <select
                    value={itemForm.taxRate}
                    onChange={(event) => updateItemForm("taxRate", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  >
                    <option value="">اختر الضريبة</option>
                    <option value="0">0% (معفى)</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">طريقة الضريبة *</span>
                  <select
                    value={itemForm.taxMethod}
                    onChange={(event) => updateItemForm("taxMethod", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  >
                    <option value="">اختر طريقة الضريبة</option>
                    <option value="exclusive">حصري (تُضاف على السعر)</option>
                    <option value="inclusive">شامل (ضمن السعر)</option>
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">أقل كمية للطلب *</span>
                  <input
                    type="text"
                    value={itemForm.minQty}
                    onChange={(event) => updateItemForm("minQty", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <div className="grid gap-4">
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">صورة الصنف</span>
                  <div className="flex gap-2">
                    <input ref={itemImageInputRef} type="file" className="hidden" onChange={handleItemImageChange} />
                    <input
                      type="text"
                      value={itemImageName}
                      placeholder="لم يتم اختيار ملف"
                      readOnly
                      className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      className="rounded-xl bg-(--dash-primary) px-3 py-2 text-xs font-semibold text-white"
                      onClick={() => itemImageInputRef.current?.click()}
                    >
                      استعراض...
                    </button>
                  </div>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">كتالوج صور الصنف</span>
                  <div className="flex gap-2">
                    <input ref={catalogInputRef} type="file" className="hidden" onChange={handleCatalogChange} />
                    <input
                      type="text"
                      value={catalogName}
                      placeholder="لم يتم اختيار ملف"
                      readOnly
                      className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      className="rounded-xl bg-(--dash-primary) px-3 py-2 text-xs font-semibold text-white"
                      onClick={() => catalogInputRef.current?.click()}
                    >
                      استعراض...
                    </button>
                  </div>
                </label>
                <div className="flex flex-wrap items-center gap-4 text-sm text-(--dash-muted)">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={itemForm.isStock}
                      onChange={(event) => updateItemForm("isStock", event.target.checked)}
                      className="h-4 w-4"
                    />
                    صنف مخزون
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={itemForm.isFeatured}
                      onChange={(event) => updateItemForm("isFeatured", event.target.checked)}
                      className="h-4 w-4"
                    />
                    مميز (يظهر في شاشة المتجر)
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={itemForm.isHidden}
                      onChange={(event) => updateItemForm("isHidden", event.target.checked)}
                      className="h-4 w-4"
                    />
                    اخفاء في شاشة المتجر
                  </label>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <label className="mb-2 block text-sm font-semibold text-(--dash-text)">نبذة مختصرة</label>
              <textarea
                value={itemForm.summary}
                onChange={(event) => updateItemForm("summary", event.target.value)}
                className="min-h-[120px] w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </div>

            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <label className="mb-2 block text-sm font-semibold text-(--dash-text)">تفاصيل الصنف</label>
              <textarea
                value={itemForm.details}
                onChange={(event) => updateItemForm("details", event.target.value)}
                className="min-h-[140px] w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={isSaving}
                className={`rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white ${
                  isSaving ? "cursor-not-allowed opacity-70" : ""
                }`}
                onClick={handleCreateItem}
              >
                {isSaving ? "جارٍ الحفظ..." : "إضافة الصنف"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
