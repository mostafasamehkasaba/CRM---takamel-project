"use client";

import { useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import DashboardShell from "../components/DashboardShell";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const stats = [
  {
    title: "إجمالي المبيعات",
    value: "328,500 ريال",
    change: "+12.5%",
    positive: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 1a1 1 0 0 1 1 1v2.08c1.72.2 3.26 1.02 4.41 2.28l-1.5 1.3A5.49 5.49 0 0 0 13 6.1V10h2.5a1 1 0 1 1 0 2H13v1.9c0 1.08.88 1.96 1.96 1.96h.54a1 1 0 1 1 0 2h-.54A3.97 3.97 0 0 1 11 13.9V12H8.5a1 1 0 1 1 0-2H11V6.1a5.5 5.5 0 0 0-3.91 1.58L5.6 6.38A7.5 7.5 0 0 1 11 4.08V2a1 1 0 0 1 1-1Z"
        />
      </svg>
    ),
  },
  {
    title: "إجمالي المشتريات",
    value: "232,000 ريال",
    change: "+8.2%",
    positive: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path
          fill="currentColor"
          d="M6 6h15a1 1 0 0 1 .98 1.2l-1.5 7A1 1 0 0 1 19.5 15H8a1 1 0 0 1-.96-.72L4.4 4H2a1 1 0 0 1 0-2h3a1 1 0 0 1 .96.72L6.7 6ZM9 22a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm9 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
        />
      </svg>
    ),
  },
  {
    title: "صافي الأرباح",
    value: "96,500 ريال",
    change: "+15.3%",
    positive: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5 18h12a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2Zm1-4 4-4 3 3 5-6a1 1 0 0 1 1.52 1.3l-5.7 6.84a1 1 0 0 1-1.47.1l-3.04-3.03-3.28 3.28A1 1 0 1 1 6 14Z"
        />
      </svg>
    ),
  },
  {
    title: "المستحقات",
    value: "45,300 ريال",
    change: "-3.1%",
    positive: false,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7 4a5 5 0 0 1 10 0v2h2a1 1 0 1 1 0 2h-1.1a6.5 6.5 0 0 1-12.8 0H4a1 1 0 0 1 0-2h2V4Zm2 2h6V4a3 3 0 0 0-6 0v2Zm-2.9 6a4.5 4.5 0 0 0 8.82 0H6.1Z"
        />
      </svg>
    ),
  },
];

const notifications = [
  {
    text: "منتج XYZ - المخزون أقل من الحد الأدنى (5 وحدات متبقية فقط).",
    tone: "border-(--dash-danger) bg-(--dash-danger-soft)",
  },
  {
    text: "منتج ABC - قرب انتهاء الصلاحية خلال 7 أيام.",
    tone: "border-(--dash-warning) bg-(--dash-warning-soft)",
  },
  {
    text: "فاتورة رقم 1240 - تم تأخير السداد منذ 14 يوما.",
    tone: "border-(--dash-info) bg-(--dash-info-soft)",
  },
];

const recentOperations = [
  {
    id: "OP-1001",
    type: "sales",
    title: "فاتورة مبيعات",
    client: "شركة المدار",
    status: "مدفوع",
    statusTone: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "OP-1002",
    type: "quotes",
    title: "عرض سعر",
    client: "مؤسسة النور",
    status: "بانتظار الرد",
    statusTone: "bg-amber-100 text-amber-700",
  },
  {
    id: "OP-1003",
    type: "purchases",
    title: "شراء",
    client: "شركة التوريد",
    status: "تم",
    statusTone: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "OP-1004",
    type: "stock",
    title: "تحويل مخزن",
    client: "فرع الرياض",
    status: "قيد المراجعة",
    statusTone: "bg-slate-200 text-slate-700",
  },
  {
    id: "OP-1005",
    type: "sales",
    title: "عميل جديد",
    client: "مؤسسة الرؤية",
    status: "نشط",
    statusTone: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "OP-1006",
    type: "customers",
    title: "عميل جديد",
    client: "مؤسسة البيان",
    status: "نشط",
    statusTone: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "OP-1007",
    type: "suppliers",
    title: "مورد جديد",
    client: "شركة الإمداد",
    status: "تم",
    statusTone: "bg-emerald-100 text-emerald-700",
  },
];
const revenuePoints = [
  { month: "يناير", sales: 42000, profit: 12000 },
  { month: "فبراير", sales: 50000, profit: 14000 },
  { month: "مارس", sales: 47000, profit: 13000 },
  { month: "أبريل", sales: 61000, profit: 18000 },
  { month: "مايو", sales: 54000, profit: 15000 },
  { month: "يونيو", sales: 68000, profit: 21000 },
];

