"use client";

import DashboardShell from "../../components/DashboardShell";
import { linkOptions } from "../../data/accounting-links";

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
  <DashboardShell title="الروابط المحاسبية" hideHeaderFilters>
    <div className="space-y-6 px-4">
      <section className="rounded-[32px] border border-[#dce6e0] bg-white px-6 py-8 shadow-[0_20px_30px_rgba(14,70,0,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d4e0d6] pb-4">
          <div>
            <p className="text-xs font-semibold text-[#0f4512]">البداية / الروابط المحاسبية / إضافة روابط محاسبية</p>
            <h1 className="text-3xl font-black text-[#023311]">إضافة روابط محاسبية</h1>
          </div>
          <button className="rounded-full bg-[#0b4c19] px-6 py-2 text-sm font-semibold text-white shadow-[0_5px_15px_rgba(5,51,17,0.4)]">
            + إضافة روابط محاسبية
          </button>
        </div>

        <p className="mt-4 text-sm text-[#1c421b]">
          يرجى إدخال الحسابات المطلوبة من كل فرع، الحقول المحددة بعلامة * إجبارية لاستمرارية الربط.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-[24px] border border-[#0b4c19] bg-[#e4f0e7] px-4 py-3 shadow-inner">
          <input
            type="search"
            placeholder="بحث"
            className="dash-input flex-1 min-w-[200px] rounded-full border-[#b2d3bf] bg-white px-4 py-2 text-sm"
          />
          <div className="text-sm font-semibold text-[#0b4c19]">عرض: 10</div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {accountingFields.map((field) => (
            <label key={field.key} className="flex flex-col gap-2 rounded-[25px] border border-[#d9e6d8] bg-[#f7f9f5] px-4 py-3 shadow-inner">
              <span className="flex items-center justify-between text-sm font-semibold text-[#0d360e]">
                {field.label}
                <span className="text-xs text-[#0f5b21]">*</span>
              </span>
              <select className="dash-select !rounded-full !border-[#c3d3c2] !bg-white !py-2 !px-4 !text-sm">
                <option value="">{field.placeholder ? field.placeholder : "اختر حساباً"}</option>
                {linkOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <div className="text-xs text-[#64744b]">الحقول التي تحمل علامة * إجبارية</div>
          <button className="dash-btn dash-btn-primary bg-[#0b4c19] px-6 py-2 text-sm font-semibold text-white">
            حفظ الروابط
          </button>
        </div>
      </section>
    </div>
  </DashboardShell>
);

export default Page;
