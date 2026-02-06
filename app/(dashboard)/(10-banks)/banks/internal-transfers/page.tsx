"use client";

import { FormEvent, useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

type InternalTransferRow = {
  id: string;
  date: string;
  bankCode: string;
  bankName: string;
  paid: string;
  notes: string;
};

const Page = () => {
  const [rows, setRows] = useState<InternalTransferRow[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    bankCode: "",
    bankName: "",
    paid: "",
    notes: "",
  });

  const filteredRows = useMemo(() => rows, [rows]);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.bankCode.trim() || !form.bankName.trim() || !form.paid.trim()) {
      return;
    }
    if (editingId) {
      setRows((prev) =>
        prev.map((row) =>
          row.id === editingId
            ? {
                ...row,
                bankCode: form.bankCode.trim(),
                bankName: form.bankName.trim(),
                paid: `${parseFloat(form.paid).toFixed(2)}`,
                notes: form.notes.trim(),
              }
            : row
        )
      );
      setEditingId(null);
    } else {
      const next: InternalTransferRow = {
        id: `INT-${String(rows.length + 1).padStart(3, "0")}`,
        date: new Date().toISOString().split("T")[0],
        bankCode: form.bankCode.trim(),
        bankName: form.bankName.trim(),
        paid: `${parseFloat(form.paid).toFixed(2)}`,
        notes: form.notes.trim(),
      };
      setRows((prev) => [next, ...prev]);
    }
    setForm({ bankCode: "", bankName: "", paid: "", notes: "" });
    setShowForm(false);
  };

  const handleEditRow = (row: InternalTransferRow) => {
    setForm({
      bankCode: row.bankCode,
      bankName: row.bankName,
      paid: row.paid,
      notes: row.notes,
    });
    setEditingId(row.id);
    setShowForm(true);
  };

  const handleDeleteRow = (rowId: string) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف التحويل؟");
    if (!confirmed) {
      return;
    }
    setRows((prev) => prev.filter((row) => row.id !== rowId));
  };

  const cancelEdit = () => {
    setForm({ bankCode: "", bankName: "", paid: "", notes: "" });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <DashboardShell title="تحويلات بنكية داخلية" subtitle="البداية / تحويلات بنكية داخلية" hideHeaderFilters>
      <section className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="text-sm font-semibold text-(--dash-text)">تحويلات بنكية داخلية</div>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs text-(--dash-text)"
          >
            إضافة تحويل بنكي داخلي
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-5 shadow-(--dash-shadow)">
            <div className="grid gap-4 lg:grid-cols-3">
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">كود البنك *</span>
                <input
                  value={form.bankCode}
                  onChange={(event) => handleFormChange("bankCode", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">اسم البنك *</span>
                <input
                  value={form.bankName}
                  onChange={(event) => handleFormChange("bankName", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">المدفوع *</span>
                <input
                  value={form.paid}
                  onChange={(event) => handleFormChange("paid", event.target.value)}
                  type="number"
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  placeholder="0.00"
                />
              </label>
              <label className="text-sm lg:col-span-3">
                <span className="mb-2 block font-semibold text-(--dash-text)">ملاحظات</span>
                <textarea
                  value={form.notes}
                  onChange={(event) => handleFormChange("notes", event.target.value)}
                  className="min-h-[120px] w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-xl border border-(--dash-border) px-4 py-2 text-xs text-(--dash-text)"
                >
                  إلغاء التعديل
                </button>
              )}
              <button type="submit" className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
                {editingId ? "حفظ التعديل" : "حفظ التحويل"}
              </button>
            </div>
          </form>
        )}

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <p className="text-sm text-(--dash-muted)">الرجاء استخدام الجدول أدناه للتنقل أو تصفية النتائج.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-primary) text-white">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">التاريخ</th>
                  <th className="px-3 py-3 text-right font-semibold">كود البنك</th>
                  <th className="px-3 py-3 text-right font-semibold">اسم البنك</th>
                  <th className="px-3 py-3 text-right font-semibold">المدفوع</th>
                  <th className="px-3 py-3 text-right font-semibold">ملاحظات</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 ? (
                  <tr className="border-t border-(--dash-border) text-(--dash-muted)">
                    <td className="px-3 py-3" colSpan={6}>
                      لا توجد بيانات في الجدول
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row) => (
                    <tr key={row.id} className="border-t border-(--dash-border) text-(--dash-text)">
                      <td className="px-3 py-3">{row.date}</td>
                      <td className="px-3 py-3">{row.bankCode}</td>
                      <td className="px-3 py-3">{row.bankName}</td>
                      <td className="px-3 py-3">{row.paid}</td>
                      <td className="px-3 py-3">{row.notes || "-"}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => handleEditRow(row)}
                            className="rounded-lg border border-(--dash-border) px-3 py-1 text-xs text-(--dash-text)"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDeleteRow(row.id)}
                            className="rounded-lg border border-(--dash-border) px-3 py-1 text-xs text-rose-500"
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
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
