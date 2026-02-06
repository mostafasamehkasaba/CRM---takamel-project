"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

type StockFilter = "الكل" | "متوفر" | "غير محدد";

type ItemName = {
  id: string;
  name: string;
  code: string;
  type: string;
  brand: string;
  cost: number;
  maxQty: string;
  unit: string;
  stockState: StockFilter;
  canDelete: boolean;
};

const initialItems: ItemName[] = [
  {
    id: "ITEM-001",
    name: "حاسوب محمول",
    code: "???-?",
    type: "منتج",
    brand: "تكامل",
    cost: 2800,
    maxQty: "50",
    unit: "قطعة",
    stockState: "متوفر",
    canDelete: true,
  },
  {
    id: "ITEM-002",
    name: "صيانة دورية",
    code: "???-?",
    type: "خدمة",
    brand: "خدمات",
    cost: 350,
    maxQty: "غير محدود",
    unit: "مرة",
    stockState: "غير محدد",
    canDelete: false,
  },
];

const formatCurrency = (value: number) => `${value.toLocaleString()} ر.س`;

const page = () => {
  const [items, setItems] = useState<ItemName[]>(initialItems);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("الكل");
  const [stockFilter, setStockFilter] = useState<StockFilter>("الكل");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    type: "منتج",
    name: "",
    code: "",
    brand: "",
    cost: "",
    maxQty: "",
    unit: "قطعة",
  });

  useEffect(() => {
    const stored = window.localStorage.getItem("item-names-data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch {
        // Ignore invalid stored data.
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("item-names-data", JSON.stringify(items));
  }, [items]);

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesType = typeFilter === "الكل" || item.type === typeFilter;
      const matchesStock = stockFilter === "الكل" || item.stockState === stockFilter;
      if (!matchesType || !matchesStock) {
        return false;
      }
      if (!needle) {
        return true;
      }
      return [item.name, item.code, item.brand, item.type]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [items, query, typeFilter, stockFilter]);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const name = form.name.trim();
    if (!name) {
      return;
    }
    const nextItem: ItemName = {
      id: editingId ?? `ITEM-${String(items.length + 1).padStart(3, "0")}`,
      name,
      code: form.code.trim() || "???-?",
      type: form.type,
      brand: form.brand.trim() || "غير محدد",
      cost: Number.parseFloat(form.cost) || 0,
      maxQty: form.maxQty.trim() || "غير محدد",
      unit: form.unit,
      stockState: form.type === "خدمة" ? "غير محدد" : "متوفر",
      canDelete: true,
    };

    setItems((prev) => {
      if (editingId) {
        return prev.map((item) => (item.id === editingId ? nextItem : item));
      }
      return [nextItem, ...prev];
    });
    setEditingId(null);
    setForm({
      type: "منتج",
      name: "",
      code: "",
      brand: "",
      cost: "",
      maxQty: "",
      unit: "قطعة",
    });
  };

  const handleEdit = (item: ItemName) => {
    setEditingId(item.id);
    setForm({
      type: item.type,
      name: item.name,
      code: item.code,
      brand: item.brand,
      cost: String(item.cost),
      maxQty: item.maxQty,
      unit: item.unit,
    });
  };

  const handleDelete = (item: ItemName) => {
    if (!item.canDelete) {
      return;
    }
    const confirmed = window.confirm("هل أنت متأكد من حذف الصنف؟");
    if (!confirmed) {
      return;
    }
    setItems((prev) => prev.filter((row) => row.id !== item.id));
  };

  return (
    <DashboardShell
      title="اسم الصنف"
      subtitle="قائمة بالأصناف مع البحث والفرز حسب الاسم."
      hideHeaderFilters
    >
      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex-1 rounded-2xl bg-(--dash-primary) px-5 py-3 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
            onClick={() => {
              setEditingId(null);
              setForm({
                type: "منتج",
                name: "",
                code: "",
                brand: "",
                cost: "",
                maxQty: "",
                unit: "قطعة",
              });
            }}
          >
            إضافة صنف
          </button>
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="min-w-[160px] rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
          >
            <option value="الكل">فلترة حسب النوع</option>
            <option value="منتج">منتج</option>
            <option value="خدمة">خدمة</option>
          </select>
          <select
            value={stockFilter}
            onChange={(event) => setStockFilter(event.target.value as StockFilter)}
            className="min-w-[170px] rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
          >
            <option value="الكل">فرز حسب المخزون</option>
            <option value="متوفر">متوفر</option>
            <option value="غير محدد">غير محدد</option>
          </select>
          <div className="relative flex-1 min-w-[220px]">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث عن صنف"
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-(--dash-border)">
          <table className="min-w-full text-sm">
            <thead className="bg-(--dash-primary) text-white">
              <tr>
                <th className="px-4 py-3 text-right font-semibold">اسم الصنف</th>
                <th className="px-4 py-3 text-right font-semibold">الكود</th>
                <th className="px-4 py-3 text-right font-semibold">الماركة</th>
                <th className="px-4 py-3 text-right font-semibold">التكلفة</th>
                <th className="px-4 py-3 text-right font-semibold">الكمية القصوى</th>
                <th className="px-4 py-3 text-right font-semibold">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-(--dash-border) text-(--dash-text) odd:bg-(--dash-panel) even:bg-(--dash-panel-soft)"
                >
                  <td className="px-4 py-3 font-semibold">{item.name}</td>
                  <td className="px-4 py-3 text-(--dash-muted)">{item.code}</td>
                  <td className="px-4 py-3 text-(--dash-muted)">{item.brand}</td>
                  <td className="px-4 py-3">{formatCurrency(item.cost)}</td>
                  <td className="px-4 py-3 text-(--dash-muted)">{item.maxQty}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-xs">
                      <button
                        type="button"
                        className="rounded-lg border border-(--dash-border) px-3 py-1 text-(--dash-text) hover:bg-(--dash-panel-soft)"
                        onClick={() => handleEdit(item)}
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        disabled={!item.canDelete}
                        className={`rounded-lg px-3 py-1 text-white ${
                          item.canDelete ? "bg-rose-500 hover:bg-rose-600" : "bg-slate-300"
                        }`}
                      >
                        {item.canDelete ? "حذف" : "حذف (بدون صلاحية)"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-(--dash-muted)">
          <button type="button" className="rounded-full border border-(--dash-border) px-3 py-1">
            السابق
          </button>
          <span>1 من 6</span>
          <button type="button" className="rounded-full border border-(--dash-border) px-3 py-1">
            التالي
          </button>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <h2 className="text-lg font-semibold">إضافة / تعديل صنف</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">نوع الصنف</span>
            <select
              value={form.type}
              onChange={(event) => handleFormChange("type", event.target.value)}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
            >
              <option value="منتج">منتج</option>
              <option value="خدمة">خدمة</option>
            </select>
          </label>
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">اسم الصنف</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => handleFormChange("name", event.target.value)}
              placeholder="اسم الصنف"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
            />
          </label>
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">كود الصنف</span>
            <input
              type="text"
              value={form.code}
              onChange={(event) => handleFormChange("code", event.target.value)}
              placeholder="كود الصنف"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
            />
          </label>
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">الماركة</span>
            <input
              type="text"
              value={form.brand}
              onChange={(event) => handleFormChange("brand", event.target.value)}
              placeholder="الماركة"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
            />
          </label>
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">تكلفة الصنف</span>
            <input
              type="number"
              value={form.cost}
              onChange={(event) => handleFormChange("cost", event.target.value)}
              placeholder="تكلفة الصنف"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
            />
          </label>
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">أقصى كمية للصنف</span>
            <input
              type="text"
              value={form.maxQty}
              onChange={(event) => handleFormChange("maxQty", event.target.value)}
              placeholder="أقصى كمية للصنف"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
            />
          </label>
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">وحدة الصنف</span>
            <select
              value={form.unit}
              onChange={(event) => handleFormChange("unit", event.target.value)}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
            >
              <option value="قطعة">قطعة</option>
              <option value="ساعة">ساعة</option>
              <option value="مرة">مرة</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text)"
            onClick={() => {
              setEditingId(null);
              setForm({
                type: "منتج",
                name: "",
                code: "",
                brand: "",
                cost: "",
                maxQty: "",
                unit: "قطعة",
              });
            }}
          >
            إلغاء
          </button>
          <button
            type="button"
            className="rounded-xl bg-(--dash-primary) px-4 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
            onClick={handleSave}
          >
            حفظ
          </button>
        </div>
      </section>
    </DashboardShell>
  );
};

export default page;
