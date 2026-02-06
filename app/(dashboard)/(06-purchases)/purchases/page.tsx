"use client";

import { useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

type PurchaseStatus = "تم الاستلام" | "معلقة";

type PaymentStatus = "مدفوع" | "معلقة";

type PurchaseRow = {
  id: number;
  date: string;
  time: string;
  reference: string;
  supplier: string;
  purchaseStatus: PurchaseStatus;
  total: number;
  paid: number;
  balance: number;
  paymentStatus: PaymentStatus;
};

const rows: PurchaseRow[] = [
  {
    id: 2533,
    date: "07/01/2026",
    time: "18:18:00",
    reference: "2533",
    supplier: "مورد",
    purchaseStatus: "تم الاستلام",
    total: 500.01,
    paid: 0,
    balance: 500.01,
    paymentStatus: "معلقة",
  },
  {
    id: 4774,
    date: "10/12/2025",
    time: "13:34:00",
    reference: "حك",
    supplier: "مورد",
    purchaseStatus: "تم الاستلام",
    total: 517.5,
    paid: 517.5,
    balance: 0,
    paymentStatus: "مدفوع",
  },
  {
    id: 4774,
    date: "10/12/2025",
    time: "13:18:00",
    reference: "4774",
    supplier: "مورد",
    purchaseStatus: "تم الاستلام",
    total: 0,
    paid: 0,
    balance: 0,
    paymentStatus: "مدفوع",
  },
];

const purchaseStatusStyles: Record<PurchaseStatus, string> = {
  "تم الاستلام": "bg-(--dash-success) text-white",
  معلقة: "bg-(--dash-warning) text-white",
};

const paymentStatusStyles: Record<PaymentStatus, string> = {
  مدفوع: "bg-(--dash-success) text-white",
  معلقة: "bg-(--dash-warning) text-white",
};

const formatNumber = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const Page = () => {
  const [query, setQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const filteredRows = rows.filter((row) => {
    if (!query.trim()) {
      return true;
    }
    const needle = query.trim().toLowerCase();
    return [row.reference, row.supplier, row.purchaseStatus, row.paymentStatus]
      .join(" ")
      .toLowerCase()
      .includes(needle);
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

  return (
    <DashboardShell title="المشتريات" subtitle="المشتريات (جميع الفروع)" hideHeaderFilters>
      <section className="space-y-4">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-(--dash-text)">المشتريات (جميع الفروع)</span>
            <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs">
              ☰
            </button>
          </div>
          <p className="mt-3 text-sm text-(--dash-muted)">الرجاء استخدام الجدول أدناه للتنقل أو تصفية النتائج.</p>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-(--dash-muted)">
              <span>اظهار</span>
              <select className="rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-(--dash-text) focus:outline-none">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            <div className="ms-auto flex min-w-60 items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
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
                      aria-label="تحديد كل المشتريات"
                    />
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">التاريخ</th>
                  <th className="px-3 py-3 text-right font-semibold">الرقم المرجعي</th>
                  <th className="px-3 py-3 text-right font-semibold">مورد</th>
                  <th className="px-3 py-3 text-right font-semibold">مدفوع</th>
                  <th className="px-3 py-3 text-right font-semibold">الرصيد</th>
                  <th className="px-3 py-3 text-right font-semibold">المجموع الكلي</th>
                  <th className="px-3 py-3 text-right font-semibold">حالة الدفع</th>
                  <th className="px-3 py-3 text-right font-semibold">حالة عملية الشراء</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={`${row.id}-${row.reference}`} className="border-t border-(--dash-border) text-(--dash-text)">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => toggleRow(row.id)}
                        className="h-4 w-4 rounded border border-(--dash-border)"
                        aria-label={`تحديد عملية شراء ${row.reference}`}
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
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${paymentStatusStyles[row.paymentStatus]}`}>
                        {row.paymentStatus}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${purchaseStatusStyles[row.purchaseStatus]}`}>
                        {row.purchaseStatus}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <button type="button" className="rounded-full bg-(--dash-primary) px-3 py-1 text-xs font-semibold text-white">
                        الإجراءات
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-(--dash-border) text-(--dash-muted)">
                <tr>
                  <td className="px-3 py-3" />
                  <td className="px-3 py-3">[yyyy-mm-dd]</td>
                  <td className="px-3 py-3">[الرقم المرجعي]</td>
                  <td className="px-3 py-3">[مورد]</td>
                  <td className="px-3 py-3">{formatNumber(517.5)}</td>
                  <td className="px-3 py-3">{formatNumber(500.01)}</td>
                  <td className="px-3 py-3">{formatNumber(1017.51)}</td>
                  <td className="px-3 py-3">[حالة الدفع]</td>
                  <td className="px-3 py-3">[حالة الشراء]</td>
                  <td className="px-3 py-3">الإجراءات</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-(--dash-border) px-4 py-3 text-sm text-(--dash-muted)">
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">التالي</button>
              <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">سابق</button>
            </div>
            <span>عرض 1 إلى 3 من 3 سجلات</span>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
