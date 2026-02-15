"use client";

import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const Page = () => {
  return (
    <DashboardShell title="لوحة متابعة المندوبين" subtitle="النظام / فريق المبيعات" hideHeaderFilters>
      <section className="space-y-6">
        <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <h2 className="text-2xl font-semibold text-(--dash-text)">لوحة متابعة المندوبين</h2>
                <p className="text-sm text-(--dash-muted)">تحليل أداء المندوبين وإدارة النمو في المنصة.</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) text-(--dash-primary)">
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3 11h3v3H8v-3Zm5-5h3v8h-3V9Zm-5 2h3v6H8v-6Z"
                  />
                </svg>
              </span>
            </div>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-300">
              PERFORMANCE TRACKING SYSTEM
            </span>
          </div>
        </div>

        <div className="rounded-[28px] border border-(--dash-border) bg-[#0b0f1f] p-6 text-white shadow-[0_30px_90px_rgba(9,15,31,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-indigo-600/90 p-4 text-center shadow-[0_20px_40px_rgba(79,70,229,0.45)]">
                <p className="text-2xl font-semibold">0</p>
                <p className="mt-1 text-xs text-indigo-100">المهام النشطة</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 text-center">
                <p className="text-2xl font-semibold">0</p>
                <p className="mt-1 text-xs text-white/70">إجمالي المندوبين</p>
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-4xl font-semibold text-white">فريق المبيعات</h3>
              <p className="mt-2 text-sm text-white/70">
                متابعة الأداء الحي للمندوبين، تحليل الأهداف الاستراتيجية، وإدارة النمو بمنصة واحدة.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "إجمالي الأهداف", value: "0 ج.م", tone: "bg-indigo-500/20 text-indigo-200" },
              { label: "المحقق فعلياً", value: "0 ج.م", tone: "bg-emerald-500/20 text-emerald-200" },
              { label: "على المسار", value: "0 من 0", tone: "bg-amber-500/20 text-amber-200" },
              { label: "بحاجة متابعة", value: "0 مندوب", tone: "bg-rose-500/20 text-rose-200" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-[inset_0_0_25px_rgba(255,255,255,0.05)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-white/70">{item.label}</span>
                  <span className={`rounded-full px-2 py-1 text-[11px] ${item.tone}`}>KPIs</span>
                </div>
                <p className="mt-4 text-2xl font-semibold">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 text-xs text-white/70">
              {["الكل", "مبيعات", "تحصيل", "الفعل تحقيقاً"].map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={`rounded-xl px-3 py-1.5 ${index === 0 ? "bg-white/15 text-white" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/60" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M10 2a8 8 0 1 0 5.29 14l4.7 4.7a1 1 0 0 0 1.42-1.4l-4.7-4.7A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
                />
              </svg>
              <input
                type="text"
                placeholder="ابحث عن مندوب..."
                className="w-full bg-transparent text-white placeholder:text-white/50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-(--dash-border) bg-[#0b0f1f] p-10 text-center text-white shadow-[0_30px_90px_rgba(9,15,31,0.45)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-white/70" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm6 8H6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4Z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-semibold">لا يوجد مندوبين</h3>
          <p className="mt-2 text-sm text-white/60">
            قم بإضافة فريق المبيعات من قسم البيانات الأساسية لعرضهم في هذه اللوحة.
          </p>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
