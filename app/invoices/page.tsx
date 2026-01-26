"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DashboardShell from "../components/DashboardShell";

type InvoiceStatus = "مدفوعة" | "قيد الانتظار" | "متأخرة" | "مدفوعة جزئيا";

type Invoice = {
  id: string;
  client: string;
  amount: number;
  paid: number;
  due: number;
  status: InvoiceStatus;
  date: string;
  dueDate: string;
};

const initialInvoices: Invoice[] = [
  {
    id: "INV-001",
    client: "شركة النور للتجارة",
    amount: 15000,
    paid: 15000,
    due: 0,
    status: "مدفوعة",
    date: "2026-01-15",
    dueDate: "2026-01-30",
  },
  {
    id: "INV-002",
    client: "مؤسسة الأمل",
    amount: 8500,
    paid: 0,
    due: 8500,
    status: "قيد الانتظار",
    date: "2026-01-14",
    dueDate: "2026-01-29",
  },
  {
    id: "INV-003",
    client: "شركة المستقبل",
    amount: 12000,
    paid: 12000,
    due: 0,
    status: "مدفوعة",
    date: "2026-01-14",
    dueDate: "2026-01-28",
  },
  {
    id: "INV-004",
    client: "مؤسسة التقدم",
    amount: 6700,
    paid: 0,
    due: 6700,
    status: "متأخرة",
    date: "2026-01-10",
    dueDate: "2026-01-14",
  },
  {
    id: "INV-005",
    client: "شركة الإبداع",
    amount: 9200,
    paid: 5000,
    due: 4200,
    status: "مدفوعة جزئيا",
    date: "2026-01-13",
    dueDate: "2026-01-27",
  },
];

const statusStyles: Record<InvoiceStatus, string> = {
  مدفوعة: "bg-(--dash-primary) text-white",
  "قيد الانتظار": "bg-(--dash-warning-soft) text-(--dash-warning)",
  متأخرة: "bg-(--dash-danger) text-white",
  "مدفوعة جزئيا": "border border-(--dash-border) bg-(--dash-panel-soft) text-(--dash-text)",
};

const formatCurrency = (value: number) => `${value.toLocaleString()} ريال`;

