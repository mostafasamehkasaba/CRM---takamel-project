"use client";

import { useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const Page = () => {
  const [showPayrollModal, setShowPayrollModal] = useState(false);

  const closeModal = () => setShowPayrollModal(false);

  return (
    <DashboardShell title="إدارة الرواتب" subtitle="الموارد البشرية / إدارة الرواتب" hideHeaderFilters>
      <section className="space-y-4">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <h2 className="text-2xl font-semibold text-(--dash-text)">إدارة الرواتب</h2>
                <p className="text-sm text-(--dash-muted)">سجلات الرواتب الشهرية والاعتمادات المالية</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-(--dash-border) bg-white text-(--dash-primary)">
                <span className="text-xl font-semibold">$</span>
              </span>
            </div>
            <button
              type="button"
              className="ms-auto flex items-center gap-2 rounded-2xl bg-(--dash-primary) px-5 py-3 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
              onClick={() => setShowPayrollModal(true)}
            >
              <span className="text-lg">+</span>
              إنشاء مسير راتب جديد
            </button>
          </div>
        </div>

        <div className="min-h-[420px] rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-6" />
      </section>

      {showPayrollModal ? (
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
                <h3 className="text-lg font-semibold text-slate-900">مسير راتب جديد</h3>
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
                <span className="mb-2 block font-semibold text-slate-700">الشهر</span>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none">
                  <option>يناير</option>
                  <option>فبراير</option>
                  <option>مارس</option>
                  <option>أبريل</option>
                  <option>مايو</option>
                  <option>يونيو</option>
                  <option>يوليو</option>
                  <option>أغسطس</option>
                  <option>سبتمبر</option>
                  <option>أكتوبر</option>
                  <option>نوفمبر</option>
                  <option>ديسمبر</option>
                </select>
              </label>

              <label className="text-xs text-slate-500">
                <span className="mb-2 block font-semibold text-slate-700">السنة</span>
                <input
                  type="text"
                  defaultValue="2026"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                />
              </label>

              <div className="flex items-center gap-6 text-sm text-slate-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-rose-600" />
                  تطبيق الضرائب
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-rose-600" />
                  تطبيق التأمينات
                </label>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"
            >
              <span className="text-lg">+</span>
              إنشاء المسير
            </button>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
};

export default Page;
