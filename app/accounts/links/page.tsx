"use client";

import DashboardShell from "../../components/DashboardShell";
import { linkOptions } from "../../data/accounting-links";

const accountingFields = [
  { key: "branch", label: "الفرع", type: "text", placeholder: "مثال: مصلحة سيارات" },
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

const breadcrumb = ["الرئيسية", "الروابط المحاسبية", "إضافة روابط محاسبية"];

const Page = () => (
  <DashboardShell title="الروابط المحاسبية" hideHeaderFilters>
    <div className="space-y-4">
      <div className="dash-card space-y-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-(--dash-muted)">
            {breadcrumb.map((segment, index) => (
              <span key={segment} className="flex items-center gap-2">
                <span className="rounded-full bg-(--dash-panel-soft) px-3 py-1 text-xs font-semibold text-(--dash-muted-2)">
                  {segment}
                </span>
                {index < breadcrumb.length - 1 ? <span className="text-(--dash-primary)">›</span> : null}
              </span>
            ))}
          </div>
          <div className="mt-4 space-y-2 border-b border-(--dash-border) pb-4">
            <h1 className="text-2xl font-semibold text-(--dash-text)">إضافة روابط محاسبية</h1>
            <p className="text-sm text-(--dash-muted)">
              يرجى إدخال المعلومات أدناه بدقة، الحقول التي تحمل علامة * إجبارية لربط الحسابات بالشكل الصحيح.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {accountingFields.map(({ key, label, type, placeholder }) => (
              <label key={key} className="dash-label">
                <div className="flex items-center justify-between text-xs font-semibold text-(--dash-muted)">
                  <span>
                    {label} <span className="text-rose-500">*</span>
                  </span>
                  <span className="text-(--dash-muted-2)">اختيار حساب</span>
                </div>
                {type === "text" ? (
                  <input
                    type="text"
                    placeholder={placeholder}
                    className="dash-input mt-2"
                    autoComplete="off"
                  />
                ) : (
                  <select className="dash-select mt-2">
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
          </div>
        </div>

        <div className="flex justify-end">
          <button className="dash-btn dash-btn-primary">إضافة روابط محاسبية</button>
        </div>
      </div>
    </div>
  </DashboardShell>
);

export default Page;
