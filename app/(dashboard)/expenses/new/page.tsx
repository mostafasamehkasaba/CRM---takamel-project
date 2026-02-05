"use client";

import { useRef, useState } from "react";
import DashboardShell from "../../components/DashboardShell";

const Page = () => {
  const [attachmentName, setAttachmentName] = useState("");
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setAttachmentName(file ? file.name : "");
  };

  return (
    <DashboardShell title="إضافة مصروفات" hideHeaderFilters>
      <section className="space-y-5">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm text-(--dash-muted)">
          الرجاء إدخال المعلومات أدناه. الحقول التي تحمل علامة * هي حقول إجبارية.
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="text-sm lg:col-span-2">
              <span className="mb-2 block font-semibold text-(--dash-text)">التاريخ</span>
              <input
                type="datetime-local"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm lg:col-span-2">
              <span className="mb-2 block font-semibold text-(--dash-text)">تصنيف المصروف *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>اختر تصنيف المصروف</option>
                <option>رواتب</option>
                <option>صيانة</option>
                <option>مصروفات تشغيل</option>
              </select>
            </label>
            <label className="text-sm lg:col-span-2">
              <span className="mb-2 block font-semibold text-(--dash-text)">الفرع</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>مغسلة سيارات</option>
                <option>الفرع الرئيسي</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">المدفوع *</span>
              <input
                type="number"
                defaultValue={0}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">نوع الدفع</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>نقدي</option>
                <option>شبكة</option>
                <option>تحويل</option>
              </select>
            </label>
            <label className="text-sm lg:col-span-2">
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
            <label className="text-sm lg:col-span-2">
              <span className="mb-2 block font-semibold text-(--dash-text)">بيان المصروف</span>
              <textarea className="min-h-[160px] w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
          </div>
        </div>

        <div className="flex justify-start">
          <button type="button" className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
            إضافة المصروفات
          </button>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
