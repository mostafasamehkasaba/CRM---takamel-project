"use client";

import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const Page = () => {
  return (
    <DashboardShell title="إضافة مستخدم" subtitle="البداية / المستخدمين / إضافة مستخدم" hideHeaderFilters>
      <section className="space-y-5">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-(--dash-text)">إضافة مستخدم</span>
            <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs">
              ☰
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الاسم الأول *</span>
              <input
                type="text"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الحالة *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>نشط</option>
                <option>غير نشط</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">اللقب *</span>
              <input
                type="text"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">مجموعة *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>owner</option>
                <option>sales</option>
                <option>manager</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">النوع *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>ذكر</option>
                <option>أنثى</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">طريقة الدفع الافتراضية *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>شبكة</option>
                <option>نقدي</option>
                <option>تحويل</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الشركة *</span>
              <input
                type="text"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">شركة الدفع الافتراضية *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>بدون</option>
                <option>Visa</option>
                <option>Mastercard</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">هاتف *</span>
              <input
                type="text"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">نوع الفاتورة الافتراضي *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>توصيل</option>
                <option>استلام</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">البريد الإلكتروني *</span>
              <input
                type="email"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <div className="flex items-center gap-2 text-sm text-(--dash-text)">
              <input type="checkbox" className="h-4 w-4 rounded border border-(--dash-border)" />
              <span>إبلاغ المستخدمين عن طريق البريد الإلكتروني</span>
            </div>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">اسم المستخدم / البريد الإلكتروني *</span>
              <input
                type="text"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">كلمة المرور *</span>
              <input
                type="password"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
              <p className="mt-2 text-xs text-(--dash-muted)">كلمة المرور يجب أن تحتوي حرف كبير أو رقم</p>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">تأكيد كلمة المرور *</span>
              <input
                type="password"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <button type="button" className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
              إضافة مستخدم
            </button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
