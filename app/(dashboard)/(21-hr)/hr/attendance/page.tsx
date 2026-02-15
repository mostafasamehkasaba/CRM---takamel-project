"use client";

import { useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const Page = () => {
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const closeModal = () => setShowLeaveModal(false);

  return (
    <DashboardShell title="الحضور والانصراف" subtitle="الموارد البشرية / الحضور والانصراف" hideHeaderFilters>
      <section className="space-y-4">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--dash-panel-soft) text-(--dash-primary)">
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M7 2h10a2 2 0 0 1 2 2v15a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V4a2 2 0 0 1 2-2Zm2 5h6v2H9V7Zm0 4h6v2H9v-2Z"
                  />
                </svg>
              </span>
              <div>
                <h2 className="text-xl font-semibold text-(--dash-text)">سجل الحضور والانصراف</h2>
                <p className="text-sm text-(--dash-muted)">تسجيل ومتابعة حضور الموظفين وإدارة الإجازات.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text)"
              >
                تصدير
              </button>
              <button
                type="button"
                className="rounded-xl bg-(--dash-primary) px-4 py-2 font-semibold text-white"
                onClick={() => setShowLeaveModal(true)}
              >
                تسجيل إجازة
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center gap-3 border-b border-(--dash-border) pb-3 text-sm">
            <button className="rounded-xl bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text)">تسجيل يومي</button>
            <button className="rounded-xl px-4 py-2 text-(--dash-muted)">التقويم الشهري</button>
            <button className="rounded-xl px-4 py-2 text-(--dash-muted)">تقرير الحضور</button>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button className="rounded-xl bg-(--dash-panel-soft) px-4 py-2 text-xs text-(--dash-text)">
                اليوم
              </button>
              <button className="rounded-xl bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-600">
                تسجيل حضور الجميع
              </button>
              <div className="flex items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-(--dash-muted-2)" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M7 2h10a2 2 0 0 1 2 2v2H5V4a2 2 0 0 1 2-2Zm12 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8h14Zm-9 3v2h4v-2H10Z"
                  />
                </svg>
                02/15/2026
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-(--dash-muted)">
              <button className="rounded-full border border-(--dash-border) p-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path fill="currentColor" d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <div className="text-right">
                <p className="font-semibold text-(--dash-text)">الأحد</p>
                <span className="text-xs text-(--dash-muted)">15 فبراير 2026</span>
              </div>
              <button className="rounded-full border border-(--dash-border) p-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path fill="currentColor" d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {[
            { label: "إجمالي الموظفين", value: "0", tone: "bg-(--dash-panel-soft)" },
            { label: "حاضرون", value: "0", tone: "bg-emerald-50/80 text-emerald-600" },
            { label: "متأخرون", value: "0", tone: "bg-amber-50/80 text-amber-600" },
            { label: "غائبون", value: "0", tone: "bg-rose-50/80 text-rose-600" },
            { label: "إجازات", value: "0", tone: "bg-indigo-50/80 text-indigo-600" },
            { label: "ساعات العمل", value: "0.0", tone: "bg-(--dash-panel-soft)" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-(--dash-muted)">{item.label}</span>
                <span className={`rounded-xl px-2 py-1 text-[11px] ${item.tone}`}>HR</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-(--dash-text)">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs text-(--dash-text)"
            >
              جميع الحالات
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path fill="currentColor" d="M7 10l5 5 5-5H7Z" />
              </svg>
            </button>
            <div className="flex min-w-64 flex-1 items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-(--dash-muted-2)" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M10 2a8 8 0 1 0 5.29 14l4.7 4.7a1 1 0 0 0 1.42-1.4l-4.7-4.7A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
                />
              </svg>
              <input
                type="text"
                placeholder="بحث بالاسم أو القسم..."
                className="w-full bg-transparent text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-panel-soft) text-(--dash-muted)">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">الموظف</th>
                  <th className="px-3 py-3 text-right font-semibold">الحالة</th>
                  <th className="px-3 py-3 text-right font-semibold">الحضور</th>
                  <th className="px-3 py-3 text-right font-semibold">الانصراف</th>
                  <th className="px-3 py-3 text-right font-semibold">ساعات العمل</th>
                  <th className="px-3 py-3 text-right font-semibold">ساعات إضافية</th>
                  <th className="px-3 py-3 text-right font-semibold">معدل الالتزام</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-(--dash-border)">
                  <td className="px-3 py-12 text-center text-sm text-(--dash-muted)" colSpan={7}>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft)">
                        <svg viewBox="0 0 24 24" className="h-6 w-6 text-(--dash-muted-2)" aria-hidden="true">
                          <path
                            fill="currentColor"
                            d="M10 2a8 8 0 1 0 5.29 14l4.7 4.7a1 1 0 0 0 1.42-1.4l-4.7-4.7A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
                          />
                        </svg>
                      </span>
                      <span className="text-sm font-semibold text-(--dash-text)">لا يوجد موظفين مطابقين للبحث</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {showLeaveModal ? (
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
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M7 2h10a2 2 0 0 1 2 2v2H5V4a2 2 0 0 1 2-2Zm12 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8h14Zm-9 3v2h4v-2H10Z"
                    />
                  </svg>
                </span>
                <h3 className="text-lg font-semibold text-slate-900">تسجيل إجازة جديدة</h3>
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
                <span className="mb-2 block font-semibold text-slate-700">نوع الإجازة</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none">
                  <option>إجازة اعتيادية</option>
                  <option>إجازة مرضية</option>
                  <option>إجازة طارئة</option>
                  <option>إجازة بدون راتب</option>
                </select>
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs text-slate-500">
                  <span className="mb-2 block font-semibold text-slate-700">تاريخ البدء</span>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900">
                    <input type="date" className="w-full bg-transparent focus:outline-none" />
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-400" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M7 2h10a2 2 0 0 1 2 2v2H5V4a2 2 0 0 1 2-2Zm12 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8h14Zm-9 3v2h4v-2H10Z"
                      />
                    </svg>
                  </div>
                </label>
                <label className="text-xs text-slate-500">
                  <span className="mb-2 block font-semibold text-slate-700">تاريخ الانتهاء</span>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900">
                    <input type="date" className="w-full bg-transparent focus:outline-none" />
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-400" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M7 2h10a2 2 0 0 1 2 2v2H5V4a2 2 0 0 1 2-2Zm12 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8h14Zm-9 3v2h4v-2H10Z"
                      />
                    </svg>
                  </div>
                </label>
              </div>

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
                تسجيل الإجازة
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
};

export default Page;
