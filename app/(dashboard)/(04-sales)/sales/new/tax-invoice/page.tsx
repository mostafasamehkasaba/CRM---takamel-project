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
      <div className="w-full max-w-none px-3 lg:px-4">
        <section className="grid w-full gap-4 auto-rows-max lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-(--dash-text)">ملخص الإدخال</p>
                <p className="mt-1 text-xs text-(--dash-muted)">
                  الرجاء إدخال المعلومات أدناه. الحقول التي تحمل علامة * هي حقول إجبارية.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <button
                  type="button"
                  className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1.5 text-(--dash-text)"
                >
                  حفظ كمسودة
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-(--dash-border) px-3 py-1.5 text-(--dash-text)"
                >
                  معاينة
                </button>
                <button
                  type="button"
                  className="rounded-xl bg-(--dash-primary) px-3 py-1.5 font-semibold text-white"
                >
                  إتمام العملية
                </button>
              </div>
            </div>
          </div>

          <div className="order-2 space-y-3 lg:order-1 w-full">
            <div className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xs font-semibold text-(--dash-text)">الأصناف *</h3>
                <div className="flex items-center gap-2 text-[11px]">
                  <button
                    type="button"
                    className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1"
                  >
                    إضافة صنف
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1"
                  >
                    إدراج أصناف
                  </button>
                </div>
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
                    <tr className="border-t border-(--dash-border) text-(--dash-muted)">
                      <td className="px-2 py-3 text-center" colSpan={5}>
                        لا توجد أصناف مضافة بعد.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-3">
              <div className="flex items-center justify-between text-xs">
                <h3 className="font-semibold text-(--dash-text)">ملخص الفاتورة</h3>
                <span className="text-(--dash-muted)">0 أصناف</span>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <div className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) p-2">
                  <p className="text-[11px] text-(--dash-muted)">الإجمالي</p>
                  <p className="text-sm font-semibold text-(--dash-text)">0.00</p>
                </div>
                <div className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) p-2">
                  <p className="text-[11px] text-(--dash-muted)">الخصم</p>
                  <p className="text-sm font-semibold text-(--dash-text)">0.00</p>
                </div>
                <div className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) p-2">
                  <p className="text-[11px] text-(--dash-muted)">الشحن</p>
                  <p className="text-sm font-semibold text-(--dash-text)">0.00</p>
                </div>
                <div className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) p-2">
                  <p className="text-[11px] text-(--dash-muted)">الإجمالي بدون ضريبة</p>
                  <p className="text-sm font-semibold text-(--dash-text)">0.00</p>
                </div>
                <div className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) p-2">
                  <p className="text-[11px] text-(--dash-muted)">الضريبة</p>
                  <p className="text-sm font-semibold text-(--dash-text)">0.00</p>
                </div>
                <div className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) p-2">
                  <p className="text-[11px] text-(--dash-muted)">المبلغ المدفوع</p>
                  <p className="text-sm font-semibold text-(--dash-text)">0.00</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl bg-(--dash-panel-soft) px-3 py-2 text-xs">
                <span className="text-(--dash-muted)">إجمالي الفاتورة</span>
                <span className="text-base font-semibold text-(--dash-text)">0.00</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-end gap-2 text-xs">
                <button
                  type="button"
                  className="rounded-xl bg-(--dash-danger) px-3 py-1.5 font-semibold text-white"
                >
                  إعادة تعيين
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-(--dash-border) px-3 py-1.5 font-semibold text-(--dash-text)"
                >
                  معاينة الفاتورة
                </button>
                <button
                  type="button"
                  className="rounded-xl bg-(--dash-primary) px-3 py-1.5 font-semibold text-white"
                >
                  إتمام العملية
                </button>
              </div>
            </div>
          </div>

          <div className="order-1 space-y-3 lg:order-2 w-full">
            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-3 w-full">
              <h3 className="text-xs font-semibold text-(--dash-text)">بيانات الفاتورة</h3>
              <div className="mt-2 grid gap-2 lg:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] text-(--dash-muted)">تاريخ الفاتورة *</label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-(--dash-muted)">رقم مرجعي</label>
                  <input
                    type="text"
                    placeholder="رقم مرجعي"
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-(--dash-muted)">الفرع</label>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                    <option>شركة تجريبى</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-(--dash-muted)">المندوب</label>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                    <option>غير محدد</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-3 w-full">
              <h3 className="text-xs font-semibold text-(--dash-text)">بيانات العميل</h3>
              <div className="mt-2 grid gap-2 lg:grid-cols-4">
                <div className="lg:col-span-2">
                  <label className="mb-1 block text-[11px] text-(--dash-muted)">المنشأة</label>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                    <option>مؤسسة سيارات</option>
                  </select>
                </div>
                <div className="lg:col-span-2">
                  <label className="mb-1 block text-[11px] text-(--dash-muted)">العميل</label>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                    <option>شخص عام (عميل افتراضي)</option>
                  </select>
                </div>
                <div className="lg:col-span-2">
                  <label className="mb-1 block text-[11px] text-(--dash-muted)">رقم أمر الشراء</label>
                  <input
                    placeholder="رقم أمر الشراء"
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs"
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="mb-1 block text-[11px] text-(--dash-muted)">اسم المشروع</label>
                  <input
                    placeholder="اسم المشروع"
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs"
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="mb-1 block text-[11px] text-(--dash-muted)">تصنيف العميل</label>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                    <option>عام</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-3 w-full">
              <h3 className="text-xs font-semibold text-(--dash-text)">الدفع والملاحظات</h3>
              <div className="mt-2 grid gap-2 lg:grid-cols-3">
                <div>
                  <label className="mb-1 block text-[11px] text-(--dash-muted)">حالة الفاتورة</label>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                    <option>مكتملة</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-(--dash-muted)">طريقة الدفع</label>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs">
                    <option>شبكة</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-(--dash-muted)">المبلغ المدفوع</label>
                  <input
                    type="number"
                    defaultValue={0}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs"
                  />
                </div>
                <div className="lg:col-span-3">
                  <label className="mb-1 block text-[11px] text-(--dash-muted)">ملاحظات</label>
                  <textarea
                    placeholder="أضف أي ملاحظات إضافية حول الفاتورة"
                    className="min-h-[84px] w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1.5 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
};

export default Page;
