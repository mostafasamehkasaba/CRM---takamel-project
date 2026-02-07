"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import { createBankTransfer } from "@/app/services/bankTransfers";
import { listBanks } from "@/app/services/banks";
import { extractList } from "@/app/services/http";

type BankOption = {
  id: string | number;
  name: string;
  code?: string;
};

const Page = () => {
  const router = useRouter();
  const [banks, setBanks] = useState<BankOption[]>([]);
  const [form, setForm] = useState({
    senderId: "",
    amount: "",
    exchangeRate: "1",
    note: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const normalizeBankList = (payload: any) => {
    const list = extractList<any>(payload);
    if (list.length) {
      return list;
    }
    const nested = payload?.data;
    if (Array.isArray(nested?.data)) {
      return nested.data;
    }
    if (Array.isArray(nested?.items)) {
      return nested.items;
    }
    if (Array.isArray(nested?.result)) {
      return nested.result;
    }
    if (Array.isArray(payload?.banks)) {
      return payload.banks;
    }
    return [];
  };

  const loadBanks = async () => {
    try {
      let response = await listBanks({ pagination: "on", limit_per_page: 1000 });
      let list = normalizeBankList(response);
      if (list.length === 0) {
        response = await listBanks();
        list = normalizeBankList(response);
      }
      setBanks(
        list.map((entry: any, index: number) => ({
          id: entry.id ?? entry.uuid ?? entry.code ?? entry._id ?? `${index + 1}`,
          name: entry.bank_name ?? entry.name ?? "بنك",
          code: entry.code ?? entry.bank_code ?? undefined,
        }))
      );
    } catch (error) {
      console.error(error);
      setErrorMessage("تعذر تحميل البنوك.");
    }
  };

  useEffect(() => {
    loadBanks();
    const handleFocus = () => {
      loadBanks();
    };
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const senderId = form.senderId;
    if (!senderId || !form.amount.trim()) {
      setErrorMessage("يرجى اختيار البنك وإدخال المبلغ.");
      return;
    }
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      await createBankTransfer({
        sender_id: senderId,
        amount: form.amount,
        exchange_rate: form.exchangeRate || "1",
        note: form.note.trim() || undefined,
      });
      setSuccessMessage("تم إضافة التحويل البنكي الخارجي بنجاح.");
      setForm({ senderId: "", amount: "", exchangeRate: "1", note: "" });
    } catch (error) {
      console.error(error);
      setErrorMessage("تعذر إضافة التحويل البنكي الخارجي.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardShell
      title="إضافة تحويل بنكي خارجي"
      subtitle="البداية / تحويلات بنكية خارجية / إضافة تحويل بنكي خارجي"
      hideHeaderFilters
    >
      {errorMessage ? (
        <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-700">
          {errorMessage}
        </div>
      ) : null}
      {successMessage ? (
        <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs text-emerald-700">
          {successMessage}
        </div>
      ) : null}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-(--dash-text)">إضافة تحويل بنكي خارجي</h2>
          <button type="button" onClick={() => router.push("/banks/external-transfers")} className="text-xs text-(--dash-muted)">
            رجوع
          </button>
        </div>
        <p className="text-xs text-(--dash-muted)">
          يرجى إدخال المعلومات التالية. الحقول التي تحمل علامة * إجبارية.
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">كود البنك *</span>
            <select
              value={form.senderId}
              onChange={(event) => {
                const nextId = event.target.value;
                setForm((prev) => ({ ...prev, senderId: nextId }));
              }}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            >
              <option value="">اختر البنك</option>
              {banks.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.code ? `${bank.code} - ${bank.name}` : bank.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">اسم البنك *</span>
            <select
              value={form.senderId}
              onChange={(event) => setForm((prev) => ({ ...prev, senderId: event.target.value }))}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            >
              <option value="">اختر البنك</option>
              {banks.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">المبلغ *</span>
            <input
              type="number"
              value={form.amount}
              onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              placeholder="0.00"
            />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">سعر الصرف</span>
            <input
              type="number"
              value={form.exchangeRate}
              onChange={(event) => setForm((prev) => ({ ...prev, exchangeRate: event.target.value }))}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              placeholder="1.00"
            />
          </label>
          <label className="text-sm lg:col-span-2">
            <span className="mb-2 block font-semibold text-(--dash-text)">ملاحظات</span>
            <textarea
              value={form.note}
              onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
              className="min-h-[120px] w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            />
          </label>
        </div>
        <div className="flex justify-start">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
          >
            {isSaving ? "جارٍ الحفظ..." : "إضافة تحويل بنكي خارجي"}
          </button>
        </div>
      </form>
    </DashboardShell>
  );
};

export default Page;
