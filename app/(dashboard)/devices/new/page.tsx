"use client";

import DashboardShell from "../../components/DashboardShell";

const Page = () => {
  return (
    <DashboardShell title="إضافة جهاز" subtitle="البداية / أجهزة إصدار الفواتير / إضافة جهاز" hideHeaderFilters>
      <section className="space-y-5">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm text-(--dash-muted)">
          الرجاء إدخال المعلومات أدناه. تسميات الحقول التي تحمل علامة * هي حقول إجبارية.
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-5">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="text-sm lg:col-span-3">
              <span className="mb-2 block font-semibold text-(--dash-text)">شعار الشركة</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>بدون</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">اسم النشاط *</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">عنوان البريد الإلكتروني</span>
              <input type="email" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">هاتف</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>

            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">المعرف الإضافي</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>السجل التجاري</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">قيمة المعرف الإضافي</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">رخصة البلدية</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>

            <label className="text-sm lg:col-span-3">
              <span className="mb-2 block font-semibold text-(--dash-text)">الرقم الضريبي</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm lg:col-span-3">
              <span className="mb-2 block font-semibold text-(--dash-text)">الحاشية السفلية للفواتير</span>
              <textarea className="min-h-[140px] w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
          </div>

          <div className="mt-6 rounded-xl border border-(--dash-border)">
            <div className="flex items-center justify-between border-b border-(--dash-border) px-4 py-3 text-sm">
              <span className="font-semibold text-(--dash-text)">إعدادات العنوان</span>
            </div>
            <div className="grid gap-4 p-4 lg:grid-cols-3">
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">بلد *</span>
                <input
                  type="text"
                  defaultValue="SA"
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">المدينة *</span>
                <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
              </label>
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">الحي *</span>
                <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
              </label>
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">اسم الشارع *</span>
                <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
              </label>
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">الرمز البريدي *</span>
                <input
                  type="text"
                  defaultValue="00000"
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">رقم المبنى *</span>
                <input
                  type="text"
                  defaultValue="0000"
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm lg:col-span-3">
                <span className="mb-2 block font-semibold text-(--dash-text)">الرقم الفرعي *</span>
                <input
                  type="text"
                  defaultValue="0000"
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                />
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-start">
            <button type="button" className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
              إضافة جهاز
            </button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
