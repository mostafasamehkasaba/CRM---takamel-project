"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "../components/DashboardShell";

type ItemUnit = {
  id: string;
  name: string;
  abbreviation: string;
};

const initialUnits: ItemUnit[] = [
  { id: "UNIT-001", name: "قطعة", abbreviation: "PCS" },
  { id: "UNIT-002", name: "كيلو", abbreviation: "KG" },
];

const page = () => {
  const [units, setUnits] = useState<ItemUnit[]>(initialUnits);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", abbreviation: "" });

  useEffect(() => {
    const stored = window.localStorage.getItem("item-units-data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setUnits(parsed);
        }
      } catch {
        // Ignore invalid stored data.
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("item-units-data", JSON.stringify(units));
  }, [units]);

  const filteredUnits = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return units.filter((unit) => {
      if (!needle) {
        return true;
      }
      return [unit.name, unit.abbreviation].join(" ").toLowerCase().includes(needle);
    });
  }, [units, query]);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const name = form.name.trim();
    if (!name) {
      return;
    }
    const nextUnit: ItemUnit = {
      id: editingId ?? `UNIT-${String(units.length + 1).padStart(3, "0")}`,
      name,
      abbreviation: form.abbreviation.trim() || "PCS",
    };
    setUnits((prev) => {
      if (editingId) {
        return prev.map((item) => (item.id === editingId ? nextUnit : item));
      }
      return [nextUnit, ...prev];
    });
    setEditingId(null);
    setForm({ name: "", abbreviation: "" });
  };

  const handleEdit = (unit: ItemUnit) => {
    setEditingId(unit.id);
    setForm({ name: unit.name, abbreviation: unit.abbreviation });
  };

  const handleDelete = (unitId: string) => {
    setUnits((prev) => prev.filter((unit) => unit.id !== unitId));
  };

  return (
    <DashboardShell
      title="وحدة الصنف"
      subtitle="تعريف وحدات القياس وربطها بالأصناف."
      hideHeaderFilters
    >
      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex-1 rounded-2xl bg-(--dash-primary) px-5 py-3 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", abbreviation: "" });
            }}
          >
            إضافة وحدة
          </button>
          <div className="relative flex-1 min-w-[220px]">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث عن وحدة"
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-(--dash-border)">
          <table className="min-w-full text-sm">
            <thead className="bg-(--dash-primary) text-white">
              <tr>
                <th className="px-4 py-3 text-right font-semibold">الوحدة</th>
                <th className="px-4 py-3 text-right font-semibold">الاختصار</th>
                <th className="px-4 py-3 text-right font-semibold">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {filteredUnits.map((unit) => (
                <tr
                  key={unit.id}
                  className="border-t border-(--dash-border) text-(--dash-text) odd:bg-(--dash-panel) even:bg-(--dash-panel-soft)"
                >
                  <td className="px-4 py-3 font-semibold">{unit.name}</td>
                  <td className="px-4 py-3 text-(--dash-muted)">{unit.abbreviation}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-xs">
                      <button
                        type="button"
                        className="rounded-lg border border-(--dash-border) px-3 py-1 text-(--dash-text) hover:bg-(--dash-panel-soft)"
                        onClick={() => handleEdit(unit)}
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        className="rounded-lg bg-rose-500 px-3 py-1 text-white hover:bg-rose-600"
                        onClick={() => handleDelete(unit.id)}
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <h2 className="text-lg font-semibold">إضافة / تعديل وحدة</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">الوحدة</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => handleFormChange("name", event.target.value)}
              placeholder="اسم الوحدة"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
            />
          </label>
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">الاختصار</span>
            <input
              type="text"
              value={form.abbreviation}
              onChange={(event) => handleFormChange("abbreviation", event.target.value)}
              placeholder="PCS"
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
              setForm({ name: "", abbreviation: "" });
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
