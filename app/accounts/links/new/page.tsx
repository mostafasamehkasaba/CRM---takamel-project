"use client";

import DashboardShell from "../../../components/DashboardShell";
import { linkOptions } from "../../../data/accounting-links";

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

const Page = () => (
  <DashboardShell title="إضافة روابط محاسبية" hideHeaderFilters>
    <div className="space-y-6 px-4">
      <section className="rounded-[32px] border border-[#d6dfd7] bg-white px-6 py-8 shadow-[0_30px_40px_rgba(15,50,15,0.15)]">
        <div className="flex flex-col gap-3 pb-4">
          <div className="text-xs font-semibold text-[#0d3911]">البداية / الروابط المحاسبية / إضافة روابط محاسبية</div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black text-[#0d4516]">إضافة روابط محاسبية</h1>
            <button className="flex items-center justify-center rounded-full border border-[#0b4c19] bg-[#0b4c19] px-5 py-2 text-sm font-semibold text-white shadow-[0_5px_15px_rgba(5,51,17,0.4)]">
              <span className="text-lg">+</span>
              إضافة روابط محاسبية
            </button>
          </div>
          <p className="text-sm text-[#1c421b]">
            يرجى إدخال المعلومات أدناه بدقة. الحقول التي تحمل علامة * إجبارية لربط الحسابات بالشكل الصحيح.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-[25px] border border-[#0b4c19] bg-[#e4f0e7] px-4 py-3 shadow-inner">
          <input
            type="search"
            placeholder="بحث"
            className="dash-input flex-1 min-w-[220px] rounded-full border-[#b2d3bf] bg-white px-4 py-2 text-sm"
          />
          <div className="text-sm font-semibold text-[#0b4c19]">عرض: 10</div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {accountingFields.map((field) => (
            <label
              key={field.key}
              className="flex flex-col gap-2 rounded-[25px] border border-[#d9e6d8] bg-[#f7f9f5] px-4 py-3 shadow-inner"
            >
              <span className="flex items-center justify-between text-sm font-semibold text-[#0d360e]">
                {field.label}
                <span className="text-xs text-[#0f5b21]">*</span>
              </span>
              <select className="dash-select !rounded-full !border-[#c3d3c2] !bg-white !py-2 !px-4 !text-sm">
                <option value="">{field.placeholder ?? "اختر حساباً"}</option>
                {linkOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-[#64734a]">
          <span>الحقول التي تحمل علامة * إجبارية</span>
          <button className="rounded-full bg-[#0b4c19] px-6 py-2 text-sm font-semibold text-white">
            حفظ الروابط
          </button>
        </div>
      </section>
    </div>
  </DashboardShell>
);

export default Page;
