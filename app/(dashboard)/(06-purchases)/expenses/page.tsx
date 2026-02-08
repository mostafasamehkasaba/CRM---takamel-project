"use client";

import { useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import ActionIconButton from "@/app/(dashboard)/components/ActionIconButton";
import { EditIcon, TrashIcon, ViewIcon } from "@/app/(dashboard)/components/icons/ActionIcons";
import ConfirmModal from "@/app/(dashboard)/components/ConfirmModal";

type ExpenseStatus = "تم الدفع" | "معلقة";

type ExpenseRow = {
  id: number;
  date: string;
  time: string;
  reference: string;
  supplier: string;
  total: number;
  paid: number;
  balance: number;
  status: ExpenseStatus;
};

const initialRows: ExpenseRow[] = [
  {
    id: 101,
    date: "05/02/2026",
    time: "12:00:00",
    reference: "EXP-101",
    supplier: "مورد أ",
    total: 1000,
    paid: 500,
    balance: 500,
    status: "معلقة",
  },
  {
    id: 102,
    date: "06/02/2026",
    time: "09:30:00",
    reference: "EXP-102",
    supplier: "مورد ب",
    total: 750,
    paid: 750,
    balance: 0,
    status: "تم الدفع",
  },
];

const statusStyles: Record<ExpenseStatus, string> = {
  "تم الدفع": "bg-(--dash-success) text-white",
  "معلقة": "bg-(--dash-warning) text-white",
};

const formatNumber = (value: number) =>
  value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const Page = () => {
  const [query, setQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [expenseRows, setExpenseRows] = useState<ExpenseRow[]>(initialRows);
  const [viewRow, setViewRow] = useState<ExpenseRow | null>(null);
  const [editingRow, setEditingRow] = useState<ExpenseRow | null>(null);
  const [editForm, setEditForm] = useState({
    reference: "",
    supplier: "",
    total: "",
    paid: "",
    balance: "",
    status: "معلقة" as ExpenseStatus,
  });
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  // فلترة البحث
  const filteredRows = expenseRows.filter((row) => {
    if (!query.trim()) return true;
    const needle = query.trim().toLowerCase();
    return [row.reference, row.supplier, row.status].join(" ").toLowerCase().includes(needle);
  });

  const allSelected = filteredRows.length > 0 && filteredRows.every((row) => selectedRows.includes(row.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedRows((prev) => prev.filter((id) => !filteredRows.some((row) => row.id === id)));
      return;
    }
    setSelectedRows((prev) => {
      const next = new Set(prev);
      filteredRows.forEach((row) => next.add(row.id));
      return Array.from(next);
    });
  };

  const toggleRow = (rowId: number) => {
    setSelectedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]));
  };

  const openViewModal = (row: ExpenseRow) => {
    setViewRow(row);
  };

  const openEditModal = (row: ExpenseRow) => {
    setEditingRow(row);
    setEditForm({
      reference: row.reference,
      supplier: row.supplier,
      total: String(row.total),
      paid: String(row.paid),
      balance: String(row.balance),
      status: row.status,
    });
  };

  const closeEditModal = () => {
    setEditingRow(null);
  };

  const handleEditChange = <K extends keyof typeof editForm>(field: K, value: (typeof editForm)[K]) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const confirmDelete = () => {
    if (pendingDeleteId === null) return;
    setExpenseRows((prev) => prev.filter((row) => row.id !== pendingDeleteId));
    setSelectedRows((prev) => prev.filter((id) => id !== pendingDeleteId));
    if (viewRow?.id === pendingDeleteId) setViewRow(null);
    if (editingRow?.id === pendingDeleteId) setEditingRow(null);
    setPendingDeleteId(null);
  };

  const handleEditSave = () => {
    if (!editingRow) return;
    const total = Number(editForm.total);
    const paid = Number(editForm.paid);
    const balance = Number(editForm.balance);
    setExpenseRows((prev) =>
      prev.map((row) =>
        row.id === editingRow.id
          ? {
              ...row,
              reference: editForm.reference.trim(),
              supplier: editForm.supplier.trim(),
              total: Number.isFinite(total) ? total : row.total,
              paid: Number.isFinite(paid) ? paid : row.paid,
              balance: Number.isFinite(balance) ? balance : row.balance,
              status: editForm.status,
            }
          : row
      )
    );
    setEditingRow(null);
  };

  return (
    <DashboardShell title="المصروفات" subtitle="جميع المصروفات" hideHeaderFilters>
      <section className="space-y-4">
        {/* لوحة البحث والفلاتر */}
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-(--dash-text)">جميع المصروفات</span>
          </div>
          <p className="mt-3 text-sm text-(--dash-muted)">استخدم الجدول للبحث أو تصفية النتائج.</p>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="ms-auto flex min-w-60 items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="بحث"
                className="w-full bg-transparent text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* جدول المصروفات */}
        <div className="overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-primary) text-white">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="h-4 w-4 rounded border border-(--dash-border)"
                    />
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">التاريخ</th>
                  <th className="px-3 py-3 text-right font-semibold">الرقم المرجعي</th>
                  <th className="px-3 py-3 text-right font-semibold">المورد</th>
                  <th className="px-3 py-3 text-right font-semibold">المدفوع</th>
                  <th className="px-3 py-3 text-right font-semibold">الرصيد</th>
                  <th className="px-3 py-3 text-right font-semibold">المجموع الكلي</th>
                  <th className="px-3 py-3 text-right font-semibold">الحالة</th>
                  <th className="px-3 py-3 text-center font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id} className="border-t border-(--dash-border) text-(--dash-text)">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => toggleRow(row.id)}
                        className="h-4 w-4 rounded border border-(--dash-border)"
                      />
                    </td>
                    <td className="px-3 py-3 text-(--dash-muted)">
                      <div className="flex flex-col">
                        <span>{row.date}</span>
                        <span className="text-xs text-(--dash-muted-2)">{row.time}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 font-semibold">{row.reference}</td>
                    <td className="px-3 py-3">{row.supplier}</td>
                    <td className="px-3 py-3 font-semibold">{formatNumber(row.paid)}</td>
                    <td className="px-3 py-3 font-semibold">{formatNumber(row.balance)}</td>
                    <td className="px-3 py-3 font-semibold">{formatNumber(row.total)}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <ActionIconButton label="تعديل" icon={<EditIcon className="h-4 w-4" />} onClick={() => openEditModal(row)} />
                        <ActionIconButton label="حذف" icon={<TrashIcon className="h-4 w-4" />} tone="danger" onClick={() => setPendingDeleteId(row.id)} />
                        <ActionIconButton label="عرض" icon={<ViewIcon className="h-4 w-4" />} onClick={() => openViewModal(row)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* View Modal */}
      {viewRow && (
        <div className="dash-modal">
          <div className="dash-modal-body max-w-xl p-6">
            <div className="flex items-center justify-between border-b border-(--dash-border) pb-3">
              <div>
                <h3 className="text-sm font-semibold text-(--dash-text)">عرض المصروف</h3>
                <p className="mt-1 text-xs text-(--dash-muted)">{viewRow.reference}</p>
              </div>
              <button type="button" onClick={() => setViewRow(null)} className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-muted)">
                إغلاق
              </button>
            </div>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="rounded-xl border border-(--dash-border) p-3">
                <p className="text-xs text-(--dash-muted)">المورد</p>
                <p className="mt-1 font-semibold text-(--dash-text)">{viewRow.supplier}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-(--dash-border) p-3">
                  <p className="text-xs text-(--dash-muted)">الإجمالي</p>
                  <p className="mt-1 font-semibold text-(--dash-text)">{formatNumber(viewRow.total)}</p>
                </div>
                <div className="rounded-xl border border-(--dash-border) p-3">
                  <p className="text-xs text-(--dash-muted)">المدفوع</p>
                  <p className="mt-1 font-semibold text-(--dash-text)">{formatNumber(viewRow.paid)}</p>
                </div>
                <div className="rounded-xl border border-(--dash-border) p-3">
                  <p className="text-xs text-(--dash-muted)">الرصيد</p>
                  <p className="mt-1 font-semibold text-(--dash-text)">{formatNumber(viewRow.balance)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingRow && (
        <div className="dash-modal">
          <div className="dash-modal-body max-w-xl p-6">
            <div className="flex items-center justify-between border-b border-(--dash-border) pb-3">
              <div>
                <h3 className="text-sm font-semibold text-(--dash-text)">تعديل المصروف</h3>
                <p className="mt-1 text-xs text-(--dash-muted)">{editingRow.reference}</p>
              </div>
              <button type="button" onClick={closeEditModal} className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-muted)">
                إغلاق
              </button>
            </div>
            <div className="mt-4 grid gap-3">
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">الرقم المرجعي</span>
                <input value={editForm.reference} onChange={(e) => handleEditChange("reference", e.target.value)} className="dash-input" />
              </label>
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">المورد</span>
                <input value={editForm.supplier} onChange={(e) => handleEditChange("supplier", e.target.value)} className="dash-input" />
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">الإجمالي</span>
                  <input type="number" value={editForm.total} onChange={(e) => handleEditChange("total", e.target.value)} className="dash-input" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">المدفوع</span>
                  <input type="number" value={editForm.paid} onChange={(e) => handleEditChange("paid", e.target.value)} className="dash-input" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">الرصيد</span>
                  <input type="number" value={editForm.balance} onChange={(e) => handleEditChange("balance", e.target.value)} className="dash-input" />
                </label>
              </div>
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">الحالة</span>
                <select value={editForm.status} onChange={(e) => handleEditChange("status", e.target.value as ExpenseStatus)} className="dash-input">
                  <option value="تم الدفع">تم الدفع</option>
                  <option value="معلقة">معلقة</option>
                </select>
              </label>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeEditModal} className="rounded-lg border border-(--dash-border) px-4 py-2 text-xs text-(--dash-muted)">
                  إلغاء
                </button>
                <button type="button" onClick={handleEditSave} className="rounded-lg bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={pendingDeleteId !== null}
        message="هل أنت متأكد من حذف المصروف؟"
        confirmLabel="حذف"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </DashboardShell>
  );
};

export default Page;
