"use client";

import DashboardShell from "../../../components/DashboardShell";

const Page = () => {
  return (
    <DashboardShell title="إضافة فاتورة ضريبية" subtitle="البيع / المبيعات / إضافة عملية بيع" hideHeaderFilters>
      <section className="space-y-5">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm text-(--dash-muted)">
          الرجاء إدخال المعلومات أدناه. الحقول التي تحمل علامة * هي حقول إجبارية.
        </div>

        <div className="grid gap-4 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 lg:grid-cols-3">
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">التاريخ</span>
            <input
              type="text"
              defaultValue="28/01/2026 16:28:22"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">الرقم المرجعي</span>
            <input
              type="text"
              placeholder="رقم مرجعي"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">كاشير</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <option>شركة تجريبى</option>
            </select>
          </label>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الفرع *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>مؤسسة سيارات</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">عميل *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>شخص عام (عميل افتراضي)</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">رقم أمر الشراء</span>
              <input
                type="text"
                placeholder="رقم أمر الشراء"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm lg:col-span-2">
              <span className="mb-2 block font-semibold text-(--dash-text)">اسم المشروع</span>
              <input
                type="text"
                placeholder="اسم المشروع"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">المندوب / الموظف *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>عام</option>
              </select>
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-(--dash-text)">الأصناف *</h3>
            <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-xs">
              إدراج إضافة الأصناف
            </button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-(--dash-primary) text-white">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">صنف (كود - اسم)</th>
                  <th className="px-3 py-3 text-right font-semibold">سعر الوحدة بدون ضريبة</th>
                  <th className="px-3 py-3 text-right font-semibold">سعر الوحدة بالضريبة</th>
                  <th className="px-3 py-3 text-right font-semibold">الكمية المباعة</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجمالي بدون ضريبة</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-(--dash-border)">
                  <td className="px-3 py-3 text-(--dash-muted)">-</td>
                  <td className="px-3 py-3">0.00</td>
                  <td className="px-3 py-3">0.00</td>
                  <td className="px-3 py-3">0</td>
                  <td className="px-3 py-3">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">حالة فاتورة المبيعات *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>مكتملة</option>
                <option>معلقة</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الدفع بواسطة *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>شبكة</option>
                <option>نقدي</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">المبلغ المدفوع</span>
              <input
                type="number"
                defaultValue={0}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm lg:col-span-3">
              <span className="mb-2 block font-semibold text-(--dash-text)">ملاحظات فاتورة المبيعات</span>
              <textarea className="min-h-[120px] w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm">
          <div className="flex flex-wrap items-center gap-6">
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
            <button type="button" className="rounded-xl bg-(--dash-danger) px-4 py-2 text-xs font-semibold text-white">
              إعادة تعيين
            </button>
            <button type="button" className="rounded-xl border border-(--dash-border) px-4 py-2 text-xs font-semibold">
              معاينة الفاتورة
            </button>
            <button type="button" className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
              إتمام العملية
            </button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
