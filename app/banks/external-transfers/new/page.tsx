"use client";

"use client";

import DashboardShell from "../../../components/DashboardShell";

const banks = ["بنك الراجحي", "بنك الأهلي", "بنك البلاد", "بنك ساب"];

const Page = () => (
  <DashboardShell title="إضافة تحويل بنكي خارجي" subtitle="البداية / تحويلات بنكية خارجية / إضافة تحويل بنكي خارجي" hideHeaderFilters>
    <section className="space-y-5 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-(--dash-text)">إضافة تحويل بنكي خارجي</h2>
        <button className="text-xs text-(--dash-muted)">×</button>
      </div>
      <p className="text-xs text-(--dash-muted)">يرجى إدخال المعلومات التالية. الحقول التي تحمل علامة * إجبارية.</p>
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="text-sm">
          <span className="mb-2 block font-semibold text-(--dash-text)">البنك *</span>
          <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
            {banks.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-2 block font-semibold text-(--dash-text)">المدفوع *</span>
          <input type="number" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" placeholder="0.00" />
        </label>
        <label className="text-sm lg:col-span-2">
          <span className="mb-2 block font-semibold text-(--dash-text)">ملاحظات</span>
          <textarea className="min-h-[120px] w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
        </label>
      </div>
      <div className="flex justify-start">
        <button className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
          إضافة تحويل بنكي خارجي
        </button>
      </div>
    </section>
  </DashboardShell>
);

export default Page;
