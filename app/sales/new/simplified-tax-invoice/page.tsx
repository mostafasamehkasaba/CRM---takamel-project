"use client";

import DashboardShell from "../../../components/DashboardShell";

const Page = () => {
  return (
    <DashboardShell title="إضافة فاتورة ضريبية مبسطة" subtitle="البيع / المبيعات / إضافة عملية بيع" hideHeaderFilters>
      <section className="space-y-5">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="rounded-xl bg-(--dash-primary) px-4 py-2 text-sm font-semibold text-white">
              صالون رسمي
            </button>
            <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm">
              عام
            </button>
            <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm">
              كوفي / الديوانية
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="min-h-[520px] rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
            <div className="flex items-center gap-2 text-sm text-(--dash-muted)">
              <span>منطقة الأصناف</span>
            </div>
            <div className="mt-4 h-[420px] rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft)" />
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button type="button" className="rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1 text-xs">
                    +
                  </button>
                  <button type="button" className="rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1 text-xs">
                    -
                  </button>
                  <button type="button" className="rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-1 text-xs">
                    ✎
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" className="rounded-xl bg-indigo-500 px-3 py-2 text-xs font-semibold text-white">
                    آخر فاتورة (F4)
                  </button>
                  <select className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs">
                    <option>محلي</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <label className="mb-2 block text-xs text-(--dash-muted)">عميل (افتراضي)</label>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                    <option>شخص عام (عميل افتراضي)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs text-(--dash-muted)">الفرع</label>
                  <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                    <option>مؤسسة سيارات</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs text-(--dash-muted)">قراءة الباركود / ابحث عن طريق الاسم أو الباركود</label>
                  <input
                    type="text"
                    placeholder="قراءة الباركود / ابحث عن طريق الاسم أو الباركود"
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel)">
              <div className="grid grid-cols-[1.6fr_0.6fr_0.6fr_0.6fr] bg-(--dash-primary) px-3 py-3 text-xs font-semibold text-white">
                <span>صنف</span>
                <span className="text-center">السعر</span>
                <span className="text-center">الكمية</span>
                <span className="text-center">اجمالي الصنف</span>
              </div>
              <div className="h-64" />
            </div>

            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-(--dash-muted)">الأصناف</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-(--dash-muted)">المجموع</span>
                <span className="font-semibold">0.00</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-(--dash-muted)">خصم</span>
                <span className="font-semibold">0.00</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-(--dash-muted)">بدون ضريبة</span>
                <span className="font-semibold">0.00</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel)">
              <div className="flex items-center justify-between bg-slate-800 px-4 py-3 text-white">
                <span className="text-sm">إجمالي الفاتورة :</span>
                <span className="text-xl font-semibold">0.00</span>
              </div>
              <div className="grid grid-cols-3">
                <button type="button" className="bg-green-500 px-3 py-3 text-xs font-semibold text-white">
                  دفع (F9)
                </button>
                <button type="button" className="bg-emerald-700 px-3 py-3 text-xs font-semibold text-white">
                  أكواد الخصم
                </button>
                <button type="button" className="bg-red-500 px-3 py-3 text-xs font-semibold text-white">
                  إلغاء (F11)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
