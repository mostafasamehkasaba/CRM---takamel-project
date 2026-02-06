"use client";

import Link from "next/link";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const tabs = ["المعلومات الشخصية", "الأمان والخصوصية", "الإشعارات", "التفضيلات", "النشاط الأخير"];

const page = () => {
  return (
    <DashboardShell title="التفضيلات" subtitle="ضبط تفضيلات الحساب" hideHeaderFilters>
      <section className="space-y-6">
        <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6">
          <div className="flex flex-wrap items-center gap-3">
            {tabs.map((tab, index) => {
              const baseClass =
                "flex items-center gap-2 rounded-2xl px-4 py-2 text-sm border border-(--dash-border) bg-(--dash-panel-soft) text-(--dash-muted)";
              const activeClass = "bg-(--dash-primary) text-white border-transparent";

              if (index === 0) {
                return (
                  <Link key={tab} href="/profile" className={baseClass}>
                    {tab}
                  </Link>
                );
              }

              if (index === 1) {
                return (
                  <Link key={tab} href="/profile/security" className={baseClass}>
                    {tab}
                  </Link>
                );
              }

              if (index === 2) {
                return (
                  <Link key={tab} href="/profile/notifications" className={baseClass}>
                    {tab}
                  </Link>
                );
              }
              if (index === 4) {
                return (
                  <Link key={tab} href="/profile/activity" className={baseClass}>
                    {tab}
                  </Link>
                );
              }

              return (
                <button
                  key={tab}
                  type="button"
                  className={`${baseClass} ${index === 3 ? activeClass : ""}`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
              <span>اللغة</span>
              <select className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none">
                <option>العربية</option>
                <option>English</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
              <span>المنطقة الزمنية</span>
              <select className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none">
                <option>الرياض (GMT+3)</option>
                <option>دبي (GMT+4)</option>
                <option>القاهرة (GMT+2)</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
              <span>العملة الافتراضية</span>
              <select className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none">
                <option>ريال سعودي (SAR)</option>
                <option>دولار أمريكي (USD)</option>
                <option>درهم إماراتي (AED)</option>
              </select>
            </label>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default page;
