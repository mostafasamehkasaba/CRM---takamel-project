"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import ActionIconButton from "@/app/(dashboard)/components/ActionIconButton";
import { EditIcon, TrashIcon } from "@/app/(dashboard)/components/icons/ActionIcons";
import { createCategory, deleteCategory, listCategories, updateCategory } from "@/app/services/categories";
import { extractList } from "@/app/services/http";

type CategoryRow = {
  id: string | number;
  code: string;
  name: string;
  slug: string;
  parentId?: string | number | null;
  parentName: string;
  image?: string | null;
};

const fallbackRows: CategoryRow[] = [
  {
    id: "c012",
    code: "C012",
    name: "العصيرات",
    slug: "c012",
    parentId: "main-1",
    parentName: "مطعم",
    image: null,
  },
  {
    id: "011",
    code: "011",
    name: "المقبلات SALATA",
    slug: "011",
    parentId: "main-1",
    parentName: "مطعم",
    image: null,
  },
  {
    id: "009",
    code: "009",
    name: "mashawy",
    slug: "009",
    parentId: "main-1",
    parentName: "مطعم",
    image: null,
  },
  {
    id: "007",
    code: "007",
    name: "بيتزا",
    slug: "007",
    parentId: "main-1",
    parentName: "مطعم",
    image: null,
  },
  {
    id: "c02252",
    code: "c02252",
    name: "مشروبات باردة",
    slug: "c02252",
    parentId: "main-2",
    parentName: "كوفي / الديوانية",
    image: null,
  },
  {
    id: "c0025",
    code: "c0025",
    name: "مشروبات ساخنة",
    slug: "c0025",
    parentId: "main-2",
    parentName: "كوفي / الديوانية",
    image: null,
  },
  {
    id: "1235485",
    code: "1235485",
    name: "بلايستيقا",
    slug: "1235485",
    parentId: "main-3",
    parentName: "غسيل",
    image: null,
  },
  {
    id: "syyy555",
    code: "SYYY555",
    name: "hhhhh",
    slug: "syyy555",
    parentId: "main-4",
    parentName: "عام",
    image: null,
  },
  {
    id: "c0110",
    code: "C0110",
    name: "الوجبات المقلية / الوجبات",
    slug: "c0110",
    parentId: "main-1",
    parentName: "مطعم",
    image: null,
  },
  {
    id: "c0080",
    code: "C0080",
    name: "برجر دجاج / birjar dajaj",
    slug: "c0080",
    parentId: "main-1",
    parentName: "مطعم",
    image: null,
  },
];

const pageSizeOptions = [10, 25, 50];
const branchOptions = [
  "مغسلة سيارات",
  "نشاط المطاعم",
  "نشاط الصالون",
  "نشاط الكوفي / الديوانية",
  "نشاط سوبرماركت",
  "مغسلة ملابس",
];
const defaultBranchAvailability = branchOptions.reduce<Record<string, "yes" | "no">>((acc, branch) => {
  acc[branch] = "yes";
  return acc;
}, {});

const PrintIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M7 8V4h10v4" />
    <rect x="4" y="8" width="16" height="8" rx="2" />
    <path d="M7 16v4h10v-4" />
    <path d="M17 12h.01" />
  </svg>
);

const resolveAssetUrl = (value?: string | null) => {
  if (!value) {
    return null;
  }
  if (value.startsWith("http") || value.startsWith("blob:") || value.startsWith("data:")) {
    return value;
  }
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const root = base.replace(/\/api\/?$/, "");
  const trimmed = value.replace(/^\/+/, "");
  if (!root) {
    return value;
  }
  return `${root}/${trimmed}`;
};

