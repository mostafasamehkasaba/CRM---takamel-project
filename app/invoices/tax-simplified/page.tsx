"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DashboardShell from "../../components/DashboardShell";

type PaymentStatus = "مدفوع" | "معلق" | "جزئي";

type SaleRow = {
  id: number;
  date: string;
  time: string;
  reference: string;
  cashier: string;
  customer: string;
  saleStatus: "مكتملة" | "مرتجع";
  total: number;
  paid: number;
  remaining: number;
  subtotal: number;
  tax: number;
  paymentStatus: PaymentStatus;
  paymentType: string;
};

const rows: SaleRow[] = [
  {
    id: 324,
    date: "25/01/2026",
    time: "22:32:37",
    reference: "SALE/POS0411",
    cashier: "شركة تجريبى",
    customer: "شخص عام",
    saleStatus: "مكتملة",
    total: 35,
    paid: 35,
    remaining: 0,
    subtotal: 30.43,
    tax: 4.57,
    paymentStatus: "مدفوع",
    paymentType: "نقدي",
  },
  {
    id: 323,
    date: "25/01/2026",
    time: "01:54:51",
    reference: "SALE/POS0410",
    cashier: "شركة تجريبى",
    customer: "شخص عام",
    saleStatus: "مكتملة",
    total: 30,
    paid: 30,
    remaining: 0,
    subtotal: 26.09,
    tax: 3.91,
    paymentStatus: "مدفوع",
    paymentType: "بطاقة",
  },
  {
    id: 322,
    date: "25/01/2026",
    time: "00:38:23",
    reference: "SALE/POS0409",
    cashier: "شركة تجريبى",
    customer: "شخص عام",
    saleStatus: "مكتملة",
    total: 34.5,
    paid: 34.5,
    remaining: 0,
    subtotal: 30,
    tax: 4.5,
    paymentStatus: "مدفوع",
    paymentType: "نقدي",
  },
  {
    id: 321,
    date: "24/01/2026",
    time: "02:27:30",
    reference: "SALE/POS0408",
    cashier: "شركة تجريبى",
    customer: "شخص عام",
    saleStatus: "مكتملة",
    total: 16,
    paid: 16,
    remaining: 0,
    subtotal: 13.91,
    tax: 2.09,
    paymentStatus: "مدفوع",
    paymentType: "نقدي",
  },
  {
    id: 320,
    date: "24/01/2026",
    time: "00:24:25",
    reference: "SALE0027",
    cashier: "شركة تجريبى",
    customer: "شخص عام",
    saleStatus: "مرتجع",
    total: -8,
    paid: 0,
    remaining: -8,
    subtotal: -6.96,
    tax: -1.04,
    paymentStatus: "معلق",
    paymentType: "نقدي",
  },
  {
    id: 319,
    date: "22/01/2026",
    time: "23:57:40",
    reference: "SALE/POS0407",
    cashier: "شركة تجريبى",
    customer: "شخص عام",
    saleStatus: "مكتملة",
    total: 60,
    paid: 60,
    remaining: 0,
    subtotal: 52.17,
    tax: 7.83,
    paymentStatus: "مدفوع",
    paymentType: "شبكة",
  },
  {
    id: 318,
    date: "21/01/2026",
    time: "21:01:56",
    reference: "SALE/POS0406",
    cashier: "شركة تجريبى",
    customer: "عميل افتراضي",
    saleStatus: "مكتملة",
    total: 15,
    paid: 15,
    remaining: 0,
    subtotal: 13.04,
    tax: 1.96,
    paymentStatus: "مدفوع",
    paymentType: "شبكة",
  },
  {
    id: 317,
    date: "21/01/2026",
    time: "21:01:32",
    reference: "SALE/POS0405",
    cashier: "شركة تجريبى",
    customer: "عميل افتراضي",
    saleStatus: "مكتملة",
    total: 35,
    paid: 35,
    remaining: 0,
    subtotal: 30.43,
    tax: 4.57,
    paymentStatus: "مدفوع",
    paymentType: "شبكة",
  },
  {
    id: 316,
    date: "21/01/2026",
    time: "20:22:57",
    reference: "SALE/POS0404",
    cashier: "شركة تجريبى",
    customer: "عميل افتراضي",
    saleStatus: "مكتملة",
    total: 105,
    paid: 105,
    remaining: 0,
    subtotal: 91.3,
    tax: 13.7,
    paymentStatus: "مدفوع",
    paymentType: "شبكة",
  },
  {
    id: 315,
    date: "21/01/2026",
    time: "20:22:38",
    reference: "SALE/POS0403",
    cashier: "شركة تجريبى",
    customer: "عميل افتراضي",
    saleStatus: "مكتملة",
    total: 60,
    paid: 60,
    remaining: 0,
    subtotal: 52.17,
    tax: 7.83,
    paymentStatus: "مدفوع",
    paymentType: "شبكة",
  },
  {
    id: 314,
    date: "21/01/2026",
    time: "20:19:53",
    reference: "SALE/POS0402",
    cashier: "شركة تجريبى",
    customer: "عميل افتراضي",
    saleStatus: "مكتملة",
    total: 45,
    paid: 45,
    remaining: 0,
    subtotal: 39.13,
    tax: 5.87,
    paymentStatus: "مدفوع",
    paymentType: "شبكة",
  },
];

