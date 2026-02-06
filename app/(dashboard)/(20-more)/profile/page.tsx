"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const stats = [
  { label: "الفواتير", value: "156" },
  { label: "المدفوعات", value: "89" },
  { label: "العملاء", value: "45" },
  { label: "التقارير", value: "23" },
];

const tabs = ["المعلومات الشخصية", "الأمان والخصوصية", "الإشعارات", "التفضيلات", "النشاط الأخير"];

const profileFields = [
  { label: "الاسم الكامل", value: "أحمد محمد العلي" },
  { label: "البريد الإلكتروني", value: "ahmed.ali@looptech.sa" },
  { label: "رقم الهاتف", value: "+966501234567" },
  { label: "القسم", value: "الإدارة" },
  { label: "العنوان", value: "الرياض، المملكة العربية السعودية" },
];

const page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    setShowSaved(true);
    window.setTimeout(() => setShowSaved(false), 2500);
  };

  return (
    <DashboardShell
      title="الملف الشخصي"
      subtitle="إدارة معلوماتك الشخصية وإعداداتك"
      hideHeaderFilters
      headerAction={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsEditing((prev) => !prev);
              setShowSaved(false);
            }}
            className="flex items-center gap-2 rounded-2xl bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M16.3 3.3 20.7 7.7a1 1 0 0 1 0 1.4l-8.9 8.9-4.2.6.6-4.2 8.9-8.9a1 1 0 0 1 1.4 0ZM5 20h14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2Z"
              />
            </svg>
            تعديل الملف الشخصي
          </button>
          {isEditing ? (
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 rounded-2xl bg-(--dash-success) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M17 3h-2V2H9v1H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-2 0v2H9V3h6Zm-1 7h-4v-2h4v2Zm0 4H9v-2h5v2Z"
                />
              </svg>
              حفظ التغييرات
            </button>
          ) : null}
        </div>
      }
    >
      <section className="space-y-6">
        <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--dash-primary) text-2xl font-semibold text-white">
                  أم
                </div>
                {isEditing ? (
                  <button
                    type="button"
                    className="absolute -bottom-1 -left-1 flex h-7 w-7 items-center justify-center rounded-full bg-(--dash-panel) text-(--dash-primary) shadow-(--dash-shadow)"
                    aria-label="تغيير الصورة الشخصية"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M9 4 7.5 6H5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-2.5L15 4H9Zm3 5a4 4 0 1 1-4 4 4 4 0 0 1 4-4Z"
                      />
                    </svg>
                  </button>
                ) : null}
              </div>
              <div>
                <h2 className="text-xl font-semibold">أحمد محمد العلي</h2>
                <p className="text-sm text-(--dash-muted)">مدير النظام</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-2 rounded-full border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M6.6 10.8a15.4 15.4 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.4.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1h3.6a1 1 0 0 1 1 1 11 11 0 0 0 .6 3.4 1 1 0 0 1-.25 1Z"
                      />
                    </svg>
                    +966501234567
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.2l8 5 8-5V7H4Zm0 3.4V17h16v-6.6l-7.4 4.6a1 1 0 0 1-1.2 0L4 10.4Z"
                      />
                    </svg>
                    ahmed.ali@looptech.sa
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-(--dash-primary-soft) px-3 py-1 text-(--dash-primary)">
                    الإدارة
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-5 text-right"
            >
              <p className="text-sm text-(--dash-muted)">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6">
          <div className="flex flex-wrap items-center gap-3">
            {tabs.map((tab, index) => {
              const baseClass =
                "flex items-center gap-2 rounded-2xl px-4 py-2 text-sm border border-(--dash-border) bg-(--dash-panel-soft) text-(--dash-muted)";
              const activeClass = "bg-(--dash-primary) text-white border-transparent";

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
                  className={`${baseClass} ${index === 0 ? activeClass : ""}`}
                >
                  {index === 0 ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
                      />
                    </svg>
                  ) : null}
                  {tab}
                </button>
              );
            })}
          </div>

          {showSaved ? (
            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-(--dash-success) bg-emerald-500/10 px-4 py-3 text-sm text-(--dash-success)">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-(--dash-success) text-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path fill="currentColor" d="M9.5 16.2 5.8 12.5l1.4-1.4 2.3 2.3 6.1-6.1 1.4 1.4-7.5 7.5Z" />
                </svg>
              </span>
              تم حفظ التغييرات بنجاح
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {profileFields.map((field) => (
              <label key={field.label} className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                <span>{field.label}</span>
                <input
                  type="text"
                  readOnly={!isEditing}
                  defaultValue={field.value}
                  className={`w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm focus:outline-none ${
                    isEditing
                      ? "text-(--dash-text) focus:ring-2 focus:ring-(--dash-primary)/40"
                      : "text-(--dash-muted)"
                  }`}
                />
              </label>
            ))}
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default page;
