"use client";

import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const Page = () => {
  return (
    <DashboardShell title="بنود الراتب" subtitle="الموارد البشرية / بنود الراتب" hideHeaderFilters>
      <section className="space-y-4">
        <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <h2 className="text-2xl font-semibold text-(--dash-text)">بنود الراتب (الاستحقاقات والاستقطاعات)</h2>
                <p className="text-sm text-(--dash-muted)">تكوين البدلات والخصومات التي يتم تطبيقها على الموظفين.</p>
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
            >
              <span className="text-lg">+</span>
              إضافة بند جديد
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6">
              <div className="flex items-center justify-between text-sm font-semibold text-rose-400">
                <span>الاستقطاعات (الخصومات)</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-rose-500/30 bg-(--dash-panel) text-rose-400">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path fill="currentColor" d="M7 7h10v2H7V7Zm0 4h6v2H7v-2Z" />
                  </svg>
                </span>
              </div>
              <div className="mt-8 text-center text-sm text-rose-300">لا توجد استقطاعات محددة</div>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
              <div className="flex items-center justify-between text-sm font-semibold text-emerald-400">
                <span>الاستحقاقات (البدلات والمكافآت)</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-(--dash-panel) text-emerald-400">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path fill="currentColor" d="M11 7h2v10h-2V7Zm-4 4h10v2H7v-2Z" />
                  </svg>
                </span>
              </div>
              <div className="mt-8 text-center text-sm text-emerald-300">لا توجد استحقاقات محددة</div>
            </div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
