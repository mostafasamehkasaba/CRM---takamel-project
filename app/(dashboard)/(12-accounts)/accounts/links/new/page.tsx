"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import { useRouter, useSearchParams } from "next/navigation";
import { linkOptions } from "@/app/(dashboard)/data/accounting-links";

const accountingFields = [
  { key: "branch", label: "الفرع", placeholder: "مثال: مغسلة سيارات" },
  { key: "cashAccount", label: "حساب الصندوق" },
  { key: "salesAccount", label: "حساب المبيعات" },
  { key: "salesReturnAccount", label: "حساب مردود المبيعات" },
  { key: "purchasesAccount", label: "حساب المشتريات" },
  { key: "purchasesReturnAccount", label: "حساب مردود المشتريات" },
  { key: "inventoryAccount", label: "حساب المخزون" },
  { key: "salesDiscount", label: "حساب خصم المبيعات" },
  { key: "purchasesDiscount", label: "حساب خصم المشتريات" },
  { key: "salesTax", label: "حساب ضريبة المبيعات" },
  { key: "purchasesTax", label: "حساب ضريبة المشتريات" },
  { key: "costOfGoodsSold", label: "حساب تكلفة الأصناف المباعة" },
  { key: "pointsOfSale", label: "حساب نقاط البيع" },
  { key: "damageAccount", label: "حساب التالف" },
  { key: "goldClosure", label: "حساب إقفال الذهب" },
];

const branchOptions = [
  "مغسلة سيارات",
  "مغسلة ملابس",
  "نشاط الصالون",
  "نشاط الكوافير / التجميل",
  "نشاط المطاعم",
  "نشاط سوبرماركت",
  "نشاط صيدلية",
  "نشاط مكتبة",
  "نشاط ملحمة",
  "نشاط عيادة",
];

type FormKey = (typeof accountingFields)[number]["key"];
type FormState = Record<FormKey, string>;

const emptyFormState = accountingFields.reduce((acc, field) => {
  acc[field.key as FormKey] = "";
  return acc;
}, {} as FormState);

