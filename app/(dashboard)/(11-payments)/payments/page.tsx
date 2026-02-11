"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import Link from "next/link";
import ConfirmModal from "@/app/(dashboard)/components/ConfirmModal";

type Payment = {
  id: string;
  invoice: string;
  client: string;
  amount: number;
  method: string;
  wallet: string;
  status: "مكتملة" | "قيد المعالجة";
  date: string;
  reference: string;
};

const statusStyles: Record<Payment["status"], string> = {
  مكتملة: "bg-emerald-100 text-emerald-700",
  "قيد المعالجة": "bg-amber-100 text-amber-700",
};

const statusLabels: Record<Payment["status"], string> = {
  مكتملة: "معتمد",
  "قيد المعالجة": "قيد المراجعة",
};

const formatCurrency = (value: number) =>
  `${value.toLocaleString()} ريال`;

const normalizePayment = (entry: any): Payment => {
  const rawStatus = entry?.status;
  const status: Payment["status"] =
    rawStatus === "مكتملة" || rawStatus === "قيد المعالجة"
      ? rawStatus
      : rawStatus === "معتمد"
      ? "مكتملة"
      : "قيد المعالجة";

  return {
    id: String(entry?.id ?? ""),
    invoice: entry?.invoice ?? "",
    client: entry?.client ?? entry?.customer ?? "",
    amount: Number(entry?.amount ?? 0),
    method: entry?.method ?? "نقدي",
    wallet: entry?.wallet ?? entry?.account ?? "",
    status,
    date: entry?.date ?? "",
    reference: entry?.reference ?? "",
  };
};

const Page = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Payment | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    id: "",
    client: "",
    amount: "",
    date: "",
    status: "مكتملة" as Payment["status"],
    method: "",
    wallet: "",
    reference: "",
    invoice: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const loadPayments = () => {
      const stored = window.localStorage.getItem("payments-data");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setPayments(parsed.map(normalizePayment));
            return;
          }
        } catch {}
      }
      setPayments([]);
    };

    loadPayments();

    window.addEventListener("focus", loadPayments);

    return () => window.removeEventListener("focus", loadPayments);
  }, []);

  const persistPayments = (next: Payment[]) => {
    window.localStorage.setItem("payments-data", JSON.stringify(next));
  };

  const openEdit = (row: Payment) => {
    setEditingId(row.id);
    setEditForm({
      id: row.id,
      client: row.client,
      amount: String(row.amount),
      date: row.date,
      status: row.status,
      method: row.method,
      wallet: row.wallet,
      reference: row.reference,
      invoice: row.invoice,
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
    if (!editForm.id.trim() || !editForm.client.trim()) {
      setFormError("يرجى إدخال رقم السند واسم العميل.");
      return;
    }
    const amount = Number(editForm.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError("يرجى إدخال مبلغ صحيح.");
      return;
    }
    const updated: Payment = {
      id: editForm.id.trim(),
      client: editForm.client.trim(),
      amount,
      date: editForm.date,
      status: editForm.status,
      method: editForm.method.trim() || "نقدي",
      wallet: editForm.wallet.trim(),
      reference: editForm.reference.trim(),
      invoice: editForm.invoice.trim(),
    };

    setPayments((prev) => {
      const next = prev.map((item) => (item.id === editingId ? updated : item));
      persistPayments(next);
      return next;
    });
    closeEdit();
  };

  const confirmDelete = () => {
    if (!pendingDelete) {
      return;
    }
    const deleteId = pendingDelete.id;
    setPayments((prev) => {
      const next = prev.filter((item) => item.id !== deleteId);
      persistPayments(next);
      return next;
    });
    if (editingId === deleteId) {
      closeEdit();
    }
    setPendingDelete(null);
  };


  const filteredPayments = useMemo(() => {
    const needle = query.toLowerCase();

    return payments.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(needle)
    );
  }, [payments, query]);

  return (
    <DashboardShell
      title="سندات قبض نقدية"
      subtitle="عرض سندات القبض مع الحالة"
    >
      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-(--dash-primary) px-5 py-4 text-white">
          <div className="absolute inset-y-0 left-0 w-28 bg-(--dash-primary-soft)" />
          <div className="relative flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold">سندات قبض نقدية</h3>
            <span className="text-xs text-white/80">
              عرض سندات القبض مع الحالة.
            </span>
          </div>
        </div>

        {/* actions */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          
          <Link href="/payments/new">
            <button
              type="button"
              className="flex items-center gap-2 rounded-2xl bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
            >
              <span className="text-lg">+</span>
              سند قبض جديد
            </button>
          </Link>

          <div className="relative flex-1 min-w-[220px]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="بحث عن سند قبض..."
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) py-2 pr-4 pl-4 text-sm text-(--dash-text) focus:outline-none"
            />
          </div>
        </div>

        {/* table */}
        <div className="mt-4 overflow-x-auto">
          <div className="min-w-full overflow-hidden rounded-2xl border border-(--dash-border)">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-primary) text-white">
                <tr>
                  <th className="px-4 py-3 text-right font-semibold">رقم السند</th>
                  <th className="px-4 py-3 text-right font-semibold">العميل</th>
                  <th className="px-4 py-3 text-right font-semibold">المبلغ</th>
                  <th className="px-4 py-3 text-right font-semibold">التاريخ</th>
                  <th className="px-4 py-3 text-right font-semibold">الحالة</th>
                  <th className="px-4 py-3 text-center font-semibold">الإجراءات</th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-(--dash-border) text-(--dash-text) odd:bg-(--dash-panel) even:bg-(--dash-panel-soft)"
                  >
                    <td className="px-4 py-3 font-semibold">{row.id}</td>
                    <td className="px-4 py-3">{row.client}</td>
                    <td className="px-4 py-3">{formatCurrency(row.amount)}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[row.status]}`}
                      >
                        {statusLabels[row.status]}
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
                {filteredPayments.length === 0 ? (
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
        message="هل أنت متأكد من حذف سند القبض؟"
        confirmLabel="حذف"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
      {editingId ? (
        <div className="dash-modal">
          <div className="dash-modal-body max-w-xl p-6">
            <div className="flex items-center justify-between border-b border-(--dash-border) pb-3">
              <h3 className="text-sm font-semibold text-(--dash-text)">تعديل سند القبض</h3>
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
                العميل
                <input
                  value={editForm.client}
                  onChange={(event) => handleEditChange("client", event.target.value)}
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
              <label className="dash-label">
                طريقة الدفع
                <input
                  value={editForm.method}
                  onChange={(event) => handleEditChange("method", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                الحساب
                <input
                  value={editForm.wallet}
                  onChange={(event) => handleEditChange("wallet", event.target.value)}
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
                  <option value="مكتملة">معتمد</option>
                  <option value="قيد المعالجة">قيد المراجعة</option>
                </select>
              </label>
              <label className="dash-label">
                الرقم المرجعي
                <input
                  value={editForm.reference}
                  onChange={(event) => handleEditChange("reference", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                رقم الفاتورة
                <input
                  value={editForm.invoice}
                  onChange={(event) => handleEditChange("invoice", event.target.value)}
                  className="dash-input mt-2"
                />
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

export default Page;
