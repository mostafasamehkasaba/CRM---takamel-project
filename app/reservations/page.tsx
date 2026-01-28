"use client";

import DashboardShell from "../components/DashboardShell";

const Page = () => {
  return (
    <DashboardShell title="الجلسات النشطة" subtitle="إدارة الجلسات النشطة حاليا في النظام" hideHeaderFilters>
      <section className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-3xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
          <div className="border-l-4 border-red-500">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-l from-emerald-600 via-emerald-500 to-emerald-400 px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                    ▶
                  </span>
                  نشطة
                </span>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white"
                  aria-label="طباعة"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M6 7V3h12v4H6Zm12 2h2a2 2 0 0 1 2 2v6h-4v4H6v-4H2v-6a2 2 0 0 1 2-2h2v2h12V9Zm-4 8v-4H8v4h6Z"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-white/80">غرفة</span>
                  <span className="text-lg font-semibold">2</span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-white/15 px-3 py-2">
                  <span className="rounded-full bg-amber-300 px-3 py-1 text-sm font-semibold text-amber-900">
                    ريال 0.00
                  </span>
                  <span className="text-lg font-semibold">#5</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="rounded-2xl bg-slate-900 px-6 py-6 text-center text-white">
                <div className="text-3xl font-bold text-rose-300">00:00:00</div>
                <div className="mt-2 text-sm text-slate-300">الوقت المتبقي</div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white"
                >
                  إنهاء
                </button>
                <button
                  type="button"
                  className="rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white"
                >
                  الأصناف
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