const mergeFormState = (
  base: FormState,
  patch: Partial<FormState> | null,
): FormState => {
  if (!patch) return base;
  const next: FormState = { ...base };
  for (const field of accountingFields) {
    const value = patch[field.key as FormKey];
    if (typeof value === "string") {
      next[field.key as FormKey] = value;
    }
  }
  return next;
};

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const editIndex = useMemo(() => {
    const raw = searchParams.get("index");
    if (!raw) return null;
    const num = Number(raw);
    return Number.isFinite(num) ? num : null;
  }, [searchParams]);

  const editData = useMemo<Partial<FormState> | null>(() => {
    const raw = searchParams.get("data");
    if (!raw) return null;
    try {
      const decoded = decodeURIComponent(raw);
      const parsed = JSON.parse(decoded);
      if (!parsed || typeof parsed !== "object") return null;
      const safe: Partial<FormState> = {};
      for (const field of accountingFields) {
        const value = (parsed as Record<string, unknown>)[field.key];
        if (typeof value === "string") {
          safe[field.key as FormKey] = value;
        }
      }
      return safe;
    } catch {
      return null;
    }
  }, [searchParams]);

  const isEditMode = searchParams.get("mode") === "edit" && editIndex !== null;

  const [form, setForm] = useState<FormState>(() =>
    mergeFormState(emptyFormState, editData),
  );

  useEffect(() => {
    if (!editData) return;
    setForm((prev) => mergeFormState(prev, editData));
  }, [editData]);

  const title = isEditMode ? "تعديل رابط محاسبي" : "إضافة روابط محاسبية";
  const saveLabel = isEditMode ? "حفظ التعديلات" : "حفظ الروابط";

  const handleSave = () => {
    const row = {
      branch: form.branch,
      cashAccount: form.cashAccount,
      salesAccount: form.salesAccount,
      purchasesAccount: form.purchasesAccount,
      salesReturnAccount: form.salesReturnAccount,
      purchasesReturnAccount: form.purchasesReturnAccount,
      inventoryAccount: form.inventoryAccount,
      salesDiscountAccount: form.salesDiscount,
      salesTaxAccount: form.salesTax,
      purchasesDiscountAccount: form.purchasesDiscount,
      purchasesTaxAccount: form.purchasesTax,
    };

    try {
      const raw = window.localStorage.getItem("accountingLinksRows");
      const parsed = raw ? JSON.parse(raw) : [];
      const rows = Array.isArray(parsed) ? parsed : [];

      if (isEditMode && typeof editIndex === "number" && editIndex >= 0 && editIndex < rows.length) {
        rows[editIndex] = row;
      } else {
        rows.push(row);
      }

      window.localStorage.setItem("accountingLinksRows", JSON.stringify(rows));
    } catch {
      // Ignore persistence errors in the demo.
    }

    router.push("/accounts/links");
  };

  return (
    <DashboardShell title={title} hideHeaderFilters>
      <div className="space-y-6 px-4">
        <section className="rounded-[32px] border border-(--dash-primary) bg-(--dash-panel) px-6 py-8 shadow-(--dash-shadow)" dir="rtl">
          <div className="flex flex-col gap-3 pb-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-(--dash-muted)">
              البداية / الروابط المحاسبية / {title}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-3xl font-black text-(--dash-text)">{title}</h1>
              <button
                type="button"
                className="flex items-center justify-center rounded-full border border-(--dash-primary) bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft) transition hover:bg-(--dash-primary-strong)"
              >
                {isEditMode ? null : <span className="text-lg">+</span>}
                {title}
              </button>
            </div>
            <p className="text-sm text-(--dash-muted)">
              يرجى إدخال المعلومات أدناه بدقة. الحقول التي تحمل علامة * إجبارية لربط الحسابات بشكل صحيح.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {accountingFields.map((field) => (
              <label
                key={field.key}
                className="flex flex-col gap-2 rounded-[18px] border border-(--dash-primary) bg-(--dash-panel-soft) px-4 py-3 shadow-inner"
              >
                <span className="flex items-center justify-between text-sm font-semibold text-(--dash-text)">
                  {field.label}
                  <span className="text-xs text-(--dash-primary)">*</span>
                </span>

                {field.key === "branch" ? (
                  <select
                    value={form.branch}
                    onChange={(e) => setForm((prev) => ({ ...prev, branch: e.target.value }))}
                    className={`dash-select !rounded-full !bg-white !py-2 !px-4 !text-sm !border-[#0b3d91] dark:!border-[#0b3d91] dark:!bg-[rgba(255,255,255,0.12)] ${
                      form.branch ? "!text-(--dash-text)" : "!text-(--dash-muted)"
                    }`}
                  >
                    <option value="" className="text-(--dash-muted)">
                      {field.placeholder ?? "اختر الفرع"}
                    </option>
                    {branchOptions.map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={form[field.key as FormKey]}
                    onChange={(e) => setForm((prev) => ({ ...prev, [field.key as FormKey]: e.target.value }))}
                    className={`dash-select !rounded-full !bg-white !py-2 !px-4 !text-sm !border-[#0b3d91] dark:!border-[#0b3d91] dark:!bg-[rgba(255,255,255,0.12)] ${
                      form[field.key as FormKey] ? "!text-(--dash-text)" : "!text-(--dash-muted)"
                    }`}
                  >
                    <option value="" className="text-(--dash-muted)">{field.placeholder ?? "اختر حساباً"}</option>
                    {linkOptions.map((option) => (
                      <option key={option} value={option} className="text-black">
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </label>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-(--dash-muted)">
            <span>الحقول التي تحمل علامة * إجبارية</span>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-(--dash-primary) px-6 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft) transition hover:bg-(--dash-primary-strong)"
            >
              {saveLabel}
            </button>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
};

const Page = () => (
  <Suspense fallback={<div className="dash-card">جاري التحميل...</div>}>
    <PageContent />
  </Suspense>
);

export default Page;
