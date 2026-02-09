"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import Link from "next/link";

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

const Page = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [query, setQuery] = useState("");

useEffect(() => {
  const loadPayments = () => {
    const stored = window.localStorage.getItem("payments-data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setPayments(parsed);
        }
      } catch {}
    }
  };

  loadPayments();

  window.addEventListener("focus", loadPayments);

  return () => window.removeEventListener("focus", loadPayments);
}, []);


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
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
