"use client";

import { useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

type QuoteStatus = "مكتملة" | "معلقة";

type QuoteRow = {
  id: number;
  number: number;
  date: string;
  time: string;
  reference: string;
  cashier: string;
  customer: string;
  total: number;
  status: QuoteStatus;
};

const rows: QuoteRow[] = [
  {
    id: 1,
    number: 8,
    date: "05/01/2026",
    time: "14:17:00",
    reference: "QUOTE0007",
    cashier: "شركة تجريبى",
    customer: "شخص عام",
    total: 11,
    status: "مكتملة",
  },
  {
    id: 2,
    number: 7,
    date: "29/10/2025",
    time: "19:18:00",
    reference: "QUOTE0006",
    cashier: "شركة تجريبى",
    customer: "محمد",
    total: 426,
    status: "معلقة",
  },
  {
    id: 3,
    number: 6,
    date: "29/10/2025",
    time: "19:12:00",
    reference: "QUOTE0005",
    cashier: "شركة تجريبى",
    customer: "محمد",
    total: 513,
    status: "معلقة",
  },
  {
    id: 4,
    number: 5,
    date: "29/10/2025",
    time: "19:12:00",
    reference: "QUOTE0005",
    cashier: "شركة تجريبى",
    customer: "محمد",
    total: 163,
    status: "معلقة",
  },
  {
    id: 5,
    number: 4,
    date: "29/10/2025",
    time: "19:03:00",
    reference: "QUOTE0004",
    cashier: "شركة تجريبى",
    customer: "new55",
    total: 13,
    status: "معلقة",
  },
  {
    id: 6,
    number: 3,
    date: "29/10/2025",
    time: "18:12:00",
    reference: "QUOTE0003",
    cashier: "شركة تجريبى",
    customer: "شخص عام",
    total: 31,
    status: "معلقة",
  },
  {
    id: 7,
    number: 2,
    date: "29/10/2025",
    time: "18:12:00",
    reference: "QUOTE0002",
    cashier: "شركة تجريبى",
    customer: "شخص عام",
    total: 44,
    status: "معلقة",
  },
];

const statusStyles: Record<QuoteStatus, string> = {
  مكتملة: "bg-(--dash-success) text-white",
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
    return [row.reference, row.customer, row.cashier, row.number]
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
    <DashboardShell title="عروض الأسعار" subtitle="عروض الأسعار (جميع الفروع)" hideHeaderFilters>
      <section className="space-y-4">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-(--dash-text)">عروض الأسعار (جميع الفروع)</span>
            <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs">
              ⚙
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
                      aria-label="تحديد كل العروض"
                    />
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">رقم العرض</th>
                  <th className="px-3 py-3 text-right font-semibold">التاريخ</th>
                  <th className="px-3 py-3 text-right font-semibold">الرقم المرجعي</th>
                  <th className="px-3 py-3 text-right font-semibold">كاشير</th>
                  <th className="px-3 py-3 text-right font-semibold">عميل</th>
                  <th className="px-3 py-3 text-right font-semibold">المجموع</th>
                  <th className="px-3 py-3 text-right font-semibold">الحالة</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`border-t border-(--dash-border) text-(--dash-text) ${index === 2 ? "bg-sky-100/60" : ""}`}
                  >
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => toggleRow(row.id)}
                        className="h-4 w-4 rounded border border-(--dash-border)"
                        aria-label={`تحديد العرض رقم ${row.number}`}
                      />
                    </td>
                    <td className="px-3 py-3 font-semibold">{row.number}</td>
                    <td className="px-3 py-3 text-(--dash-muted)">
                      <div className="flex flex-col">
                        <span>{row.date}</span>
                        <span className="text-xs text-(--dash-muted-2)">{row.time}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 font-semibold">{row.reference}</td>
                    <td className="px-3 py-3">{row.cashier}</td>
                    <td className="px-3 py-3">{row.customer}</td>
                    <td className="px-3 py-3 font-semibold">{formatNumber(row.total)}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        className="rounded-full bg-(--dash-primary) px-3 py-1 text-xs font-semibold text-white"
                      >
                        الإجراءات
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-(--dash-border) text-(--dash-muted)">
                <tr>
                  <td className="px-3 py-3">الإجراءات</td>
                  <td className="px-3 py-3" />
                  <td className="px-3 py-3">[التاريخ]</td>
                  <td className="px-3 py-3">[الرقم المرجعي]</td>
                  <td className="px-3 py-3">[كاشير]</td>
                  <td className="px-3 py-3">[عميل]</td>
                  <td className="px-3 py-3">[المجموع]</td>
                  <td className="px-3 py-3">[الحالة]</td>
                  <td className="px-3 py-3" />
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-(--dash-border) px-4 py-3 text-sm text-(--dash-muted)">
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">التالي</button>
              <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">سابق</button>
            </div>
            <span>عرض 1 إلى 7 من 7 سجلات</span>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
