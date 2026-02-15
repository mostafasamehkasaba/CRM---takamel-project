"use client";

import { useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const quickItems = [
  { label: "صيانة", icon: "🔧" },
  { label: "إيجار", icon: "🏠" },
  { label: "مياه", icon: "💧" },
  { label: "كهرباء", icon: "💡" },
  { label: "بنزين / سولار", icon: "⛽" },
  { label: "أخرى", icon: "…" },
  { label: "اتصالات", icon: "📞" },
  { label: "مستلزمات", icon: "🧾" },
  { label: "وجبات / ضيافة", icon: "☕" },
  { label: "نقل / شحن", icon: "🚚" },
];

const Page = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expenseDate, setExpenseDate] = useState("2026-02-15");
  const [cashbox, setCashbox] = useState("الخزنة الرئيسية");
  const [formError, setFormError] = useState("");
  const [entries, setEntries] = useState<
    Array<{ id: number; item: string; amount: number; description: string; date: string; cashbox: string }>
  >([]);

  const handleSubmit = () => {
    const normalizedAmount = Number(amount);
    if (!selectedItem) {
      setFormError("من فضلك اختر بند المصروف قبل الحفظ.");
      return;
    }
    if (Number.isNaN(normalizedAmount) || normalizedAmount <= 0) {
      setFormError("من فضلك أدخل مبلغ صحيح أكبر من صفر.");
      return;
    }
    setFormError("");
    const nextEntry = {
      id: Date.now(),
      item: selectedItem,
      amount: normalizedAmount,
      description: description.trim(),
      date: expenseDate,
      cashbox,
    };
    setEntries((prev) => [nextEntry, ...prev]);
    setAmount("");
    setDescription("");
  };

  return (
    <DashboardShell title="مصروفات سريعة" subtitle="النظام / الخزنة" hideHeaderFilters>
      <section className="space-y-6">
        <div className="rounded-[28px] border border-(--dash-border) bg-gradient-to-l from-[#1d4ed8] via-[#6366f1] to-[#22d3ee] p-6 text-white shadow-[0_30px_90px_rgba(34,211,238,0.28)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-right">
              <div className="flex items-center justify-end gap-3">
                <h2 className="text-3xl font-semibold">مصروفات سريعة</h2>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-2xl">⚡</span>
              </div>
              <p className="mt-2 text-sm text-white/80">سجّل مصروفاتك بسرعة — اختر البند وأدخل المبلغ واحفظ.</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
              <p className="text-sm text-white/80">مصروفات اليوم</p>
              <p className="mt-2 text-3xl font-semibold">0</p>
              <p className="text-xs text-white/70">ج.م</p>
            </div>
          </div>
        </div>

          <div className="rounded-[28px] border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
          <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) p-4">
            <div className="mb-3 flex items-center gap-2 text-sm text-(--dash-text)">
              <span>الخزنة</span>
              <span className="text-xs text-(--dash-muted)">🔒</span>
            </div>
            <select
              value={cashbox}
              onChange={(event) => setCashbox(event.target.value)}
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
            >
              <option>الخزنة الرئيسية</option>
              <option>خزنة الفرع الشرقي</option>
              <option>خزنة المصروفات</option>
            </select>
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-(--dash-text)">اختر البند</h3>
              <div className="flex items-center gap-2 text-xs">
                <button className="rounded-xl bg-emerald-50 px-3 py-1.5 text-emerald-600">+ جديد</button>
                <button className="rounded-xl border border-(--dash-border) px-3 py-1.5 text-(--dash-text)">إدارة البنود</button>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {quickItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setSelectedItem(item.label)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 text-sm shadow-[0_10px_24px_rgba(15,23,42,0.05)] ${
                    selectedItem === item.label
                      ? "border-(--dash-primary) bg-(--dash-panel-soft) text-(--dash-primary)"
                      : "border-(--dash-border) bg-(--dash-panel) text-(--dash-text)"
                  }`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--dash-panel-soft) text-lg">
                    {item.icon}
                  </span>
                  <span className="font-semibold">{item.label}</span>
                </button>
              ))}
            </div>
            {formError && !selectedItem ? (
              <p className="mt-3 text-sm text-rose-500">{formError}</p>
            ) : null}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">وصف مختصر (اختياري)</span>
              <input
                type="text"
                placeholder="مثال: بنزين السيارة، فاتورة كهرباء شهر 1..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">المبلغ *</span>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0"
                className={`w-full rounded-2xl border px-4 py-3 text-lg font-semibold focus:outline-none ${
                  formError && (Number.isNaN(Number(amount)) || Number(amount) <= 0)
                    ? "border-rose-400/60 bg-(--dash-panel-soft) text-rose-400"
                    : "border-(--dash-border) bg-(--dash-panel-soft) text-(--dash-text)"
                }`}
              />
            </label>
          </div>
          {formError && (Number.isNaN(Number(amount)) || Number(amount) <= 0) ? (
            <p className="mt-2 text-sm text-rose-500">{formError}</p>
          ) : null}

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.6fr]">
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">التاريخ</span>
              <input
                type="date"
                value={expenseDate}
                onChange={(event) => setExpenseDate(event.target.value)}
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-[var(--dash-primary)] via-[var(--dash-primary-soft)] to-[var(--dash-info)] px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(63,81,181,0.35)]"
          >
            ⚡ تسجيل المصروف
          </button>
        </div>

        <div className="rounded-[28px] border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-(--dash-text)">سجل المصروفات السريعة</h3>
            <span className="text-sm text-(--dash-muted)">عرض {entries.length} حركات</span>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-panel-soft) text-(--dash-muted)">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">التاريخ</th>
                  <th className="px-3 py-3 text-right font-semibold">الخزنة</th>
                  <th className="px-3 py-3 text-right font-semibold">البند</th>
                  <th className="px-3 py-3 text-right font-semibold">الوصف</th>
                  <th className="px-3 py-3 text-right font-semibold">المبلغ</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr className="border-t border-(--dash-border)">
                    <td className="px-3 py-8 text-center text-(--dash-muted)" colSpan={5}>
                      لا توجد مصروفات مسجلة حتى الآن.
                    </td>
                  </tr>
                ) : (
                  entries.map((entry) => (
                    <tr key={entry.id} className="border-t border-(--dash-border) text-(--dash-text)">
                      <td className="px-3 py-3">{entry.date}</td>
                      <td className="px-3 py-3">{entry.cashbox}</td>
                      <td className="px-3 py-3 font-semibold">{entry.item}</td>
                      <td className="px-3 py-3 text-(--dash-muted)">{entry.description || "-"}</td>
                      <td className="px-3 py-3 font-semibold text-rose-500">{entry.amount.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
