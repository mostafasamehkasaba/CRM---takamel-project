"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import DashboardShell from "../../components/DashboardShell";

const Page = () => {
  const [attachmentName, setAttachmentName] = useState("");
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setAttachmentName(file ? file.name : "");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    console.log("Quote payload:", payload);
  };

  const handleReset = () => {
    setAttachmentName("");
    if (attachmentInputRef.current) {
      attachmentInputRef.current.value = "";
    }
  };

  return (
    <DashboardShell title="إضافة عرض سعر" subtitle="البيع / عروض الأسعار / إضافة عرض سعر" hideHeaderFilters>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <section className="space-y-5">
          <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm text-(--dash-muted)">
            الرجاء إدخال المعلومات أدناه. تسميات الحقول التي تحمل علامة * هي حقول إجبارية.
          </div>

          <div className="grid gap-4 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 lg:grid-cols-3">
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">التاريخ *</span>
              <input
                type="datetime-local"
                name="date"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الرقم المرجعي</span>
              <input
                type="text"
                name="reference"
                placeholder=""
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">كاشير *</span>
              <select
                name="cashier"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              >
                <option value="شركة تجريبى">شركة تجريبى</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">خصم</span>
              <input
                type="text"
                name="discount"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الشحن</span>
              <input
                type="text"
                name="shipping"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الحالة</span>
              <select
                name="status"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              >
                <option value="معلقة">معلقة</option>
                <option value="مكتملة">مكتملة</option>
              </select>
            </label>
            <label className="text-sm lg:col-span-3">
              <span className="mb-2 block font-semibold text-(--dash-text)">إرفاق المستندات</span>
              <div className="flex gap-2">
                <input
                  ref={attachmentInputRef}
                  type="file"
                  name="attachment"
                  className="hidden"
                  onChange={handleAttachmentChange}
                />
                <input
                  type="text"
                  value={attachmentName}
                  placeholder="لم يتم اختيار ملف"
                  readOnly
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  className="rounded-xl bg-(--dash-primary) px-3 py-2 text-xs font-semibold text-white"
                  onClick={() => attachmentInputRef.current?.click()}
                >
                  استعراض...
                </button>
              </div>
            </label>
          </div>

          <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">عميل *</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm text-(--dash-muted)">
                    <button type="button" className="text-(--dash-primary)" aria-label="إضافة عميل">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M12 5a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V6a1 1 0 0 1 1-1Z"
                        />
                      </svg>
                    </button>
                    <button type="button" className="text-(--dash-muted)" aria-label="عرض العميل">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M12 5c4.4 0 8 2.7 9.5 6.5a1 1 0 0 1 0 .9C20 16.3 16.4 19 12 19S4 16.3 2.5 12.4a1 1 0 0 1 0-.9C4 7.7 7.6 5 12 5Zm0 3.5A3.5 3.5 0 1 0 15.5 12 3.5 3.5 0 0 0 12 8.5Z"
                        />
                      </svg>
                    </button>
                    <button type="button" className="text-(--dash-muted)" aria-label="تعديل العميل">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M4 21h4l11-11-4-4L4 17v4Zm14.7-12.3L17 7l2-2 1.7 1.7-2 2Z"
                        />
                      </svg>
                    </button>
                  </div>
                  <select
                    name="customer"
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  >
                    <option value="">اختر عميل</option>
                  </select>
                </div>
              </label>
              <label className="text-sm">
                <span className="mb-2 block font-semibold text-(--dash-text)">الفرع *</span>
                <select
                  name="branch"
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                >
                  <option value="مؤسسة سيارات">مؤسسة سيارات</option>
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-(--dash-text)">الأصناف *</h3>
              <div className="flex items-center gap-2">
                <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-xs">
                  الرجاء إضافة الأصناف
                </button>
                <Link href="/items/new" className="rounded-full border border-(--dash-border) p-2 text-(--dash-primary)" aria-label="إضافة صنف">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 5a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V6a1 1 0 0 1 1-1Z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <input
                type="text"
                name="items_query"
                placeholder="برجاء اضافه الاصناف"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead className="bg-(--dash-primary) text-white">
                  <tr>
                    <th className="px-3 py-3 text-right font-semibold">صنف (كود - اسم)</th>
                    <th className="px-3 py-3 text-right font-semibold">سعر الوحدة بدون ضريبة</th>
                    <th className="px-3 py-3 text-right font-semibold">سعر الوحدة بالضريبة</th>
                    <th className="px-3 py-3 text-right font-semibold">كمية</th>
                    <th className="px-3 py-3 text-right font-semibold">ضريبة الصنف</th>
                    <th className="px-3 py-3 text-right font-semibold">إجمالي الصنف (SR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-(--dash-border)">
                    <td className="px-3 py-3 text-(--dash-muted)">-</td>
                    <td className="px-3 py-3">0.00</td>
                    <td className="px-3 py-3">0.00</td>
                    <td className="px-3 py-3">0</td>
                    <td className="px-3 py-3">0.00</td>
                    <td className="px-3 py-3">0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
            <label className="mb-2 block text-sm font-semibold text-(--dash-text)">مذكرة</label>
            <div className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft)">
              <div className="flex items-center gap-2 border-b border-(--dash-border) px-3 py-2 text-xs text-(--dash-muted)">
                <span>B</span>
                <span>I</span>
                <span>U</span>
                <span>|</span>
                <span>•</span>
                <span>1.</span>
              </div>
              <textarea name="memo" className="min-h-[140px] w-full bg-transparent px-3 py-2 text-sm focus:outline-none" />
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
                <p className="text-(--dash-muted)">الشحن</p>
                <p className="font-semibold text-(--dash-text)">0.00</p>
              </div>
              <div>
                <p className="text-(--dash-muted)">المجموع الكلي</p>
                <p className="font-semibold text-(--dash-text)">0.00</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="reset" className="rounded-xl bg-red-500 px-4 py-2 text-xs font-semibold text-white">
                إعادة تعيين
              </button>
              <button type="submit" className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
                إتمام العملية
              </button>
            </div>
          </div>
        </section>
      </form>
    </DashboardShell>
  );
};

export default Page;
