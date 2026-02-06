"use client";

import Link from "next/link";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const tabs = ["المعلومات الشخصية", "الأمان والخصوصية", "الإشعارات", "التفضيلات", "النشاط الأخير"];

const activities = [
  { time: "10:30 2026-01-16", title: "إنشاء فاتورة", detail: "فاتورة #INV-123", age: "منذ ساعة" },
  { time: "08:00 2026-01-16", title: "تحديث عميل", detail: "شركة النور التجارية", age: "منذ 3 ساعات" },
  { time: "16:00 2026-01-15", title: "إضافة منتج", detail: "لابتوب HP ProBook 450", age: "أمس" },
  { time: "14:00 2026-01-14", title: "توليد تقرير", detail: "تقرير المبيعات الشهري", age: "منذ يومين" },
];

const page = () => {
  return (
    <DashboardShell title="النشاط الأخير" subtitle="متابعة آخر العمليات" hideHeaderFilters>
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

              if (index === 3) {
                return (
                  <Link key={tab} href="/profile/preferences" className={baseClass}>
                    {tab}
                  </Link>
                );
              }

              return (
                <button
                  key={tab}
                  type="button"
                  className={`${baseClass} ${index === 4 ? activeClass : ""}`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="mt-6 space-y-4">
            {activities.map((item) => (
              <div
                key={`${item.time}-${item.title}`}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-5 py-4 lg:flex-row-reverse"
              >
                <div className="order-2 text-sm text-(--dash-muted) lg:order-1">{item.time}</div>
                <div className="order-1 text-right lg:order-2">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-(--dash-muted)">{item.detail}</p>
                  <p className="mt-1 text-xs text-(--dash-muted)">{item.age}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default page;
