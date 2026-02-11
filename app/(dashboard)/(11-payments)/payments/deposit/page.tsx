"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import ConfirmModal from "@/app/(dashboard)/components/ConfirmModal";

type DepositVoucher = {
  id: string;
  bank: string;
  amount: number;
  date: string;
  status: "قيد المراجعة" | "قيد المراجعه" | "معتمد" | "غير معتمد";
};

const initialDeposits: DepositVoucher[] = [
  {
    id: "DP-210",
    bank: "بنك الرياض",
    amount: 20000,
    date: "هذا الأسبوع",
    status: "معتمد",
  },
  {
    id: "DP-211",
    bank: "البنك الأهلي",
    amount: 7500,
    date: "هذا الأسبوع",
    status: "قيد المراجعة",
  },
];

const statusStyles: Record<DepositVoucher["status"], string> = {
  "قيد المراجعة": "bg-amber-100 text-amber-700",
  "قيد المراجعه": "bg-amber-100 text-amber-700",
  معتمد: "bg-emerald-100 text-emerald-700",
  "غير معتمد": "bg-rose-100 text-rose-700",
};

const formatCurrency = (value: number) => `${value.toLocaleString()} ر.س`;

const normalizeDeposit = (entry: any): DepositVoucher => ({
  id: String(entry?.id ?? ""),
  bank: entry?.bank ?? "",
  amount: Number(entry?.amount ?? 0),
  date: entry?.date ?? "",
  status: entry?.status ?? "قيد المراجعة",
});

const page = () => {
  const [query, setQuery] = useState("");
  const [deposits, setDeposits] = useState<DepositVoucher[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("deposit_vouchers");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            return parsed.map(normalizeDeposit);
          }
        } catch {}
      }
    }
    return initialDeposits;
  });
  const [pendingDelete, setPendingDelete] = useState<DepositVoucher | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    id: "",
    bank: "",
    amount: "",
    date: "",
    status: "قيد المراجعة" as DepositVoucher["status"],
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("deposit_vouchers");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setDeposits(parsed.map(normalizeDeposit));
        }
      } catch {}
    }
  }, []);

  const persistDeposits = (next: DepositVoucher[]) => {
    localStorage.setItem("deposit_vouchers", JSON.stringify(next));
  };

  const openEdit = (row: DepositVoucher) => {
    setEditingId(row.id);
    setEditForm({
      id: row.id,
      bank: row.bank,
      amount: String(row.amount),
      date: row.date,
      status: row.status,
    });
    setFormError(null);
  };

  const closeEdit = () => {
    setEditingId(null);
    setFormError(null);
  };

  const handleEditChange = (field: keyof typeof editForm, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingId) {
      return;
    }
    if (!editForm.id.trim() || !editForm.bank.trim()) {
      setFormError("يرجى إدخال رقم السند واسم البنك.");
      return;
    }
    const amount = Number(editForm.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError("يرجى إدخال مبلغ صحيح.");
      return;
    }
    const updated: DepositVoucher = {
      id: editForm.id.trim(),
      bank: editForm.bank.trim(),
      amount,
      date: editForm.date,
      status: editForm.status,
    };
    setDeposits((prev) => {
      const next = prev.map((item) => (item.id === editingId ? updated : item));
      persistDeposits(next);
      return next;
    });
    closeEdit();
  };

  const confirmDelete = () => {
    if (!pendingDelete) {
      return;
    }
    const deleteId = pendingDelete.id;
    setDeposits((prev) => {
      const next = prev.filter((item) => item.id !== deleteId);
      persistDeposits(next);
      return next;
    });
    if (editingId === deleteId) {
      closeEdit();
    }
    setPendingDelete(null);
  };

  const filteredDeposits = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return deposits;
    }
    return deposits.filter((item) =>
      [item.id, item.bank, item.amount, item.date, item.status].join(" ").toLowerCase().includes(needle),
    );
  }, [query, deposits]);

  return (
    <DashboardShell title="سندات إيداع نقدية في البنك" subtitle="إيداعات نقدية إلى البنوك.">
      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="mb-6 text-right">
          <h2 className="text-2xl font-semibold">سندات إيداع نقدية في البنك</h2>
          <p className="mt-2 text-sm text-(--dash-muted)">إيداعات نقدية إلى البنوك.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/payments/deposit/new"
            className="flex-1 rounded-2xl bg-(--dash-primary) px-5 py-3 text-center text-sm font-semibold text-white shadow-(--dash-primary-soft)"
          >
            إيداع جديد
          </Link>
          <div className="relative flex-1 min-w-[260px]">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث عن إيداع"
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-3 text-sm text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="min-w-full overflow-hidden rounded-2xl border border-(--dash-border)">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-primary) text-white">
                <tr>
                  <th className="px-4 py-3 text-right font-semibold">رقم السند</th>
                  <th className="px-4 py-3 text-right font-semibold">البنك</th>
                  <th className="px-4 py-3 text-right font-semibold">المبلغ</th>
                  <th className="px-4 py-3 text-right font-semibold">التاريخ</th>
                  <th className="px-4 py-3 text-right font-semibold">الحالة</th>
                  <th className="px-4 py-3 text-center font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeposits.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-(--dash-border) text-(--dash-text) odd:bg-(--dash-panel) even:bg-(--dash-panel-soft)"
                  >
                    <td className="px-4 py-3 font-semibold">{row.id}</td>
                    <td className="px-4 py-3">{row.bank}</td>
                    <td className="px-4 py-3">{formatCurrency(row.amount)}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(row)}
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
                {filteredDeposits.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-sm text-(--dash-muted)">
                      لا توجد نتائج مطابقة.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <ConfirmModal
        open={Boolean(pendingDelete)}
        message="هل أنت متأكد من حذف سند الإيداع؟"
        confirmLabel="حذف"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
      {editingId ? (
        <div className="dash-modal">
          <div className="dash-modal-body max-w-xl p-6">
            <div className="flex items-center justify-between border-b border-(--dash-border) pb-3">
              <h3 className="text-sm font-semibold text-(--dash-text)">تعديل سند الإيداع</h3>
              <button
                type="button"
                onClick={closeEdit}
                className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-muted)"
              >
                إغلاق
              </button>
            </div>
            {formError ? (
              <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                {formError}
              </div>
            ) : null}
            <form onSubmit={handleEditSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="dash-label">
                رقم السند
                <input
                  value={editForm.id}
                  onChange={(event) => handleEditChange("id", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                البنك
                <input
                  value={editForm.bank}
                  onChange={(event) => handleEditChange("bank", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                المبلغ
                <input
                  type="number"
                  min={0}
                  value={editForm.amount}
                  onChange={(event) => handleEditChange("amount", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                التاريخ
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(event) => handleEditChange("date", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label sm:col-span-2">
                الحالة
                <select
                  value={editForm.status}
                  onChange={(event) => handleEditChange("status", event.target.value)}
                  className="dash-input mt-2"
                >
                  <option value="قيد المراجعة">قيد المراجعة</option>
                  <option value="قيد المراجعه">قيد المراجعه</option>
                  <option value="معتمد">معتمد</option>
                  <option value="غير معتمد">غير معتمد</option>
                </select>
              </label>
              <div className="sm:col-span-2 mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeEdit}
                  className="rounded-lg border border-(--dash-border) px-4 py-2 text-xs text-(--dash-muted)"
                >
                  إلغاء
                </button>
                <button type="submit" className="rounded-lg bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
                  حفظ التعديل
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
};

export default page;
