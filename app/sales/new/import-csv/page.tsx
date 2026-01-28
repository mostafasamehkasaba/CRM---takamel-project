"use client";

import DashboardShell from "../../../components/DashboardShell";

const Page = () => {
  return (
    <DashboardShell title="إضافة بيع من ملف CSV" subtitle="البيع / المبيعات / إضافة بيع من ملف CSV" hideHeaderFilters>
      <section className="space-y-5">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm text-(--dash-muted)">
          الرجاء إدخال المعلومات أدناه. تسميات الحقول التي تحمل علامة * هي حقول إجبارية.
        </div>

        <div className="grid gap-4 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 lg:grid-cols-3">
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">التاريخ *</span>
            <input
              type="text"
              defaultValue="28/01/2026 16:41:00"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">الرقم المرجعي</span>
            <input
              type="text"
              defaultValue="SALE0028"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">كاشير *</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <option>شركة تجريبى</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">عميل *</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <option>شخص عام (عميل افتراضي)</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">الفرع *</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <option>مؤسسة سيارات</option>
            </select>
          </label>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-(--dash-text)">إضافة عملية بيع</h3>
            <button type="button" className="rounded-xl bg-(--dash-primary) px-3 py-2 text-xs font-semibold text-white">
              Download Sample File
            </button>
          </div>
          <p className="mt-3 text-xs text-(--dash-muted)">
            ينبغي أن يظل السطر الأول من ملف CSV الذي تم تحميله كما هو، يرجى عدم تغيير ترتيب الأعمدة.
            يرجى التأكد من أن ملف CSV هو UTF-8 ومُشَكَّل بعلامة ترميز BOM.
          </p>
        </div>

        <div className="grid gap-4 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 lg:grid-cols-2">
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">ملف CSV *</span>
            <div className="flex gap-2">
              <input
                type="file"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
              <button type="button" className="rounded-xl bg-(--dash-primary) px-3 py-2 text-xs font-semibold text-white">
                استعراض...
              </button>
            </div>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">إرفاق المستندات</span>
            <div className="flex gap-2">
              <input
                type="file"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
              <button type="button" className="rounded-xl bg-(--dash-primary) px-3 py-2 text-xs font-semibold text-white">
                استعراض...
              </button>
            </div>
          </label>
        </div>

        <div className="grid gap-4 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 lg:grid-cols-3">
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">الخصم</span>
            <input type="number" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">الشحن</span>
            <input type="number" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">أجل الاستحقاق</span>
            <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">حالة فاتورة المبيعات *</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <option>مكتملة</option>
              <option>معلقة</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">حالة الدفع *</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <option>مكتملة</option>
              <option>معلقة</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-(--dash-text)">ملاحظات الموظفين</label>
            <div className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft)">
              <div className="flex items-center gap-2 border-b border-(--dash-border) px-3 py-2 text-xs text-(--dash-muted)">
                <span>B</span>
                <span>I</span>
                <span>U</span>
                <span>|</span>
                <span>•</span>
                <span>1.</span>
              </div>
              <textarea className="min-h-[140px] w-full bg-transparent px-3 py-2 text-sm focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-(--dash-text)">ملاحظات فاتورة المبيعات</label>
            <div className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft)">
              <div className="flex items-center gap-2 border-b border-(--dash-border) px-3 py-2 text-xs text-(--dash-muted)">
                <span>B</span>
                <span>I</span>
                <span>U</span>
                <span>|</span>
                <span>•</span>
                <span>1.</span>
              </div>
              <textarea className="min-h-[140px] w-full bg-transparent px-3 py-2 text-sm focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <button type="button" className="rounded-xl bg-red-500 px-4 py-2 text-xs font-semibold text-white">
            إعادة تعيين
          </button>
          <button type="button" className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
            إتمام العملية
          </button>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
