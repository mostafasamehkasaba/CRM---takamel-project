"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import ActionIconButton from "@/app/(dashboard)/components/ActionIconButton";
import { EditIcon, TrashIcon, ViewIcon } from "@/app/(dashboard)/components/icons/ActionIcons";
import ConfirmModal from "@/app/(dashboard)/components/ConfirmModal";
import { deleteItem, getItem, listItems, updateItem } from "@/app/services/items";
import { extractList } from "@/app/services/http";

type DisplayItem = {
  id: string | number;
  code: string;
  name: string;
  imageUrl?: string | null;
  brand: string;
  agent: string;
  category: string;
  cost: number;
  salePrice: number;
  qty: number;
  unit: string;
  alertQty: number;
};

type EditForm = {
  code: string;
  name: string;
  brand: string;
  agent: string;
  category: string;
  cost: string;
  salePrice: string;
  qty: string;
  unit: string;
  alertQty: string;
};

const formatCurrency = (value: number) => `${value.toLocaleString()} ر.س`;

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

const resolveItemPayload = (payload: any) => {
  if (payload?.data) {
    return payload.data;
  }
  if (payload?.item) {
    return payload.item;
  }
  if (payload?.result) {
    return payload.result;
  }
  return payload;
};

const page = () => {
  const [items, setItems] = useState<DisplayItem[]>([]);
  const [query, setQuery] = useState("");
  const [showCount, setShowCount] = useState("10");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [viewItem, setViewItem] = useState<DisplayItem | null>(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewError, setViewError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<DisplayItem | null>(null);
  const [editForm, setEditForm] = useState<EditForm | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editSource, setEditSource] = useState<any | null>(null);
  const [pendingDelete, setPendingDelete] = useState<DisplayItem | null>(null);

  const mapItem = (entry: any, index: number): DisplayItem => ({
    id: entry.id ?? entry.uuid ?? entry.code ?? entry._id ?? `${index + 1}`,
    code: entry.code ?? entry.sku ?? entry.barcode ?? "???",
    name: entry.name ?? "غير محدد",
    imageUrl: resolveAssetUrl(
      entry.image_url ?? entry.imageUrl ?? entry.image ?? entry.photo ?? entry.photo_url ?? entry.photoUrl ?? null
    ),
    brand: entry.brand?.name ?? entry.brand_name ?? entry.brand ?? "غير محدد",
    agent: entry.agent?.name ?? entry.agent_name ?? entry.agent ?? "عام",
    category: entry.category?.name ?? entry.category_name ?? entry.category ?? "غير محدد",
    cost: Number(entry.purchase_price ?? entry.cost ?? 0),
    salePrice: Number(entry.sale_price ?? entry.salePrice ?? 0),
    qty: Number(entry.current_stock ?? entry.stock ?? 0),
    unit: entry.item_unit?.name ?? entry.unit?.name ?? entry.unit_name ?? entry.unit ?? "قطعة",
    alertQty: Number(entry.notify_quantity ?? entry.alertQty ?? 0),
  });

  const fetchItems = async (searchValue = "") => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await listItems({
        pagination: "on",
        limit_per_page: 50,
        search: searchValue || undefined,
      });
      const list = extractList<any>(response);
      setItems(list.map(mapItem));
    } catch (error) {
      console.error(error);
      setErrorMessage("تعذر تحميل الأصناف.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handle = window.setTimeout(() => {
      fetchItems(query);
    }, 300);
    return () => window.clearTimeout(handle);
  }, [query]);

  const openViewModal = async (item: DisplayItem) => {
    setViewItem(item);
    setViewLoading(true);
    setViewError(null);
    try {
      const response = await getItem(item.id);
      const entry = resolveItemPayload(response);
      const mapped = mapItem(entry, 0);
      setViewItem(mapped);
    } catch (error) {
      console.error(error);
      setViewError("تعذر تحميل تفاصيل الصنف.");
    } finally {
      setViewLoading(false);
    }
  };

  const openEditModal = async (item: DisplayItem) => {
    setEditingItem(item);
    setEditLoading(true);
    setFormError(null);
    setEditSource(null);
    try {
      const response = await getItem(item.id);
      const entry = resolveItemPayload(response);
      const mapped = mapItem(entry, 0);
      setEditSource(entry);
      setEditForm({
        code: mapped.code,
        name: mapped.name,
        brand: mapped.brand,
        agent: mapped.agent,
        category: mapped.category,
        cost: String(mapped.cost),
        salePrice: String(mapped.salePrice),
        qty: String(mapped.qty),
        unit: mapped.unit,
        alertQty: String(mapped.alertQty),
      });
    } catch (error) {
      console.error(error);
      setEditForm({
        code: item.code,
        name: item.name,
        brand: item.brand,
        agent: item.agent,
        category: item.category,
        cost: String(item.cost),
        salePrice: String(item.salePrice),
        qty: String(item.qty),
        unit: item.unit,
        alertQty: String(item.alertQty),
      });
      setFormError("تعذر تحميل تفاصيل الصنف.");
    } finally {
      setEditLoading(false);
    }
  };

  const closeEditModal = () => {
    setEditingItem(null);
    setEditForm(null);
    setFormError(null);
  };

  const handleEditChange = <K extends keyof EditForm>(field: K, value: EditForm[K]) => {
    setEditForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const parseNumber = (value: string) => {
    if (!value.trim()) {
      return 0;
    }
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editForm || !editingItem) {
      return;
    }
    if (!editForm.code.trim() || !editForm.name.trim()) {
      setFormError("الرجاء إدخال كود الصنف والاسم.");
      return;
    }
    const cost = parseNumber(editForm.cost);
    const salePrice = parseNumber(editForm.salePrice);
    const qty = parseNumber(editForm.qty);
    const alertQty = parseNumber(editForm.alertQty);
    if ([cost, salePrice, qty, alertQty].some((value) => value === null)) {
      setFormError("الرجاء إدخال قيم رقمية صحيحة.");
      return;
    }
    const payload: Record<string, string | number | undefined | null> = {
      name: editForm.name.trim(),
      code: editForm.code.trim() || undefined,
      purchase_price: cost ?? 0,
      sale_price: salePrice ?? 0,
      current_stock: qty ?? 0,
      notify_quantity: alertQty ?? 0,
    };

    if (editSource) {
      const unitId = editSource.item_unit?.id ?? editSource.item_unit_id;
      const typeId = editSource.item_type?.id ?? editSource.item_type_id;
      const brandId = editSource.brand?.id ?? editSource.brand_id;
      const agentId = editSource.agent?.id ?? editSource.agent_id;
      const categoryId = editSource.category?.id ?? editSource.category_id;

      if (unitId) payload.item_unit_id = unitId;
      if (typeId) payload.item_type_id = typeId;
      if (brandId) payload.brand_id = brandId;
      if (agentId) payload.agent_id = agentId;
      if (categoryId) payload.category_id = categoryId;
    }

    setIsSaving(true);
    setFormError(null);
    try {
      await updateItem(editingItem.id, payload);
      const refreshed = { ...editingItem, ...editForm };
      if (viewItem?.id === editingItem.id) {
        setViewItem({
          ...viewItem,
          code: editForm.code.trim(),
          name: editForm.name.trim(),
          brand: editForm.brand.trim() || "غير محدد",
          agent: editForm.agent.trim() || "عام",
          category: editForm.category.trim() || "غير محدد",
          cost: cost ?? 0,
          salePrice: salePrice ?? 0,
          qty: qty ?? 0,
          unit: editForm.unit.trim() || viewItem.unit,
          alertQty: alertQty ?? 0,
        });
      }
      closeEditModal();
      fetchItems(query);
      setEditingItem(refreshed);
    } catch (error) {
      console.error(error);
      setFormError("تعذر تحديث الصنف.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = (item: DisplayItem) => {
    setPendingDelete(item);
  };

  const confirmDelete = () => {
    if (!pendingDelete) {
      return;
    }
    const itemId = pendingDelete.id;
    setPendingDelete(null);
    deleteItem(itemId)
      .then(() => {
        if (viewItem?.id === itemId) {
          setViewItem(null);
        }
        if (editingItem?.id === itemId) {
          closeEditModal();
        }
        fetchItems(query);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("تعذر حذف الصنف.");
      });
  };

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      if (!needle) {
        return true;
      }
      return [item.name, item.code, item.brand, item.category]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [items, query]);

  const perPage = Number.parseInt(showCount, 10) || 10;
  const totalRecords = filteredItems.length;
  const startIndex = totalRecords === 0 ? 0 : 1;
  const endIndex = Math.min(perPage, totalRecords);
  const totalPages = Math.max(1, Math.ceil(totalRecords / perPage));

  return (
    <DashboardShell
      title="عرض الصنف"
      subtitle="قائمة الأصناف مع التصنيفات والمخزون والإجراءات."
      hideHeaderFilters
    >
      {errorMessage ? (
        <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </div>
      ) : null}
      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={showCount}
            onChange={(event) => setShowCount(event.target.value)}
            className="min-w-[170px] rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
          >
            <option value="10">إظهار 10</option>
            <option value="25">إظهار 25</option>
            <option value="50">إظهار 50</option>
          </select>
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="اكتب ما تريد أن تبحث عنه"
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-(--dash-border)">
          <table className="min-w-full text-sm">
            <thead className="bg-(--dash-primary) text-white">
              <tr>
                <th className="px-3 py-3 text-right font-semibold">صورة</th>
                <th className="px-3 py-3 text-right font-semibold">كود الصنف</th>
                <th className="px-3 py-3 text-right font-semibold">اسم</th>
                <th className="px-3 py-3 text-right font-semibold">الماركة</th>
                <th className="px-3 py-3 text-right font-semibold">الوكيل</th>
                <th className="px-3 py-3 text-right font-semibold">التصنيفات الرئيسية</th>
                <th className="px-3 py-3 text-right font-semibold">التكلفة</th>
                <th className="px-3 py-3 text-right font-semibold">سعر البيع</th>
                <th className="px-3 py-3 text-right font-semibold">كمية</th>
                <th className="px-3 py-3 text-right font-semibold">وحدة</th>
                <th className="px-3 py-3 text-right font-semibold">تنبيهات بكميات المخزون</th>
                <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr className="border-t border-(--dash-border)">
                  <td className="px-4 py-6 text-center text-(--dash-muted)" colSpan={12}>
                    جاري التحميل...
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-(--dash-border) text-(--dash-text) odd:bg-(--dash-panel) even:bg-(--dash-panel-soft)"
                  >
                    <td className="px-3 py-3">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="h-8 w-8 rounded-lg border border-(--dash-border) object-cover"
                        />
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) text-(--dash-muted)">
                          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                            <path
                              fill="currentColor"
                              d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm4 10 3-3 4 4 3-3 2 2v2H6v-2l2-2Z"
                            />
                          </svg>
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-(--dash-muted)">{item.code}</td>
                    <td className="px-3 py-3 font-semibold">{item.name}</td>
                    <td className="px-3 py-3 text-(--dash-muted)">{item.brand}</td>
                    <td className="px-3 py-3 text-(--dash-muted)">{item.agent}</td>
                    <td className="px-3 py-3 text-(--dash-muted)">{item.category}</td>
                    <td className="px-3 py-3">{formatCurrency(item.cost)}</td>
                    <td className="px-3 py-3">{formatCurrency(item.salePrice)}</td>
                    <td className="px-3 py-3 text-(--dash-muted)">{item.qty.toFixed(2)}</td>
                    <td className="px-3 py-3 text-(--dash-muted)">{item.unit}</td>
                    <td className="px-3 py-3 text-(--dash-muted)">{item.alertQty.toFixed(2)}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <ActionIconButton
                          label="تعديل الصنف"
                          icon={<EditIcon className="h-4 w-4" />}
                          onClick={() => openEditModal(item)}
                        />
                        <ActionIconButton
                          label="حذف الصنف"
                          icon={<TrashIcon className="h-4 w-4" />}
                          tone="danger"
                          onClick={() => handleDeleteItem(item)}
                        />
                        <ActionIconButton
                          label="عرض الصنف"
                          icon={<ViewIcon className="h-4 w-4" />}
                          onClick={() => openViewModal(item)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-(--dash-muted)">
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-full border border-(--dash-border) px-3 py-1">
              السابق
            </button>
            <span>1 من {totalPages}</span>
            <button type="button" className="rounded-full border border-(--dash-border) px-3 py-1">
              التالي
            </button>
          </div>
          <span>
            عرض {startIndex} إلى {endIndex} من {totalRecords} سجلات
          </span>
        </div>
      </section>

      {viewItem ? (
        <div className="dash-modal">
          <div className="dash-modal-body max-w-2xl p-6">
            <div className="flex items-center justify-between border-b border-(--dash-border) pb-3">
              <div>
                <h3 className="text-sm font-semibold text-(--dash-text)">عرض الصنف</h3>
                <p className="mt-1 text-xs text-(--dash-muted)">{viewItem.code}</p>
              </div>
              <button
                type="button"
                onClick={() => setViewItem(null)}
                className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-muted)"
              >
                إغلاق
              </button>
            </div>
            {viewLoading ? (
              <div className="py-8 text-center text-sm text-(--dash-muted)">جاري تحميل التفاصيل...</div>
            ) : viewError ? (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                {viewError}
              </div>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2 flex items-center gap-3 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) p-3">
                  {viewItem.imageUrl ? (
                    <img
                      src={viewItem.imageUrl}
                      alt={viewItem.name}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="h-12 w-12 rounded-lg border border-(--dash-border) object-cover"
                    />
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-(--dash-border) bg-(--dash-panel) text-(--dash-muted)">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm4 10 3-3 4 4 3-3 2 2v2H6v-2l2-2Z"
                        />
                      </svg>
                    </span>
                  )}
                  <div>
                    <p className="text-xs text-(--dash-muted)">اسم الصنف</p>
                    <p className="mt-1 text-base font-semibold text-(--dash-text)">{viewItem.name}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-(--dash-border) p-3">
                  <p className="text-xs text-(--dash-muted)">الماركة</p>
                  <p className="mt-1 text-sm font-semibold text-(--dash-text)">{viewItem.brand}</p>
                </div>
                <div className="rounded-xl border border-(--dash-border) p-3">
                  <p className="text-xs text-(--dash-muted)">الوكيل</p>
                  <p className="mt-1 text-sm font-semibold text-(--dash-text)">{viewItem.agent}</p>
                </div>
                <div className="rounded-xl border border-(--dash-border) p-3">
                  <p className="text-xs text-(--dash-muted)">التصنيف</p>
                  <p className="mt-1 text-sm font-semibold text-(--dash-text)">{viewItem.category}</p>
                </div>
                <div className="rounded-xl border border-(--dash-border) p-3">
                  <p className="text-xs text-(--dash-muted)">التكلفة</p>
                  <p className="mt-1 text-sm font-semibold text-(--dash-text)">{formatCurrency(viewItem.cost)}</p>
                </div>
                <div className="rounded-xl border border-(--dash-border) p-3">
                  <p className="text-xs text-(--dash-muted)">سعر البيع</p>
                  <p className="mt-1 text-sm font-semibold text-(--dash-text)">{formatCurrency(viewItem.salePrice)}</p>
                </div>
                <div className="rounded-xl border border-(--dash-border) p-3">
                  <p className="text-xs text-(--dash-muted)">الكمية</p>
                  <p className="mt-1 text-sm font-semibold text-(--dash-text)">
                    {viewItem.qty.toFixed(2)} {viewItem.unit}
                  </p>
                </div>
                <div className="rounded-xl border border-(--dash-border) p-3">
                  <p className="text-xs text-(--dash-muted)">تنبيه المخزون</p>
                  <p className="mt-1 text-sm font-semibold text-(--dash-text)">{viewItem.alertQty.toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {editForm && editingItem ? (
        <div className="dash-modal">
          <div className="dash-modal-body max-w-2xl p-6">
            <div className="flex items-center justify-between border-b border-(--dash-border) pb-3">
              <div>
                <h3 className="text-sm font-semibold text-(--dash-text)">تعديل الصنف</h3>
                <p className="mt-1 text-xs text-(--dash-muted)">{editingItem.code}</p>
              </div>
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-muted)"
              >
                إغلاق
              </button>
            </div>
            {formError ? (
              <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                {formError}
              </div>
            ) : null}
            <form onSubmit={handleEditSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="dash-label">
                كود الصنف
                <input
                  value={editForm.code}
                  onChange={(event) => handleEditChange("code", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                اسم الصنف
                <input
                  value={editForm.name}
                  onChange={(event) => handleEditChange("name", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                الماركة
                <input
                  value={editForm.brand}
                  onChange={(event) => handleEditChange("brand", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                الوكيل
                <input
                  value={editForm.agent}
                  onChange={(event) => handleEditChange("agent", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label sm:col-span-2">
                التصنيفات الرئيسية
                <input
                  value={editForm.category}
                  onChange={(event) => handleEditChange("category", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                التكلفة
                <input
                  type="number"
                  min={0}
                  value={editForm.cost}
                  onChange={(event) => handleEditChange("cost", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                سعر البيع
                <input
                  type="number"
                  min={0}
                  value={editForm.salePrice}
                  onChange={(event) => handleEditChange("salePrice", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                الكمية
                <input
                  type="number"
                  min={0}
                  value={editForm.qty}
                  onChange={(event) => handleEditChange("qty", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                وحدة
                <input
                  value={editForm.unit}
                  onChange={(event) => handleEditChange("unit", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                تنبيهات المخزون
                <input
                  type="number"
                  min={0}
                  value={editForm.alertQty}
                  onChange={(event) => handleEditChange("alertQty", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <div className="sm:col-span-2 mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-lg border border-(--dash-border) px-4 py-2 text-xs text-(--dash-muted)"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSaving || editLoading}
                  className="rounded-lg bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
                >
                  {isSaving ? "جارٍ الحفظ..." : "حفظ التعديل"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      <ConfirmModal
        open={Boolean(pendingDelete)}
        message="هل أنت متأكد من حذف الصنف؟"
        confirmLabel="حذف"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </DashboardShell>
  );
};

export default page;
