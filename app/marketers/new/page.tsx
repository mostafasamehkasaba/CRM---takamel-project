"use client";

"use client";

import { Fragment } from "react";
import DashboardShell from "../../components/DashboardShell";

const branches = ["مغسلة سيارات", "نشاط المطاعم", "نشاط الصالون", "نشاط الكوفي / الديوانيه", "نشاط سوبرماركت", "مغسلة ملابس"];

const Page = () => {
  return (
    <DashboardShell title="إضافة مسوق" subtitle="البداية / إعدادات النظام / المسوقين" hideHeaderFilters>
      <section className="space-y-4 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-5 shadow-(--dash-shadow)">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-(--dash-text)">إضافة مسوق</h2>
          <button type="button" className="text-xs text-(--dash-muted)">×</button>
        </div>
        <p className="text-xs text-(--dash-muted)">يرجى إدخال المعلومات التالية. الحقول التي تحمل علامة * إجبارية.</p>

        <div className="grid gap-4 lg:grid-cols-3">
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">الاسم *</span>
            <input className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">كود الخصم</span>
            <input className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">نسبة خصم العميل</span>
            <input className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">نسبة عمولة المسوق</span>
            <input className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">طريقة حساب العمولة</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <option>قبل الخصم</option>
              <option>بعد الخصم</option>
            </select>
          </label>
        </div>

        <div className="mt-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) p-4 text-sm text-(--dash-text)">
          <div className="flex items-center justify-between">
            <span className="font-semibold">إتاحة المسوق في الفروع</span>
            <button className="rounded-xl border border-(--dash-border) px-3 py-1 text-xs">إضافة فرع</button>
          </div>
          <div className="mt-3 grid gap-3">
            <div className="grid grid-cols-[1fr_auto] rounded-lg border border-(--dash-border) bg-white px-4 py-2 text-sm">
              <span>اسم الفرع</span>
              <span className="text-xs text-(--dash-muted)">الحالة</span>
            </div>
            {branches.map((branch) => (
              <div key={branch} className="grid grid-cols-[1fr_auto] items-center rounded-lg border border-(--dash-border) bg-white px-4 py-2 text-sm">
                <span>{branch}</span>
                <select className="rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1 text-xs">
                  <option>نعم</option>
                  <option>لا</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">إضافة مسوق</button>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
