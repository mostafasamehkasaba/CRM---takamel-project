"use client";

import { useMemo, useState } from "react";
import DashboardShell from "../components/DashboardShell";

type PromoRow = {
  name: string;
  mainItem: string;
  freeItem: string;
  startDate: string;
  endDate: string;
  discount: string;
  details: string;
};

const initialRows: PromoRow[] = [];

const Page = () => {
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<PromoRow[]>(initialRows);
  const [showForm, setShowForm] = useState(false);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    mainItem: "",
    mainQty: "1",
    freeItem: "",
    freeQty: "1",
    discount: "",
    policy: "تطبق على أول كمية من الصنف الأساسي",
    details: "",
  });

  const isEditing = editingName !== null;
  const emptyForm = {
    name: "",
    startDate: "",
    endDate: "",
    mainItem: "",
    mainQty: "1",
    freeItem: "",
    freeQty: "1",
    discount: "",
    policy: "تطبق على أول كمية من الصنف الأساسي",
    details: "",
  };

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return rows;
    }
    return rows.filter((row) =>
      [row.name, row.mainItem, row.freeItem, row.startDate, row.endDate, row.discount, row.details]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [rows, query]);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const name = form.name.trim();
    if (!name) {
      return;
    }
    const nextRow = {
      name,
      mainItem: form.mainItem.trim(),
      freeItem: form.freeItem.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      discount: form.discount.trim(),
      details: form.details.trim(),
    };
    setRows((prev) => {
      if (editingName) {
        return prev.map((row) => (row.name === editingName ? nextRow : row));
      }
      return [nextRow, ...prev];
    });
    setForm(emptyForm);
    setEditingName(null);
    setShowForm(false);
  };

  return (
    <DashboardShell title="العروض الترويجية" subtitle="البداية / العروض الترويجية" hideHeaderFilters>
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <h2 className="text-sm font-semibold text-(--dash-text)">العروض الترويجية</h2>
          <button
            type="button"
            onClick={() => {
              setEditingName(null);
              setForm(emptyForm);
              setShowForm((prev) => !prev);
            }}
            className="rounded-xl border border-(--dash-border) px-3 py-2 text-xs text-(--dash-text)"
          >
            إضافة عرض ترويجي
          </button>
        </div>

        {showForm ? (
          <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-(--dash-text)">{isEditing ? "تعديل عرض ترويجي" : "إضافة عرض ترويجي"}</h3>
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
              <label className="text-sm text-(--dash-muted) md:col-span-2">
                <span className="mb-2 block font-semibold text-(--dash-text)">اسم *</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => handleFormChange("name", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">تاريخ البداية</span>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(event) => handleFormChange("startDate", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">تاريخ النهاية</span>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(event) => handleFormChange("endDate", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted) md:col-span-2">
                <span className="mb-2 block font-semibold text-(--dash-text)">الصنف الأساسي *</span>
                <input
                  type="text"
                  value={form.mainItem}
                  onChange={(event) => handleFormChange("mainItem", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">كمية الصنف الأساسي</span>
                <input
                  type="number"
                  min={1}
                  value={form.mainQty}
                  onChange={(event) => handleFormChange("mainQty", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted) md:col-span-2">
                <span className="mb-2 block font-semibold text-(--dash-text)">الصنف المجاني *</span>
                <input
                  type="text"
                  value={form.freeItem}
                  onChange={(event) => handleFormChange("freeItem", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">كمية الصنف المجاني</span>
                <input
                  type="number"
                  min={1}
                  value={form.freeQty}
                  onChange={(event) => handleFormChange("freeQty", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">خصم</span>
                <input
                  type="text"
                  value={form.discount}
                  onChange={(event) => handleFormChange("discount", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted) md:col-span-2">
                <span className="mb-2 block font-semibold text-(--dash-text)">سياسة العرض</span>
                <select
                  value={form.policy}
                  onChange={(event) => handleFormChange("policy", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                >
                  <option>تطبق على أول كمية من الصنف الأساسي</option>
                  <option>تطبق على كامل الكمية</option>
                </select>
              </label>
              <label className="text-sm text-(--dash-muted) md:col-span-2">
                <span className="mb-2 block font-semibold text-(--dash-text)">التفاصيل</span>
                <textarea
                  rows={3}
                  value={form.details}
                  onChange={(event) => handleFormChange("details", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingName(null);
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
                {isEditing ? "حفظ التعديل" : "إضافة عرض ترويجي"}
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
            <button
              type="button"
              onClick={() => {
                setEditingName(null);
                setForm(emptyForm);
                setShowForm(true);
              }}
              className="rounded-xl border border-(--dash-border) px-3 py-2 text-xs text-(--dash-text)"
            >
              إضافة عرض ترويجي
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-primary) text-white">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">اسم</th>
                  <th className="px-3 py-3 text-right font-semibold">الصنف الأساسي</th>
                  <th className="px-3 py-3 text-right font-semibold">الصنف المجاني</th>
                  <th className="px-3 py-3 text-right font-semibold">تاريخ البداية</th>
                  <th className="px-3 py-3 text-right font-semibold">تاريخ النهاية</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 ? (
                  <tr>
                    <td className="px-3 py-6 text-center text-(--dash-muted)" colSpan={6}>
                      لا توجد بيانات في الجدول
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row) => (
                    <tr key={`${row.name}-${row.startDate}`} className="border-t border-(--dash-border) text-(--dash-text)">
                      <td className="px-3 py-3">{row.name}</td>
                      <td className="px-3 py-3">{row.mainItem}</td>
                      <td className="px-3 py-3">{row.freeItem}</td>
                      <td className="px-3 py-3">{row.startDate}</td>
                      <td className="px-3 py-3">{row.endDate}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingName(row.name);
                              setForm({
                                name: row.name,
                                startDate: row.startDate,
                                endDate: row.endDate,
                                mainItem: row.mainItem,
                                mainQty: "1",
                                freeItem: row.freeItem,
                                freeQty: "1",
                                discount: row.discount,
                                policy: "تطبق على أول كمية من الصنف الأساسي",
                                details: row.details,
                              });
                              setShowForm(true);
                            }}
                            className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-text)"
                          >
                            تعديل
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setRows((prev) => prev.filter((item) => item.name !== row.name));
                              if (editingName === row.name) {
                                setEditingName(null);
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
                  ))
                )}
              </tbody>
              <tfoot className="border-t border-(--dash-border) text-(--dash-muted)">
                <tr>
                  <td className="px-3 py-3">[اسم]</td>
                  <td className="px-3 py-3">[الصنف الأساسي]</td>
                  <td className="px-3 py-3">[الصنف المجاني]</td>
                  <td className="px-3 py-3">[تاريخ البداية]</td>
                  <td className="px-3 py-3">[تاريخ النهاية]</td>
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
            <span>عرض 0 إلى 0 من 0 سجلات</span>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
