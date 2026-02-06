"use client";

import { useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

type RegionRow = {
  country: string;
  region: string;
  branch: string;
};

const initialRows: RegionRow[] = [
  { country: "عام", region: "عام", branch: "مغسلة سيارات" },
  { country: "test", region: "test", branch: "نشاط سوبرماركت" },
];

const Page = () => {
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<RegionRow[]>(initialRows);
  const [showForm, setShowForm] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [form, setForm] = useState({ country: "", region: "", branch: "مغسلة سيارات" });

  const isEditing = editingKey !== null;
  const emptyForm = { country: "", region: "", branch: "مغسلة سيارات" };

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return rows;
    }
    return rows.filter((row) => [row.country, row.region, row.branch].join(" ").toLowerCase().includes(needle));
  }, [query, rows]);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const country = form.country.trim();
    const region = form.region.trim();
    if (!country || !region) {
      return;
    }
    const nextRow = { country, region, branch: form.branch };
    setRows((prev) => {
      if (editingKey) {
        return prev.map((row) => (row.region === editingKey ? nextRow : row));
      }
      return [nextRow, ...prev];
    });
    setForm(emptyForm);
    setEditingKey(null);
    setShowForm(false);
  };

  return (
    <DashboardShell title="المناطق" subtitle="البداية / إعدادات النظام / المناطق" hideHeaderFilters>
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <h2 className="text-sm font-semibold text-(--dash-text)">المناطق</h2>
          <button
            type="button"
            onClick={() => {
              setEditingKey(null);
              setForm(emptyForm);
              setShowForm((prev) => !prev);
            }}
            className="rounded-xl border border-(--dash-border) px-3 py-2 text-xs text-(--dash-text)"
          >
            إضافة منطقة
          </button>
        </div>

        {showForm ? (
          <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-(--dash-text)">{isEditing ? "تعديل منطقة" : "إضافة منطقة"}</h3>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-text)"
              >
                ×
              </button>
            </div>
            <p className="mt-2 text-xs text-(--dash-muted)">الحقول المعلّمة بنجمة * مطلوبة.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">بلد *</span>
                <input
                  type="text"
                  value={form.country}
                  onChange={(event) => handleFormChange("country", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">المنطقة *</span>
                <input
                  type="text"
                  value={form.region}
                  onChange={(event) => handleFormChange("region", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted) md:col-span-2">
                <span className="mb-2 block font-semibold text-(--dash-text)">الفرع</span>
                <select
                  value={form.branch}
                  onChange={(event) => handleFormChange("branch", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                >
                  <option>نشاط سوبرماركت</option>
                  <option>مغسلة سيارات</option>
                  <option>نشاط المطاعم</option>
                  <option>نشاط الصالون</option>
                </select>
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingKey(null);
                  setForm(emptyForm);
                }}
                className="rounded-xl border border-(--dash-border) px-4 py-2 text-xs text-(--dash-text)"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white"
              >
                {isEditing ? "حفظ التعديل" : "إضافة منطقة"}
              </button>
            </div>
          </div>
        ) : null}

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-(--dash-muted)">
              <span>إظهار</span>
              <select className="rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-(--dash-text) focus:outline-none">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex min-w-60 flex-1 items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="بحث"
                className="w-full bg-transparent text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-primary) text-white">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">بلد</th>
                  <th className="px-3 py-3 text-right font-semibold">المنطقة</th>
                  <th className="px-3 py-3 text-right font-semibold">الفرع</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={`${row.country}-${row.region}`} className="border-t border-(--dash-border) text-(--dash-text)">
                    <td className="px-3 py-3">{row.country}</td>
                    <td className="px-3 py-3">{row.region}</td>
                    <td className="px-3 py-3">{row.branch}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-start gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingKey(row.region);
                            setForm({ country: row.country, region: row.region, branch: row.branch });
                            setShowForm(true);
                          }}
                          className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-text)"
                        >
                          تعديل
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const confirmed = window.confirm("هل أنت متأكد من حذف المنطقة؟");
                            if (!confirmed) {
                              return;
                            }
                            setRows((prev) => prev.filter((item) => item.region !== row.region));
                            if (editingKey === row.region) {
                              setEditingKey(null);
                              setForm(emptyForm);
                              setShowForm(false);
                            }
                          }}
                          className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-rose-500"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-(--dash-border) text-(--dash-muted)">
                <tr>
                  <td className="px-3 py-3">[بلد]</td>
                  <td className="px-3 py-3">[المنطقة]</td>
                  <td className="px-3 py-3">[الفرع]</td>
                  <td className="px-3 py-3">الإجراءات</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-(--dash-border) px-4 py-3 text-sm text-(--dash-muted)">
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">سابق</button>
              <span className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">1</span>
              <button className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">التالي</button>
            </div>
            <span>عرض {filteredRows.length} سجلات</span>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
