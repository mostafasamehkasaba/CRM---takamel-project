"use client";

import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import Link from "next/link";
const page = () => {
  return (
    <DashboardShell title="إضافة سند إيداع نقدية في البنك" subtitle="تسجيل إيداع نقدي جديد.">
      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="mb-6 text-right">
          <h2 className="text-2xl font-semibold">إضافة سند إيداع نقدية في البنك</h2>
          <p className="mt-2 text-sm text-(--dash-muted)">تسجيل إيداع نقدي جديد.</p>
        </div>

        <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel-soft) p-6 shadow-(--dash-shadow)">
          <div className="mb-6 text-right">
            <h3 className="text-lg font-semibold">بيانات الإيداع</h3>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">التاريخ</span>
              <input
                type="date"
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">المبلغ</span>
              <input
                type="number"
                placeholder="المبلغ"
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">البنك</span>
              <select className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) focus:outline-none">
                <option>بنك الرياض</option>
                <option>البنك الأهلي</option>
                <option>بنك الراجحي</option>
              </select>
            </label>
            <label className="text-sm text-(--dash-muted) lg:col-span-2">
              <span className="mb-2 block font-semibold text-(--dash-text)">مرجع الإيداع</span>
              <input
                type="text"
                placeholder="مرجع الإيداع"
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </label>
                <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">الحاله</span>
              <select className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) focus:outline-none">
                <option>معتمد</option>
                <option> قيد المراجعه</option>
                <option> غير معتمد</option>
              </select>
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">رقم السند</span>
              <input
                type="text"
                placeholder="رقم السند"
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Link href='/payments/deposit'>
                 <button
              type="button"
              className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-5 py-2 text-sm font-semibold text-(--dash-text)"
            >
              إلغاء
            </button>
            </Link>
            <button
              type="button"
              className="rounded-2xl bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
            >
              حفظ الإيداع
            </button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default page;
