"use client";

import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const Page = () => {
  return (
    <DashboardShell
      title="إضافة فاتورة بسيطه"
      subtitle="البيع / المبيعات / إضافة عملية بيع"
      hideHeaderFilters
      layout="compact"
    >
      {/* مهم جدا لكسر أي max-width */}
      <div className="w-full max-w-none px-3 lg:px-4">
        <section className="grid w-full gap-4 auto-rows-max lg:grid-cols-[1.4fr_1fr] lg:items-start">
          
          {/* Alert */}
          <div className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-3 text-xs text-(--dash-muted) lg:col-span-2">
            الرجاء إدخال المعلومات أدناه. الحقول التي تحمل علامة * هي حقول إجبارية.
          </div>

          {/* LEFT SIDE */}
          <div className="order-2 space-y-3 lg:order-1 w-full">
            
            {/* Items */}
            <div className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xs font-semibold text-(--dash-text)">الأصناف *</h3>
                <button
                  type="button"
                  className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-xs"
                >
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

            {/* Totals */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-3 text-xs w-full">
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
                <button className="rounded-xl bg-(--dash-danger) px-3 py-1.5 text-xs font-semibold text-white">
                  إعادة تعيين
                </button>
                <button className="rounded-xl border border-(--dash-border) px-3 py-1.5 text-xs font-semibold">
                  معاينة الفاتورة
                </button>
                <button className="rounded-xl bg-(--dash-primary) px-3 py-1.5 text-xs font-semibold text-white">
                  إتمام العملية
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="order-1 space-y-3 lg:order-2 w-full">
            
            {/* Top Inputs */}
            <div className="grid gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-3 lg:grid-cols-3 w-full">
              <input type="datetime-local" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs" />
              <input type="text" placeholder="رقم مرجعي" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs" />
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                <option>شركة تجريبى</option>
              </select>
            </div>

            {/* Customer */}
            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-3 w-full">
              <div className="grid gap-2 lg:grid-cols-4">
                <select className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                  <option>مؤسسة سيارات</option>
                </select>
                <select className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                  <option>شخص عام (عميل افتراضي)</option>
                </select>
                <input placeholder="رقم أمر الشراء" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs" />
                <input placeholder="اسم المشروع" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs lg:col-span-2" />
                <select className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                  <option>عام</option>
                </select>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-3 w-full">
              <div className="grid gap-2 lg:grid-cols-3">
                <select className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                  <option>مكتملة</option>
                </select>
                <select className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                  <option>شبكة</option>
                </select>
                <input type="number" defaultValue={0} className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs" />
                <textarea className="min-h-[72px] w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs lg:col-span-3" />
              </div>
            </div>
          </div>

        </section>
      </div>
    </DashboardShell>
  );
};

export default Page;
