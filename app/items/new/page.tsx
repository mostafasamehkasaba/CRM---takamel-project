"use client";

import DashboardShell from "../../components/DashboardShell";

const Page = () => {
  return (
    <DashboardShell title="إضافة الصنف" subtitle="الأصناف / إضافة الصنف" hideHeaderFilters>
      <section className="space-y-5">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm text-(--dash-muted)">
          الرجاء إدخال المعلومات أدناه. تسميات الحقول التي تحمل علامة * هي حقول إجبارية.
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4" />
                <span className="text-(--dash-muted)">هذا الصنف لديه بدائل متعددة بمقاسات متعددة و / أو ألوان</span>
              </div>
              <div className="mt-4 grid gap-4">
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">التصنيفات الرئيسية *</span>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                    <option>اختر التصنيف الرئيسي</option>
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">التصنيف الفرعي *</span>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                    <option>الرجاء تحديد الفئة الفرعية</option>
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">وحدة الصنف *</span>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                    <option>اختر وحدة</option>
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">وحدة البيع الافتراضية</span>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                    <option>اختر وحدة</option>
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">وحدة الشراء الافتراضية</span>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                    <option>اختر وحدة</option>
                  </select>
                </label>
                <button type="button" className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
                  وحدات إضافية
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <h3 className="text-sm font-semibold text-(--dash-text)">مبلغ التكلفة وحد الحد الأعلى للفروع</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead className="bg-(--dash-primary) text-white">
                    <tr>
                      <th className="px-3 py-2 text-right font-semibold">اسم الفرع</th>
                      <th className="px-3 py-2 text-right font-semibold">مبلغ التكلفة</th>
                      <th className="px-3 py-2 text-right font-semibold">تنبيهات كميات المخزون</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["مغسلة سيارات", "نشاط المطاعم", "نشاط الصالون", "نشاط الكوفي / الديوانية", "نشاط سوبرماركت", "مغسلة ملابس"].map(
                      (branch) => (
                        <tr key={branch} className="border-t border-(--dash-border)">
                          <td className="px-3 py-2">{branch}</td>
                          <td className="px-3 py-2">
                            <input type="text" className="w-full rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1 text-xs" />
                          </td>
                          <td className="px-3 py-2">
                            <input type="text" className="w-full rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1 text-xs" />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <h3 className="text-sm font-semibold text-(--dash-text)">إتاحة الصنف في الفروع</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead className="bg-(--dash-primary) text-white">
                    <tr>
                      <th className="px-3 py-2 text-right font-semibold">اسم الفرع</th>
                      <th className="px-3 py-2 text-right font-semibold">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["مغسلة سيارات", "نشاط المطاعم", "نشاط الصالون", "نشاط الكوفي / الديوانية", "نشاط سوبرماركت", "مغسلة ملابس"].map(
                      (branch) => (
                        <tr key={branch} className="border-t border-(--dash-border)">
                          <td className="px-3 py-2">{branch}</td>
                          <td className="px-3 py-2">
                            <select className="w-full rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1 text-xs">
                              <option>نعم</option>
                              <option>لا</option>
                            </select>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <div className="grid gap-4">
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">نوع الصنف *</span>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                    <option>عام</option>
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">اسم الصنف *</span>
                  <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">اسم الصنف باللغة الثانية</span>
                  <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">كود الصنف *</span>
                  <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">Slug</span>
                  <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">كود بديل</span>
                  <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">الماركة</span>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                    <option>اختر الماركة</option>
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">تكلفة الصنف بدون ضريبة *</span>
                  <input type="text" defaultValue="0" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">سعر الصنف *</span>
                  <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">ضريبة الصنف *</span>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                    <option>اختر الضريبة</option>
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">طريقة الضريبة *</span>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                    <option>اختر طريقة الضريبة</option>
                  </select>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">أقل كمية للطلب *</span>
                  <input type="text" defaultValue="0" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <div className="grid gap-4">
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">صورة الصنف</span>
                  <div className="flex gap-2">
                    <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                    <button type="button" className="rounded-xl bg-(--dash-primary) px-3 py-2 text-xs font-semibold text-white">استعراض...</button>
                  </div>
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">كتالوج صور الصنف</span>
                  <div className="flex gap-2">
                    <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                    <button type="button" className="rounded-xl bg-(--dash-primary) px-3 py-2 text-xs font-semibold text-white">استعراض...</button>
                  </div>
                </label>
                <div className="flex flex-wrap items-center gap-4 text-sm text-(--dash-muted)">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    صنف مخزون
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    مميز (يظهر في شاشة المتجر)
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    اخفاء في شاشة المتجر
                  </label>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <label className="mb-2 block text-sm font-semibold text-(--dash-text)">نبذة مختصرة</label>
              <textarea className="min-h-[120px] w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </div>

            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <label className="mb-2 block text-sm font-semibold text-(--dash-text)">تفاصيل الصنف</label>
              <textarea className="min-h-[140px] w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </div>

            <div className="flex justify-end">
              <button type="button" className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
                إضافة الصنف
              </button>
            </div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
