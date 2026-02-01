"use client";

import { useState } from "react";
import DashboardShell from "../../components/DashboardShell";

const Page = () => {
  const [taxType, setTaxType] = useState<"nonTax" | "tax">("nonTax");

  return (
    <DashboardShell title="إضافة عميل" subtitle="البداية / العملاء / إضافة عميل" hideHeaderFilters>
      <section className="space-y-5">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm text-(--dash-muted)">
          الرجاء إدخال المعلومات أدناه. تسميات الحقول التي تحمل علامة * هي حقول إجبارية.
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-amber-50/60 p-4 text-sm text-amber-700">
          يرجى تحديد نوع العميل.
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-(--dash-border) pb-4 text-sm">
            <span className="font-semibold text-(--dash-text)">نوع العميل</span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="taxType"
                  checked={taxType === "nonTax"}
                  onChange={() => setTaxType("nonTax")}
                  className="h-4 w-4"
                />
                <span className="text-(--dash-text)">غير مسجل بالضريبة</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="taxType"
                  checked={taxType === "tax"}
                  onChange={() => setTaxType("tax")}
                  className="h-4 w-4"
                />
                <span className="text-(--dash-text)">مسجل بالضريبة</span>
              </label>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">اسم العميل *</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">مجموعة العملاء *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>عام</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">مجموعة التسعيرة</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>عام</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">هاتف</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">عنوان البريد الإلكتروني</span>
              <input type="email" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">السجل التجاري</span>
              <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">كود الحساب *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option value="">اختر</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">رصيد افتتاحي * (المديونية بالسالب)</span>
              <input
                type="number"
                defaultValue={0}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الحد الائتماني *</span>
              <input
                type="number"
                defaultValue={0}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm lg:col-span-3">
              <div className="flex items-center gap-2 text-sm text-(--dash-text)">
                <input type="checkbox" className="h-4 w-4 rounded border border-(--dash-border)" />
                <span>إيقاف البيع في حالة وجود مبالغ مستحقة</span>
              </div>
            </label>
          </div>

          {taxType === "tax" ? (
            <div className="mt-6 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-5">
              <h3 className="text-sm font-semibold text-(--dash-text)">العنوان الوطني</h3>
              <p className="mt-1 text-xs text-(--dash-muted)">
                أدخل بيانات العنوان الوطني لأن العميل مسجل بالضريبة.
              </p>
              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">بلد *</span>
                  <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">المدينة *</span>
                  <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">الحي *</span>
                  <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">اسم الشارع *</span>
                  <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">الرمز البريدي *</span>
                  <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">رقم المبنى *</span>
                  <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">الرقم الفرعي</span>
                  <input type="text" className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
                </label>
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex justify-start">
            <button type="button" className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
              إضافة عميل
            </button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
