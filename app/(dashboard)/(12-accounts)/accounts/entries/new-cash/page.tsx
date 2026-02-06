"use client";

import { useMemo, useRef, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

type AccountRow = {
  id: number;
  account: string;
  notes: string;
  debit: string;
  credit: string;
};

const branchOptions = [
  "مغسلة سيارات",
  "الفرع المركزي",
  "فرع جدة",
  "فرع الرياض",
];

const accountOptions = [
  "الأصناف",
  "النقدية بالصناديق",
  "صندوق رئيسي",
  "البنك الرئيسي",
  "حساب نقاط البيع",
  "المخزون",
];

const formatAmount = (value: number) => value.toFixed(2);

const Page = () => {
  const [selectedBranch, setSelectedBranch] = useState(branchOptions[0]);
  const [entryDate, setEntryDate] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [attachmentsLabel, setAttachmentsLabel] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [rows, setRows] = useState<AccountRow[]>([
    { id: 1, account: "الأصناف", notes: "إجمالي المدين", debit: "0.00", credit: "0.00" },
  ]);

  const totals = useMemo(() => {
    const debit = rows.reduce((sum, row) => sum + Number.parseFloat(row.debit || "0"), 0);
    const credit = rows.reduce((sum, row) => sum + Number.parseFloat(row.credit || "0"), 0);
    return { debit: formatAmount(debit), credit: formatAmount(credit) };
  }, [rows]);

  const handleRowChange = (id: number, field: keyof AccountRow, value: string) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: Date.now(), account: "", notes: "", debit: "0.00", credit: "0.00" },
    ]);
  };

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <DashboardShell title="" hideHeaderFilters>
      <section className="rounded-[32px] border border-(--dash-border) bg-(--dash-panel) px-6 py-8 shadow-(--dash-shadow)">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-(--dash-muted)">
                البداية / إضافة سند قيد يدوي / إضافة سند قيد يدوي
              </p>
              <h1 className="text-2xl font-black text-(--dash-text)">إضافة سند قيد يدوي</h1>
            </div>
            <button className="rounded-full bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)">
              حفظ السند
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-[minmax(220px,1fr)_1fr_1fr]">
            <label className="flex flex-col gap-2 text-sm font-semibold text-(--dash-text)">
              <span>التاريخ *</span>
              <input
                type="date"
                value={entryDate}
                onChange={(event) => setEntryDate(event.target.value)}
                className="dash-input !rounded-full !border-(--dash-border) !bg-(--dash-panel-soft) !py-2 !px-4 !text-sm text-(--dash-text)"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-(--dash-text)">
              <span>الفرع *</span>
              <select
                value={selectedBranch}
                onChange={(event) => setSelectedBranch(event.target.value)}
                className="dash-select !rounded-full !border-(--dash-border) !bg-(--dash-panel-soft) !py-2 !px-4 !text-sm text-(--dash-text)"
              >
                {branchOptions.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-(--dash-text)">
              <span>ملاحظات</span>
              <input
                type="text"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="أضف ملاحظات إضافية"
                className="dash-input !rounded-full !border-(--dash-border) !bg-(--dash-panel-soft) !py-2 !px-4 !text-sm text-(--dash-text) placeholder:text-(--dash-muted-2)"
              />
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-[200px_minmax(200px,1fr)_1fr]">
            <div className="flex flex-col gap-2 text-sm font-semibold text-(--dash-text)">
              <span>المرفقات</span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 rounded-[25px] bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white shadow-(--dash-primary-soft)"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6 12v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-7a2 2 0 1 0-4 0v5H6V9h2v3a2 2 0 1 0 4 0V6a5 5 0 1 1 10 0v8a6 6 0 0 1-12 0V9H6Z"
                  />
                </svg>
                استعراض...
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(event) => {
                  const fileName = event.target.files?.[0]?.name ?? "";
                  setAttachmentsLabel(fileName);
                }}
              />
            </div>
            <label className="flex flex-col gap-2 text-sm font-semibold text-(--dash-text)">
              <span>اسم المرفق</span>
              <input
                type="text"
                value={attachmentsLabel}
                onChange={(event) => setAttachmentsLabel(event.target.value)}
                placeholder="أضف اسم المرفق أو الرابط"
                className="dash-input !rounded-full !border-(--dash-border) !bg-(--dash-panel-soft) !py-2 !px-4 !text-sm text-(--dash-text) placeholder:text-(--dash-muted-2)"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-(--dash-text)">
              <span>وصف الإضافة</span>
              <textarea
                rows={2}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="سجل وصف مختصر للعملية"
                className="dash-input !rounded-[20px] !border-(--dash-border) !bg-(--dash-panel-soft) !p-4 !text-sm text-(--dash-text) placeholder:text-(--dash-muted-2)"
              />
            </label>
          </div>

          <div className="mt-8 space-y-4">
          <div className="flex justify-start px-1 text-sm font-semibold text-(--dash-text)">الشجرة المحاسبية</div>
          <div className="overflow-hidden rounded-[24px] border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
            <div className="overflow-x-auto" dir="rtl">
              <table className="min-w-full text-sm text-(--dash-text)">
                <thead className="bg-gradient-to-r from-(--dash-primary) to-[#1069ff] text-white">
                  <tr>
                    <th className="px-3 py-3 text-center text-[11px] font-medium">أوامر</th>
                    <th className="px-3 py-3 text-center text-[11px] font-medium">اسم الحساب (كود الحساب)</th>
                    <th className="px-3 py-3 text-center text-[11px] font-medium">ملاحظات الحساب</th>
                    <th className="px-3 py-3 text-center text-[11px] font-medium">المدين (الرصيد المتوفر)</th>
                    <th className="px-3 py-3 text-center text-[11px] font-medium">الدائن</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-(--dash-border) bg-(--dash-panel)">
                  {rows.map((row) => (
                    <tr key={row.id} className="bg-(--dash-panel)">
                      <td className="px-3 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => removeRow(row.id)}
                          className="text-(--dash-danger) text-lg leading-none transition hover:text-[var(--dash-danger)]"
                        >
                          ×
                        </button>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <select
                          value={row.account}
                          onChange={(event) => handleRowChange(row.id, "account", event.target.value)}
                          className="w-full rounded-full border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-xs text-right text-(--dash-text)"
                        >
                          <option value="">اختر حساباً</option>
                          {accountOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <input
                          type="text"
                          value={row.notes}
                          onChange={(event) => handleRowChange(row.id, "notes", event.target.value)}
                          placeholder="أضف ملاحظات"
                          className="w-full rounded-full border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-xs text-right text-(--dash-text) placeholder:text-(--dash-muted-2)"
                        />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <input
                          type="number"
                          value={row.debit}
                          min="0"
                          step="0.01"
                          onChange={(event) => handleRowChange(row.id, "debit", event.target.value)}
                          className="w-full rounded-full border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-xs text-right text-(--dash-text)"
                        />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <input
                          type="number"
                          value={row.credit}
                          min="0"
                          step="0.01"
                          onChange={(event) => handleRowChange(row.id, "credit", event.target.value)}
                          className="w-full rounded-full border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-xs text-right text-(--dash-text)"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-(--dash-primary-soft) text-[13px] font-semibold text-(--dash-text)">
                    <td className="px-3 py-3 text-center">إجمالي</td>
                    <td className="px-3 py-3 text-center" colSpan={2} />
                    <td className="px-3 py-3 text-center">{totals.debit}</td>
                    <td className="px-3 py-3 text-center">{totals.credit}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={addRow}
              className="rounded-[25px] bg-gradient-to-r from-[#2f8cff] to-[#1861ff] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(20,90,255,0.4)]"
            >
              إضافة حساب
            </button>
            <button
              type="button"
              className="rounded-[25px] border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.06)] px-5 py-2 text-sm font-semibold text-white"
            >
              إتمام العملية
            </button>
          </div>
        </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
