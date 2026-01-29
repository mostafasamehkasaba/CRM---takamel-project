"use client";

import { useMemo, useState } from "react";
import DashboardShell from "../../components/DashboardShell";

type AccountNode = {
  code: string;
  name: string;
  type: string;
  parent?: string;
  debit: number;
  credit: number;
};

const accounts: AccountNode[] = [
  { code: "1", name: "الأصول", type: "جذري", debit: 0, credit: 0 },
  { code: "11", name: "الأصول المتداولة", type: "عام", parent: "1", debit: 0, credit: 0 },
  { code: "1101", name: "نقدية بالصناديق", type: "عام", parent: "11", debit: 0, credit: 0 },
  { code: "110101", name: "صندوق رئيسي", type: "فرعي", parent: "1101", debit: 0, credit: 0 },
  { code: "1102", name: "نقدية بالبنوك", type: "عام", parent: "11", debit: 0, credit: 0 },
  { code: "110201", name: "البنك الرئيسي", type: "فرعي", parent: "1102", debit: 0, credit: 0 },
  { code: "110202", name: "حساب نقاط البيع", type: "فرعي", parent: "1102", debit: 0, credit: 0 },
  { code: "11", name: "النقدية", type: "عام", parent: "1", debit: 0, credit: 0 },
  { code: "12", name: "المخزون", type: "عام", parent: "1", debit: 0, credit: 0 },
];

const Page = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) {
      return accounts;
    }
    return accounts.filter((account) =>
      [account.code, account.name, account.type, account.parent ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [search]);

  return (
    <DashboardShell title="الشجرة المحاسبية" subtitle="البداية / الشجرة المحاسبية" hideHeaderFilters>
      <section className="space-y-4">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs text-(--dash-text)">
                <svg viewBox="0 0 24 24" className="h-4 w-4">
                  <path fill="currentColor" d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h10v2H4v-2Z" />
                </svg>
              </button>
              <button className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs text-(--dash-text)">
                <svg viewBox="0 0 24 24" className="h-4 w-4">
                  <path
                    fill="currentColor"
                    d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42l2.3 2.3V4a1 1 0 0 1 1-1Z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex min-w-60 flex-1 items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="بحث"
                className="w-full bg-transparent text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </div>
            <button className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">إضافة حساب</button>
          </div>
          <p className="mt-3 text-sm text-(--dash-muted)">الرجاء استخدام الجدول أدناه للتنقل أو تصفية النتائج.</p>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-primary) text-white">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">كود الحساب</th>
                  <th className="px-3 py-3 text-right font-semibold">اسم الحساب</th>
                  <th className="px-3 py-3 text-right font-semibold">نوع الحساب</th>
                  <th className="px-3 py-3 text-right font-semibold">يصـب في</th>
                  <th className="px-3 py-3 text-right font-semibold">المدين</th>
                  <th className="px-3 py-3 text-right font-semibold">الدائن</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr className="border-t border-(--dash-border) text-(--dash-muted)">
                    <td className="px-3 py-4 text-center" colSpan={7}>
                      لا توجد بيانات في الجدول
                    </td>
                  </tr>
                ) : (
                  filtered.map((account) => (
                    <tr key={account.code} className="border-t border-(--dash-border) text-(--dash-text)">
                      <td className="px-3 py-3">{account.code}</td>
                      <td className="px-3 py-3">{account.name}</td>
                      <td className="px-3 py-3">{account.type}</td>
                      <td className="px-3 py-3">{account.parent ?? "-"}</td>
                      <td className="px-3 py-3">{account.debit.toFixed(2)}</td>
                      <td className="px-3 py-3">{account.credit.toFixed(2)}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <button className="rounded-lg border border-(--dash-border) px-3 py-1 text-xs text-(--dash-text)">✏️</button>
                          <button className="rounded-lg border border-(--dash-border) px-3 py-1 text-xs text-rose-500">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-(--dash-border) px-4 py-3 text-sm text-(--dash-muted)">
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">Previous</button>
              <span className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">1</span>
              <button className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">Next</button>
            </div>
            <span>عرض 1 إلى {filtered.length} من {filtered.length} سجلات</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {["الأصول", "الخصوم"].map((heading) => (
            <div key={heading} className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 text-sm text-(--dash-text)">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{heading}</span>
                <button className="text-xs text-(--dash-primary)">عرض التفاصيل</button>
              </div>
              <p className="mt-3 text-xs text-(--dash-muted)">ملخص مبسط للشجرة حسب {heading.toLowerCase()}.</p>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
