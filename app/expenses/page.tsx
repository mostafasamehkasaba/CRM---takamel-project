"use client";

import { useMemo, useState } from "react";
import DashboardShell from "../components/DashboardShell";

type ExpenseRow = {
  id: string;
  date: string;
  time: string;
  reference: string;
  category: string;
  paid: number;
  description: string;
  enteredBy: string;
};

const rows: ExpenseRow[] = [
  {
    id: "DEP-0004",
    date: "24/01/2026",
    time: "00:35:00",
    reference: "Dep0004",
    category: "رواتب",
    paid: 20000,
    description: ".",
    enteredBy: "admin",
  },
];

const formatNumber = (value: number) =>
  value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const Page = () => {
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return rows;
    }
    return rows.filter((row) =>
      [row.id, row.reference, row.category, row.description, row.enteredBy, row.date, row.time]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [query]);

  return (
    <DashboardShell title="المصروفات" subtitle="البداية / المصروفات" hideHeaderFilters>
      <section className="space-y-4">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-(--dash-text)">المصروفات</span>
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
                    <input type="checkbox" className="h-4 w-4 rounded border border-(--dash-border)" />
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">التاريخ</th>
                  <th className="px-3 py-3 text-right font-semibold">مرجع</th>
                  <th className="px-3 py-3 text-right font-semibold">تصنيف المصروف</th>
                  <th className="px-3 py-3 text-right font-semibold">المدفوع</th>
                  <th className="px-3 py-3 text-right font-semibold">وصف</th>
                  <th className="px-3 py-3 text-right font-semibold">مدخل البيانات</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id} className="border-t border-(--dash-border) text-(--dash-text)">
                    <td className="px-3 py-3">
                      <input type="checkbox" className="h-4 w-4 rounded border border-(--dash-border)" />
                    </td>
                    <td className="px-3 py-3 text-(--dash-muted)">
                      <div className="flex flex-col">
                        <span>{row.time}</span>
                        <span className="text-xs text-(--dash-muted-2)">{row.date}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 font-semibold">{row.reference}</td>
                    <td className="px-3 py-3">{row.category}</td>
                    <td className="px-3 py-3 font-semibold">{formatNumber(row.paid)}</td>
                    <td className="px-3 py-3">{row.description}</td>
                    <td className="px-3 py-3">{row.enteredBy}</td>
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
                  <td className="px-3 py-3">[التاريخ] [yyyy-mm-dd]</td>
                  <td className="px-3 py-3">[مرجع]</td>
                  <td className="px-3 py-3">[التصنيفات الرئيسية]</td>
                  <td className="px-3 py-3">{formatNumber(20000)}</td>
                  <td className="px-3 py-3">[مذكرة]</td>
                  <td className="px-3 py-3">[مدخل البيانات]</td>
                  <td className="px-3 py-3">الإجراءات</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-(--dash-border) px-4 py-3 text-sm text-(--dash-muted)">
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">سابق</button>
              <span className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">1</span>
              <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">التالي</button>
            </div>
            <span>عرض 1 إلى {filteredRows.length} من {filteredRows.length} سجلات</span>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
