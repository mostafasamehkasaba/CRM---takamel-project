"use client";

import { useState } from "react";
import DashboardShell from "../../components/DashboardShell";

const tabs = [
  { id: "receipt", label: "سندات قبض نقدية" },
  { id: "deposit", label: "سندات إيداع نقدية في البنك" },
  { id: "withdraw", label: "سحوبات نقدية من البنك" },
];

const page = () => {
  const [activeTab, setActiveTab] = useState("receipt");

  return (
    <DashboardShell title="إضافة سند قبض نقدية" subtitle="تسجيل سند قبض نقدي مع تفاصيل الحساب.">
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
              <span className="mb-2 block font-semibold text-(--dash-text)">المبلغ</span>
              <input
                type="number"
                placeholder="10000"
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">الحساب</span>
              <select className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) focus:outline-none">
                <option>الصندوق</option>
                <option>البنك الأهلي</option>
                <option>بنك الراجحي</option>
              </select>
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">التاريخ</span>
              <input
                type="date"
                defaultValue="2026-01-14"
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-(--dash-text) focus:outline-none"
              />
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
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

export default page;
