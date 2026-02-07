"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import { createBank } from "@/app/services/banks";
import { listCurrencies } from "@/app/services/currencies";
import { extractList } from "@/app/services/http";

const accountTypes = ["حساب جاري", "حساب توفير"];

type CurrencyOption = {
  id: string | number;
  code: string;
  name: string;
};

const Page = () => {
  const [form, setForm] = useState({
    bankCode: "",
    bankName: "",
    accountName: "",
    iban: "",
    branch: "",
    accountType: "",
    openingBalance: "0.00",
    accountCode: "2101",
    note: "",
  });
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
  const [currencyId, setCurrencyId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateForm = <K extends keyof typeof form>(field: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const loadCurrencies = async () => {
    try {
      const response = await listCurrencies({ pagination: "on", limit_per_page: 200 });
      const list = extractList<any>(response);
      const mapped = list.map((entry: any, index: number) => ({
        id: entry.id ?? entry.uuid ?? entry.code ?? entry._id ?? `${index + 1}`,
        code: entry.code ?? "",
        name: entry.name ?? entry.code ?? "عملة",
      }));
      setCurrencies(mapped);
      if (!currencyId && mapped.length) {
        setCurrencyId(String(mapped[0].id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCurrencies();
  }, []);

  const mapAccountType = (value: string) => {
    if (value.includes("توفير")) {
      return "saving";
    }
    return "current";
  };

  const handleSubmit = async () => {
    if (!form.bankCode.trim() || !form.bankName.trim()) {
      setErrorMessage("يرجى إدخال كود البنك واسم البنك.");
      return;
    }
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      await createBank({
        code: form.bankCode.trim(),
        name: form.accountName.trim() || form.bankName.trim(),
        bank_name: form.bankName.trim(),
        type: mapAccountType(form.accountType || accountTypes[0]),
        branch: form.branch.trim() || undefined,
        balance: form.openingBalance || "0",
        note: form.note.trim() || undefined,
        currency_id: currencyId || undefined,
        iban: form.iban.trim() || undefined,
      });
      setSuccessMessage("تم إضافة البنك بنجاح.");
      setForm({
        bankCode: "",
        bankName: "",
        accountName: "",
        iban: "",
        branch: "",
        accountType: "",
        openingBalance: "0.00",
        accountCode: "2101",
        note: "",
      });
    } catch (error) {
      console.error(error);
      const message = error instanceof Error && error.message ? error.message : "تعذر إضافة البنك.";
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardShell title="إضافة بنك" subtitle="البداية / البنوك / إضافة بنك" hideHeaderFilters>
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
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">كود البنك *</span>
              <input
                value={form.bankCode}
                onChange={(event) => updateForm("bankCode", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">اسم البنك *</span>
              <input
                value={form.bankName}
                onChange={(event) => updateForm("bankName", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">اسم الحساب</span>
              <input
                value={form.accountName}
                onChange={(event) => updateForm("accountName", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                placeholder="مثال: البنك الأهلي - حساب جاري"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">رقم الحساب (IBAN)</span>
              <input
                value={form.iban}
                onChange={(event) => updateForm("iban", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                placeholder="SA..."
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الفرع</span>
              <input
                value={form.branch}
                onChange={(event) => updateForm("branch", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                placeholder="مثال: الرياض - المركز"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">نوع الحساب</span>
              <select
                value={form.accountType}
                onChange={(event) => updateForm("accountType", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              >
                <option value="">اختر نوع الحساب</option>
                {accountTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">العملة</span>
              <select
                value={currencyId}
                onChange={(event) => setCurrencyId(event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              >
                {currencies.length === 0 ? (
                  <option value="">لا توجد عملات</option>
                ) : (
                  currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.name} ({currency.code})
                    </option>
                  ))
                )}
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الرصيد الافتتاحي</span>
              <input
                value={form.openingBalance}
                onChange={(event) => updateForm("openingBalance", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                placeholder="0.00"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">كود الحساب *</span>
              <select
                value={form.accountCode}
                onChange={(event) => updateForm("accountCode", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              >
                <option value="2101">2101 - البنوك</option>
              </select>
            </label>
            <label className="text-sm lg:col-span-2">
              <span className="mb-2 block font-semibold text-(--dash-text)">ملاحظات</span>
              <textarea
                value={form.note}
                onChange={(event) => updateForm("note", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                rows={3}
              />
            </label>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving}
              className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
            >
              {isSaving ? "جارٍ الحفظ..." : "إضافة بنك"}
            </button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
