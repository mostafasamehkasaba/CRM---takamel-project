"use client";

import { useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import { createSupplier } from "@/app/services/suppliers";

const Page = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    taxNumber: "",
    commercialNumber: "",
    address: "",
    accountCode: "2101",
    balance: "0",
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
      email: "",
      phone: "",
      taxNumber: "",
      commercialNumber: "",
      address: "",
      accountCode: "2101",
      balance: "0",
    });
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setErrorMessage("يرجى إدخال اسم المورد.");
      return;
    }
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      await createSupplier({
        name: form.name.trim(),
        email: form.email.trim() || undefined,
        phone: form.phone.trim() || undefined,
        tax_number: form.taxNumber.trim() || undefined,
        commercial_number: form.commercialNumber.trim() || undefined,
        address: form.address.trim() || undefined,
        balance: form.balance || "0",
        account_code: form.accountCode.trim() || undefined,
      });
      setSuccessMessage("تم إضافة المورد بنجاح.");
      resetForm();
    } catch (error) {
      console.error(error);
      const message = error instanceof Error && error.message ? error.message : "تعذر إضافة المورد.";
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardShell title="إضافة مورد" subtitle="البداية / الموردين / إضافة مورد" hideHeaderFilters>
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

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-5">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">اسم المورد *</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
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
              <span className="mb-2 block font-semibold text-(--dash-text)">هاتف (ex:966568101255)</span>
              <input
                type="text"
                value={form.phone}
                onChange={(event) => updateForm("phone", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الرقم الضريبي</span>
              <input
                type="text"
                value={form.taxNumber}
                onChange={(event) => updateForm("taxNumber", event.target.value)}
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
              <span className="mb-2 block font-semibold text-(--dash-text)">العنوان</span>
              <input
                type="text"
                value={form.address}
                onChange={(event) => updateForm("address", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">كود الحساب *</span>
              <select
                value={form.accountCode}
                onChange={(event) => updateForm("accountCode", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              >
                <option value="2101">الموردين - 2101</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">رصيد افتتاحي *(المبلغ المستحق للمورد)</span>
              <input
                type="number"
                value={form.balance}
                onChange={(event) => updateForm("balance", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div className="mt-6 flex justify-start">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving}
              className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
            >
              إضافة مورد
            </button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
