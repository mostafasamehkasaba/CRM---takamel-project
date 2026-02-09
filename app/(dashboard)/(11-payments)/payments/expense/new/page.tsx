"use client";

import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const page = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    id: "",
    recipient: "",
    amount: "",
    date: "",
    account: "",
    status: "",
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // قراءة البيانات القديمة من localStorage
    const stored = localStorage.getItem("expense_vouchers");
    const vouchers = stored ? JSON.parse(stored) : [];

    // إضافة السند الجديد
    vouchers.push({
      id: form.id || `EV-${Date.now()}`,
      recipient: form.recipient,
      amount: Number(form.amount),
      date: form.date,
      account: form.account,
      status: form.status,
    });

    // حفظ في localStorage
    localStorage.setItem("expense_vouchers", JSON.stringify(vouchers));

    // إعادة التوجيه لصفحة السندات
    router.push("/payments/expense");
  };

  return (
    <DashboardShell title="إضافة سند صرف نقدية" subtitle="تسجيل سند صرف نقدي جديد.">
      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="mb-6 text-right">
          <h2 className="text-2xl font-semibold">إضافة سند صرف نقدية</h2>
          <p className="mt-2 text-sm text-(--dash-muted)">تسجيل سند صرف نقدي جديد.</p>
        </div>

        <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel-soft) p-6 shadow-(--dash-shadow)">
          <div className="mb-6 text-right">
            <h3 className="text-lg font-semibold">بيانات سند الصرف</h3>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">التاريخ</span>
              <input
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) focus:outline-none"
              />
            </label>

            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">المبلغ</span>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                placeholder="المبلغ"
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </label>

            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">المستفيد</span>
              <input
                type="text"
                value={form.recipient}
                onChange={(e) => handleChange("recipient", e.target.value)}
                placeholder="المستفيد"
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </label>

            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">رقم السند</span>
              <input
                type="text"
                value={form.id}
                onChange={(e) => handleChange("id", e.target.value)}
                placeholder="رقم السند"
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </label>

            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">الحساب</span>
              <select
                value={form.account}
                onChange={(e) => handleChange("account", e.target.value)}
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) focus:outline-none"
              >
                <option value="">اختر الحساب</option>
                <option>الصندوق</option>
                <option>البنك الأهلي</option>
                <option>بنك الراجحي</option>
              </select>
            </label>

            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">الحاله</span>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) focus:outline-none"
              >
                <option value="">اختر الحالة</option>
                <option>معتمد</option>
                <option>قيد المراجعه</option>
                <option>غير معتمد</option>
              </select>
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-3">
             <Link
            href="/payments/expense"
            className="flex-1 rounded-2xl bg-(--dash-primary) px-5 py-3 text-center text-sm font-semibold text-white shadow-(--dash-primary-soft)"
          >
            الغاء
          </Link>
            <button
              onClick={handleSave}
              type="button"
              className="rounded-2xl bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
            >
              حفظ السند
            </button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default page;
