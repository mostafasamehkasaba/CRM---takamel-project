"use client";

import { useMemo, useState } from "react";
import DashboardShell from "../components/DashboardShell";

type StaffRow = {
  code: string;
  name: string;
  phone: string;
  region: string;
};

const initialRows: StaffRow[] = [
  { code: "0001", name: "عام", phone: "0", region: "عام" },
  { code: "345345", name: "35xcvsdf", phone: "0103055555", region: "عام" },
];

const Page = () => {
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<StaffRow[]>(initialRows);
  const [showForm, setShowForm] = useState(false);
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [form, setForm] = useState({ code: "", name: "", phone: "", region: "عام" });

  const isEditing = editingCode !== null;
  const emptyForm = { code: "", name: "", phone: "", region: "عام" };

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return rows;
    }
    return rows.filter((row) => [row.code, row.name, row.phone, row.region].join(" ").toLowerCase().includes(needle));
  }, [query, rows]);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const code = form.code.trim();
    const name = form.name.trim();
    if (!code || !name) {
      return;
    }
    const nextRow = {
      code,
      name,
      phone: form.phone.trim(),
      region: form.region,
    };
    setRows((prev) => {
      if (editingCode) {
        return prev.map((row) => (row.code === editingCode ? nextRow : row));
      }
      return [nextRow, ...prev];
    });
    setForm(emptyForm);
    setEditingCode(null);
    setShowForm(false);
  };

  return (
    <DashboardShell title="المندوبين والموظفين" subtitle="البداية / إعدادات النظام / المندوبين والموظفين" hideHeaderFilters>
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <h2 className="text-sm font-semibold text-(--dash-text)">المندوبين والموظفين</h2>
          <button
            type="button"
            onClick={() => {
              setEditingCode(null);
              setForm(emptyForm);
              setShowForm((prev) => !prev);
            }}
            className="rounded-xl border border-(--dash-border) px-3 py-2 text-xs text-(--dash-text)"
          >
            إضافة موظف جديد
          </button>
        </div>

        {showForm ? (
          <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-(--dash-text)">{isEditing ? "تعديل" : "إضافة"}</h3>
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
                <span className="mb-2 block font-semibold text-(--dash-text)">الكود *</span>
                <input
                  type="text"
                  value={form.code}
                  onChange={(event) => handleFormChange("code", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">الاسم *</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => handleFormChange("name", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">هاتف</span>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(event) => handleFormChange("phone", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">المنطقة</span>
                <select
                  value={form.region}
                  onChange={(event) => handleFormChange("region", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                >
                  <option>عام</option>
                  <option>الوسطى</option>
                  <option>الغربية</option>
                  <option>الشرقية</option>
                  <option>الشمالية</option>
                  <option>الجنوبية</option>
                </select>
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCode(null);
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
                {isEditing ? "حفظ التعديل" : "إضافة"}
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
                  <th className="px-3 py-3 text-right font-semibold">الكود</th>
                  <th className="px-3 py-3 text-right font-semibold">اسم</th>
                  <th className="px-3 py-3 text-right font-semibold">هاتف</th>
                  <th className="px-3 py-3 text-right font-semibold">المنطقة</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.code} className="border-t border-(--dash-border) text-(--dash-text)">
                    <td className="px-3 py-3 font-semibold">{row.code}</td>
                    <td className="px-3 py-3">{row.name}</td>
                    <td className="px-3 py-3">{row.phone}</td>
                    <td className="px-3 py-3">{row.region}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCode(row.code);
                            setForm({ code: row.code, name: row.name, phone: row.phone, region: row.region });
                            setShowForm(true);
                          }}
                          className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-text)"
                        >
                          تعديل
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setRows((prev) => prev.filter((item) => item.code !== row.code));
                            if (editingCode === row.code) {
                              setEditingCode(null);
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