const invoices = [
  {
    id: "INV-001",
    client: "سارة أحمد",
    amount: "15,000 ريال",
    status: "مدفوعة",
    statusTone: "bg-(--dash-info-soft) text-(--dash-info)",
    date: "2026-01-15",
  },
  {
    id: "INV-002",
    client: "عمر محمد",
    amount: "8,500 ريال",
    status: "قيد المراجعة",
    statusTone: "bg-(--dash-warning-soft) text-(--dash-warning)",
    date: "2026-01-14",
  },
  {
    id: "INV-003",
    client: "خالد إبراهيم",
    amount: "12,000 ريال",
    status: "مدفوعة",
    statusTone: "bg-(--dash-info-soft) text-(--dash-info)",
    date: "2026-01-14",
  },
  {
    id: "INV-004",
    client: "منى يوسف",
    amount: "6,700 ريال",
    status: "متأخرة",
    statusTone: "bg-(--dash-danger-soft) text-(--dash-danger)",
    date: "2026-01-10",
  },
  {
    id: "INV-005",
    client: "خالد ناصر",
    amount: "9,200 ريال",
    status: "بانتظار الدفع",
    statusTone: "bg-(--dash-panel-glass) text-(--dash-muted)",
    date: "2026-01-13",
  },
];

const page = () => {
  const [invoiceQuery, setInvoiceQuery] = useState("");
  const lineData = useMemo<ChartData<"line">>(
    () => ({
      labels: revenuePoints.map((point) => point.month),
      datasets: [
        {
          label: "المبيعات",
          data: revenuePoints.map((point) => point.sales),
          borderColor: "#2563eb",
          backgroundColor: "rgba(37,99,235,0.2)",
          pointBackgroundColor: "#2563eb",
          pointBorderColor: "#2563eb",
          pointRadius: 3,
          tension: 0.35,
          fill: true,
        },
        {
          label: "الأرباح",
          data: revenuePoints.map((point) => point.profit),
          borderColor: "#16a34a",
          backgroundColor: "rgba(22,163,74,0.2)",
          pointBackgroundColor: "#16a34a",
          pointBorderColor: "#16a34a",
          pointRadius: 3,
          tension: 0.35,
          fill: true,
        },
      ],
    }),
    []
  );

  const lineOptions = useMemo<ChartOptions<"line">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "#64748b",
            usePointStyle: true,
            boxWidth: 10,
          },
        },
        tooltip: {
          rtl: true,
          textDirection: "rtl",
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#94a3b8",
          },
        },
        y: {
          grid: {
            color: "rgba(148,163,184,0.25)",
            borderDash: [4, 6],
          },
          ticks: {
            color: "#94a3b8",
          },
        },
      },
    }),
    []
  );

  const filteredInvoices = useMemo(() => {
    const query = invoiceQuery.trim().toLowerCase();
    if (!query) {
      return invoices;
    }
    return invoices.filter((item) => {
      const haystack = [item.id, item.client, item.amount, item.status, item.date].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }, [invoiceQuery]);
  const [operationsTab, setOperationsTab] = useState<
    "all" | "sales" | "quotes" | "purchases" | "stock" | "customers" | "suppliers"
  >("all");
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const filteredOperations = useMemo(() => {
    if (operationsTab === "all") {
      return recentOperations;
    }
    return recentOperations.filter((item) => item.type === operationsTab);
  }, [operationsTab]);
  const visibleOperations = filteredOperations.slice(0, 3);

  return (
    <DashboardShell
      title="لوحة التحكم"
      subtitle="نظرة عامة على أداء الأعمال"
      searchValue={invoiceQuery}
      onSearchChange={setInvoiceQuery}
      searchPlaceholder="بحث في الفواتير بالرقم أو العميل أو الحالة..."
      exportData={{
        filename: "dashboard-invoices",
        headers: ["رقم الفاتورة", "العميل", "الإجمالي", "الحالة", "التاريخ"],
        rows: filteredInvoices.map((item) => [item.id, item.client, item.amount, item.status, item.date]),
      }}
    >
      <section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-(--dash-border) bg-(--dash-panel-soft) p-6 shadow-(--dash-shadow)"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-2xl bg-(--dash-panel-glass) p-3 text-(--dash-primary)">{item.icon}</span>
                <span className={`text-sm font-semibold ${item.positive ? "text-(--dash-success)" : "text-(--dash-danger)"}`}>
                  {item.change}
                </span>
              </div>
              <p className="mt-6 text-sm text-(--dash-muted)">{item.title}</p>
              <p className="mt-2 text-2xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel-soft) p-6 shadow-(--dash-shadow)">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-(--dash-danger-soft) px-3 py-1 text-sm font-semibold text-(--dash-danger)">
                3
              </span>
              <div>
                <h2 className="text-lg font-semibold">التنبيهات الهامة</h2>
                <p className="text-sm text-(--dash-muted)">تحتاج إلى اهتمامك الفوري</p>
              </div>
            </div>
            <span className="rounded-full bg-(--dash-warning-soft) p-2 text-(--dash-warning)">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 3 2 21h20L12 3Zm0 5a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1Zm0 10a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 12 18Z"
                />
              </svg>
            </span>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {notifications.map((note) => (
              <div
                key={note.text}
                className={`flex h-full flex-col rounded-2xl border p-4 text-sm text-(--dash-text) ${note.tone}`}
              >
                <p className="font-semibold">{note.text}</p>
                <button
                  type="button"
                  className="mt-auto w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-glass) px-3 py-2 text-xs text-(--dash-text)"
                >
                  اتخاذ إجراء
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">آخر المبيعات</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (!tabsRef.current) {
                    return;
                  }
                  tabsRef.current.scrollBy({ left: 200, behavior: "smooth" });
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-(--dash-border) bg-(--dash-panel-soft) text-(--dash-muted) hover:text-(--dash-text)"
                aria-label="السابق"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path fill="currentColor" d="m15 6-6 6 6 6" />
                </svg>
              </button>
              <div
                ref={tabsRef}
                className="flex max-w-[300px] items-center gap-2 overflow-hidden rounded-full bg-(--dash-panel-soft) p-1 text-xs"
              >
                {[
                  { key: "all", label: "الكل" },
                  { key: "sales", label: "المبيعات" },
                  { key: "quotes", label: "عروض الأسعار" },
                  { key: "purchases", label: "المشتريات" },
                  { key: "stock", label: "تحويل مخزون" },
                  { key: "customers", label: "العملاء" },
                  { key: "suppliers", label: "الموردين" },
              ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() =>
                      setOperationsTab(
                        tab.key as "all" | "sales" | "quotes" | "purchases" | "stock" | "customers" | "suppliers"
                      )
                    }
                    className={`whitespace-nowrap rounded-full px-4 py-2 transition ${
                      operationsTab === tab.key
                        ? "bg-emerald-100 text-emerald-700"
                        : "text-(--dash-muted) hover:text-(--dash-text)"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!tabsRef.current) {
                    return;
                  }
                  tabsRef.current.scrollBy({ left: -200, behavior: "smooth" });
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-(--dash-border) bg-(--dash-panel-soft) text-(--dash-muted) hover:text-(--dash-text)"
                aria-label="التالي"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path fill="currentColor" d="m9 6 6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {visibleOperations.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm"
              >
                <div className="flex min-w-[140px] items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.statusTone}`}>{item.status}</span>
                  <span className="font-medium text-(--dash-text)">{item.title}</span>
                </div>
                <span className="text-(--dash-muted)">{item.client}</span>
                <button type="button" className="text-xs text-(--dash-primary) hover:underline">
                  عرض التفاصيل
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">المبيعات والأرباح (آخر 6 أشهر)</h2>
            <span className="text-xs text-(--dash-muted)">نسبة الأداء الشهري</span>
          </div>
                    <div className="mt-6 h-56">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">أحدث الفواتير</h2>
            <button
              type="button"
              className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-xs text-(--dash-muted)"
            >
              تصدير التقرير
            </button>
          </div>
          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[720px] overflow-hidden rounded-2xl border border-(--dash-border)">
              <div className="grid grid-cols-6 gap-4 border-b border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-xs font-semibold text-(--dash-muted)">
                <span className="text-right">رقم الفاتورة</span>
                <span className="text-right">العميل</span>
                <span className="text-right">الإجمالي</span>
                <span className="text-right">الحالة</span>
                <span className="text-right">التاريخ</span>
                <span className="text-right">الإجراء</span>
              </div>
              {filteredInvoices.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-6 gap-4 border-b border-(--dash-border) px-4 py-3 text-sm text-(--dash-text) last:border-b-0"
                >
                  <span>{item.id}</span>
                  <span>{item.client}</span>
                  <span>{item.amount}</span>
                  <span className="flex">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.statusTone}`}>{item.status}</span>
                  </span>
                  <span className="text-(--dash-muted)">{item.date}</span>
                  <button type="button" className="text-xs text-(--dash-primary) hover:underline">
                    عرض
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default page;