const mapCategoryRows = (payload: unknown): CategoryRow[] => {
  const entries = extractList<any>(payload as any);
  const normalized = entries.map((entry: any, index: number) => {
    const id = entry.id ?? entry.uuid ?? entry.code ?? entry._id ?? `${index + 1}`;
    const code =
      entry.code ??
      entry.category_code ??
      entry.categoryCode ??
      entry.short_code ??
      entry.shortCode ??
      entry.id ??
      entry.uuid ??
      `${id}`;
    const name = entry.name ?? entry.title ?? entry.label ?? "غير محدد";
    const slug = entry.slug ?? entry.short_name ?? entry.shortName ?? entry.code ?? `${name}`;
    const parentId =
      entry.parent_id ??
      entry.parentId ??
      entry.parent?.id ??
      entry.main_category_id ??
      entry.mainCategoryId ??
      entry.category_id ??
      entry.categoryId ??
      null;
    const fallbackParentName =
      entry.parent?.name ??
      entry.main_category?.name ??
      entry.mainCategory?.name ??
      entry.category?.name ??
      entry.categoryName ??
      "عام";
    const image =
      entry.image ??
      entry.image_url ??
      entry.imageUrl ??
      entry.image_path ??
      entry.imagePath ??
      entry.icon ??
      entry.icon_url ??
      entry.iconUrl ??
      entry.photo ??
      entry.photo_url ??
      entry.photoUrl ??
      null;
    return {
      id,
      code: String(code),
      name: String(name),
      slug: String(slug),
      parentId,
      parentName: String(fallbackParentName ?? "عام"),
      image: resolveAssetUrl(image),
    };
  });
  const byId = new Map(normalized.map((row) => [String(row.id), row]));
  return normalized.map((row) => ({
    ...row,
    parentName: row.parentId ? byId.get(String(row.parentId))?.name ?? row.parentName : row.parentName,
  }));
};

