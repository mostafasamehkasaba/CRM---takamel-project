"use client";

import Link from "next/link";
import DashboardShell from "../../components/DashboardShell";

const tabs = ["المعلومات الشخصية", "الأمان والخصوصية", "الإشعارات", "التفضيلات", "النشاط الأخير"];

const securitySettings = [
  {
    title: "المصادقة الثنائية",
    description: "حماية إضافية لحسابك",
    status: "مفعّل",
  },
  {
    title: "تنبيهات تسجيل الدخول",
    description: "تلقي إشعار عند كل تسجيل دخول",
    status: "مفعّل",
  },
];

const page = () => {
  return (
    <DashboardShell title="الأمان والخصوصية" subtitle="إدارة إعدادات الأمان لحسابك" hideHeaderFilters>
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
                  className={`${baseClass} ${index === 1 ? activeClass : ""}`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel-soft) p-6">
              <h3 className="text-lg font-semibold">تغيير كلمة المرور</h3>
              <p className="mt-1 text-sm text-(--dash-muted)">
                قم بتحديث كلمة المرور بشكل دوري للحفاظ على الأمان.
              </p>
              <div className="mt-5 space-y-4">
                {[
                  { label: "كلمة المرور الحالية", placeholder: "أدخل كلمة المرور الحالية" },
                  { label: "كلمة المرور الجديدة", placeholder: "أدخل كلمة المرور الجديدة" },
                  { label: "تأكيد كلمة المرور", placeholder: "أعد إدخال كلمة المرور الجديدة" },
                ].map((field) => (
                  <label key={field.label} className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                    <span>{field.label}</span>
                    <input
                      type="password"
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-3 text-sm text-(--dash-text) focus:outline-none focus:ring-2 focus:ring-(--dash-primary)/30"
                    />
                  </label>
                ))}
              </div>
              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M7 10h10v2H7v-2Zm5-8a5 5 0 0 1 5 5v2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5Zm-3 7h6V7a3 3 0 0 0-6 0v2Z"
                  />
                </svg>
                تحديث كلمة المرور
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">إعدادات الأمان</h3>
              {securitySettings.map((setting) => (
                <div
                  key={setting.title}
                  className="flex items-center justify-between rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-5"
                >
                  <div>
                    <p className="font-semibold">{setting.title}</p>
                    <p className="mt-1 text-sm text-(--dash-muted)">{setting.description}</p>
                  </div>
                  <span className="rounded-full bg-(--dash-primary) px-4 py-1 text-xs font-semibold text-white">
                    {setting.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default page;
