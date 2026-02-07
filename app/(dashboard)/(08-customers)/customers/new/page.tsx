"use client";

import { useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import { createClient } from "@/app/services/clients";

const Page = () => {
  const [taxType, setTaxType] = useState<"nonTax" | "tax">("nonTax");
  const [form, setForm] = useState({
    name: "",
    groupType: "ط¹ط§ظ…",
    pricingType: "ط¹ط§ظ…",
    phone: "",
    email: "",
    commercialNumber: "",
    accountCode: "",
    balance: "0",
    maxDebt: "0",
    stopForDebt: false,
    taxNumber: "",
    country: "",
    city: "",
    district: "",
    street: "",
    postalCode: "",
    buildNumber: "",
    subNumber: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateForm = <K extends keyof typeof form>(field: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      groupType: "ط¹ط§ظ…",
      pricingType: "ط¹ط§ظ…",
      phone: "",
      email: "",
      commercialNumber: "",
      accountCode: "",
      balance: "0",
      maxDebt: "0",
      stopForDebt: false,
      taxNumber: "",
      country: "",
      city: "",
      district: "",
      street: "",
      postalCode: "",
      buildNumber: "",
      subNumber: "",
    });
    setTaxType("nonTax");
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setErrorMessage("يرجى إدخال اسم العميل.");
      return;
    }
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const normalizedGroupType = form.groupType === "ط¹ط§ظ…" ? "normal" : form.groupType;
      const normalizedPricingType = form.pricingType === "ط¹ط§ظ…" ? "retail" : form.pricingType;
      await createClient({
        name: form.name.trim(),
        phone: form.phone.trim() || undefined,
        email: form.email.trim() || undefined,
        commercial_number: form.commercialNumber.trim() || undefined,
        balance: form.balance || "0",
        max_debt: form.maxDebt || "0",
        stop_for_debt: form.stopForDebt ? 1 : 0,
        is_taxed: taxType === "tax" ? 1 : 0,
        pricing_type: normalizedPricingType,
        group_type: normalizedGroupType,
        tax_number: taxType === "tax" ? form.taxNumber.trim() || undefined : undefined,
        country: taxType === "tax" ? form.country.trim() || undefined : undefined,
        city: taxType === "tax" ? form.city.trim() || undefined : undefined,
        postal_code: taxType === "tax" ? form.postalCode.trim() || undefined : undefined,
        build_number: taxType === "tax" ? form.buildNumber.trim() || undefined : undefined,
        sub_number: taxType === "tax" ? form.subNumber.trim() || undefined : undefined,
        account_code: form.accountCode.trim() || undefined,
      });
      setSuccessMessage("تم إضافة العميل بنجاح.");
      resetForm();
    } catch (error) {
      console.error(error);
      const message = error instanceof Error && error.message ? error.message : "تعذر إضافة العميل.";
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardShell title="إضافة عميل" subtitle="البداية / العملاء / إضافة عميل" hideHeaderFilters>
      <section className="space-y-5">
        {errorMessage ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700">
            {errorMessage}
          </div>
        ) : null}
        {successMessage ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
            {successMessage}
          </div>
        ) : null}
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
              <input
                type="text"
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">مجموعة العملاء *</span>
              <select
                value={form.groupType}
                onChange={(event) => updateForm("groupType", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              >
                <option>عام</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">مجموعة التسعيرة</span>
              <select
                value={form.pricingType}
                onChange={(event) => updateForm("pricingType", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              >
                <option>عام</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">هاتف</span>
              <input
                type="text"
                value={form.phone}
                onChange={(event) => updateForm("phone", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">عنوان البريد الإلكتروني</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateForm("email", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">السجل التجاري</span>
              <input
                type="text"
                value={form.commercialNumber}
                onChange={(event) => updateForm("commercialNumber", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">كود الحساب *</span>
              <input
                type="text"
                value={form.accountCode}
                onChange={(event) => updateForm("accountCode", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">رصيد افتتاحي * (المديونية بالسالب)</span>
              <input
                type="number"
                value={form.balance}
                onChange={(event) => updateForm("balance", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الحد الائتماني *</span>
              <input
                type="number"
                value={form.maxDebt}
                onChange={(event) => updateForm("maxDebt", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm lg:col-span-3">
              <div className="flex items-center gap-2 text-sm text-(--dash-text)">
                <input
                  type="checkbox"
                  checked={form.stopForDebt}
                  onChange={(event) => updateForm("stopForDebt", event.target.checked)}
                  className="h-4 w-4 rounded border border-(--dash-border)"
                />
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
                  <input
                    type="text"
                    value={form.country}
                    onChange={(event) => updateForm("country", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">المدينة *</span>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(event) => updateForm("city", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">الحي *</span>
                  <input
                    type="text"
                    value={form.district}
                    onChange={(event) => updateForm("district", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">اسم الشارع *</span>
                  <input
                    type="text"
                    value={form.street}
                    onChange={(event) => updateForm("street", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">الرمز البريدي *</span>
                  <input
                    type="text"
                    value={form.postalCode}
                    onChange={(event) => updateForm("postalCode", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">رقم المبنى *</span>
                  <input
                    type="text"
                    value={form.buildNumber}
                    onChange={(event) => updateForm("buildNumber", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-2 block font-semibold text-(--dash-text)">الرقم الفرعي</span>
                  <input
                    type="text"
                    value={form.subNumber}
                    onChange={(event) => updateForm("subNumber", event.target.value)}
                    className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                </label>
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex justify-start">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving}
              className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
            >
              إضافة عميل
            </button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
