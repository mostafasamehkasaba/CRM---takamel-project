"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

type ItemCode = {
  id: string;
  name: string;
  code: string;
  barcode: string;
};

const initialCodes: ItemCode[] = [
  {
    id: "CODE-001",
    name: "حاسوب محمول",
    code: "ITM-1024",
    barcode: "6280001234567",
  },
];

const page = () => {
  const [items, setItems] = useState<ItemCode[]>(initialCodes);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", code: "", barcode: "" });

  useEffect(() => {
    const stored = window.localStorage.getItem("item-codes-data");
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
    window.localStorage.setItem("item-codes-data", JSON.stringify(items));
  }, [items]);

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      if (!needle) {
        return true;
      }
      return [item.name, item.code, item.barcode].join(" ").toLowerCase().includes(needle);
    });
  }, [items, query]);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const generateCode = () => `ITM-${String(items.length + 1024).padStart(4, "0")}`;
  const generateBarcode = () => {
    const seed = Date.now().toString();
    return `${seed}${Math.floor(Math.random() * 10)}`.slice(-13);
  };

  const handleGenerate = () => {
    const nextItem: ItemCode = {
      id: `CODE-${String(items.length + 1).padStart(3, "0")}`,
      name: "صنف جديد",
      code: generateCode(),
      barcode: generateBarcode(),
    };
    setItems((prev) => [nextItem, ...prev]);
    setEditingId(nextItem.id);
    setForm({ name: nextItem.name, code: nextItem.code, barcode: nextItem.barcode });
  };

  const handleEdit = (item: ItemCode) => {
    setEditingId(item.id);
    setForm({ name: item.name, code: item.code, barcode: item.barcode });
  };

  const handleSave = () => {
    if (!editingId) {
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? { ...item, name: form.name.trim() || item.name, code: form.code.trim() || item.code, barcode: form.barcode.trim() || item.barcode }
          : item
      )
    );
    setEditingId(null);
    setForm({ name: "", code: "", barcode: "" });
  };

  const handlePrintBarcode = (item: ItemCode) => {
    setEditingId(item.id);
    setForm({ name: item.name, code: item.code, barcode: item.barcode });
    window.print();
  };

  return (
    <DashboardShell
      title="كود الصنف"
      subtitle="إدارة أكواد الأصناف وربطها بالباركود."
      hideHeaderFilters
    >
      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex-1 rounded-2xl bg-(--dash-primary) px-5 py-3 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
            onClick={handleGenerate}
          >
            توليد كود
          </button>
          <div className="relative flex-1 min-w-[220px]">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث بالكود أو الباركود"
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-(--dash-border)">
          <table className="min-w-full text-sm">
            <thead className="bg-(--dash-primary) text-white">
              <tr>
                <th className="px-4 py-3 text-right font-semibold">الصنف</th>
                <th className="px-4 py-3 text-right font-semibold">الكود</th>
                <th className="px-4 py-3 text-right font-semibold">الباركود</th>
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
                  <td className="px-4 py-3 text-(--dash-muted)">{item.barcode}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-xs">
                      <button
                        type="button"
                        className="rounded-full border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-(--dash-text)"
                        onClick={() => handleEdit(item)}
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-(--dash-text)"
                        onClick={() => handlePrintBarcode(item)}
                      >
                        طباعة باركود
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {editingId ? (
        <section className="mt-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
          <h2 className="text-lg font-semibold">تعديل بيانات الكود</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">الصنف</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) => handleFormChange("name", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">الكود</span>
              <input
                type="text"
                value={form.code}
                onChange={(event) => handleFormChange("code", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">الباركود</span>
              <input
                type="text"
                value={form.barcode}
                onChange={(event) => handleFormChange("barcode", event.target.value)}
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
                setForm({ name: "", code: "", barcode: "" });
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
      ) : null}
    </DashboardShell>
  );
};

export default page;
