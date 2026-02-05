"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import DashboardShell from "../../components/DashboardShell";
import { initialProducts } from "../../data/products";

const InvoiceNewPageContent = () => {
  const searchParams = useSearchParams();
  const normalizeInvoiceType = (value: string | null) => {
    if (value === "tax" || value === "simple") {
      return value;
    }
    return "simple";
  };
  const [items, setItems] = useState([
    { name: "منتج تجريبي", desc: "وصف", qty: "2", price: "500", tax: "15", total: "1,150" },
    { name: "إضافة يدوية", desc: "وصف", qty: "1", price: "0", tax: "15", total: "0" },
  ]);
  const invoiceTypeParam = searchParams.get("type");
  const [invoiceType, setInvoiceType] = useState<"simple" | "tax">(
    normalizeInvoiceType(invoiceTypeParam)
  );
  const [paymentMethod, setPaymentMethod] = useState("");
  const [taxType, setTaxType] = useState("ضريبة قيمة مضافة");
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [customerTaxStatus, setCustomerTaxStatus] = useState<"registered" | "unregistered" | null>(
    null
  );
  const [newCustomerName, setNewCustomerName] = useState("");
  const [modalTaxStatus, setModalTaxStatus] = useState<"registered" | "unregistered">("registered");
  const [modalCustomerName, setModalCustomerName] = useState("");
  const [modalTaxNumber, setModalTaxNumber] = useState("");
  const productOptions = useMemo(() => {
    const names = items.map((item) => item.name).filter(Boolean);
    return Array.from(new Set([...initialProducts.map((item) => item.name), ...names]));
  }, [items]);
  const [toast, setToast] = useState<{ message: string; tone: "success" | "info" } | null>(null);

  const invoiceTypeOptions = [
    {
      key: "simple",
      title: "فاتورة بسيطة",
      description: "مناسبة للطلبات السريعة بدون تفاصيل ضريبية.",
      features: ["حقول أساسية فقط", "بدون ضريبة", "إرسال سريع"],
      accent: "from-emerald-500/10 via-emerald-500/5 to-transparent",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M5 4h10l4 4v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3 9h8v2H8v-2Zm0-4h8v2H8V9Z"
          />
        </svg>
      ),
    },
    {
      key: "tax",
      title: "فاتورة ضريبية",
      description: "مخصصة للضريبة مع رقم تسجيل وتاريخ توريد.",
      features: ["رقم ضريبي", "نسبة الضريبة", "تاريخ التوريد"],
      accent: "from-amber-500/10 via-amber-500/5 to-transparent",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4 4h9l5 5v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3 10h8v2H7v-2Zm0-4h8v2H7v-2Z"
          />
        </svg>
      ),
    },
  ];

  const isSimple = invoiceType === "simple";
  const isTax = invoiceType === "tax";
  const itemGridColumns = "lg:grid-cols-[28px_1.4fr_1fr_0.8fr_0.8fr_1fr]";
  const extraFields = isSimple
    ? [{ label: "الخصم", value: "0" }]
    : [
        { label: "الخصم", value: "0" },
        { label: "الشحن", value: "0" },
      ];

  const showToast = (message: string, tone: "success" | "info" = "info") => {
    setToast({ message, tone });
    window.setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    setInvoiceType(normalizeInvoiceType(invoiceTypeParam));
  }, [invoiceTypeParam]);

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { name: "", desc: "وصف", qty: "1", price: "0", tax: "15", total: "0" },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف الصنف؟");
    if (!confirmed) {
      return;
    }
    setItems((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  const handleItemChange = (index: number, field: "name", value: string) => {
    setItems((prev) =>
      prev.map((item, currentIndex) => (currentIndex === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSaveDraft = () => {
    showToast("تم حفظ الفاتورة كمسودة", "success");
  };

  const handleSaveInvoice = () => {
    showToast("تم حفظ الفاتورة وإرسالها", "success");
  };

  const handleDownloadPdf = () => {
    window.print();
    showToast("تم تجهيز نموذج PDF للتحميل", "info");
  };

  const handleShareLink = async () => {
    const shareText = "رابط نموذج الفاتورة";
    try {
      await navigator.clipboard.writeText(shareText);
      showToast("تم نسخ رابط النموذج", "success");
    } catch {
      showToast("لم يتم نسخ الرابط", "info");
    }
  };

  const handleAddCustomerSave = () => {
    setCustomerTaxStatus(modalTaxStatus);
    setNewCustomerName(modalCustomerName);
    setShowAddCustomerModal(false);
  };

  return (
    <DashboardShell
      title="فاتورة جديدة"
      subtitle="إدخال بيانات الفاتورة وإضافة الأصناف"
      hideHeaderFilters
      headerAction={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="flex items-center gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text)"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                fill="currentColor"
                d="M5 4h12l4 4v11a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3 9h8v2H8v-2Zm0-4h8v2H8V9Z"
              />
            </svg>
            حفظ كمسودة
          </button>
          <button
            type="button"
            onClick={handleSaveInvoice}
            className="flex items-center gap-2 rounded-2xl bg-(--dash-primary) px-4 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                fill="currentColor"
                d="M3 12a1 1 0 0 1 1-1h8.2l-2.4-2.4a1 1 0 1 1 1.4-1.4l4.1 4.1a1 1 0 0 1 0 1.4l-4.1 4.1a1 1 0 1 1-1.4-1.4l2.4-2.4H4a1 1 0 0 1-1-1Z"
              />
            </svg>
            حفظ وإرسال
          </button>
        </div>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-start">
        <div className="min-w-0 space-y-6">
          {customerTaxStatus === "registered" ? (
            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft)/80 p-4 text-sm text-(--dash-text)">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-(--dash-primary)">تفاصيل العميل الضريبية</p>
                  <p className="text-xs text-(--dash-muted)">تم تفعيل الحقول الخاصة بالضريبة بعد إضافة العميل.</p>
                </div>
                <span className="rounded-full bg-(--dash-primary-soft) px-3 py-1 text-[11px] font-semibold text-(--dash-primary)">
                  مسجل بالضريبة
                </span>
              </div>
              <div className="mt-3 grid gap-3 lg:grid-cols-3">
                <div className="text-sm text-(--dash-text)">
                  <p className="text-xs text-(--dash-muted)">اسم العميل</p>
                  <p>{newCustomerName || "عميل جديد"}</p>
                </div>
                <div className="text-sm text-(--dash-text)">
                  <p className="text-xs text-(--dash-muted)">رقم التسجيل</p>
                  <p>{modalTaxNumber || "لم يتم توفيره بعد"}</p>
                </div>
                <div className="text-sm text-(--dash-text)">
                  <p className="text-xs text-(--dash-muted)">التاريخ</p>
                  <p>{new Date().toLocaleDateString("ar-EG")}</p>
                </div>
              </div>
            </div>
          ) : null}
          <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">نوع الفاتورة</h2>
                <p className="text-sm text-(--dash-muted)">اختر القالب المناسب قبل إدخال البيانات.</p>
              </div>
              <span className="rounded-full bg-(--dash-panel-soft) px-3 py-1 text-xs text-(--dash-muted)">
                3 خيارات
              </span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {invoiceTypeOptions.map((option) => {
                const isActive = invoiceType === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setInvoiceType(option.key as "simple" | "tax")}
                    className={`group relative overflow-hidden rounded-2xl border p-4 text-right transition ${
                      isActive
                        ? "border-(--dash-primary) bg-(--dash-panel) shadow-(--dash-shadow)"
                        : "border-(--dash-border) bg-(--dash-panel-soft) hover:border-(--dash-primary)"
                    }`}
                  >
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${option.accent}`} />
                    <div className="relative space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                            isActive ? "bg-(--dash-primary) text-white" : "bg-(--dash-panel) text-(--dash-primary)"
                          }`}
                        >
                          {option.icon}
                        </span>
                        <span className={`text-xs font-semibold ${isActive ? "text-(--dash-primary)" : "text-(--dash-muted)"}`}>
                          {isActive ? "محدد" : "اختر"}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">{option.title}</h3>
                        <p className="mt-1 text-xs text-(--dash-muted)">{option.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {option.features.map((feature) => (
                          <span
                            key={feature}
                            className="rounded-full border border-(--dash-border) bg-(--dash-panel) px-2.5 py-1 text-[11px] text-(--dash-muted)"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                <div className="flex items-center justify-between gap-2">
                  <span>العميل *</span>
                  {isTax ? (
                    <button
                      type="button"
                      onClick={() => setShowAddCustomerModal(true)}
                      className="rounded-full border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-xs text-(--dash-text) hover:bg-(--dash-panel)"
                    >
                      عميل جديد
                    </button>
                  ) : null}
                </div>
                {isSimple ? (
                  <input
                    type="text"
                    placeholder="اكتب اسم العميل"
                    className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
                  />
                ) : (
                  <select className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none">
                    <option value="">اختر العميل</option>
                    <option>أحمد محمد</option>
                    <option>سارة العبدالله</option>
                    <option>مؤسسة النور</option>
                    <option>شركة المدار</option>
                  </select>
                )}
              </div>
              {isSimple ? (
                <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                  <span>رقم الموبايل</span>
                  <input
                    type="tel"
                    placeholder="مثال: 05xxxxxxxx"
                    className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
                  />
                </label>
              ) : null}
              <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                <span>العملة *</span>
                <select className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none">
                  <option value="">اختر العملة</option>
                  <option>ريال سعودي (SAR)</option>
                  <option>دولار أمريكي (USD)</option>
                  <option>درهم إماراتي (AED)</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                <span>تاريخ الفاتورة *</span>
                <input
                  type="date"
                  className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
                />
              </label>
              {isTax && paymentMethod === "آجل" ? (
                <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                  <span>تاريخ الاستحقاق *</span>
                  <input
                    type="date"
                    className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
                  />
                </label>
              ) : null}
              <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                <span>طريقة الدفع *</span>
                <select
                  value={paymentMethod}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                  className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
                >
                  <option value="">اختر طريقة الدفع</option>
                  <option value="بطاقة">بطاقة بنكية</option>
                  <option value="تحويل">تحويل بنكي</option>
                  <option value="نقدي">نقدي</option>
                  <option value="آجل">آجل</option>
                </select>
              </label>
              {isTax ? (
                <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                  <span>تاريخ التوريد *</span>
                  <input
                    type="date"
                    className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
                  />
                </label>
              ) : null}
              {isTax ? (
                <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                  <span>نوع الضريبة</span>
                  <select
                    value={taxType}
                    onChange={(event) => setTaxType(event.target.value)}
                    className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
                  >
                    <option>ضريبة قيمة مضافة</option>
                    <option>ضريبة انتقائية</option>
                    <option>معفى</option>
                  </select>
                </label>
              ) : null}
              {isTax && taxType !== "معفى" ? (
                <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                  <span>نسبة الضريبة %</span>
                  <input
                    type="text"
                    defaultValue="15"
                    className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
                  />
                </label>
              ) : null}
              <label className="flex flex-col gap-2 text-sm text-(--dash-muted) lg:col-span-2">
                <span>المحفظة / الحساب</span>
                <select className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none">
                  <option value="">اختر الحساب لاستلام الدفعة</option>
                  <option>بنك الراجحي - حساب رئيسي</option>
                  <option>البنك الأهلي - حساب جاري</option>
                  <option>بنك الرياض - حساب تجاري</option>
                  <option>بنك البلاد - حساب تشغيل</option>
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-2 rounded-2xl bg-(--dash-primary) px-4 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
              >
                <span className="text-lg">+</span>
                إضافة صنف
              </button>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text)"
              >
                <span className="text-lg">+</span>
                منتج جديد
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-(--dash-border)">
              <div className="overflow-x-hidden lg:overflow-x-auto">
                <div className="min-w-0 lg:min-w-[760px]">
                  <div
                    className={`hidden gap-3 bg-(--dash-panel-soft) px-4 py-3 text-xs text-(--dash-muted) lg:grid ${itemGridColumns}`}
                  >
                    <span />
                    <span>المنتج</span>
                    <span>الوصف</span>
                    <span>الكمية</span>
                    <span>السعر</span>
                    <span>المجموع</span>
                  </div>
                  {items.map((row, index) => (
                    <div
                      key={`${row.name}-${index}`}
                      className={`grid gap-3 border-t border-(--dash-border) px-4 py-4 text-sm lg:items-center ${itemGridColumns}`}
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="flex items-center gap-2 text-rose-500 lg:justify-self-center"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                          <path
                            fill="currentColor"
                            d="M7 6h10v2H7V6Zm2 3h6l-1 10H10L9 9Zm2-5h2l1 2H10l1-2Z"
                          />
                        </svg>
                        <span className="text-xs lg:hidden">حذف</span>
                      </button>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-(--dash-muted) lg:hidden">المنتج</span>
                        <select
                          value={row.name}
                          onChange={(event) => handleItemChange(index, "name", event.target.value)}
                          className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs focus:outline-none"
                        >
                          <option value="">اختر المنتج</option>
                          {productOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-(--dash-muted) lg:hidden">الوصف</span>
                        <input
                          type="text"
                          defaultValue={row.desc}
                          className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-(--dash-muted) lg:hidden">الكمية</span>
                        <input
                          type="text"
                          defaultValue={row.qty}
                          className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-(--dash-muted) lg:hidden">السعر</span>
                        <input
                          type="text"
                          defaultValue={row.price}
                          className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-(--dash-muted) lg:hidden">المجموع</span>
                        <div className="text-sm">{row.total}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">خيارات إضافية</h3>
              <span className="text-xs text-(--dash-muted)">
                {isSimple ? "بدون ضريبة" : taxType === "معفى" ? "بدون ضريبة" : "خيارات ضريبية"}
              </span>
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {extraFields.map((field) => (
                <label key={field.label} className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                  <span>{field.label}</span>
                  <input
                    type="text"
                    defaultValue={field.value}
                    className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
                  />
                </label>
              ))}
            </div>
            <label className="mt-4 flex flex-col gap-2 text-sm text-(--dash-muted)">
              <span>ملاحظات</span>
              <textarea
                rows={3}
                placeholder="أضف أي ملاحظات إضافية للفاتورة..."
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
              />
            </label>
          </div>
        </div>

        <aside className="min-w-0 space-y-6">
          <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 text-sm">
            <h3 className="text-lg font-semibold">ملخص الفاتورة</h3>
            <div className="mt-4 space-y-2 text-(--dash-muted)">
              <div className="flex items-center justify-between">
                <span>المجموع الفرعي</span>
                <span className="text-(--dash-text)">1,000 ريال</span>
              </div>
              {isSimple ? (
                <div className="flex items-center justify-between">
                  <span>الضريبة</span>
                  <span className="text-(--dash-text)">0 ريال</span>
                </div>
              ) : taxType === "معفى" ? (
                <div className="flex items-center justify-between">
                  <span>الضريبة</span>
                  <span className="text-(--dash-text)">0 ريال</span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span>الضريبة (15%)</span>
                  <span className="text-(--dash-text)">150 ريال</span>
                </div>
              )}
              <div className="mt-4 flex items-center justify-between text-base font-semibold text-(--dash-text)">
                <span>الإجمالي</span>
                <span>1,150 ريال</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleSaveInvoice}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-(--dash-primary) px-4 py-3 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M5 5h10l4 4v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm2 9h10v2H7v-2Zm0-4h10v2H7V10Z"
                  />
                </svg>
                حفظ وإرسال
              </button>
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text)"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 3a1 1 0 0 1 1 1v8.6l2.3-2.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L11 12.6V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1a1 1 0 0 1 1-1Z"
                  />
                </svg>
                تحميل PDF
              </button>
              <button
                type="button"
                onClick={handleShareLink}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text)"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M15 8a3 3 0 1 0-2.83-4H12a3 3 0 0 0 0 6 2.97 2.97 0 0 0 1.9-.7l-4.2 2.2a3 3 0 1 0 0 3l4.2 2.2A3 3 0 1 0 15 16a2.97 2.97 0 0 0-1.9.7l-4.2-2.2a2.9 2.9 0 0 0 0-1l4.2-2.2A2.97 2.97 0 0 0 15 8Z"
                  />
                </svg>
                مشاركة رابط
              </button>
            </div>
          </div>
        </aside>
      </section>

      {showAddCustomerModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-[32px] border border-(--dash-border) bg-(--dash-panel) p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-(--dash-text)">إضافة عميل</h2>
              <button
                type="button"
                onClick={() => setShowAddCustomerModal(false)}
                className="text-(--dash-muted) transition hover:text-(--dash-text)"
              >
                ×
              </button>
            </div>
            <p className="mt-3 text-sm text-(--dash-muted)">
              قم بتعبئة بيانات العميل الجديد. بعد حفظ العميل، تظهر البيانات الضريبية في قسم الفاتورة.
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-6 text-sm text-(--dash-muted)">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="modalTaxStatus"
                    value="unregistered"
                    checked={modalTaxStatus === "unregistered"}
                    onChange={() => setModalTaxStatus("unregistered")}
                  />
                  غير مسجل بالضريبة
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="modalTaxStatus"
                    value="registered"
                    checked={modalTaxStatus === "registered"}
                    onChange={() => setModalTaxStatus("registered")}
                  />
                  مسجل بالضريبة
                </label>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="text-sm text-(--dash-text)">
                  <span className="mb-2 block text-xs text-(--dash-muted)">اسم العميل *</span>
                  <input
                    type="text"
                    value={modalCustomerName}
                    onChange={(event) => setModalCustomerName(event.target.value)}
                    className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm focus:outline-none"
                  />
                </label>
                {modalTaxStatus === "registered" ? (
                  <label className="text-sm text-(--dash-text)">
                    <span className="mb-2 block text-xs text-(--dash-muted)">رقم التسجيل الضريبي</span>
                    <input
                      type="text"
                      value={modalTaxNumber}
                      onChange={(event) => setModalTaxNumber(event.target.value)}
                      className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm focus:outline-none"
                    />
                  </label>
                ) : null}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddCustomerModal(false)}
                className="rounded-2xl border border-(--dash-border) px-4 py-2 text-sm text-(--dash-text)"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleAddCustomerSave}
                className="rounded-2xl bg-(--dash-primary) px-4 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
              >
                حفظ العميل
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? (
        <div className="fixed bottom-6 left-6 z-50">
          <div
            className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm text-white shadow-lg ${
              toast.tone === "success"
                ? "border-(--dash-success) bg-(--dash-success)"
                : "border-(--dash-info) bg-(--dash-info)"
            }`}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M9.5 16.2 5.8 12.5l1.4-1.4 2.3 2.3 6.1-6.1 1.4 1.4-7.5 7.5Z"
                />
              </svg>
            </span>
            {toast.message}
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
};

const page = () => (
  <Suspense
    fallback={<div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 text-sm text-(--dash-muted)">جارٍ التحميل...</div>}
  >
    <InvoiceNewPageContent />
  </Suspense>
);

export default page;
