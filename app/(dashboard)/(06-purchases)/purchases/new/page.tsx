"use client";

import { useRef, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const Page = () => {
  const [attachmentName, setAttachmentName] = useState("");
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setAttachmentName(file ? file.name : "");
  };

  return (
    <DashboardShell title="إضافة عملية شراء" hideHeaderFilters>
      <section className="space-y-5">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm text-(--dash-muted)">
          الرجاء إدخال المعلومات أدناه. الحقول التي تحمل علامة * هي حقول إجبارية.
        </div>

        <div className="grid gap-4 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 lg:grid-cols-3">
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">نوع فاتورة المشتريات *</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <option>فاتورة مشتريات ضريبية</option>
              <option>فاتورة مشتريات مبسطة</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">الرقم المرجعي *</span>
            <input
              type="text"
              placeholder="رقم مرجعي"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">التاريخ *</span>
            <input
              type="datetime-local"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">مرفقات</span>
            <div className="flex items-center gap-2">
              <input ref={attachmentInputRef} type="file" className="hidden" onChange={handleAttachmentChange} />
              <button
                type="button"
                className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs"
                onClick={() => attachmentInputRef.current?.click()}
              >
                استعراض
              </button>
              <input
                type="text"
                value={attachmentName}
                placeholder="لم يتم اختيار ملف"
                readOnly
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </div>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">الفرع *</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <option>مؤسسة سيارات</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">الحالة *</span>
            <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <option>تم الاستلام</option>
              <option>معلقة</option>
            </select>
          </label>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_1fr]">
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">مورد *</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-(--dash-border) bg-(--dash-panel-soft)">
                    +
                  </button>
                  <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-(--dash-border) bg-(--dash-panel-soft)">
                    👤
                  </button>
                </div>
                <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                  <option>اختر مورد</option>
                </select>
              </div>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الربح المتوقع</span>
              <input
                type="number"
                defaultValue={0}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm text-center"
              />
            </label>
            <div className="flex items-end justify-between gap-2">
              <span className="text-xs text-(--dash-muted)">الرجاء تحديث هذه الخيارات قبل إضافة أي منتج.</span>
              <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs">
                تحديث الخيارات
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) text-lg"
            >
              +
            </button>
            <input
              type="text"
              placeholder="الرجاء إضافة الأصناف"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            />
            <span className="rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs text-(--dash-muted)">
              باركود
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-(--dash-primary) text-white">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">م</th>
                  <th className="px-3 py-3 text-right font-semibold">صنف (كود - اسم)</th>
                  <th className="px-3 py-3 text-right font-semibold">تاريخ انتهاء الصلاحية</th>
                  <th className="px-3 py-3 text-right font-semibold">تكلفة الوحدة</th>
                  <th className="px-3 py-3 text-right font-semibold">كمية</th>
                  <th className="px-3 py-3 text-right font-semibold">المجاني</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجمالي بدون ضريبة</th>
                  <th className="px-3 py-3 text-right font-semibold">نسبة الضريبة</th>
                  <th className="px-3 py-3 text-right font-semibold">ضريبة الصنف</th>
                  <th className="px-3 py-3 text-right font-semibold">إجمالي الصنف (SR)</th>
                  <th className="px-3 py-3 text-right font-semibold">سعر الجمهور</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-(--dash-border)">
                  <td className="px-3 py-3 text-(--dash-muted)">-</td>
                  <td className="px-3 py-3 text-(--dash-muted)">-</td>
                  <td className="px-3 py-3 text-(--dash-muted)">-</td>
                  <td className="px-3 py-3">0.00</td>
                  <td className="px-3 py-3">0</td>
                  <td className="px-3 py-3">0</td>
                  <td className="px-3 py-3">0.00</td>
                  <td className="px-3 py-3">0%</td>
                  <td className="px-3 py-3">0.00</td>
                  <td className="px-3 py-3">0.00</td>
                  <td className="px-3 py-3">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="grid gap-4 lg:grid-cols-4">
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">نوع الدفع</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>آجل</option>
                <option>نقدي</option>
                <option>شبكة</option>
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
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">خصم بالنسبة أو بالمبلغ (بعد الضريبة)</span>
              <input
                type="text"
                placeholder="0"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">خصم بالنسبة أو بالمبلغ (قبل الضريبة)</span>
              <input
                type="text"
                placeholder="0"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm lg:col-span-4">
              <span className="mb-2 block font-semibold text-(--dash-text)">شروط الدفع</span>
              <input
                type="text"
                placeholder="شروط الدفع"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm lg:col-span-4">
              <span className="mb-2 block font-semibold text-(--dash-text)">مذكرة</span>
              <textarea className="min-h-[140px] w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <p className="text-(--dash-muted)">الأصناف</p>
              <p className="font-semibold text-(--dash-text)">0</p>
            </div>
            <div>
              <p className="text-(--dash-muted)">المجموع</p>
              <p className="font-semibold text-(--dash-text)">0.00</p>
            </div>
            <div>
              <p className="text-(--dash-muted)">الخصم</p>
              <p className="font-semibold text-(--dash-text)">0.00</p>
            </div>
            <div>
              <p className="text-(--dash-muted)">المجموع الكلي</p>
              <p className="font-semibold text-(--dash-text)">0.00</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-xl bg-(--dash-danger) px-4 py-2 text-xs font-semibold text-white">
              إعادة تعيين
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
