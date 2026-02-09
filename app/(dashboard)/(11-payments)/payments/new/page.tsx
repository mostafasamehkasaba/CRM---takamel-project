"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const tabs = [
  { id: "receipt", label: "سندات قبض نقدية" },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState("receipt");
  const router = useRouter();

  const [client, setClient] = useState("شركه النور");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("الصندوق");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("معتمد");

  const handleAddPayment = () => {
    if (!amount || !date) return;

    const newPayment = {
      id: Date.now(),
      client,
      amount,
      account,
      date,
      status,
    };

    const stored = window.localStorage.getItem("payments-data");
    const payments = stored ? JSON.parse(stored) : [];

    payments.push(newPayment);

    window.localStorage.setItem(
      "payments-data",
      JSON.stringify(payments)
    );

    router.push("/payments");
    router.refresh();
  };

  return (
    <DashboardShell
      title="إضافة سند قبض نقدية"
      subtitle="تسجيل سند قبض نقدي مع تفاصيل الحساب."
    >
      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="flex flex-wrap items-center justify-end gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-(--dash-primary) bg-(--dash-primary) text-white"
                    : "border-(--dash-border) bg-(--dash-panel-soft) text-(--dash-text)"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel-soft) p-6 shadow-(--dash-shadow)">
          <div className="grid gap-4">
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">
                العميل
              </span>
              <select
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) focus:outline-none"
              >
                <option>شركه النور</option>
                <option>شركه المستقبل</option>
                <option>مؤسسة الامل</option>
              </select>
            </label>

            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">
                المبلغ
              </span>
              <input
                type="number"
                placeholder="10000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) focus:outline-none"
              />
            </label>

            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">
                الحساب
              </span>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) focus:outline-none"
              >
                <option>الصندوق</option>
                <option>البنك الأهلي</option>
                <option>بنك الراجحي</option>
              </select>
            </label>

            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">
                التاريخ *
              </span>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
          </div>

          <label className="text-sm text-(--dash-muted)">
            <span className="mb-2 block font-semibold text-(--dash-text)">
              الحاله
            </span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) focus:outline-none"
            >
              <option>معتمد</option>
              <option>غير معتمد</option>
              <option>قيد المراجعه</option>
            </select>
          </label>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleAddPayment}
              className="rounded-2xl bg-(--dash-primary) px-6 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
            >
              إضافة سند
            </button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
