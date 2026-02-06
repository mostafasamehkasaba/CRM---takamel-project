"use client";

import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const accountTypes = ["جذري", "عام", "فرعي"];
const accountLevels = [1, 2, 3];
const accountLists = ["أصول", "خصوم", "إيرادات", "مصروفات", "حقوق الملكية"];
const sides = ["جانب مدين", "جانب دائن"];

const Page = () => (
  <DashboardShell title="إضافة حساب" subtitle="البداية / الشجرة المحاسبية / إضافة حساب" hideHeaderFilters>
    <section className="space-y-5">
      <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm text-(--dash-muted)">
        الرجاء إدخال المعلومات أدناه. تسميات الحقول التي تحمل علامة * هي حقول إجبارية.
      </div>

      <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-[0_20px_30px_rgba(0,0,0,0.25)] text-(--dash-text)">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">كود الحساب *</span>
            <input className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">اسم الحساب *</span>
            <input className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">نوع الحساب *</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              {accountTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">يصـب في *</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              {accountTypes.filter((_, idx) => idx > 0).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">مستوى الحساب *</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              {accountLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">قائمة الحساب *</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              {accountLists.map((list) => (
                <option key={list} value={list}>
                  {list}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">قسم الحساب *</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <option>الموازنة</option>
              <option>قائمة الدخل</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">جانب الحساب *</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              {sides.map((side) => (
                <option key={side} value={side}>
                  {side}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
            إضافة حساب
          </button>
        </div>
      </div>
    </section>
  </DashboardShell>
);

export default Page;
