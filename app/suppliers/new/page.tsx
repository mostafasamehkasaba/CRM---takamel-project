"use client";

import DashboardShell from "../../components/DashboardShell";

const Page = () => {
  return (
    <DashboardShell title="إضافة مورد" subtitle="البداية / الموردين / إضافة مورد" hideHeaderFilters>
      <section className="space-y-5">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm text-(--dash-muted)">
          الرجاء إدخال المعلومات أدناه. تسميات الحقول التي تحمل علامة * هي حقول إجبارية.
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-5">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">اسم المورد *</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">عنوان البريد الإلكتروني</span>
              <input type="email" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">هاتف (ex:966568101255)</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الرقم الضريبي</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">السجل التجاري</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">العنوان</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">كود الحساب *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option value="">الموردين - 2101</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">رصيد افتتاحي *(المبلغ المستحق للمورد)</span>
              <input
                type="number"
                defaultValue={0}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div className="mt-6 flex justify-start">
            <button type="button" className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
              إضافة مورد
            </button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
