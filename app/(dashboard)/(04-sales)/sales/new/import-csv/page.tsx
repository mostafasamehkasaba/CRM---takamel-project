"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const STORAGE_KEY = "sales-csv-data";

type CsvSale = {
  id: string;
  dateTime: string;
  reference: string;
  cashier: string;
  customer: string;
  branch: string;
  csvName: string;
  attachmentName: string;
  discount: string;
  shipping: string;
  due: string;
  invoiceStatus: "مكتملة" | "معلقة";
  paymentStatus: "مكتملة" | "معلقة";
  staffNotes: string;
  invoiceNotes: string;
};

type FormState = {
  dateTime: string;
  reference: string;
  cashier: string;
  customer: string;
  branch: string;
  discount: string;
  shipping: string;
  due: string;
  invoiceStatus: "مكتملة" | "معلقة";
  paymentStatus: "مكتملة" | "معلقة";
  staffNotes: string;
  invoiceNotes: string;
};

const defaultForm: FormState = {
  dateTime: "",
  reference: "SALE0028",
  cashier: "شركة تجريبى",
  customer: "شخص عام (عميل افتراضي)",
  branch: "مؤسسة سيارات",
  discount: "",
  shipping: "",
  due: "",
  invoiceStatus: "مكتملة",
  paymentStatus: "مكتملة",
  staffNotes: "",
  invoiceNotes: "",
};

const Page = () => {
  const router = useRouter();
  const [csvName, setCsvName] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState("");
  const csvInputRef = useRef<HTMLInputElement | null>(null);
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);

  const handleFormChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCsvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setCsvName(file ? file.name : "");
  };

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setAttachmentName(file ? file.name : "");
  };

  const handleDownloadSample = () => {
    const headers = ["code", "quantity", "unit_price", "discount", "tax_name", "tax_method"];
    const sample = `${headers.join(",")}\nSKU-001,2,75,0,ضريبة القيمة المضافة,exclusive\n`;
    const blob = new Blob([`\uFEFF${sample}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sales-sample.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setForm(defaultForm);
    setCsvName("");
    setAttachmentName("");
    if (csvInputRef.current) {
      csvInputRef.current.value = "";
    }
    if (attachmentInputRef.current) {
      attachmentInputRef.current.value = "";
    }
    setError("");
  };

  const handleSubmit = () => {
    if (!form.dateTime || !form.cashier || !form.customer || !form.branch || !csvName) {
      setError("يرجى تعبئة الحقول الإلزامية وإرفاق ملف CSV قبل الإتمام.");
      return;
    }

    const newSale: CsvSale = {
      id: `CSV-${Date.now()}`,
      dateTime: form.dateTime,
      reference: form.reference.trim() || `SALE-${Date.now()}`,
      cashier: form.cashier,
      customer: form.customer,
      branch: form.branch,
      csvName,
      attachmentName,
      discount: form.discount,
      shipping: form.shipping,
      due: form.due,
      invoiceStatus: form.invoiceStatus,
      paymentStatus: form.paymentStatus,
      staffNotes: form.staffNotes,
      invoiceNotes: form.invoiceNotes,
    };

    let stored: CsvSale[] = [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          stored = parsed;
        }
      }
    } catch {
      stored = [];
    }

    const nextRows = [newSale, ...stored];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRows));
    setError("");
    router.push("/sales/imported");
  };

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
              type="datetime-local"
              value={form.dateTime}
              onChange={(event) => handleFormChange("dateTime", event.target.value)}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">الرقم المرجعي</span>
            <input
              type="text"
              value={form.reference}
              onChange={(event) => handleFormChange("reference", event.target.value)}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">كاشير *</span>
            <select
              value={form.cashier}
              onChange={(event) => handleFormChange("cashier", event.target.value)}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            >
              <option>شركة تجريبى</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">عميل *</span>
            <select
              value={form.customer}
              onChange={(event) => handleFormChange("customer", event.target.value)}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            >
              <option>شخص عام (عميل افتراضي)</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">الفرع *</span>
            <select
              value={form.branch}
              onChange={(event) => handleFormChange("branch", event.target.value)}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            >
              <option>مؤسسة سيارات</option>
            </select>
          </label>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-(--dash-text)">إضافة عملية بيع</h3>
            <button
              type="button"
              className="rounded-xl bg-(--dash-primary) px-3 py-2 text-xs font-semibold text-white"
              onClick={handleDownloadSample}
            >
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
              <input ref={csvInputRef} type="file" accept=".csv" className="hidden" onChange={handleCsvChange} />
              <input
                type="text"
                value={csvName}
                placeholder="لم يتم اختيار ملف"
                readOnly
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
              <button
                type="button"
                className="rounded-xl bg-(--dash-primary) px-3 py-2 text-xs font-semibold text-white"
                onClick={() => csvInputRef.current?.click()}
              >
                استعراض...
              </button>
            </div>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">إرفاق المستندات</span>
            <div className="flex gap-2">
              <input ref={attachmentInputRef} type="file" className="hidden" onChange={handleAttachmentChange} />
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

        <div className="grid gap-4 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 lg:grid-cols-3">
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">الخصم</span>
            <input
              type="number"
              value={form.discount}
              onChange={(event) => handleFormChange("discount", event.target.value)}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">الشحن</span>
            <input
              type="number"
              value={form.shipping}
              onChange={(event) => handleFormChange("shipping", event.target.value)}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">أجل الاستحقاق</span>
            <input
              type="text"
              value={form.due}
              onChange={(event) => handleFormChange("due", event.target.value)}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">حالة فاتورة المبيعات *</span>
            <select
              value={form.invoiceStatus}
              onChange={(event) => handleFormChange("invoiceStatus", event.target.value as FormState["invoiceStatus"])}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            >
              <option value="مكتملة">مكتملة</option>
              <option value="معلقة">معلقة</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-semibold text-(--dash-text)">حالة الدفع *</span>
            <select
              value={form.paymentStatus}
              onChange={(event) => handleFormChange("paymentStatus", event.target.value as FormState["paymentStatus"])}
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
            >
              <option value="مكتملة">مكتملة</option>
              <option value="معلقة">معلقة</option>
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
              <textarea
                value={form.staffNotes}
                onChange={(event) => handleFormChange("staffNotes", event.target.value)}
                className="min-h-[140px] w-full bg-transparent px-3 py-2 text-sm focus:outline-none"
              />
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
              <textarea
                value={form.invoiceNotes}
                onChange={(event) => handleFormChange("invoiceNotes", event.target.value)}
                className="min-h-[140px] w-full bg-transparent px-3 py-2 text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl bg-red-500 px-4 py-2 text-xs font-semibold text-white"
          >
            إعادة تعيين
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white"
          >
            إتمام العملية
          </button>
        </div>
        {error ? (
          <p className="text-sm text-rose-600">{error}</p>
        ) : null}
      </section>
    </DashboardShell>
  );
};

export default Page;
