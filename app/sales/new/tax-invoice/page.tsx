"use client";

import DashboardShell from "../../../components/DashboardShell";

const Page = () => {
  return (
    <DashboardShell
      title="إضافة فاتورة ضريبية"
      subtitle="البيع / المبيعات / إضافة عملية بيع"
      hideHeaderFilters
      layout="compact"
    >
      <section className="grid gap-2 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-start">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-2 text-xs text-(--dash-muted) lg:col-span-2">
          الرجاء إدخال المعلومات أدناه. الحقول التي تحمل علامة * هي حقول إجبارية.
        </div>

        <div className="order-1 space-y-2 lg:order-2">
          <div className="grid gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-2 lg:grid-cols-3">
            <label className="text-xs">
              <span className="mb-1 block font-semibold text-(--dash-text)">التاريخ</span>
              <input
                type="text"
                defaultValue="28/01/2026 16:28:22"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs"
              />
            </label>
            <label className="text-xs">
              <span className="mb-1 block font-semibold text-(--dash-text)">الرقم المرجعي</span>
              <input
                type="text"
                placeholder="رقم مرجعي"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs"
              />
            </label>
            <label className="text-xs">
              <span className="mb-1 block font-semibold text-(--dash-text)">كاشير</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                <option>شركة تجريبى</option>
              </select>
            </label>
          </div>

          <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-2">
            <div className="grid gap-2 lg:grid-cols-4">
              <label className="text-xs">
                <span className="mb-1 block font-semibold text-(--dash-text)">الفرع *</span>
                <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                  <option>مؤسسة سيارات</option>
                </select>
              </label>
              <label className="text-xs">
                <span className="mb-1 block font-semibold text-(--dash-text)">عميل *</span>
                <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                  <option>شخص عام (عميل افتراضي)</option>
                </select>
              </label>
              <label className="text-xs">
                <span className="mb-1 block font-semibold text-(--dash-text)">رقم أمر الشراء</span>
                <input
                  type="text"
                  placeholder="رقم أمر الشراء"
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs"
                />
              </label>
              <label className="text-xs lg:col-span-2">
                <span className="mb-1 block font-semibold text-(--dash-text)">اسم المشروع</span>
                <input
                  type="text"
                  placeholder="اسم المشروع"
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs"
                />
              </label>
              <label className="text-xs">
                <span className="mb-1 block font-semibold text-(--dash-text)">المندوب / الموظف *</span>
                <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                  <option>عام</option>
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-2">
            <div className="grid gap-2 lg:grid-cols-3">
              <label className="text-xs">
                <span className="mb-1 block font-semibold text-(--dash-text)">حالة فاتورة المبيعات *</span>
                <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                  <option>مكتملة</option>
                  <option>معلقة</option>
                </select>
              </label>
              <label className="text-xs">
                <span className="mb-1 block font-semibold text-(--dash-text)">الدفع بواسطة *</span>
                <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                  <option>شبكة</option>
                  <option>نقدي</option>
                </select>
              </label>
              <label className="text-xs">
                <span className="mb-1 block font-semibold text-(--dash-text)">المبلغ المدفوع</span>
                <input
                  type="number"
                  defaultValue={0}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs"
                />
              </label>
              <label className="text-xs lg:col-span-3">
                <span className="mb-1 block font-semibold text-(--dash-text)">ملاحظات فاتورة المبيعات</span>
                <textarea className="min-h-[72px] w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs" />
              </label>
            </div>
          </div>
        </div>

        <div className="order-2 space-y-2 lg:order-1">
          <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-2">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xs font-semibold text-(--dash-text)">الأصناف *</h3>
              <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-xs">
                إدراج إضافة الأصناف
              </button>
            </div>
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full text-[11px]">
                <thead className="bg-(--dash-primary) text-white">
                  <tr>
                    <th className="px-2 py-1.5 text-right font-semibold">صنف (كود - اسم)</th>
                    <th className="px-2 py-1.5 text-right font-semibold">سعر الوحدة بدون ضريبة</th>
                    <th className="px-2 py-1.5 text-right font-semibold">سعر الوحدة بالضريبة</th>
                    <th className="px-2 py-1.5 text-right font-semibold">الكمية المباعة</th>
                    <th className="px-2 py-1.5 text-right font-semibold">الإجمالي بدون ضريبة</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-(--dash-border)">
                    <td className="px-2 py-1.5 text-(--dash-muted)">-</td>
                    <td className="px-2 py-1.5">0.00</td>
                    <td className="px-2 py-1.5">0.00</td>
                    <td className="px-2 py-1.5">0</td>
                    <td className="px-2 py-1.5">0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-2 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <p className="text-(--dash-muted)">الإجمالي</p>
                <p className="font-semibold text-(--dash-text)">0.00</p>
              </div>
              <div>
                <p className="text-(--dash-muted)">الخصم</p>
                <p className="font-semibold text-(--dash-text)">0.00</p>
              </div>
              <div>
                <p className="text-(--dash-muted)">الشحن</p>
                <p className="font-semibold text-(--dash-text)">0.00</p>
              </div>
              <div>
                <p className="text-(--dash-muted)">الإجمالي بدون ضريبة</p>
                <p className="font-semibold text-(--dash-text)">0.00</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-xl bg-(--dash-danger) px-3 py-1.5 text-xs font-semibold text-white">
                إعادة تعيين
              </button>
              <button type="button" className="rounded-xl border border-(--dash-border) px-3 py-1.5 text-xs font-semibold">
                معاينة الفاتورة
              </button>
              <button type="button" className="rounded-xl bg-(--dash-primary) px-3 py-1.5 text-xs font-semibold text-white">
                إتمام العملية
              </button>
            </div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
