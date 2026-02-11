"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const STORAGE_KEY = "sales-csv-data";

type CsvSale = {
  id: string;
  dateTime: string;
  reference: string;
  cashier: string;
  customer: string;
  branch: string;
  csvName: string;
  attachmentName: string;
  discount: string;
  shipping: string;
  due: string;
  invoiceStatus: "مكتملة" | "معلقة";
  paymentStatus: "مكتملة" | "معلقة";
  staffNotes: string;
  invoiceNotes: string;
};

const statusStyles: Record<CsvSale["invoiceStatus"], string> = {
  مكتملة: "bg-(--dash-success) text-white",
  معلقة: "bg-(--dash-warning) text-white",
};

const formatDateTime = (value: string) => {
  if (!value) {
    return { date: "—", time: "" };
  }
  const [date, time] = value.split("T");
  return { date, time: time ?? "" };
};

const Page = () => {
  const [rows, setRows] = useState<CsvSale[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = () => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setRows(parsed);
            return;
          }
        }
      } catch {}
      setRows([]);
    };

    load();
    window.addEventListener("focus", load);
    return () => window.removeEventListener("focus", load);
  }, []);

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) =>
      Object.values(row).join(" ").toLowerCase().includes(needle)
    );
  }, [rows, query]);

  return (
    <DashboardShell
      title="عمليات البيع من CSV"
      subtitle="عرض عمليات البيع المضافة من ملفات CSV"
      hideHeaderFilters
    >
      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/sales/new/import-csv">
            <button
              type="button"
              className="flex items-center gap-2 rounded-2xl bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
            >
              <span className="text-lg">+</span>
              إضافة بيع من CSV
            </button>
          </Link>
          <div className="relative flex-1 min-w-[220px]">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث في عمليات البيع..."
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) py-2 pr-4 pl-4 text-sm text-(--dash-text) focus:outline-none"
            />
          </div>
        </div>

        {filteredRows.length ? (
          <div className="mt-4 overflow-x-auto">
            <div className="min-w-full overflow-hidden rounded-2xl border border-(--dash-border)">
              <table className="min-w-full text-sm">
                <thead className="bg-(--dash-primary) text-white">
                  <tr>
                    <th className="px-4 py-3 text-right font-semibold">الرقم المرجعي</th>
                    <th className="px-4 py-3 text-right font-semibold">التاريخ</th>
                    <th className="px-4 py-3 text-right font-semibold">الكاشير</th>
                    <th className="px-4 py-3 text-right font-semibold">العميل</th>
                    <th className="px-4 py-3 text-right font-semibold">الفرع</th>
                    <th className="px-4 py-3 text-right font-semibold">ملف CSV</th>
                    <th className="px-4 py-3 text-right font-semibold">حالة الفاتورة</th>
                    <th className="px-4 py-3 text-right font-semibold">حالة الدفع</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => {
                    const { date, time } = formatDateTime(row.dateTime);
                    return (
                      <tr
                        key={row.id}
                        className="border-b border-(--dash-border) text-(--dash-text) odd:bg-(--dash-panel) even:bg-(--dash-panel-soft)"
                      >
                        <td className="px-4 py-3 font-semibold">{row.reference}</td>
                        <td className="px-4 py-3 text-(--dash-muted)">
                          <div className="flex flex-col">
                            <span>{date}</span>
                            {time ? (
                              <span className="text-xs text-(--dash-muted-2)">{time}</span>
                            ) : null}
                          </div>
                        </td>
                        <td className="px-4 py-3">{row.cashier}</td>
                        <td className="px-4 py-3">{row.customer}</td>
                        <td className="px-4 py-3">{row.branch}</td>
                        <td className="px-4 py-3">{row.csvName || "—"}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[row.invoiceStatus]}`}
                          >
                            {row.invoiceStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[row.paymentStatus]}`}
                          >
                            {row.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) p-6 text-center text-sm text-(--dash-muted)">
            لا توجد عمليات بيع مضافة من CSV بعد.
          </div>
        )}
      </section>
    </DashboardShell>
  );
};

export default Page;
