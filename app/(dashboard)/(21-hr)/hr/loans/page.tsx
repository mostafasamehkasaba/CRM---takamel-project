"use client";

import { useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const Page = () => {
  const [showLoanModal, setShowLoanModal] = useState(false);
  const closeModal = () => setShowLoanModal(false);

  return (
    <DashboardShell title="السلف والقروض" subtitle="الموارد البشرية / السلف والقروض" hideHeaderFilters>
      <section className="space-y-4">
        <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <h2 className="text-2xl font-semibold text-(--dash-text)">السلف والقروض</h2>
                <p className="text-sm text-(--dash-muted)">إدارة سلف الموظفين ومتابعة الأقساط الشهرية</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) text-(--dash-primary)">
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M3 7a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v.6l5 2.9v5l-5 2.9V19a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7Zm4 2h6v2H7V9Zm0 4h5v2H7v-2Z"
                  />
                </svg>
              </span>
            </div>
            <button
              type="button"
              className="ms-auto flex items-center gap-2 rounded-2xl bg-(--dash-primary) px-5 py-3 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
              onClick={() => setShowLoanModal(true)}
            >
              <span className="text-lg">+</span>
              طلب سلفة جديدة
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "إجمالي السلف النشطة", value: "0 ج.م", tone: "bg-indigo-500/15 text-indigo-300" },
              { label: "الاستقطاع الشهري", value: "0 ج.م", tone: "bg-emerald-500/15 text-emerald-300" },
              { label: "طلبات معلقة", value: "0 طلب", tone: "bg-amber-500/15 text-amber-300" },
              { label: "عدد المستفيدين", value: "0 موظف", tone: "bg-sky-500/15 text-sky-300" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-(--dash-text)">{item.label}</span>
                  <span className={`rounded-full px-2 py-1 text-xs ${item.tone}`}>HR</span>
                </div>
                <p className="mt-6 text-2xl font-semibold text-(--dash-text)">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-(--dash-primary)">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M3 7a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v.6l5 2.9v5l-5 2.9V19a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7Zm4 2h6v2H7V9Zm0 4h5v2H7v-2Z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-(--dash-text)">سجل السلف والقروض</h3>
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-panel-soft) text-(--dash-muted)">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">الموظف</th>
                  <th className="px-3 py-3 text-right font-semibold">نوع السلفة</th>
                  <th className="px-3 py-3 text-right font-semibold">المبلغ الإجمالي</th>
                  <th className="px-3 py-3 text-right font-semibold">المتبقي</th>
                  <th className="px-3 py-3 text-right font-semibold">القسط الشهري</th>
                  <th className="px-3 py-3 text-right font-semibold">التاريخ</th>
                  <th className="px-3 py-3 text-right font-semibold">الحالة</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-(--dash-border)">
                  <td className="px-3 py-10 text-center text-sm text-(--dash-muted)" colSpan={8}>
                    لا توجد بيانات للعرض
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {showLoanModal ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
          <button
            type="button"
            onClick={closeModal}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            aria-label="إغلاق النافذة"
          />
          <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <span className="text-xl font-semibold">+</span>
                </span>
                <h3 className="text-lg font-semibold text-slate-900">طلب سلفة جديدة</h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500"
                aria-label="إغلاق"
              >
                ×
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <label className="text-xs text-slate-500">
                <span className="mb-2 block font-semibold text-slate-700">الموظف</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none">
                  <option>اختر موظف...</option>
                  <option>محمد علي</option>
                  <option>سارة أحمد</option>
                  <option>خالد سالم</option>
                </select>
              </label>

              <label className="text-xs text-slate-500">
                <span className="mb-2 block font-semibold text-slate-700">نوع السلفة</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none">
                  <option>سلفة شخصية</option>
                  <option>سلفة طارئة</option>
                  <option>قرض طويل</option>
                </select>
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs text-slate-500">
                  <span className="mb-2 block font-semibold text-slate-700">المبلغ الإجمالي</span>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                  />
                </label>
                <label className="text-xs text-slate-500">
                  <span className="mb-2 block font-semibold text-slate-700">القسط الشهري</span>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                  />
                </label>
              </div>

              <label className="text-xs text-slate-500">
                <span className="mb-2 block font-semibold text-slate-700">تاريخ بداية الخصم</span>
                <input
                  type="date"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                />
              </label>

              <label className="text-xs text-slate-500">
                <span className="mb-2 block font-semibold text-slate-700">ملاحظات</span>
                <textarea
                  rows={3}
                  placeholder="أي تفاصيل إضافية..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                />
              </label>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button type="button" onClick={closeModal} className="text-sm text-slate-500">
                إلغاء
              </button>
              <button
                type="button"
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
              >
                حفظ الطلب
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
};

export default Page;
