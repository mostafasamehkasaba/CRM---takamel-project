"use client";

import DashboardShell from "../../components/DashboardShell";

const Page = () => (
  <DashboardShell title="إضافة بنك" subtitle="البداية / البنوك / إضافة بنك" hideHeaderFilters>
    <section className="space-y-5">
      <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm text-(--dash-muted)">
        الرجاء إدخال المعلومات أدناه. تسميات الحقول التي تحمل علامة * هي حقول إجبارية.
      </div>
      <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">كود البنك *</span>
            <input className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">اسم البنك *</span>
            <input className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">الرصيد الافتتاحي</span>
            <input className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" placeholder="0.00" />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">كود الحساب *</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <option value="">اختر الكود</option>
              <option>2101 - البنوك</option>
            </select>
          </label>
          <label className="text-sm lg:col-span-2">
            <span className="mb-2 block font-semibold text-(--dash-text)">ملاحظات</span>
            <textarea className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" rows={3} />
          </label>
        </div>
        <div className="mt-6 flex justify-end">
          <button type="button" className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
            إضافة بنك
          </button>
        </div>
      </div>
    </section>
  </DashboardShell>
);

export default Page;