const page = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [showForm, setShowForm] = useState(false);
  const [invoiceType, setInvoiceType] = useState<"simple" | "sales" | "tax">("simple");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const formRef = useRef<HTMLElement | null>(null);
  const [form, setForm] = useState({
    client: "",
    amount: "",
    paid: "",
    due: "",
    status: "قيد الانتظار",
    date: "",
    dueDate: "",
    paymentMethod: "",
    deliveryDate: "",
    salesRep: "",
    taxNumber: "",
    supplyDate: "",
    taxType: "ضريبة قيمة مضافة",
  });

  useEffect(() => {
    const stored = window.localStorage.getItem("invoices-data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setInvoices(parsed);
        }
      } catch {
        // Ignore invalid stored data.
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("invoices-data", JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showForm]);

  const summaryCards = useMemo(() => {
    const totalAmount = invoices.reduce((sum, item) => sum + item.amount, 0);
    const totalPaid = invoices.reduce((sum, item) => sum + item.paid, 0);
    const totalPending = invoices
      .filter((item) => item.status === "قيد الانتظار")
      .reduce((sum, item) => sum + item.amount, 0);
    const totalOverdue = invoices
      .filter((item) => item.status === "متأخرة")
      .reduce((sum, item) => sum + item.amount, 0);

    return [
      { label: "إجمالي الفواتير", value: formatCurrency(totalAmount), tone: "text-(--dash-text)" },
      { label: "المدفوعة", value: formatCurrency(totalPaid), tone: "text-(--dash-success)" },
      { label: "قيد الانتظار", value: formatCurrency(totalPending), tone: "text-(--dash-warning)" },
      { label: "المتأخرة", value: formatCurrency(totalOverdue), tone: "text-(--dash-danger)" },
    ];
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return invoices.filter((item) => {
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      if (!matchesStatus) {
        return false;
      }
      if (!needle) {
        return true;
      }
      return [item.id, item.client, item.status, item.date, item.dueDate]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [invoices, query, statusFilter]);

  const isSimple = invoiceType === "simple";
  const isSales = invoiceType === "sales";
  const isTax = invoiceType === "tax";
  const invoiceTypeLabel = isSimple ? "فاتورة بسيطة" : isSales ? "فاتورة مبيعات" : "فاتورة ضريبية";

  const handleSelectInvoiceType = (type: "simple" | "sales" | "tax") => {
    setInvoiceType(type);
    setShowForm(true);
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddInvoice = () => {
    const client = form.client.trim();
    const amount = Number.parseFloat(form.amount);
    if (!client || Number.isNaN(amount)) {
      return;
    }
    const paid = Number.parseFloat(form.paid) || 0;
    const due = Number.parseFloat(form.due) || Math.max(amount - paid, 0);
    const nextInvoice: Invoice = {
      id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      client,
      amount,
      paid,
      due,
      status: form.status as InvoiceStatus,
      date: form.date || new Date().toISOString().slice(0, 10),
      dueDate: form.dueDate || new Date().toISOString().slice(0, 10),
    };
    setInvoices((prev) => [nextInvoice, ...prev]);
    setForm({
      client: "",
      amount: "",
      paid: "",
      due: "",
      status: "قيد الانتظار",
      date: "",
      dueDate: "",
      paymentMethod: "",
      deliveryDate: "",
      salesRep: "",
      taxNumber: "",
      supplyDate: "",
      taxType: "ضريبة قيمة مضافة",
    });
    setShowForm(false);
  };

  return (
    <DashboardShell
      title="الفواتير"
      subtitle="إدارة فواتير المبيعات"
      exportData={{
        filename: "invoices",
        headers: ["رقم الفاتورة", "العميل", "الإجمالي", "المدفوع", "المستحق", "الحالة", "التاريخ", "تاريخ الاستحقاق"],
        rows: invoices.map((item) => [
          item.id,
          item.client,
          item.amount,
          item.paid,
          item.due,
          item.status,
          item.date,
          item.dueDate,
        ]),
      }}

      headerAction={
        <details ref={detailsRef} className="relative">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl bg-(--dash-primary) px-4 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)">
            <span className="text-lg">+</span>
            فاتورة جديدة
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path fill="currentColor" d="M7 10l5 5 5-5H7Z" />
            </svg>
          </summary>
          <div className="absolute right-0 top-12 z-30 w-60 translate-x-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-2 text-sm shadow-(--dash-shadow)">
            <button
              type="button"
              onClick={() => handleSelectInvoiceType("simple")}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M5 4h10l4 4v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3 9h8v2H8v-2Zm0-4h8v2H8V9Z"
                    />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-semibold">فاتورة بسيطة</span>
                  <span className="text-xs text-(--dash-muted)">بدون تفاصيل ضريبية</span>
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectInvoiceType("sales")}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M4 6h14a2 2 0 0 1 2 2v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6Zm3 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
                    />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-semibold">فاتورة مبيعات</span>
                  <span className="text-xs text-(--dash-muted)">شحن وطريقة دفع</span>
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectInvoiceType("tax")}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M4 4h9l5 5v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3 10h8v2H7v-2Zm0-4h8v2H7v-2Z"
                    />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-semibold">فاتورة ضريبية</span>
                  <span className="text-xs text-(--dash-muted)">رقم وتاريخ توريد</span>
                </span>
              </span>
            </button>
          </div>
        </details>
      }
    >
      {showForm ? (
        <section
          ref={formRef}
          className="mb-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">إنشاء فاتورة جديدة</h2>
              <p className="text-sm text-(--dash-muted)">اختر نوع الفاتورة وأكمل البيانات الأساسية.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-(--dash-panel-soft) px-3 py-1 text-xs text-(--dash-muted)">
                {invoiceTypeLabel}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setInvoiceType("simple")}
                  className={`rounded-full px-3 py-1 text-xs ${
                    isSimple ? "bg-(--dash-primary) text-white" : "border border-(--dash-border) text-(--dash-muted)"
                  }`}
                >
                  بسيطة
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceType("sales")}
                  className={`rounded-full px-3 py-1 text-xs ${
                    isSales ? "bg-(--dash-primary) text-white" : "border border-(--dash-border) text-(--dash-muted)"
                  }`}
                >
                  مبيعات
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceType("tax")}
                  className={`rounded-full px-3 py-1 text-xs ${
                    isTax ? "bg-(--dash-primary) text-white" : "border border-(--dash-border) text-(--dash-muted)"
                  }`}
                >
                  ضريبية
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">اسم العميل</span>
              <input
                type="text"
                value={form.client}
                onChange={(event) => handleFormChange("client", event.target.value)}
                placeholder="اسم العميل"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">المبلغ</span>
              <input
                type="number"
                value={form.amount}
                onChange={(event) => handleFormChange("amount", event.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">المدفوع</span>
              <input
                type="number"
                value={form.paid}
                onChange={(event) => handleFormChange("paid", event.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">المستحق</span>
              <input
                type="number"
                value={form.due}
                onChange={(event) => handleFormChange("due", event.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">الحالة</span>
              <select
                value={form.status}
                onChange={(event) => handleFormChange("status", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
              >
                <option value="مدفوعة">مدفوعة</option>
                <option value="قيد الانتظار">قيد الانتظار</option>
                <option value="متأخرة">متأخرة</option>
                <option value="مدفوعة جزئيا">مدفوعة جزئيا</option>
              </select>
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">تاريخ الفاتورة</span>
              <input
                type="date"
                value={form.date}
                onChange={(event) => handleFormChange("date", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">تاريخ الاستحقاق</span>
              <input
                type="date"
                value={form.dueDate}
                onChange={(event) => handleFormChange("dueDate", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
              />
            </label>
            {isSales ? (
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">طريقة الدفع</span>
                <select
                  value={form.paymentMethod}
                  onChange={(event) => handleFormChange("paymentMethod", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
                >
                  <option value="">اختر طريقة الدفع</option>
                  <option value="بطاقة">بطاقة بنكية</option>
                  <option value="تحويل">تحويل بنكي</option>
                  <option value="نقدي">نقدي</option>
                  <option value="آجل">آجل</option>
                </select>
              </label>
            ) : null}
            {isSales ? (
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">تاريخ التسليم</span>
                <input
                  type="date"
                  value={form.deliveryDate}
                  onChange={(event) => handleFormChange("deliveryDate", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
            ) : null}
            {isSales ? (
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">مندوب المبيعات</span>
                <select
                  value={form.salesRep}
                  onChange={(event) => handleFormChange("salesRep", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
                >
                  <option value="">اختر المندوب</option>
                  <option value="سارة أحمد">سارة أحمد</option>
                  <option value="خالد سالم">خالد سالم</option>
                  <option value="مروان يوسف">مروان يوسف</option>
                </select>
              </label>
            ) : null}
            {isTax ? (
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">الرقم الضريبي</span>
                <input
                  type="text"
                  value={form.taxNumber}
                  onChange={(event) => handleFormChange("taxNumber", event.target.value)}
                  placeholder="310123456700003"
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
            ) : null}
            {isTax ? (
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">تاريخ التوريد</span>
                <input
                  type="date"
                  value={form.supplyDate}
                  onChange={(event) => handleFormChange("supplyDate", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
            ) : null}
            {isTax ? (
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">نوع الضريبة</span>
                <select
                  value={form.taxType}
                  onChange={(event) => handleFormChange("taxType", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
                >
                  <option value="ضريبة قيمة مضافة">ضريبة قيمة مضافة</option>
                  <option value="ضريبة انتقائية">ضريبة انتقائية</option>
                  <option value="معفى">معفى</option>
                </select>
              </label>
            ) : null}
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text)"
              onClick={() => setShowForm(false)}
            >
              إلغاء
            </button>
            <button
              type="button"
              className="rounded-xl bg-(--dash-primary) px-4 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
              onClick={handleAddInvoice}
            >
              حفظ الفاتورة
            </button>
          </div>
        </section>
      ) : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-5 shadow-(--dash-shadow)"
          >
            <p className="text-sm text-(--dash-muted)">{card.label}</p>
            <p className={`mt-3 text-xl font-semibold ${card.tone}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 shadow-(--dash-shadow)">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm text-(--dash-text)"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42l2.3 2.3V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v2h12v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1Z"
              />
            </svg>
            تصدير
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm text-(--dash-text)"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M3 5a1 1 0 0 1 1-1h16a1 1 0 0 1 .8 1.6l-6.8 9.06V20a1 1 0 0 1-1.45.9l-3-1.5a1 1 0 0 1-.55-.9v-4.84L3.2 5.6A1 1 0 0 1 3 5Z"
              />
            </svg>
            فلاتر
          </button>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="appearance-none rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text) focus:outline-none"
            >
              <option value="all">كل الحالات</option>
              <option value="مدفوعة">مدفوعة</option>
              <option value="قيد الانتظار">قيد الانتظار</option>
              <option value="متأخرة">متأخرة</option>
              <option value="مدفوعة جزئيا">مدفوعة جزئيا</option>
            </select>
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-(--dash-muted-2)">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path fill="currentColor" d="M7 10l5 5 5-5H7Z" />
              </svg>
            </span>
          </div>
          <div className="flex min-w-55 flex-1 items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm text-(--dash-text)">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-(--dash-muted-2)" aria-hidden="true">
              <path
                fill="currentColor"
                d="M10 2a8 8 0 1 0 5.29 14l4.7 4.7a1 1 0 0 0 1.42-1.4l-4.7-4.7A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
              />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث برقم الفاتورة أو اسم العميل..."
              className="w-full bg-transparent text-sm text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-(--dash-panel-soft) text-(--dash-muted)">
              <tr>
                <th className="px-4 py-3 text-right font-semibold">رقم الفاتورة</th>
                <th className="px-4 py-3 text-right font-semibold">العميل</th>
                <th className="px-4 py-3 text-right font-semibold">المبلغ</th>
                <th className="px-4 py-3 text-right font-semibold">المدفوع</th>
                <th className="px-4 py-3 text-right font-semibold">المتبقي</th>
                <th className="px-4 py-3 text-right font-semibold">الحالة</th>
                <th className="px-4 py-3 text-right font-semibold">التاريخ</th>
                <th className="px-4 py-3 text-right font-semibold">الاستحقاق</th>
                <th className="px-4 py-3 text-right font-semibold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((row) => (
                <tr key={row.id} className="border-t border-(--dash-border) text-(--dash-text)">
                  <td className="px-4 py-3 font-semibold">{row.id}</td>
                  <td className="px-4 py-3">{row.client}</td>
                  <td className="px-4 py-3">{formatCurrency(row.amount)}</td>
                  <td className={`px-4 py-3 ${row.paid === 0 ? "text-(--dash-muted)" : "text-(--dash-success)"}`}>
                    {formatCurrency(row.paid)}
                  </td>
                  <td className={`px-4 py-3 ${row.due === 0 ? "text-(--dash-muted)" : "text-(--dash-warning)"}`}>
                    {formatCurrency(row.due)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.dueDate}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="rounded-lg border border-(--dash-border) px-3 py-1 text-xs text-(--dash-text) hover:bg-(--dash-panel-soft)"
                    >
                      إجراءات
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
};

export default page;
