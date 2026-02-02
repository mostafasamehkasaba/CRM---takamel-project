"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "../components/DashboardShell";

type ItemMaxQty = {
  id: string;
  name: string;
  currentQty: number;
  minQty: number;
  maxQty: number;
};

const initialItems: ItemMaxQty[] = [
  {
    id: "MAX-001",
    name: "حاسوب محمول",
    currentQty: 48,
    minQty: 10,
    maxQty: 50,
  },
  {
    id: "MAX-002",
    name: "ملحقات",
    currentQty: 120,
    minQty: 25,
    maxQty: 150,
  },
];

const page = () => {
  const [items, setItems] = useState<ItemMaxQty[]>(initialItems);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", currentQty: "", minQty: "", maxQty: "" });

  useEffect(() => {
    const stored = window.localStorage.getItem("item-max-qty-data");
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
    window.localStorage.setItem("item-max-qty-data", JSON.stringify(items));
  }, [items]);

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      if (!needle) {
        return true;
      }
      return item.name.toLowerCase().includes(needle);
    });
  }, [items, query]);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = (item: ItemMaxQty) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      currentQty: String(item.currentQty),
      minQty: String(item.minQty ?? 0),
      maxQty: String(item.maxQty),
    });
  };

  const handleSave = () => {
    const name = form.name.trim();
    if (!name) {
      return;
    }
    const nextItem: ItemMaxQty = {
      id: editingId ?? `MAX-${String(items.length + 1).padStart(3, "0")}`,
      name,
      currentQty: Number.parseInt(form.currentQty, 10) || 0,
      minQty: Number.parseInt(form.minQty, 10) || 0,
      maxQty: Number.parseInt(form.maxQty, 10) || 0,
    };
    setItems((prev) => {
      if (editingId) {
        return prev.map((item) => (item.id === editingId ? nextItem : item));
      }
      return [nextItem, ...prev];
    });
    setEditingId(null);
    setForm({ name: "", currentQty: "", minQty: "", maxQty: "" });
  };

  return (
    <DashboardShell
      title="أقصى كمية للصنف"
      subtitle="تنبيهات الحد الأعلى للمخزون."
      hideHeaderFilters
    >
      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex-1 rounded-2xl bg-(--dash-primary) px-5 py-3 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
          >
            تحديث الحد الأعلى
          </button>
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
                <th className="px-4 py-3 text-right font-semibold">الكمية الحالية</th>
                <th className="px-4 py-3 text-right font-semibold">الحد الأدنى</th>
                <th className="px-4 py-3 text-right font-semibold">الحد الأعلى</th>
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
                  <td className="px-4 py-3 text-(--dash-muted)">{item.currentQty}</td>
                  <td className="px-4 py-3 text-(--dash-muted)">{item.minQty ?? 0}</td>
                  <td className="px-4 py-3 text-(--dash-muted)">{item.maxQty}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="rounded-full border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-xs text-(--dash-text)"
                      onClick={() => handleEdit(item)}
                    >
                      تعديل الحد
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <h2 className="text-lg font-semibold">تعديل الحد الأعلى</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-4">
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
            <span className="mb-2 block font-semibold text-(--dash-text)">الكمية الحالية</span>
            <input
              type="number"
              value={form.currentQty}
              onChange={(event) => handleFormChange("currentQty", event.target.value)}
              placeholder="الكمية الحالية"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
            />
          </label>
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">الحد الأعلى</span>
            <input
              type="number"
              value={form.maxQty}
              onChange={(event) => handleFormChange("maxQty", event.target.value)}
              placeholder="الحد الأعلى"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
            />
            </label>
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">الحد الأدنى</span>
            <input
              type="number"
              value={form.minQty}
              onChange={(event) => handleFormChange("minQty", event.target.value)}
              placeholder="الحد الأدنى"
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
              setForm({ name: "", currentQty: "", minQty: "", maxQty: "" });
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
