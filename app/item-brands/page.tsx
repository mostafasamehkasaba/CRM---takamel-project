"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "../components/DashboardShell";

type Brand = {
  id: string;
  name: string;
  itemsCount: number;
};

const initialBrands: Brand[] = [
  { id: "BR-001", name: "تكامل", itemsCount: 12 },
  { id: "BR-002", name: "تقنية", itemsCount: 6 },
];

const page = () => {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "" });

  useEffect(() => {
    const stored = window.localStorage.getItem("item-brands-data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setBrands(parsed);
        }
      } catch {
        // Ignore invalid stored data.
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("item-brands-data", JSON.stringify(brands));
  }, [brands]);

  const filteredBrands = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return brands.filter((brand) => {
      if (!needle) {
        return true;
      }
      return brand.name.toLowerCase().includes(needle);
    });
  }, [brands, query]);

  const handleFormChange = (value: string) => {
    setForm({ name: value });
  };

  const handleSave = () => {
    const name = form.name.trim();
    if (!name) {
      return;
    }
    const nextBrand: Brand = {
      id: editingId ?? `BR-${String(brands.length + 1).padStart(3, "0")}`,
      name,
      itemsCount: editingId ? brands.find((item) => item.id === editingId)?.itemsCount ?? 0 : 0,
    };
    setBrands((prev) => {
      if (editingId) {
        return prev.map((item) => (item.id === editingId ? nextBrand : item));
      }
      return [nextBrand, ...prev];
    });
    setEditingId(null);
    setForm({ name: "" });
  };

  const handleEdit = (brand: Brand) => {
    setEditingId(brand.id);
    setForm({ name: brand.name });
  };

  const handleDelete = (brandId: string) => {
    setBrands((prev) => prev.filter((item) => item.id !== brandId));
  };

  return (
    <DashboardShell
      title="الماركة"
      subtitle="إدارة العلامات التجارية للأصناف."
      hideHeaderFilters
    >
      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex-1 rounded-2xl bg-(--dash-primary) px-5 py-3 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "" });
            }}
          >
            إضافة ماركة
          </button>
          <div className="relative flex-1 min-w-[220px]">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث عن ماركة"
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-(--dash-border)">
          <table className="min-w-full text-sm">
            <thead className="bg-(--dash-primary) text-white">
              <tr>
                <th className="px-4 py-3 text-right font-semibold">الماركة</th>
                <th className="px-4 py-3 text-right font-semibold">عدد الأصناف</th>
                <th className="px-4 py-3 text-right font-semibold">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map((brand) => (
                <tr
                  key={brand.id}
                  className="border-t border-(--dash-border) text-(--dash-text) odd:bg-(--dash-panel) even:bg-(--dash-panel-soft)"
                >
                  <td className="px-4 py-3 font-semibold">{brand.name}</td>
                  <td className="px-4 py-3 text-(--dash-muted)">{brand.itemsCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-xs">
                      <button
                        type="button"
                        className="rounded-lg border border-(--dash-border) px-3 py-1 text-(--dash-text) hover:bg-(--dash-panel-soft)"
                        onClick={() => handleEdit(brand)}
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        className="rounded-lg bg-rose-500 px-3 py-1 text-white hover:bg-rose-600"
                        onClick={() => handleDelete(brand.id)}
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
        <h2 className="text-lg font-semibold">إضافة / تعديل ماركة</h2>
        <div className="mt-4">
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">اسم الماركة</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => handleFormChange(event.target.value)}
              placeholder="اسم الماركة"
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
              setForm({ name: "" });
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
