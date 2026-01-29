"use client";

import { useMemo, useState } from "react";
import DashboardShell from "../../../components/DashboardShell";

type AccountRow = {
  id: number;
  account: string;
  code: string;
  notes: string;
  debit: string;
  credit: string;
};

const branchOptions = ["مصلحة سيارات", "الفرع الرئيسي", "فرع جدة", "فرع الرياض"];

const formatArabicDate = (value: Date) =>
  value.toLocaleString("ar-EG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const formatAmount = (value: number) => value.toFixed(2);

const Page = () => {
  const [selectedBranch, setSelectedBranch] = useState(branchOptions[0]);
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [attachmentsLabel, setAttachmentsLabel] = useState("");
  const [rows, setRows] = useState<AccountRow[]>([
    { id: 1, account: "الاصناف", code: "0", notes: "إجمالي المدين", debit: "0.00", credit: "0.00" },
  ]);

  const totals = useMemo(() => {
    const debit = rows.reduce((sum, row) => sum + Number.parseFloat(row.debit || "0"), 0);
    const credit = rows.reduce((sum, row) => sum + Number.parseFloat(row.credit || "0"), 0);
    return { debit: formatAmount(debit), credit: formatAmount(credit) };
  }, [rows]);

  const currentDate = useMemo(() => formatArabicDate(new Date()), []);

  const handleRowChange = (id: number, field: keyof AccountRow, value: string) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        account: "",
        code: String(prev.length),
        notes: "",
        debit: "0.00",
        credit: "0.00",
      },
    ]);
  };

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <DashboardShell title="إضافة سند قيد نقدي" hideHeaderFilters>
      <section className="rounded-[32px] border border-[#00000019] bg-white px-6 py-8 shadow-[0_20px_30px_rgba(14,70,0,0.08)]">
        <div className="mb-6 flex flex-wrap items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#0f4512]">
              البداية / إضافة سند قيد يدوي / إضافة سند قيد نقدي
            </p>
            <h1 className="text-2xl font-black text-[#023311]">إضافة سند قيد نقدي</h1>
          </div>
          <button className="rounded-full bg-[#0b4c19] px-5 py-2 text-sm font-semibold text-white shadow-[0_5px_15px_rgba(5,51,17,0.4)]">
            حفظ السند
          </button>
        </div>

        <p className="mb-6 text-sm text-[#1c421b]">
          يرجى إدخال المعلومات أدناه، تسميات الحقول التي تحمل علامة * هي حقول إجبارية.
        </p>

        <div className="grid gap-4 md:grid-cols-[220px_minmax(220px,1fr)_1fr]">
          <label className="flex flex-col gap-2 text-sm font-semibold text-[#0d360e]">
            <span>التاريخ *</span>
            <input
              type="text"
              value={currentDate}
              readOnly
              className="dash-input !rounded-full !border-[#c3d3c2] !py-2 !px-4 !text-sm bg-[#f7f7f1]"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-[#0d360e]">
            <span>الفرع *</span>
            <select
              className="dash-select !rounded-full !border-[#c3d3c2] !py-2 !px-4 !text-sm"
              value={selectedBranch}
              onChange={(event) => setSelectedBranch(event.target.value)}
            >
              {branchOptions.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-[#0d360e]">
            <span>ملاحظات</span>
            <input
              type="text"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="أضف ملاحظات"
              className="dash-input !rounded-full !border-[#c3d3c2] !py-2 !px-4 !text-sm"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[160px_minmax(200px,1fr)_1fr]">
          <div className="flex flex-col gap-2 text-sm font-semibold text-[#0d360e]">
            <span>المرفقات</span>
            <button className="flex items-center justify-center gap-2 rounded-[25px] bg-[#0b4c19] px-4 py-2 text-xs font-semibold text-white">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M6 12v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-7a2 2 0 1 0-4 0v5H6V9h2v3a2 2 0 1 0 4 0V6a5 5 0 1 1 10 0v8a6 6 0 0 1-12 0V9H6Z"
                />
              </svg>
              استعراض ...
            </button>
          </div>
          <label className="flex flex-col gap-2 text-sm font-semibold text-[#0d360e]">
            <span>اسم الملف</span>
            <input
              type="text"
              value={attachmentsLabel}
              onChange={(event) => setAttachmentsLabel(event.target.value)}
              placeholder="أدخل اسم المرفق أو احفظ ارتباطاً"
              className="dash-input !rounded-full !border-[#c3d3c2] !py-2 !px-4 !text-sm"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-[#0d360e]">
            <span>وصف إضافي</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={2}
              placeholder="تفاصيل إضافية عن العملية"
              className="dash-input !rounded-[20px] !border-[#c3d3c2] !p-4 !text-sm"
            />
          </label>
        </div>

        <div className="mt-8 rounded-[24px] border border-[#0c250f] bg-[#003a17] text-white">
          <div className="grid grid-cols-[40px,2.3fr_1fr_1fr_1fr_1fr] items-center gap-3 px-4 py-3 text-[13px] font-semibold tracking-wide">
            <span />
            <span>اسم الحساب (كود الحساب)</span>
            <span>ملاحظات الحساب</span>
            <span>المدين (الرصيد المتوفر)</span>
            <span>الدائن</span>
            <span>أوامر</span>
          </div>
          <div className="divide-y divide-[#0f4210]/30 bg-white text-[#0f3d1a]">
            {rows.map((row) => (
              <div key={row.id} className="grid grid-cols-[40px,2.3fr_1fr_1fr_1fr_1fr] items-center gap-3 px-4 py-3 text-sm">
                <span>
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    className="text-[#c41e1e] transition hover:text-[#8b0f0f]"
                  >
                    ✕
                  </button>
                </span>
                <input
                  type="text"
                  value={row.account}
                  onChange={(event) => handleRowChange(row.id, "account", event.target.value)}
                  placeholder="اختر حساباً"
                  className="dash-input !rounded-full !border-[#d9d9d4] !py-2 !px-3 !text-xs"
                />
                <input
                  type="text"
                  value={row.notes}
                  onChange={(event) => handleRowChange(row.id, "notes", event.target.value)}
                  placeholder="أضف ملاحظات"
                  className="dash-input !rounded-full !border-[#d9d9d4] !py-2 !px-3 !text-xs"
                />
                <input
                  type="number"
                  value={row.debit}
                  onChange={(event) => handleRowChange(row.id, "debit", event.target.value)}
                  className="dash-input !rounded-full !border-[#d9d9d4] !py-2 !px-3 !text-xs"
                />
                <input
                  type="number"
                  value={row.credit}
                  onChange={(event) => handleRowChange(row.id, "credit", event.target.value)}
                  className="dash-input !rounded-full !border-[#d9d9d4] !py-2 !px-3 !text-xs"
                />
                <button
                  type="button"
                  className="rounded-[20px] bg-[#0b4c19] px-3 py-1 text-[11px] font-semibold text-white"
                >
                  اختر رمز
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[40px,2.3fr_1fr_1fr_1fr_1fr] gap-3 border-t border-white/20 bg-[#f8f8f8] px-4 py-3 text-xs font-semibold text-[#0b3a18]">
            <span />
            <span>إجمالى</span>
            <span />
            <span>{totals.debit}</span>
            <span>{totals.credit}</span>
            <span />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={addRow}
            className="rounded-[25px] bg-[#0b4c19] px-4 py-2 text-sm font-semibold text-white shadow-[0_5px_15px_rgba(5,51,17,0.4)]"
          >
            إضافة حساب
          </button>
          <button
            type="button"
            className="rounded-[25px] border border-[#0b4c19] px-5 py-2 text-sm font-semibold text-[#0b4c19]"
          >
            إتمام العملية
          </button>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
