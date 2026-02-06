"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

type ItemCost = {
  id: string;
  name: string;
  brand: string;
  purchaseCost: number;
  salePrice: number;
  margin: number;
};

const initialCosts: ItemCost[] = [
  {
    id: "COST-001",
    name: "حاسوب محمول",
    brand: "تكامل",
    purchaseCost: 2400,
    salePrice: 2800,
    margin: 17,
  },
  {
    id: "COST-002",
    name: "صيانة دورية",
    brand: "خدمات",
    purchaseCost: 200,
    salePrice: 350,
    margin: 75,
  },
];

const formatCurrency = (value: number) => `${value.toLocaleString()} ر.س`;

const page = () => {
  const [items, setItems] = useState<ItemCost[]>(initialCosts);
  const [query, setQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("الكل");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", brand: "", purchaseCost: "", salePrice: "" });

  useEffect(() => {
    const stored = window.localStorage.getItem("item-costs-data");
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
    window.localStorage.setItem("item-costs-data", JSON.stringify(items));
  }, [items]);

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesBrand = brandFilter === "الكل" || item.brand === brandFilter;
      if (!matchesBrand) {
        return false;
      }
      if (!needle) {
        return true;
      }
      return [item.name, item.brand].join(" ").toLowerCase().includes(needle);
    });
  }, [items, query, brandFilter]);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = (item: ItemCost) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      brand: item.brand,
      purchaseCost: String(item.purchaseCost),
      salePrice: String(item.salePrice),
    });
  };

  const handleSave = () => {
    const name = form.name.trim();
    if (!name) {
      return;
    }
    const purchaseCost = Number.parseFloat(form.purchaseCost) || 0;
    const salePrice = Number.parseFloat(form.salePrice) || 0;
    const margin = purchaseCost === 0 ? 0 : Math.round(((salePrice - purchaseCost) / purchaseCost) * 100);
    const nextItem: ItemCost = {
      id: editingId ?? `COST-${String(items.length + 1).padStart(3, "0")}`,
      name,
      brand: form.brand.trim() || "غير محدد",
      purchaseCost,
      salePrice,
      margin,
    };
    setItems((prev) => {
      if (editingId) {
        return prev.map((item) => (item.id === editingId ? nextItem : item));
      }
      return [nextItem, ...prev];
    });
    setEditingId(null);
    setForm({ name: "", brand: "", purchaseCost: "", salePrice: "" });
  };

  const brandOptions = useMemo(() => {
    const unique = new Set(items.map((item) => item.brand));
    return ["الكل", ...Array.from(unique)];
  }, [items]);

  return (
    <DashboardShell
      title="تكلفة الصنف"
      subtitle="ضبط تكلفة الشراء وهوامش الربح."
      hideHeaderFilters
    >
      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex-1 rounded-2xl bg-(--dash-primary) px-5 py-3 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
            onClick={() => setEditingId(null)}
          >
            تحديث التكاليف
          </button>
          <select
            value={brandFilter}
            onChange={(event) => setBrandFilter(event.target.value)}
            className="min-w-[170px] rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
          >
            {brandOptions.map((option) => (
              <option key={option} value={option}>
                {option === "الكل" ? "فلترة حسب الماركة" : option}
              </option>
            ))}
          </select>
          <div className="relative flex-1 min-w-[220px]">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث عن صنف"
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-(--dash-border)">
          <table className="min-w-full text-sm">
            <thead className="bg-(--dash-primary) text-white">
              <tr>
                <th className="px-4 py-3 text-right font-semibold">الصنف</th>
                <th className="px-4 py-3 text-right font-semibold">تكلفة الشراء</th>
                <th className="px-4 py-3 text-right font-semibold">سعر البيع</th>
                <th className="px-4 py-3 text-right font-semibold">الهامش</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-(--dash-border) text-(--dash-text) odd:bg-(--dash-panel) even:bg-(--dash-panel-soft)"
                >
                  <td className="px-4 py-3 font-semibold">{item.name}</td>
                  <td className="px-4 py-3">{formatCurrency(item.purchaseCost)}</td>
                  <td className="px-4 py-3">{formatCurrency(item.salePrice)}</td>
                  <td className="px-4 py-3 text-(--dash-muted)">{item.margin}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <h2 className="text-lg font-semibold">تعديل تكلفة الصنف</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">الصنف</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => handleFormChange("name", event.target.value)}
              placeholder="اسم الصنف"
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
            <span className="mb-2 block font-semibold text-(--dash-text)">تكلفة الشراء</span>
            <input
              type="number"
              value={form.purchaseCost}
              onChange={(event) => handleFormChange("purchaseCost", event.target.value)}
              placeholder="تكلفة الشراء"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
            />
          </label>
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">سعر البيع</span>
            <input
              type="number"
              value={form.salePrice}
              onChange={(event) => handleFormChange("salePrice", event.target.value)}
              placeholder="سعر البيع"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
            />
          </label>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text)"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", brand: "", purchaseCost: "", salePrice: "" });
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
