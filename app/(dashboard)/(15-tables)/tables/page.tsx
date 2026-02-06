"use client";

import { useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

type TableRow = {
  code: string;
  name: string;
  branch: string;
};

const initialRows: TableRow[] = [
  { code: "0010", name: "طاولة 1", branch: "نشاط المطاعم" },
  { code: "0011", name: "طاولة 2", branch: "نشاط المطاعم" },
  { code: "0100", name: "طاولة كبار", branch: "مغسلة سيارات" },
];

const defaultBranch = "نشاط المطاعم";

const Page = () => {
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<TableRow[]>(initialRows);
  const [showForm, setShowForm] = useState(false);
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<TableRow | null>(null);
  const [form, setForm] = useState({ code: "", name: "", branch: defaultBranch });

  const isEditing = editingCode !== null;
  const emptyForm = { code: "", name: "", branch: defaultBranch };

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return rows;
    }
    return rows.filter((row) => [row.code, row.name, row.branch].join(" ").toLowerCase().includes(needle));
  }, [query, rows]);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveTable = () => {
    const code = form.code.trim();
    const name = form.name.trim();
    if (!code || !name) {
      return;
    }
    const nextRow = { code, name, branch: form.branch };
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

  const handleConfirmDelete = () => {
    if (!pendingDelete) {
      return;
    }
    const rowCode = pendingDelete.code;
    setRows((prev) => prev.filter((item) => item.code !== rowCode));
    if (editingCode === rowCode) {
      setEditingCode(null);
      setForm(emptyForm);
      setShowForm(false);
    }
    setPendingDelete(null);
  };

  const handleCancelDelete = () => {
    setPendingDelete(null);
  };

  return (
    <DashboardShell title="الطاولات" subtitle="البداية / إعدادات النظام / الطاولات" hideHeaderFilters>
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <h2 className="text-sm font-semibold text-(--dash-text)">الطاولات</h2>
          <button
            type="button"
            onClick={() => {
              setEditingCode(null);
              setForm(emptyForm);
              setShowForm((prev) => !prev);
            }}
            className="rounded-xl border border-(--dash-border) px-3 py-2 text-xs text-(--dash-text)"
          >
            إضافة طاولة
          </button>
        </div>

        {showForm ? (
          <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-(--dash-text)">{isEditing ? "تعديل طاولة" : "إضافة طاولة"}</h3>
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
              <label className="text-sm text-(--dash-muted) md:col-span-2">
                <span className="mb-2 block font-semibold text-(--dash-text)">الفرع</span>
                <select
                  value={form.branch}
                  onChange={(event) => handleFormChange("branch", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                >
                  <option>نشاط المطاعم</option>
                  <option>نشاط الصالون</option>
                  <option>نشاط الكوفي / الديوانية</option>
                  <option>مغسلة ملابس</option>
                  <option>مغسلة سيارات</option>
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
                onClick={handleSaveTable}
                className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white"
              >
                {isEditing ? "حفظ التعديل" : "إضافة طاولة"}
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
          <div className="overflow-x-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-primary) text-white">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">الاسم</th>
                  <th className="px-3 py-3 text-right font-semibold">الكود</th>
                  <th className="px-3 py-3 text-right font-semibold">الفرع</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.code} className="border-t border-(--dash-border) text-(--dash-text)">
                    <td className="px-3 py-3">{row.name}</td>
                    <td className="px-3 py-3 font-semibold">{row.code}</td>
                    <td className="px-3 py-3">{row.branch}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center justify-start gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCode(row.code);
                            setForm({ code: row.code, name: row.name, branch: row.branch });
                            setShowForm(true);
                          }}
                          className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-text)"
                        >
                          تعديل
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingDelete(row)}
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
                  <td className="px-3 py-3">[الاسم]</td>
                  <td className="px-3 py-3">[الكود]</td>
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

      {pendingDelete && (
        <div className="dash-modal">
          <div className="dash-modal-body max-w-md p-6">
            <div className="flex items-center justify-between border-b border-(--dash-border) pb-3">
              <h3 className="text-sm font-semibold text-(--dash-text)">تأكيد الحذف</h3>
              <button
                type="button"
                onClick={handleCancelDelete}
                className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-muted)"
              >
                إغلاق
              </button>
            </div>
            <p className="mt-4 text-sm text-(--dash-text)">هل تريد حذف الطاولة {pendingDelete.name}؟</p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="rounded-lg border border-(--dash-border) px-4 py-2 text-xs text-(--dash-muted)"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white"
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
};

export default Page;
