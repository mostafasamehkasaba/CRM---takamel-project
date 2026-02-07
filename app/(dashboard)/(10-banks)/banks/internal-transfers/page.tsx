"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import ConfirmModal from "@/app/(dashboard)/components/ConfirmModal";
import { createBankTransfer, deleteBankTransfer, listBankTransfers } from "@/app/services/bankTransfers";
import { listBanks } from "@/app/services/banks";
import { extractList } from "@/app/services/http";

type InternalTransferRow = {
  id: string | number;
  date: string;
  senderName: string;
  receiverName: string;
  amount: string;
  notes: string;
};

type BankOption = {
  id: string | number;
  name: string;
  code?: string;
};

const Page = () => {
  const [rows, setRows] = useState<InternalTransferRow[]>([]);
  const [banks, setBanks] = useState<BankOption[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    senderId: "",
    receiverId: "",
    amount: "",
    exchangeRate: "1",
    note: "",
  });

  const filteredRows = useMemo(() => rows, [rows]);

  const mapTransferRow = (entry: any, index: number): InternalTransferRow => {
    const id = entry.id ?? entry.uuid ?? entry.code ?? entry._id ?? `${index + 1}`;
    const date =
      entry.date ??
      entry.transfer_date ??
      entry.created_at?.split("T")[0] ??
      new Date().toISOString().split("T")[0];
    const senderName =
      entry.sender?.name ?? entry.sender_name ?? entry.sender?.bank_name ?? entry.sender_id ?? "غير محدد";
    const receiverName =
      entry.receiver?.name ?? entry.receiver_name ?? entry.receiver?.bank_name ?? entry.receiver_id ?? "-";
    const amount = entry.amount ?? entry.paid ?? entry.total ?? "0.00";
    const notes = entry.note ?? entry.notes ?? "-";
    return {
      id,
      date: String(date),
      senderName: String(senderName),
      receiverName: String(receiverName),
      amount: String(amount),
      notes: String(notes),
    };
  };

  const isInternalTransfer = (entry: any) => {
    const receiverId =
      entry.receiver_id ??
      entry.receiverId ??
      entry.receiver?.id ??
      entry.receiver?.uuid ??
      entry.receiver;
    return Boolean(receiverId);
  };

  const loadTransfers = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await listBankTransfers({ pagination: "on", limit_per_page: 200 });
      const list = extractList<any>(response);
      const internalOnly = list.filter(isInternalTransfer);
      setRows(internalOnly.map(mapTransferRow));
    } catch (error) {
      console.error(error);
      setErrorMessage("تعذر تحميل التحويلات البنكية.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadBanks = async () => {
    try {
      const response = await listBanks({ pagination: "on", limit_per_page: 200 });
      const list = extractList<any>(response);
      setBanks(
        list.map((entry: any, index: number) => ({
          id: entry.id ?? entry.uuid ?? entry.code ?? entry._id ?? `${index + 1}`,
          name: entry.bank_name ?? entry.name ?? "بنك",
          code: entry.code ?? entry.bank_code ?? undefined,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBanks();
    loadTransfers();
  }, []);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.senderId || !form.receiverId || !form.amount.trim()) {
      return;
    }
    setIsSaving(true);
    setErrorMessage(null);
    try {
      if (editingId) {
        await deleteBankTransfer(editingId);
      }
      await createBankTransfer({
        sender_id: form.senderId,
        receiver_id: form.receiverId,
        amount: form.amount,
        exchange_rate: form.exchangeRate || "1",
        note: form.note.trim() || undefined,
      });
      await loadTransfers();
      setEditingId(null);
      setForm({ senderId: "", receiverId: "", amount: "", exchangeRate: "1", note: "" });
      setShowForm(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("تعذر حفظ التحويل البنكي.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditRow = (row: InternalTransferRow) => {
    const sender = banks.find((bank) => bank.name === row.senderName || bank.code === row.senderName);
    const receiver = banks.find((bank) => bank.name === row.receiverName || bank.code === row.receiverName);
    setForm({
      senderId: sender ? String(sender.id) : "",
      receiverId: receiver ? String(receiver.id) : "",
      amount: row.amount,
      exchangeRate: "1",
      note: row.notes,
    });
    setEditingId(row.id);
    setShowForm(true);
  };

  const handleDeleteRow = (rowId: string) => {
    setPendingDeleteId(rowId);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) {
      return;
    }
    setIsSaving(true);
    try {
      await deleteBankTransfer(pendingDeleteId);
      await loadTransfers();
    } catch (error) {
      console.error(error);
      setErrorMessage("تعذر حذف التحويل البنكي.");
    } finally {
      setIsSaving(false);
      setPendingDeleteId(null);
    }
  };

  const cancelEdit = () => {
    setForm({ senderId: "", receiverId: "", amount: "", exchangeRate: "1", note: "" });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <DashboardShell title="تحويلات بنكية داخلية" subtitle="البداية / تحويلات بنكية داخلية" hideHeaderFilters>
      <section className="space-y-4">
        {errorMessage ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700">
            {errorMessage}
          </div>
        ) : null}
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
                <span className="mb-2 block font-semibold text-(--dash-text)">Sender bank *</span>
                <select
                  value={form.senderId}
                  onChange={(event) => handleFormChange("senderId", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                >
                  <option value="">Select sender</option>
                  {banks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">Receiver bank *</span>
                <select
                  value={form.receiverId}
                  onChange={(event) => handleFormChange("receiverId", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                >
                  <option value="">Select receiver</option>
                  {banks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">Amount *</span>
                <input
                  value={form.amount}
                  onChange={(event) => handleFormChange("amount", event.target.value)}
                  type="number"
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  placeholder="0.00"
                />
              </label>
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">Exchange rate</span>
                <input
                  value={form.exchangeRate}
                  onChange={(event) => handleFormChange("exchangeRate", event.target.value)}
                  type="number"
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  placeholder="1.00"
                />
              </label>
              <label className="text-sm lg:col-span-3">
                <span className="mb-2 block font-semibold text-(--dash-text)">Notes</span>
                <textarea
                  value={form.note}
                  onChange={(event) => handleFormChange("note", event.target.value)}
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
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
              >
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
                  <th className="px-3 py-3 text-right font-semibold">Date</th>
                  <th className="px-3 py-3 text-right font-semibold">Sender bank</th>
                  <th className="px-3 py-3 text-right font-semibold">Receiver bank</th>
                  <th className="px-3 py-3 text-right font-semibold">Amount</th>
                  <th className="px-3 py-3 text-right font-semibold">Notes</th>
                  <th className="px-3 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr className="border-t border-(--dash-border) text-(--dash-muted)">
                    <td className="px-3 py-3" colSpan={6}>
                      Loading transfers...
                    </td>
                  </tr>
                ) : filteredRows.length === 0 ? (
                  <tr className="border-t border-(--dash-border) text-(--dash-muted)">
                    <td className="px-3 py-3" colSpan={6}>
                      No transfers found.
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row) => (
                    <tr key={row.id} className="border-t border-(--dash-border) text-(--dash-text)">
                      <td className="px-3 py-3">{row.date}</td>
                      <td className="px-3 py-3">{row.senderName}</td>
                      <td className="px-3 py-3">{row.receiverName}</td>
                      <td className="px-3 py-3">{row.amount}</td>
                      <td className="px-3 py-3">{row.notes || "-"}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => handleEditRow(row)}
                            className="rounded-lg border border-(--dash-border) px-3 py-1 text-xs text-(--dash-text)"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteRow(String(row.id))}
                            className="rounded-lg border border-(--dash-border) px-3 py-1 text-xs text-rose-500"
                          >
                            Delete
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
      <ConfirmModal
        open={Boolean(pendingDeleteId)}
        message="هل أنت متأكد من حذف التحويل؟"
        confirmLabel="حذف"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </DashboardShell>
  );
};

export default Page;

