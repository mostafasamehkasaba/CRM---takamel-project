"use client";

import { useRef, useState } from "react";
import DashboardShell from "../../components/DashboardShell";

const Page = () => {
  const [csvName, setCsvName] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const csvInputRef = useRef<HTMLInputElement | null>(null);
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);

  const handleCsvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setCsvName(file ? file.name : "");
  };

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setAttachmentName(file ? file.name : "");
  };

  const handleDownloadSample = () => {
    const headers = [
      "code",
      "unit_cost",
      "quantity",
      "variant",
      "name",
      "expiry_date",
      "discount",
      "tax_name",
      "tax_method",
      "purchase_unit",
      "track_quantity",
      "default_sale_unit",
      "default_unit",
      "subcategory",
      "main_category",
      "brand_type",
    ];
    const sample = `${headers.join(",")}\nSKU-001,12.5,10,افتراضي,منتج تجريبي,2026-12-31,0,ضريبة القيمة المضافة,exclusive,Box,1,Piece,Piece,إلكترونيات,الرئيسية,عام\n`;
    const blob = new Blob([`\uFEFF${sample}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "purchase-sample.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardShell title="إضافة شراء من ملف CSV" hideHeaderFilters>
      <section className="space-y-5">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm text-(--dash-muted)">
          الرجاء إدخال المعلومات أدناه. الحقول التي تحمل علامة * هي حقول إجبارية.
        </div>

        <div className="grid gap-4 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 lg:grid-cols-3">
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">التاريخ *</span>
            <input
              type="text"
              defaultValue="29/01/2026 13:12:00"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            />
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
          <label className="text-sm lg:col-span-2">
            <span className="mb-2 block font-semibold text-(--dash-text)">مورد *</span>
            <div className="flex items-center gap-2">
              <button type="button" className="flex h-8 w-8 items-center justify-center rounded-lg border border-(--dash-border) bg-(--dash-panel-soft)">
                +
              </button>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>اختر مورد</option>
              </select>
            </div>
          </label>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white"
              onClick={handleDownloadSample}
            >
              Download Sample File
            </button>
            <p className="text-(--dash-muted)">
              ينبغي أن يظل السطر الأول في ملف CSV الذي تم تحميله كما هو، يرجى عدم تغيير ترتيب الأعمدة.
              ترتيب الأعمدة الصحيح (كود الصنف، تكلفة الوحدة، كمية، الصنف البديل، اسم الصنف، انتهاء الصلاحية،
              خصم، اسم الضرائب، طريقة الضريبة (سعر البيع)، purchase_unit، track quantity، default sale unit،
              default unit، subcategory، التصنيفات الرئيسية، نوع الماركة). يجب اتباع هذا إذا كنت تستخدم أي لغات أخرى
              غير الإنجليزية. يرجى التأكد من ملف CSV بترميز UTF-8 وأنه محفوظ مع علامة ترتيب بايت (BOM) في الملف الأول
              مطلوب ويضم الأعمدة الإضافية.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">ملف CSV *</span>
              <div className="flex items-center gap-2">
                <input ref={csvInputRef} type="file" accept=".csv" className="hidden" onChange={handleCsvChange} />
                <button
                  type="button"
                  className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs"
                  onClick={() => csvInputRef.current?.click()}
                >
                  استعراض
                </button>
                <input
                  type="text"
                  value={csvName}
                  placeholder="لم يتم اختيار ملف"
                  readOnly
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                />
              </div>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">إرفاق المستندات</span>
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
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <input type="checkbox" className="h-4 w-4 rounded border border-(--dash-border)" />
            <span className="text-(--dash-text)">المزيد من الخيارات</span>
          </div>
          <div className="mt-4">
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">مذكرة</span>
              <textarea className="min-h-[140px] w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm" />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="button" className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
            إتمام العملية
          </button>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
