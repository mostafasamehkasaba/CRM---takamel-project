"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

type ExpenseVoucher = {
  id: string;
  recipient: string;
  amount: number;
  date: string;
  status: "قيد المراجعة" | "معتمد";
};

const initialVouchers: ExpenseVoucher[] = [
  {
    id: "PY-304",
    recipient: "مورد الخدمات",
    amount: 5500,
    date: "هذا الشهر",
    status: "قيد المراجعة",
  },
  {
    id: "PY-305",
    recipient: "شركة الصيانة",
    amount: 3200,
    date: "هذا الشهر",
    status: "معتمد",
  },
];

const statusStyles: Record<ExpenseVoucher["status"], string> = {
  "قيد المراجعة": "bg-amber-100 text-amber-700",
  معتمد: "bg-emerald-100 text-emerald-700",
};

const formatCurrency = (value: number) => `${value.toLocaleString()} ر.س`;

const page = () => {
  const [query, setQuery] = useState("");

  const filteredVouchers = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return initialVouchers;
    }
    return initialVouchers.filter((item) =>
      [item.id, item.recipient, item.amount, item.date, item.status].join(" ").toLowerCase().includes(needle),
    );
  }, [query]);

  return (
    <DashboardShell title="سندات صرف نقدية" subtitle="عرض سندات الصرف ومراجعتها.">
      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="mb-6 text-right">
          <h2 className="text-2xl font-semibold">سندات صرف نقدية</h2>
          <p className="mt-2 text-sm text-(--dash-muted)">عرض سندات الصرف ومراجعتها.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/payments/expense/new"
            className="flex-1 rounded-2xl bg-(--dash-primary) px-5 py-3 text-center text-sm font-semibold text-white shadow-(--dash-primary-soft)"
          >
            سند صرف جديد
          </Link>
          <div className="relative flex-1 min-w-[260px]">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث عن سند صرف"
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
                  <th className="px-4 py-3 text-right font-semibold">المستفيد</th>
                  <th className="px-4 py-3 text-right font-semibold">المبلغ</th>
                  <th className="px-4 py-3 text-right font-semibold">التاريخ</th>
                  <th className="px-4 py-3 text-right font-semibold">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {filteredVouchers.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-(--dash-border) text-(--dash-text) odd:bg-(--dash-panel) even:bg-(--dash-panel-soft)"
                  >
                    <td className="px-4 py-3 font-semibold">{row.id}</td>
                    <td className="px-4 py-3">{row.recipient}</td>
                    <td className="px-4 py-3">{formatCurrency(row.amount)}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredVouchers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-sm text-(--dash-muted)">
                      لا توجد نتائج مطابقة.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default page;
