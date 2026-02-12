"use client";

import { useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const discountReasons = [
  "خصم تعجيل دفع",
  "خصم كمية / تاريخ",
  "تسوية بضائع تالفة",
  "فروق أسعار",
  "سبب آخر",
];

const archiveRows = [
  {
    id: "CN-2026-021",
    date: "12/02/2026",
    party: "شركة النور التجارية",
    type: "مبلغ ثابت",
    amount: "1,450.00",
    status: "مكتمل",
  },
  {
    id: "CN-2026-018",
    date: "06/02/2026",
    party: "مؤسسة الريادة",
    type: "نسبة %",
    amount: "4",
    status: "قيد المراجعة",
  },
  {
    id: "CN-2026-012",
    date: "29/01/2026",
    party: "سما للتوريد",
    type: "مبلغ ثابت",
    amount: "980.00",
    status: "مكتمل",
  },
  {
    id: "CN-2026-007",
    date: "20/01/2026",
    party: "الصفا للتجارة",
    type: "نسبة %",
    amount: "2.5",
    status: "ملغي",
  },
];

const statusStyles: Record<string, string> = {
  مكتمل: "bg-emerald-100 text-emerald-700",
  "قيد المراجعة": "bg-amber-100 text-amber-700",
  ملغي: "bg-rose-100 text-rose-700",
};

const Page = () => {
  const [discountType, setDiscountType] = useState<"amount" | "percent">("amount");
  const [reason, setReason] = useState(discountReasons[0]);
  const [view, setView] = useState<"form" | "archive">("form");

  return (
    <DashboardShell title="خصم مكتسب" subtitle="النظام / الموردين / خصم مكتسب" hideHeaderFilters>
      <section className="space-y-6">
        <div className="relative overflow-hidden rounded-3xl border border-(--dash-border) bg-gradient-to-l from-(--dash-primary) via-emerald-600 to-teal-600 p-6 text-white shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute -top-12 right-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute -bottom-10 left-6 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          </div>
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-2xl font-semibold">خصم مكتسب (إشعار دائن)</p>
                <p className="mt-1 text-sm text-white/80">تسجيل إشعارات الخصم المكتسبة من الموردين.</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.2 7.7-4.6 4.6a1 1 0 0 1-1.4 0l-2-2a1 1 0 1 1 1.4-1.4l1.3 1.3 3.9-3.9a1 1 0 0 1 1.4 1.4Z"
                  />
                </svg>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setView("archive")}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                  view === "archive"
                    ? "border-white/80 bg-white text-(--dash-primary)"
                    : "border-white/40 bg-white/10 text-white"
                }`}
              >
                الأرشيف
              </button>
              <button
                type="button"
                onClick={() => setView("form")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  view === "form" ? "bg-white text-(--dash-primary)" : "bg-white/15 text-white"
                }`}
              >
                تسجيل جديد
              </button>
            </div>
          </div>
        </div>

        {view === "form" ? (
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.65fr]">
            <aside className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-5 shadow-(--dash-shadow)">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-(--dash-text)">ملخص الأثر المالي</h3>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-(--dash-border) bg-(--dash-panel-soft)">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-(--dash-muted-2)" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M4 4h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3 4h2v2H7V8Zm4 0h2v2h-2V8Zm4 0h2v2h-2V8Zm-8 4h2v2H7v-2Zm4 0h2v2h-2v-2Zm4 0h2v2h-2v-2Z"
                    />
                  </svg>
                </span>
              </div>
              <div className="mt-4 space-y-4 text-sm">
                <div className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) p-4">
                  <p className="text-xs text-(--dash-muted)">الرصيد الحالي</p>
                  <p className="mt-2 text-lg font-semibold text-(--dash-text)">0.00</p>
                </div>
                <div className="rounded-xl border border-emerald-200/60 bg-emerald-50/60 p-4 text-emerald-700">
                  <p className="text-xs">+ قيمة الخصم</p>
                  <p className="mt-2 text-lg font-semibold">0.00</p>
                </div>
                <div className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) p-4">
                  <p className="text-xs text-(--dash-muted)">الرصيد المتوقع</p>
                  <p className="mt-2 text-lg font-semibold text-(--dash-text)">0.00</p>
                </div>
              </div>
              <div className="mt-5 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) p-4 text-xs text-(--dash-muted)">
                <p>سيتم ترحيل قيد يومية:</p>
                <ul className="mt-2 space-y-1">
                  <li>من ح/ الموردين (Debit)</li>
                  <li>إلى ح/ خصم مكتسب (Credit)</li>
                </ul>
              </div>
            </aside>

            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-(--dash-muted)">
                  <span className="mb-2 block font-semibold text-(--dash-text)">المورد (الجهة المانحة) *</span>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none">
                    <option>اختر المورد...</option>
                    <option>شركة النور التجارية</option>
                    <option>مؤسسة الريادة</option>
                  </select>
                </label>
                <label className="text-sm text-(--dash-muted)">
                  <span className="mb-2 block font-semibold text-(--dash-text)">التاريخ</span>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                    defaultValue="2026-02-12"
                  />
                </label>
                <label className="text-sm text-(--dash-muted)">
                  <span className="mb-2 block font-semibold text-(--dash-text)">رقم الإشعار الدائن (من المورد)</span>
                  <input
                    type="text"
                    placeholder="CN-2024-001"
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                  />
                </label>
                <label className="text-sm text-(--dash-muted)">
                  <span className="mb-2 block font-semibold text-(--dash-text)">ربط الفاتورة (اختياري)</span>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none">
                    <option>— خصم عام على الحساب —</option>
                    <option>فاتورة رقم INV-234</option>
                  </select>
                </label>
              </div>

              <div className="mt-5 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-(--dash-text)">قيمة الخصم</p>
                  <div className="flex items-center gap-2 rounded-full border border-(--dash-border) bg-(--dash-panel) p-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setDiscountType("amount")}
                      className={`rounded-full px-3 py-1.5 transition ${
                        discountType === "amount"
                          ? "bg-(--dash-primary) text-white"
                          : "text-(--dash-muted) hover:bg-(--dash-panel-soft)"
                      }`}
                    >
                      مبلغ ثابت
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiscountType("percent")}
                      className={`rounded-full px-3 py-1.5 transition ${
                        discountType === "percent"
                          ? "bg-(--dash-primary) text-white"
                          : "text-(--dash-muted) hover:bg-(--dash-panel-soft)"
                      }`}
                    >
                      نسبة %
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    placeholder="0.00"
                    className="h-11 w-full flex-1 rounded-xl border border-(--dash-border) bg-(--dash-panel) px-3 text-(--dash-text) focus:outline-none"
                  />
                  <div className="flex h-11 min-w-[96px] items-center justify-center rounded-xl border border-(--dash-border) bg-(--dash-panel) px-3 text-sm text-(--dash-muted-2)">
                    {discountType === "amount" ? "EGP" : "%"}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <p className="mb-2 text-sm font-semibold text-(--dash-text)">سبب الخصم</p>
                <div className="flex flex-wrap gap-2">
                  {discountReasons.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setReason(item)}
                      className={`rounded-full border px-3 py-1 text-xs transition ${
                        reason === item
                          ? "border-(--dash-primary) bg-(--dash-primary) text-white"
                          : "border-(--dash-border) text-(--dash-muted) hover:bg-(--dash-panel-soft)"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <label className="text-sm text-(--dash-muted)">
                  <span className="mb-2 block font-semibold text-(--dash-text)">ملاحظات إضافية</span>
                  <textarea
                    rows={4}
                    placeholder="تفاصيل إضافية..."
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                  />
                </label>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-(--dash-primary) px-4 py-3 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
                >
                  حفظ الإشعار
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4ZM5 5h11v4H5V5Zm7 14H6v-6h6v6Zm7 0h-5v-8H5v8H5V5h12.6L19 6.4V19Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <section id="archive" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-(--dash-text)">أرشيف الإشعارات</p>
                <p className="text-sm text-(--dash-muted)">عرض كل إشعارات الخصم المكتسب السابقة والبحث داخلها.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="search"
                  placeholder="بحث سريع..."
                  className="w-48 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm text-(--dash-text) focus:outline-none"
                />
                <select className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm text-(--dash-text) focus:outline-none">
                  <option>كل الحالات</option>
                  <option>مكتمل</option>
                  <option>قيد المراجعة</option>
                  <option>ملغي</option>
                </select>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
              <table className="w-full text-right text-sm">
                <thead className="bg-(--dash-primary) text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">#</th>
                    <th className="px-4 py-3 font-semibold">التاريخ</th>
                    <th className="px-4 py-3 font-semibold">المورد</th>
                    <th className="px-4 py-3 font-semibold">رقم الإشعار</th>
                    <th className="px-4 py-3 font-semibold">نوع الخصم</th>
                    <th className="px-4 py-3 font-semibold">قيمة الخصم</th>
                    <th className="px-4 py-3 font-semibold">الحالة</th>
                    <th className="px-4 py-3 font-semibold">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-(--dash-border)">
                  {archiveRows.map((row, index) => (
                    <tr key={row.id} className="bg-(--dash-panel) text-(--dash-text) hover:bg-(--dash-panel-soft)">
                      <td className="px-4 py-3 font-semibold">{index + 1}</td>
                      <td className="px-4 py-3 text-(--dash-muted)">{row.date}</td>
                      <td className="px-4 py-3">{row.party}</td>
                      <td className="px-4 py-3">{row.id}</td>
                      <td className="px-4 py-3">{row.type}</td>
                      <td className="px-4 py-3">
                        {row.type === "نسبة %" ? `${row.amount}%` : `${row.amount} EGP`}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[row.status]}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            className="rounded-lg border border-(--dash-border) px-3 py-1 text-xs text-(--dash-primary) hover:bg-(--dash-panel-soft)"
                          >
                            عرض
                          </button>
                          <button
                            type="button"
                            className="rounded-lg border border-(--dash-border) px-3 py-1 text-xs text-(--dash-muted) hover:bg-(--dash-panel-soft)"
                          >
                            تعديل
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </section>
    </DashboardShell>
  );
};

export default Page;
