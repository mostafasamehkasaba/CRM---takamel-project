"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const tabs = ["المعلومات الشخصية", "الأمان والخصوصية", "الإشعارات", "التفضيلات", "النشاط الأخير"];

const notificationSettings = [
  { label: "الفواتير", status: "مفعل" },
  { label: "المدفوعات", status: "مفعل" },
  { label: "المخزون", status: "مفعل" },
  { label: "انتهاء الصلاحية", status: "مفعل" },
  { label: "العملاء الجدد", status: "غير مفعل" },
  { label: "التقارير", status: "مفعل" },
];

const page = () => {
  const [settings, setSettings] = useState(
    notificationSettings.map((item) => ({
      ...item,
      enabled: item.status === "مفعل",
    }))
  );

  const toggleSetting = (label: string) => {
    setSettings((prev) =>
      prev.map((item) =>
        item.label === label ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <DashboardShell title="الإشعارات" subtitle="إدارة إعدادات الإشعارات" hideHeaderFilters>
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
                  className={`${baseClass} ${index === 2 ? activeClass : ""}`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold">إعدادات الإشعارات</h3>
            {settings.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3"
              >
                <span className="text-sm">{item.label}</span>
                <button
                  type="button"
                  onClick={() => toggleSetting(item.label)}
                  className={`rounded-full px-4 py-1 text-xs font-semibold transition ${
                    item.enabled
                      ? "bg-(--dash-primary) text-white"
                      : "bg-(--dash-panel) text-(--dash-muted)"
                  }`}
                >
                  {item.enabled ? "مفعل" : "غير مفعل"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default page;
