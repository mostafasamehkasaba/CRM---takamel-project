"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const tabs = [
  { id: "company", label: "بيانات الشركة" },
  { id: "currencies", label: "العملات" },
  { id: "invoices", label: "الفواتير" },
  { id: "email", label: "البريد الإلكتروني" },
  { id: "backup", label: "النسخ الاحتياطي" },
  { id: "notifications", label: "الإشعارات" },
];

const initialCurrencies = [
  {
    name: "الريال السعودي",
    code: "SAR",
    symbol: "ر.س",
    isDefault: true,
    enabled: true,
  },
  {
    name: "الدولار الأمريكي",
    code: "USD",
    symbol: "$",
    isDefault: false,
    enabled: true,
  },
  {
    name: "اليورو",
    code: "EUR",
    symbol: "€",
    isDefault: false,
    enabled: false,
  },
];

const page = () => {
  const [activeTab, setActiveTab] = useState("company");
  const [currencies, setCurrencies] = useState(initialCurrencies);
  const [showCurrencyForm, setShowCurrencyForm] = useState(false);
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [sslEnabled, setSslEnabled] = useState(true);
  const [showInvoiceLogo, setShowInvoiceLogo] = useState(true);
  const [showInvoiceBarcode, setShowInvoiceBarcode] = useState(true);
  const [showInvoiceStamp, setShowInvoiceStamp] = useState(false);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [expiryAlerts, setExpiryAlerts] = useState(true);
  const [newInvoiceAlerts, setNewInvoiceAlerts] = useState(false);
  const [paymentReceivedAlerts, setPaymentReceivedAlerts] = useState(true);
  const [showNotificationsSaved, setShowNotificationsSaved] = useState(false);

  const handleNotificationsSave = () => {
    setShowNotificationsSaved(true);
    window.setTimeout(() => setShowNotificationsSaved(false), 2000);
  };
  const [currencyForm, setCurrencyForm] = useState({
    name: "",
    code: "",
    symbol: "",
    isDefault: false,
    enabled: true,
  });

  useEffect(() => {
    const storedTab = window.localStorage.getItem("settings-active-tab");
    if (storedTab) {
      setActiveTab(storedTab);
    }
    const storedCurrencies = window.localStorage.getItem("settings-currencies");
    if (storedCurrencies) {
      try {
        const parsed = JSON.parse(storedCurrencies);
        if (Array.isArray(parsed)) {
          setCurrencies(parsed);
        }
      } catch {
        // Ignore invalid stored data.
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("settings-active-tab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    window.localStorage.setItem("settings-currencies", JSON.stringify(currencies));
  }, [currencies]);

  const renderCompanySection = () => (
    <section className="mt-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
      <h2 className="text-lg font-semibold">بيانات الشركة</h2>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <label className="text-sm text-(--dash-muted)">
          <span className="mb-2 block font-semibold text-(--dash-text)">اسم الشركة</span>
          <input
            type="text"
            placeholder="مثال: لوب تك سيستمز"
            className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
          />
        </label>
        <label className="text-sm text-(--dash-muted)">
          <span className="mb-2 block font-semibold text-(--dash-text)">الرقم الضريبي</span>
          <input
            type="text"
            placeholder="الرقم الضريبي"
            className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
          />
        </label>
        <label className="text-sm text-(--dash-muted)">
          <span className="mb-2 block font-semibold text-(--dash-text)">السجل التجاري</span>
          <input
            type="text"
            placeholder="رقم السجل التجاري"
            className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
          />
        </label>
        <label className="text-sm text-(--dash-muted)">
          <span className="mb-2 block font-semibold text-(--dash-text)">النشاط الرئيسي</span>
          <input
            type="text"
            placeholder="مثال: حلول تقنية"
            className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
          />
        </label>
        <label className="text-sm text-(--dash-muted)">
          <span className="mb-2 block font-semibold text-(--dash-text)">البريد الإلكتروني</span>
          <input
            type="email"
            placeholder="info@company.com"
            className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
          />
        </label>
        <label className="text-sm text-(--dash-muted)">
          <span className="mb-2 block font-semibold text-(--dash-text)">رقم الهاتف</span>
          <input
            type="tel"
            placeholder="+966 50 123 4567"
            className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-5">
        <label className="text-sm text-(--dash-muted)">
          <span className="mb-2 block font-semibold text-(--dash-text)">العنوان</span>
          <input
            type="text"
            placeholder="الرياض - حي العليا - شارع الملك فهد"
            className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-6 border-t border-(--dash-border) pt-6">
        <h3 className="text-sm font-semibold">شعار الشركة</h3>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) text-(--dash-muted)">
            <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
              <path
                fill="currentColor"
                d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5Z"
              />
            </svg>
          </div>
          <div>
            <button
              type="button"
              className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text)"
            >
              رفع الشعار
            </button>
            <p className="mt-2 text-xs text-(--dash-muted)">الأبعاد المفضلة: 200x200 بكسل</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
              fill="currentColor"
              d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V7h3.5L14 3.5Z"
            />
          </svg>
          حفظ الإعدادات
        </button>
      </div>
    </section>
  );

  const handleCurrencyChange = (field: keyof typeof currencyForm, value: string | boolean) => {
    setCurrencyForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddCurrency = () => {
    const name = currencyForm.name.trim();
    const code = currencyForm.code.trim().toUpperCase();
    const symbol = currencyForm.symbol.trim();
    if (!name || !code || !symbol) {
      return;
    }

    setCurrencies((prev) => {
      const normalized = currencyForm.isDefault
        ? prev.map((item) => ({ ...item, isDefault: false }))
        : prev;
      if (editingCode) {
        return normalized.map((item) =>
          item.code === editingCode
            ? { ...item, name, code, symbol, isDefault: currencyForm.isDefault, enabled: currencyForm.enabled }
            : item
        );
      }
      return [
        ...normalized,
        {
          name,
          code,
          symbol,
          isDefault: currencyForm.isDefault,
          enabled: currencyForm.enabled,
        },
      ];
    });

    setCurrencyForm({
      name: "",
      code: "",
      symbol: "",
      isDefault: false,
      enabled: true,
    });
    setEditingCode(null);
    setShowCurrencyForm(false);
  };

  const handleResetStorage = () => {
    window.localStorage.removeItem("settings-active-tab");
    window.localStorage.removeItem("settings-currencies");
    setActiveTab("company");
    setCurrencies(initialCurrencies);
    setCurrencyForm({
      name: "",
      code: "",
      symbol: "",
      isDefault: false,
      enabled: true,
    });
    setEditingCode(null);
    setShowCurrencyForm(false);
  };

  const handleEditCurrency = (code: string) => {
    const target = currencies.find((item) => item.code === code);
    if (!target) {
      return;
    }
    setCurrencyForm({
      name: target.name,
      code: target.code,
      symbol: target.symbol,
      isDefault: target.isDefault,
      enabled: target.enabled,
    });
    setEditingCode(target.code);
    setShowCurrencyForm(true);
  };

  const handleCancelCurrencyForm = () => {
    setCurrencyForm({
      name: "",
      code: "",
      symbol: "",
      isDefault: false,
      enabled: true,
    });
    setEditingCode(null);
    setShowCurrencyForm(false);
  };

  const renderCurrenciesSection = () => (
    <section className="mt-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">إدارة العملات</h2>
        <button
          type="button"
          onClick={() => setShowCurrencyForm((prev) => !prev)}
          className="rounded-xl bg-(--dash-primary) px-4 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
        >
          إضافة عملة
        </button>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={handleResetStorage}
          className="rounded-xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-sm text-(--dash-text)"
        >
          Reset storage
        </button>
      </div>

      {showCurrencyForm ? (
        <div className="mt-6 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">اسم العملة</span>
              <input
                type="text"
                value={currencyForm.name}
                onChange={(event) => handleCurrencyChange("name", event.target.value)}
                placeholder="مثال: الدرهم الإماراتي"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">الكود</span>
              <input
                type="text"
                value={currencyForm.code}
                onChange={(event) => handleCurrencyChange("code", event.target.value)}
                placeholder="مثال: AED"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">الرمز</span>
              <input
                type="text"
                value={currencyForm.symbol}
                onChange={(event) => handleCurrencyChange("symbol", event.target.value)}
                placeholder="مثال: د.إ"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </label>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-(--dash-muted)">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={currencyForm.isDefault}
                onChange={(event) => handleCurrencyChange("isDefault", event.target.checked)}
                className="h-4 w-4"
              />
              تعيين كعملة افتراضية
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={currencyForm.enabled}
                onChange={(event) => handleCurrencyChange("enabled", event.target.checked)}
                className="h-4 w-4"
              />
              تفعيل العملة
            </label>
            <button
              type="button"
              onClick={handleCancelCurrencyForm}
              className="rounded-xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-sm text-(--dash-text)"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleAddCurrency}
              className="mr-auto rounded-xl bg-(--dash-primary) px-4 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
            >
              {editingCode ? "تحديث العملة" : "حفظ العملة"}
            </button>
          </div>
        </div>
      ) : null}

      <div className="mt-6 space-y-4">
        {currencies.map((currency) => (
          <div
            key={currency.code}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-4"
          >
            <div>
              <div className="flex items-center gap-3 text-sm font-semibold text-(--dash-text)">
                <span>
                  {currency.name} ({currency.code})
                </span>
                {currency.isDefault ? (
                  <span className="rounded-full bg-(--dash-primary) px-3 py-1 text-xs text-white">
                    افتراضية
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-xs text-(--dash-muted)">الرمز: {currency.symbol}</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-(--dash-muted)">
              <button type="button" className="text-(--dash-primary)" onClick={() => handleEditCurrency(currency.code)}>
                تعديل
              </button>
              <button
                type="button"
                className={`relative h-6 w-12 rounded-full transition ${
                  currency.enabled ? "bg-(--dash-primary)" : "bg-slate-200"
                }`}
                onClick={() =>
                  setCurrencies((prev) =>
                    prev.map((item) =>
                      item.code === currency.code ? { ...item, enabled: !item.enabled } : item
                    )
                  )
                }
                aria-label="تفعيل العملة"
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                    currency.enabled ? "left-1" : "left-7"
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderEmailSection = () => (
    <section className="mt-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
      <h2 className="text-lg font-semibold">إعدادات البريد الإلكتروني</h2>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <label className="text-sm text-(--dash-muted)">
          <span className="mb-2 block font-semibold text-(--dash-text)">خادم البريد (SMTP)</span>
          <input
            type="text"
            defaultValue="smtp.gmail.com"
            className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
          />
        </label>
        <label className="text-sm text-(--dash-muted)">
          <span className="mb-2 block font-semibold text-(--dash-text)">المنفذ (Port)</span>
          <input
            type="text"
            defaultValue="587"
            className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
          />
        </label>
        <label className="text-sm text-(--dash-muted)">
          <span className="mb-2 block font-semibold text-(--dash-text)">البريد الإلكتروني</span>
          <input
            type="email"
            defaultValue="noreply@company.com"
            className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
          />
        </label>
        <label className="text-sm text-(--dash-muted)">
          <span className="mb-2 block font-semibold text-(--dash-text)">كلمة المرور</span>
          <input
            type="password"
            defaultValue="password"
            className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-(--dash-text)">تفعيل SSL</p>
          <p className="text-sm text-(--dash-muted)">استخدام اتصال آمن</p>
        </div>
        <button
          type="button"
          className={`relative h-7 w-14 rounded-full transition ${
            sslEnabled ? "bg-(--dash-primary)" : "bg-slate-200"
          }`}
          onClick={() => setSslEnabled((prev) => !prev)}
          aria-pressed={sslEnabled}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
              sslEnabled ? "left-1" : "left-8"
            }`}
          />
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
              fill="currentColor"
              d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V7h3.5L14 3.5Z"
            />
          </svg>
          حفظ الإعدادات
        </button>
        <button
          type="button"
          className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-5 py-2 text-sm text-(--dash-text) shadow-(--dash-shadow)"
        >
          اختبار الاتصال
        </button>
      </div>
    </section>
  );

  const renderInvoicesSection = () => (
    <section className="mt-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
      <h2 className="text-lg font-semibold">إعدادات الفواتير</h2>

      <div className="mt-6 space-y-5">
        <label className="text-sm text-(--dash-muted)">
          <span className="mb-2 block font-semibold text-(--dash-text)">قالب الفاتورة</span>
          <div className="relative">
            <select className="w-full appearance-none rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none">
              <option>حديث</option>
              <option>كلاسيكي</option>
              <option>مختصر</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-(--dash-muted)">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M6.7 9.3a1 1 0 0 1 1.4 0L12 13.2l3.9-3.9a1 1 0 0 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0L6.7 10.7a1 1 0 0 1 0-1.4Z"
                />
              </svg>
            </span>
          </div>
        </label>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">بادئة رقم الفاتورة</span>
            <input
              type="text"
              defaultValue="INV-"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
            />
          </label>
          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">الرقم التالي</span>
            <input
              type="text"
              defaultValue="1001"
              className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
            />
          </label>
        </div>

        <label className="text-sm text-(--dash-muted)">
          <span className="mb-2 block font-semibold text-(--dash-text)">معدل الضريبة الافتراضي (%)</span>
          <input
            type="text"
            defaultValue="15"
            className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
          />
        </label>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-(--dash-text)">إظهار الشعار في الفاتورة</p>
              <p className="text-sm text-(--dash-muted)">عرض شعار الشركة في رأس الفاتورة</p>
            </div>
            <button
              type="button"
              className={`relative h-7 w-14 rounded-full transition ${
                showInvoiceLogo ? "bg-(--dash-primary)" : "bg-slate-200"
              }`}
              onClick={() => setShowInvoiceLogo((prev) => !prev)}
              aria-pressed={showInvoiceLogo}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                  showInvoiceLogo ? "left-1" : "left-8"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-(--dash-text)">إظهار الباركود</p>
              <p className="text-sm text-(--dash-muted)">إضافة باركود لرقم الفاتورة</p>
            </div>
            <button
              type="button"
              className={`relative h-7 w-14 rounded-full transition ${
                showInvoiceBarcode ? "bg-(--dash-primary)" : "bg-slate-200"
              }`}
              onClick={() => setShowInvoiceBarcode((prev) => !prev)}
              aria-pressed={showInvoiceBarcode}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                  showInvoiceBarcode ? "left-1" : "left-8"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-(--dash-text)">إظهار الختم</p>
              <p className="text-sm text-(--dash-muted)">إضافة ختم الشركة في الفاتورة</p>
            </div>
            <button
              type="button"
              className={`relative h-7 w-14 rounded-full transition ${
                showInvoiceStamp ? "bg-(--dash-primary)" : "bg-slate-200"
              }`}
              onClick={() => setShowInvoiceStamp((prev) => !prev)}
              aria-pressed={showInvoiceStamp}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                  showInvoiceStamp ? "left-1" : "left-8"
                }`}
              />
            </button>
          </div>
        </div>

        <label className="text-sm text-(--dash-muted)">
          <span className="mb-2 block font-semibold text-(--dash-text)">ملاحظة افتراضية في الفاتورة</span>
          <textarea
            rows={4}
            defaultValue="شكراً لتعاملكم معنا..."
            className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
              fill="currentColor"
              d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V7h3.5L14 3.5Z"
            />
          </svg>
          حفظ التغييرات
        </button>
      </div>
    </section>
  );

  const renderBackupSection = () => (
    <section className="mt-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
      <h2 className="text-lg font-semibold">النسخ الاحتياطي والاستعادة</h2>

      <div className="mt-6 space-y-5">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) p-5">
          <p className="text-sm font-semibold text-(--dash-text)">إنشاء نسخة احتياطية</p>
          <p className="mt-2 text-sm text-(--dash-muted)">احفظ جميع بياناتك في ملف واحد</p>
          <button
            type="button"
            className="mt-4 flex items-center gap-2 rounded-xl bg-(--dash-primary) px-4 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5Z"
              />
            </svg>
            تصدير النسخة الاحتياطية
          </button>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) p-5">
          <p className="text-sm font-semibold text-(--dash-text)">استعادة من نسخة احتياطية</p>
          <p className="mt-2 text-sm text-(--dash-muted)">استيراد البيانات من ملف نسخة احتياطية</p>
          <button
            type="button"
            className="mt-4 flex items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-sm font-semibold text-(--dash-text) shadow-(--dash-shadow)"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 3a1 1 0 0 1 1 1v8.6l2.3-2.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4L11 12.6V4a1 1 0 0 1 1-1Zm-7 15a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z"
              />
            </svg>
            استيراد البيانات
          </button>
        </div>

        <div>
          <p className="text-sm font-semibold text-(--dash-text)">النسخ الاحتياطي التلقائي</p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-(--dash-text)">تفعيل النسخ التلقائي</p>
              <p className="text-sm text-(--dash-muted)">إنشاء نسخة احتياطية تلقائيًا</p>
            </div>
            <button
              type="button"
              className={`relative h-7 w-14 rounded-full transition ${
                autoBackupEnabled ? "bg-(--dash-primary)" : "bg-slate-200"
              }`}
              onClick={() => setAutoBackupEnabled((prev) => !prev)}
              aria-pressed={autoBackupEnabled}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                  autoBackupEnabled ? "left-1" : "left-8"
                }`}
              />
            </button>
          </div>

          <label className="mt-4 block text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">تكرار النسخ</span>
            <div className="relative">
              <select className="w-full appearance-none rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none">
                <option>أسبوعي</option>
                <option>شهري</option>
                <option>كل 3 أشهر</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-(--dash-muted)">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.7 9.3a1 1 0 0 1 1.4 0L12 13.2l3.9-3.9a1 1 0 0 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0L6.7 10.7a1 1 0 0 1 0-1.4Z"
                  />
                </svg>
              </span>
            </div>
          </label>
        </div>
      </div>
    </section>
  );

  const renderNotificationsSection = () => (
    <section className="mt-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
      <h2 className="text-lg font-semibold">إعدادات الإشعارات</h2>

      <div className="mt-6 space-y-6">
        {[
          {
            title: "إشعارات البريد الإلكتروني",
            description: "استلام إشعارات عبر البريد الإلكتروني",
            enabled: emailNotifications,
            onToggle: () => setEmailNotifications((prev) => !prev),
          },
          {
            title: "تنبيهات المخزون المنخفض",
            description: "عند انخفاض مستوى المخزون",
            enabled: lowStockAlerts,
            onToggle: () => setLowStockAlerts((prev) => !prev),
          },
          {
            title: "تنبيهات انتهاء الصلاحية",
            description: "عند اقتراب موعد انتهاء صلاحية المنتجات",
            enabled: expiryAlerts,
            onToggle: () => setExpiryAlerts((prev) => !prev),
          },
          {
            title: "فاتورة جديدة",
            description: "عند إنشاء فاتورة جديدة",
            enabled: newInvoiceAlerts,
            onToggle: () => setNewInvoiceAlerts((prev) => !prev),
          },
          {
            title: "استلام دفعة",
            description: "عند استلام دفعة من عميل",
            enabled: paymentReceivedAlerts,
            onToggle: () => setPaymentReceivedAlerts((prev) => !prev),
          },
        ].map((item) => (
          <div key={item.title} className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-(--dash-text)">{item.title}</p>
              <p className="text-sm text-(--dash-muted)">{item.description}</p>
            </div>
            <button
              type="button"
              className={`relative h-7 w-14 rounded-full transition ${
                item.enabled ? "bg-(--dash-primary)" : "bg-slate-200"
              }`}
              onClick={item.onToggle}
              aria-pressed={item.enabled}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                  item.enabled ? "left-1" : "left-8"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleNotificationsSave}
          className="flex items-center gap-2 rounded-xl bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
              fill="currentColor"
              d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V7h3.5L14 3.5Z"
            />
          </svg>
          حفظ التغييرات
        </button>
      </div>
      {showNotificationsSaved ? (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path fill="currentColor" d="M9.55 17.3 4.7 12.45a1 1 0 0 1 1.4-1.4l3.45 3.45 8-8a1 1 0 1 1 1.4 1.4l-8.7 8.7a1 1 0 0 1-1.4 0Z" />
            </svg>
          </span>
          تم حفظ التعديلات بنجاح
        </div>
      ) : null}
    </section>
  );

  const renderPlaceholder = (title: string, description: string) => (
    <section className="mt-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 text-sm text-(--dash-muted) shadow-(--dash-shadow)">
      <h2 className="text-lg font-semibold text-(--dash-text)">{title}</h2>
      <p className="mt-3">{description}</p>
    </section>
  );

  return (
    <DashboardShell title="الإعدادات" subtitle="تحكم في إعدادات الحساب والنظام">
      <div className="flex flex-wrap gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) p-2">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition ${
                isActive
                  ? "bg-(--dash-panel) text-(--dash-text) shadow-(--dash-shadow)"
                  : "text-(--dash-muted) hover:bg-(--dash-panel)"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-(--dash-primary)" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "company" ? renderCompanySection() : null}
      {activeTab === "currencies" ? renderCurrenciesSection() : null}
      {activeTab === "invoices" ? renderInvoicesSection() : null}
      {activeTab === "email" ? renderEmailSection() : null}
      {activeTab === "backup" ? renderBackupSection() : null}
      {activeTab === "notifications" ? renderNotificationsSection() : null}
      </DashboardShell>
  );
};

export default page;