const Page = () => {
  const [rows, setRows] = useState<CategoryRow[]>(fallbackRows);
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<"new" | "edit">("new");
  const [editingRow, setEditingRow] = useState<CategoryRow | null>(null);
  const [form, setForm] = useState({
    code: "",
    name: "",
    slug: "",
    description: "",
    mainCategoryId: "",
  });
  const [showInPos, setShowInPos] = useState(false);
  const [branchAvailability, setBranchAvailability] =
    useState<Record<string, "yes" | "no">>(defaultBranchAvailability);
  const [imageName, setImageName] = useState("");
  const [bannerName, setBannerName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const bannerInputRef = useRef<HTMLInputElement | null>(null);

  const loadCategories = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await listCategories({ pagination: "on", limit_per_page: 200 });
      const mapped = mapCategoryRows(response);
      setRows(mapped.length ? mapped : fallbackRows);
    } catch (error) {
      console.error(error);
      setErrorMessage("تعذر تحميل التصنيفات من الخادم، يتم عرض بيانات تجريبية.");
      setRows(fallbackRows);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [query, pageSize]);

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return rows;
    }
    return rows.filter((row) =>
      [row.code, row.name, row.slug, row.parentName]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [query, rows]);

  const mainCategoryOptions = useMemo(() => {
    const topLevel = rows.filter((row) => !row.parentId);
    if (topLevel.length) {
      return topLevel.map((row) => ({ id: row.id, name: row.name }));
    }
    const fallback = Array.from(
      new Set(
        rows
          .map((row) => row.parentName)
          .filter((name) => name && name !== "عام")
      )
    );
    return fallback.map((name, index) => ({ id: `main-${index + 1}`, name }));
  }, [rows]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    if (page !== safePage) {
      setPage(safePage);
    }
  }, [page, safePage]);

  const pagedRows = filteredRows.slice((safePage - 1) * pageSize, safePage * pageSize);
  const rangeStart = filteredRows.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const rangeEnd = Math.min(safePage * pageSize, filteredRows.length);

  const resetForm = () => {
    setForm({ code: "", name: "", slug: "", description: "", mainCategoryId: "" });
    setShowInPos(false);
    setBranchAvailability({ ...defaultBranchAvailability });
    setImageName("");
    setBannerName("");
    setImageFile(null);
    setBannerFile(null);
    setFormError(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
    if (bannerInputRef.current) {
      bannerInputRef.current.value = "";
    }
  };

  const handleOpenForm = () => {
    resetForm();
    setFormMode("new");
    setEditingRow(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormError(null);
  };

  const handleSaveCategory = async () => {
    const code = form.code.trim();
    const name = form.name.trim();
    const slug = form.slug.trim();
    if (!code || !name || !slug) {
      setFormError("يرجى تعبئة الحقول الإلزامية (كود فئة، اسم التصنيف، Slug).");
      return;
    }
    const selectedMain = mainCategoryOptions.find((option) => String(option.id) === String(form.mainCategoryId));
    const parentId = selectedMain && rows.some((row) => String(row.id) === String(selectedMain.id)) ? selectedMain.id : undefined;
    const payload = {
      name,
      code,
      slug,
      description: form.description.trim() || undefined,
      parent_id: parentId,
      show_in_pos: showInPos ? 1 : 0,
      image: imageFile ?? undefined,
      banner: bannerFile ?? undefined,
    };
    setIsSaving(true);
    setFormError(null);
    try {
      if (formMode === "edit" && editingRow) {
        await updateCategory(editingRow.id, payload);
      } else {
        await createCategory(payload);
      }
      await loadCategories();
      setPage(1);
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error(error);
      setFormError(
        error instanceof Error && error.message
          ? error.message
          : "تعذر حفظ التصنيف. تأكد من البيانات وحاول مرة أخرى."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, kind: "image" | "banner") => {
    const file = event.target.files?.[0];
    if (!file) {
      if (kind === "image") {
        setImageName("");
        setImageFile(null);
      } else {
        setBannerName("");
        setBannerFile(null);
      }
      return;
    }
    if (kind === "image") {
      setImageName(file.name);
      setImageFile(file);
    } else {
      setBannerName(file.name);
      setBannerFile(file);
    }
  };

  const handleOpenEdit = (row: CategoryRow) => {
    const resolvedMainId = row.parentId
      ? String(row.parentId)
      : mainCategoryOptions.find((option) => option.name === row.parentName)?.id ?? "";
    setFormMode("edit");
    setEditingRow(row);
    setFormError(null);
    setForm({
      code: row.code ?? "",
      name: row.name ?? "",
      slug: row.slug ?? "",
      description: "",
      mainCategoryId: resolvedMainId ? String(resolvedMainId) : "",
    });
    setShowInPos(false);
    setBranchAvailability({ ...defaultBranchAvailability });
    setImageName("");
    setBannerName("");
    setImageFile(null);
    setBannerFile(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
    if (bannerInputRef.current) {
      bannerInputRef.current.value = "";
    }
    setShowForm(true);
  };

  const handleDeleteRow = async (row: CategoryRow) => {
    if (!confirm("هل تريد حذف التصنيف؟")) {
      return;
    }
    setIsSaving(true);
    try {
      await deleteCategory(row.id);
      await loadCategories();
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error && error.message ? error.message : "تعذر حذف التصنيف من الخادم."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardShell
      title="التصنيفات الرئيسية"
      subtitle="البداية / إعدادات النظام / التصنيفات الرئيسية"
      hideHeaderFilters
    >
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div>
            <h2 className="text-sm font-semibold text-(--dash-text)">التصنيفات الرئيسية</h2>
            <p className="mt-1 text-xs text-(--dash-muted)">الرجاء استخدام الجدول أدناه للتنقل أو تصفية النتائج</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-(--dash-text)">
            <button
              type="button"
              onClick={handleOpenForm}
              className="rounded-xl bg-(--dash-primary) px-3 py-2 text-xs font-semibold text-white"
            >
              إضافة فئة
            </button>
            <span className="text-(--dash-muted)">إظهار</span>
            <select
              value={pageSize}
              onChange={(event) => setPageSize(Number(event.target.value))}
              className="rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-xs text-(--dash-text)"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-55 flex-1 items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm text-(--dash-text)">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-(--dash-muted-2)" aria-hidden="true">
              <path
                fill="currentColor"
                d="M10 2a8 8 0 1 0 5.29 14l4.7 4.7a1 1 0 0 0 1.42-1.4l-4.7-4.7A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
              />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث بالاسم أو الكود أو التصنيف..."
              className="w-full bg-transparent text-sm text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
            />
          </div>
        </div>

        {errorMessage ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-600">
            {errorMessage}
          </div>
        ) : null}

        <div className="overflow-x-auto rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
          <table className="min-w-full text-xs">
            <thead className="bg-(--dash-primary) text-white">
              <tr>
                <th className="px-3 py-3 text-right font-semibold">صورة</th>
                <th className="px-3 py-3 text-right font-semibold">كود فئة</th>
                <th className="px-3 py-3 text-right font-semibold">اسم التصنيف</th>
                <th className="px-3 py-3 text-right font-semibold">Slug</th>
                <th className="px-3 py-3 text-right font-semibold">التصنيف الرئيسي</th>
                <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-(--dash-muted)">
                    جاري تحميل البيانات...
                  </td>
                </tr>
              ) : pagedRows.length ? (
                pagedRows.map((row) => (
                  <tr key={row.id} className="border-t border-(--dash-border)">
                    <td className="px-3 py-2">
                      {row.image ? (
                        <img src={row.image} alt={row.name} className="h-8 w-8 rounded border border-(--dash-border) object-cover" />
                      ) : (
                        <div className="h-8 w-8 rounded border border-(--dash-border) bg-(--dash-panel-soft)" />
                      )}
                    </td>
                    <td className="px-3 py-2 font-semibold text-(--dash-text)">{row.code}</td>
                    <td className="px-3 py-2 text-(--dash-text)">{row.name}</td>
                    <td className="px-3 py-2 text-(--dash-text)">{row.slug}</td>
                    <td className="px-3 py-2 text-(--dash-text)">{row.parentName}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <ActionIconButton
                          label="حذف"
                          icon={<TrashIcon className="h-4 w-4" />}
                          tone="danger"
                          onClick={() => handleDeleteRow(row)}
                          disabled={isSaving}
                        />
                        <ActionIconButton
                          label="تعديل"
                          icon={<EditIcon className="h-4 w-4" />}
                          onClick={() => handleOpenEdit(row)}
                          disabled={isSaving}
                        />
                        <ActionIconButton label="طباعة" icon={<PrintIcon className="h-4 w-4" />} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-3 py-6 text-center text-(--dash-muted)">
                    لا توجد بيانات لعرضها.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={safePage === 1}
              className="rounded-lg border border-(--dash-border) px-3 py-1 text-xs text-(--dash-text) disabled:opacity-50"
            >
              سابق
            </button>
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={`rounded-lg border px-3 py-1 text-xs ${
                    pageNumber === safePage
                      ? "border-(--dash-primary) bg-(--dash-primary) text-white"
                      : "border-(--dash-border) text-(--dash-text)"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={safePage === totalPages}
              className="rounded-lg border border-(--dash-border) px-3 py-1 text-xs text-(--dash-text) disabled:opacity-50"
            >
              التالي
            </button>
          </div>
          <span className="text-xs text-(--dash-muted)">
            عرض من {rangeStart} إلى {rangeEnd} من {filteredRows.length} سجلات
          </span>
        </div>
      </section>

      {showForm ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4">
          <div className="mt-6 w-full max-w-3xl rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
            <div className="flex items-center justify-between border-b border-(--dash-border) px-5 py-4">
              <h3 className="text-sm font-semibold text-(--dash-text)">
                {formMode === "edit" ? "تعديل فئة" : "إضافة فئة"}
              </h3>
              <button
                type="button"
                onClick={handleCloseForm}
                className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-text)"
              >
                ×
              </button>
            </div>
            <div className="dash-scroll max-h-[70vh] space-y-4 overflow-y-auto px-5 py-4">
              <p className="text-xs text-(--dash-muted)">
                يرجى إدخال المعلومات أدناه، تسميات الحقول التي تحمل علامة * هي حقول إجبارية.
              </p>
              {formError ? (
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-600">
                  {formError}
                </div>
              ) : null}

              <div className="grid gap-3">
                <label className="text-sm text-(--dash-muted)">
                  <span className="mb-1 block font-semibold text-(--dash-text)">كود فئة *</span>
                  <input
                    type="text"
                    value={form.code}
                    onChange={(event) => setForm((prev) => ({ ...prev, code: event.target.value }))}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                  />
                </label>
                <label className="text-sm text-(--dash-muted)">
                  <span className="mb-1 block font-semibold text-(--dash-text)">اسم التصنيف *</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                  />
                </label>
                <label className="text-sm text-(--dash-muted)">
                  <span className="mb-1 block font-semibold text-(--dash-text)">Slug *</span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                  />
                </label>
                <label className="text-sm text-(--dash-muted)">
                  <span className="mb-1 block font-semibold text-(--dash-text)">وصف</span>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                  />
                </label>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="text-sm text-(--dash-muted)">
                    <span className="mb-1 block font-semibold text-(--dash-text)">صورة الفئة</span>
                    <div className="flex items-center gap-2">
                      <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleFileChange(event, "image")}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className="rounded-lg bg-(--dash-primary) px-3 py-1 text-xs font-semibold text-white"
                      >
                        استعراض...
                      </button>
                      <span className="text-xs text-(--dash-muted-2)">{imageName || "لم يتم اختيار ملف"}</span>
                    </div>
                  </div>
                  <div className="text-sm text-(--dash-muted)">
                    <span className="mb-1 block font-semibold text-(--dash-text)">Category Banner</span>
                    <div className="flex items-center gap-2">
                      <input
                        ref={bannerInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleFileChange(event, "banner")}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => bannerInputRef.current?.click()}
                        className="rounded-lg bg-(--dash-primary) px-3 py-1 text-xs font-semibold text-white"
                      >
                        استعراض...
                      </button>
                      <span className="text-xs text-(--dash-muted-2)">{bannerName || "لم يتم اختيار ملف"}</span>
                    </div>
                  </div>
                </div>
                <label className="text-sm text-(--dash-muted)">
                  <span className="mb-1 block font-semibold text-(--dash-text)">التصنيف الرئيسي</span>
                  <select
                    value={form.mainCategoryId}
                    onChange={(event) => setForm((prev) => ({ ...prev, mainCategoryId: event.target.value }))}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                  >
                    <option value="">اختر التصنيف الرئيسي</option>
                    {mainCategoryOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm text-(--dash-muted)">
                  <input
                    type="checkbox"
                    checked={showInPos}
                    onChange={(event) => setShowInPos(event.target.checked)}
                    className="h-4 w-4 rounded border border-(--dash-border)"
                  />
                  يظهر في نقاط البيع
                </label>
              </div>

              <div className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) p-3">
                <h4 className="mb-3 text-sm font-semibold text-(--dash-text)">إتاحة التصنيف في الفروع</h4>
                <div className="overflow-x-auto">
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
                          <td className="px-3 py-2 text-(--dash-text)">{branch}</td>
                          <td className="px-3 py-2">
                            <select
                              value={branchAvailability[branch] ?? "yes"}
                              onChange={(event) =>
                                setBranchAvailability((prev) => ({ ...prev, [branch]: event.target.value as "yes" | "no" }))
                              }
                              className="rounded-lg border border-(--dash-border) bg-(--dash-panel) px-2 py-1 text-xs text-(--dash-text)"
                            >
                              <option value="yes">نعم</option>
                              <option value="no">لا</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-(--dash-border) px-5 py-4">
              <button
                type="button"
                onClick={handleCloseForm}
                className="rounded-xl border border-(--dash-border) px-4 py-2 text-xs text-(--dash-text)"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleSaveCategory}
                disabled={isSaving}
                className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
              >
                {formMode === "edit" ? "حفظ التعديلات" : "إضافة فئة"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
};

export default Page;
