"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "../../../components/DashboardShell";
import { linkOptions } from "../../../data/accounting-links";

const initialFormState = {
  branch: "",
  cashAccount: "",
  salesAccount: "",
  salesReturnAccount: "",
  purchasesAccount: "",
  purchasesReturnAccount: "",
  inventoryAccount: "",
  salesDiscount: "",
  purchasesDiscount: "",
  salesTax: "",
  purchasesTax: "",
  costOfGoodsSold: "",
  pointsOfSale: "",
  damageAccount: "",
  goldClosure: "",
};

const Page = () => {
  const router = useRouter();
  const [form, setForm] = useState(initialFormState);

  const isFormValid = useMemo(
    () => Boolean(form.branch) && Object.values(form).every((value) => value),
    [form]
  );

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;
    router.push("/accounts/links?created=1");
  };

  return (
    <DashboardShell title="إضافة روابط محاسبية" hideHeaderFilters>
      <div className="dash-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">إضافة روابط محاسبية</h2>
            <p className="text-xs text-(--dash-muted)">
              حدد الحسابات التي ستُستخدم مع كل فرع لتحديد الوجهة المحاسبية للحركات.
            </p>
          </div>
        </div>

        <form className="mt-4 grid gap-4 lg:grid-cols-2" onSubmit={handleSubmit}>
          {([
            { label: "الفرع", field: "branch" },
            { label: "حساب الصندوق", field: "cashAccount" },
            { label: "حساب المبيعات", field: "salesAccount" },
            { label: "حساب مردود المبيعات", field: "salesReturnAccount" },
            { label: "حساب المشتريات", field: "purchasesAccount" },
            { label: "حساب مردود المشتريات", field: "purchasesReturnAccount" },
            { label: "حساب المخزون", field: "inventoryAccount" },
            { label: "حساب خصم المبيعات", field: "salesDiscount" },
            { label: "حساب خصم المشتريات", field: "purchasesDiscount" },
            { label: "حساب ضريبة المبيعات", field: "salesTax" },
            { label: "حساب ضريبة المشتريات", field: "purchasesTax" },
            { label: "حساب تكلفة الأصناف", field: "costOfGoodsSold" },
            { label: "حساب نقاط البيع", field: "pointsOfSale" },
            { label: "حساب التالف", field: "damageAccount" },
            { label: "حساب إقفال الذهب", field: "goldClosure" },
          ] as const).map(({ label, field }) => (
            <label key={field} className="dash-label">
              {label}
              {field === "branch" ? (
                <input
                  value={form.branch}
                  onChange={(event) => handleFormChange("branch", event.target.value)}
                  className="dash-input mt-2"
                  placeholder="مثال: مغسلة سيارات"
                />
              ) : (
                <select
                  value={form[field]}
                  onChange={(event) => handleFormChange(field, event.target.value)}
                  className="dash-select mt-2"
                >
                  <option value="">اختر حساباً</option>
                  {linkOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </label>
          ))}
          <div className="lg:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={!isFormValid}
              className="rounded-lg bg-(--dash-primary) px-5 py-2 text-xs font-semibold text-white disabled:opacity-60"
            >
              حفظ الروابط
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
};

export default Page;