const statusStyles: Record<PaymentStatus, string> = {
  مدفوع: "bg-(--dash-success) text-white",
  معلق: "bg-(--dash-warning) text-white",
  جزئي: "bg-(--dash-warning-soft) text-(--dash-warning)",
};

const saleStyles: Record<SaleRow["saleStatus"], string> = {
  مكتملة: "bg-(--dash-success) text-white",
  مرتجع: "bg-(--dash-danger) text-white",
};

const formatNumber = (value: number) =>
  value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const Page = () => {
  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const actionItems = [
    {
      label: "بيع مكرر",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 5a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 0 1 1-1Z"
          />
        </svg>
      ),
    },
    {
      label: "عرض الفاتورة الضريبية المبسطة",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5ZM7 12h10v2H7v-2Zm0 4h8v2H7v-2Z"
          />
        </svg>
      ),
    },
    {
      label: "عرض الفاتورة الضريبية",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5ZM7 12h10v2H7v-2Zm0 4h6v2H7v-2Z"
          />
        </svg>
      ),
    },
    {
      label: "تفاصيل الفاتورة",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5ZM7 12h10v2H7v-2Zm0 4h10v2H7v-2Z"
          />
        </svg>
      ),
    },
    {
      label: "ارجاع مبيعات",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M7 7h9l-1.5-1.5a1 1 0 1 1 1.4-1.4l3.2 3.2a1 1 0 0 1 0 1.4l-3.2 3.2a1 1 0 0 1-1.4-1.4L16 9H7a1 1 0 1 1 0-2Z"
          />
        </svg>
      ),
    },
    {
      label: "عرض المدفوعات",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 5c5 0 9 4 9 7s-4 7-9 7-9-4-9-7 4-7 9-7Zm0 2c-3.86 0-7 2.9-7 5s3.14 5 7 5 7-2.9 7-5-3.14-5-7-5Zm0 2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
          />
        </svg>
      ),
    },
    {
      label: "إضافة الدفع",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 3a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2h2a1 1 0 1 1 0 2h-2v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2H9a1 1 0 1 1 0-2h2v-2H9a1 1 0 1 1 0-2h2V8H9a1 1 0 1 1 0-2h2V4a1 1 0 0 1 1-1Z"
          />
        </svg>
      ),
    },
    {
      label: "سند مخزني",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path fill="currentColor" d="M3 7 12 2l9 5-9 5-9-5Zm2 6 7 4 7-4v7l-7 4-7-4v-7Z" />
        </svg>
      ),
    },
    {
      label: "سند مطالبة",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5ZM7 12h10v2H7v-2Zm0 4h6v2H7v-2Z"
          />
        </svg>
      ),
    },
    {
      label: "إضافة تسليم",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M3 7h11v6h2V9h3l2 3v3h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H3V7Zm5 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
          />
        </svg>
      ),
    },
    {
      label: "تحميل بصيغة PDF",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5ZM8 12h8v2H8v-2Zm0 4h6v2H8v-2Z"
          />
        </svg>
      ),
    },
    {
      label: "إرسال الفاتورة بالبريد الإلكتروني",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2 8 5 8-5H4Z"
          />
        </svg>
      ),
    },
    {
      label: "إرسال الفاتورة عبر الواتس",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 3a9 9 0 0 1 7.8 13.5L21 21l-4.7-1.2A9 9 0 1 1 12 3Zm-4 5.5c0 4 3 6.5 6.5 6.5 1 0 1.7-.2 2.5-.6l-1.2-1.2c-.3.2-.8.3-1.3.3-1.5 0-3.4-1-4.3-2.9-.2-.4-.3-1-.3-1.4 0-.3 0-.7.2-1l-1.3-1.3c-.4.7-.8 1.5-.8 1.6Z"
          />
        </svg>
      ),
    },
    {
      label: "فاتورة تسليم",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M3 7h11v6h2V9h3l2 3v3h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H3V7Zm5 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
          />
        </svg>
      ),
    },
    {
      label: "تعديل المندوب / الموظف",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm6 8H6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4Zm-6.3-6.6 5.1-5.1 1.4 1.4-5.1 5.1-2 .6.6-2Z"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    if (openMenuId === null) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && menuRef.current.contains(event.target as Node)) {
        return;
      }
      if (menuButtonRef.current && menuButtonRef.current.contains(event.target as Node)) {
        return;
      }
      setOpenMenuId(null);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openMenuId]);

  const totals = useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        acc.total += row.total;
        acc.paid += row.paid;
        acc.remaining += row.remaining;
        acc.subtotal += row.subtotal;
        acc.tax += row.tax;
        return acc;
      },
      { total: 0, paid: 0, remaining: 0, subtotal: 0, tax: 0 }
    );
  }, []);

  return (
    <DashboardShell title="فواتير ضريبية مبسطة" subtitle="فواتير ضريبية مبسطة (جميع الفروع)" hideHeaderFilters>
      <section className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 shadow-(--dash-shadow)">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-(--dash-text)">فواتير ضريبية مبسطة (جميع الفروع)</span>
          <span className="text-(--dash-muted)">البيانات الظاهرة في اخر 30 يوم . برجاء استخدام النموذج لإظهار مزيد من النتائج</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
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
              placeholder="بحث"
              className="w-full bg-transparent text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
            />
          </div>
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-(--dash-primary) text-white">
              <tr>
                <th className="px-3 py-3 text-right font-semibold">
                  <input type="checkbox" className="h-4 w-4 rounded border border-(--dash-border)" />
                </th>
                <th className="px-3 py-3 text-right font-semibold">رقم الفاتورة</th>
                <th className="px-3 py-3 text-right font-semibold">التاريخ</th>
                <th className="px-3 py-3 text-right font-semibold">الرقم المرجعي</th>
                <th className="px-3 py-3 text-right font-semibold">كاشير</th>
                <th className="px-3 py-3 text-right font-semibold">عميل</th>
                <th className="px-3 py-3 text-right font-semibold">حالة المبيع</th>
                <th className="px-3 py-3 text-right font-semibold">المجموع الكلي</th>
                <th className="px-3 py-3 text-right font-semibold">مدفوع</th>
                <th className="px-3 py-3 text-right font-semibold">المبلغ المتبقي</th>
                <th className="px-3 py-3 text-right font-semibold">بدون ضريبة</th>
                <th className="px-3 py-3 text-right font-semibold">الضريبة</th>
                <th className="px-3 py-3 text-right font-semibold">حالة الدفع</th>
                <th className="px-3 py-3 text-right font-semibold">نوع الدفع</th>
                <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-(--dash-border) text-(--dash-text)">
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={Boolean(selectedRows[row.id])}
                      onChange={(event) =>
                        setSelectedRows((prev) => ({ ...prev, [row.id]: event.target.checked }))
                      }
                      className="h-4 w-4 rounded border border-(--dash-border)"
                    />
                  </td>
                  <td className="px-3 py-3 font-semibold">{row.id}</td>
                  <td className="px-3 py-3 text-(--dash-muted)">
                    <div className="flex flex-col">
                      <span>{row.date}</span>
                      <span className="text-xs text-(--dash-muted-2)">{row.time}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 font-semibold text-(--dash-text)">{row.reference}</td>
                  <td className="px-3 py-3">{row.cashier}</td>
                  <td className="px-3 py-3">{row.customer}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${saleStyles[row.saleStatus]}`}>
                      {row.saleStatus}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-semibold">{formatNumber(row.total)}</td>
                  <td className="px-3 py-3 font-semibold">{formatNumber(row.paid)}</td>
                  <td className="px-3 py-3 font-semibold">{formatNumber(row.remaining)}</td>
                  <td className="px-3 py-3">{formatNumber(row.subtotal)}</td>
                  <td className="px-3 py-3">{formatNumber(row.tax)}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${statusStyles[row.paymentStatus]}`}>
                      {row.paymentStatus}
                    </span>
                  </td>
                  <td className="px-3 py-3">{row.paymentType}</td>
                  <td className="relative px-3 py-3">
                    <button
                      type="button"
                      onClick={(event) => {
                        menuButtonRef.current = event.currentTarget;
                        setOpenMenuId((prev) => (prev === row.id ? null : row.id));
                      }}
                      className="rounded-full bg-(--dash-primary) px-3 py-1 text-xs font-semibold text-white"
                    >
                      الإجراءات
                    </button>
                    {openMenuId === row.id ? (
                      <div
                        ref={menuRef}
                        className="absolute end-3 top-12 z-20 w-64 rounded-xl border border-(--dash-border) bg-(--dash-panel) p-2 text-xs shadow-(--dash-shadow)"
                      >
                        {actionItems.map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => setOpenMenuId(null)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
                          >
                            <span className="text-(--dash-muted-2)">{item.icon}</span>
                            <span className="flex-1 text-right">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-(--dash-border) text-(--dash-text)">
              <tr>
                <td className="px-3 py-3 font-semibold" colSpan={7}>
                  الإجمالي
                </td>
                <td className="px-3 py-3 font-semibold">{formatNumber(totals.total)}</td>
                <td className="px-3 py-3 font-semibold">{formatNumber(totals.paid)}</td>
                <td className="px-3 py-3 font-semibold">{formatNumber(totals.remaining)}</td>
                <td className="px-3 py-3 font-semibold">{formatNumber(totals.subtotal)}</td>
                <td className="px-3 py-3 font-semibold">{formatNumber(totals.tax)}</td>
                <td className="px-3 py-3" colSpan={3} />
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
      <div className="mt-3 text-sm text-(--dash-muted)">عرض 1 إلى 10 من 75 سجلات</div>
    </DashboardShell>
  );
};

export default Page;
