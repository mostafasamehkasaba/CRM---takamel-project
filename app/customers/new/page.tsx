"use client";

import DashboardShell from "../../components/DashboardShell";

const Page = () => {
  return (
    <DashboardShell title="إضافة عميل" subtitle="البداية / العملاء / إضافة عميل" hideHeaderFilters>
      <section className="space-y-5">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm text-(--dash-muted)">
          الرجاء إدخال المعلومات أدناه. تسميات الحقول التي تحمل علامة * هي حقول إجبارية.
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-amber-50/60 p-4 text-sm text-amber-700">
          يرجى تحديد نوع العميل.
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-(--dash-border) pb-4 text-sm">
            <span className="font-semibold text-(--dash-text)">نوع العميل</span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="taxType" defaultChecked className="h-4 w-4" />
                <span className="text-(--dash-text)">غير مسجل بالضريبة</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="taxType" className="h-4 w-4" />
                <span className="text-(--dash-text)">مسجل بالضريبة</span>
              </label>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">اسم العميل *</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">مجموعة العملاء *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>عام</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">مجموعة التسعيرة</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>عام</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">هاتف</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">عنوان البريد الإلكتروني</span>
              <input type="email" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">السجل التجاري</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">كود الحساب *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option value="">اختر</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">رصيد افتتاحي * (المديونية بالسالب)</span>
              <input
                type="number"
                defaultValue={0}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الحد الائتماني *</span>
              <input
                type="number"
                defaultValue={0}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm lg:col-span-3">
              <div className="flex items-center gap-2 text-sm text-(--dash-text)">
                <input type="checkbox" className="h-4 w-4 rounded border border-(--dash-border)" />
                <span>إيقاف البيع في حالة وجود مبالغ مستحقة</span>
              </div>
            </label>
          </div>

          <div className="mt-6 flex justify-start">
            <button type="button" className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
              إضافة عميل
            </button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
