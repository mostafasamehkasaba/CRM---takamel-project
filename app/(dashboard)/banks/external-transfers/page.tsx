"use client";

import DashboardShell from "../../components/DashboardShell";

const Page = () => (
  <DashboardShell title="تحويلات بنكية خارجية" subtitle="البداية / تحويلات بنكية خارجية" hideHeaderFilters>
    <section className="space-y-4">
      <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-(--dash-text)">تحويلات بنكية خارجية</h2>
          <div className="flex items-center gap-2">
            <button className="rounded-full border border-(--dash-border) px-3 py-2 text-xs text-(--dash-text)">+</button>
            <span className="text-xs text-(--dash-muted)">X</span>
          </div>
        </div>
        <p className="mt-3 text-sm text-(--dash-muted)">الرجاء استخدام الجدول أدناه للتنقل أو تصفية النتائج.</p>
      </div>

      <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-(--dash-muted)">
            <span>اظهار</span>
            <select className="rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-(--dash-text)">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex min-w-60 flex-1 items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
            <input
              type="text"
              placeholder="بحث"
              className="w-full bg-transparent text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-(--dash-primary) text-white">
              <tr>
                <th className="px-3 py-3 text-right font-semibold">التاريخ</th>
                <th className="px-3 py-3 text-right font-semibold">كود البنك</th>
                <th className="px-3 py-3 text-right font-semibold">اسم البنك</th>
                <th className="px-3 py-3 text-right font-semibold">المدفوع</th>
                <th className="px-3 py-3 text-right font-semibold">ملاحظات</th>
                <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-(--dash-border) text-(--dash-muted)">
                <td className="px-3 py-3">[التاريخ]</td>
                <td className="px-3 py-3">[كود البنك]</td>
                <td className="px-3 py-3">[اسم البنك]</td>
                <td className="px-3 py-3">[المدفوع]</td>
                <td className="px-3 py-3">[ملاحظات]</td>
                <td className="px-3 py-3 text-sm">لا توجد بيانات في الجدول</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-(--dash-border) px-4 py-3 text-sm text-(--dash-muted)">
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">سابق</button>
            <span className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">1</span>
            <button className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">التالي</button>
          </div>
          <span>عرض 0 إلى 0 من 0 سجلات</span>
        </div>
      </div>
    </section>
  </DashboardShell>
);

export default Page;
