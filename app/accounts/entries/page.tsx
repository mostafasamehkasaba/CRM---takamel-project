"use client";

import { useMemo, useState } from "react";
import DashboardShell from "../../components/DashboardShell";
import { accountingEntries, type AccountingEntry } from "../../data/accounting-entries";

const formatDate = (value: string) =>
  new Date(value).toLocaleString("ar-EG", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });

const Page = () => {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const branches = useMemo(
    () => Array.from(new Set(accountingEntries.map((entry) => entry.branch))),
    []
  );

  const filteredEntries = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return accountingEntries.filter((entry) => {
      const matchesBranch = branchFilter === "all" || entry.branch === branchFilter;
      const matchesSearch =
        !normalizedSearch ||
        [entry.voucher, entry.base, entry.document, entry.memo, entry.branch]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);
      const entryDate = new Date(entry.date);
      const matchesFrom = !fromDate || entryDate >= new Date(fromDate);
      const matchesTo = !toDate || entryDate <= new Date(toDate);
      return matchesBranch && matchesSearch && matchesFrom && matchesTo;
    });
  }, [branchFilter, fromDate, search, toDate]);

  const totals = useMemo(
    () =>
      filteredEntries.reduce(
        (acc, entry) => ({
          debit: acc.debit + entry.debit,
          credit: acc.credit + entry.credit,
        }),
        { debit: 0, credit: 0 }
      ),
    [filteredEntries]
  );

  return (
    <DashboardShell
      title="القيود المحاسبية"
      subtitle="تصفح القيود الموثّقة لكل فرع، اعرض الأرقام حسب التاريخ أو الملاحظات."
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="ابحث عن رقم القيد، المستند أو الملاحظات..."
      hideHeaderFilters
    >
      <div className="dash-card space-y-4">
        <div className="grid gap-3 md:grid-cols-4">
          <label className="dash-label">
            الفرع
            <select
              className="dash-select mt-2"
              value={branchFilter}
              onChange={(event) => setBranchFilter(event.target.value)}
            >
              <option value="all">كل الفروع</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </label>
          <label className="dash-label">
            من تاريخ
            <input
              type="date"
              className="dash-input mt-2"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
            />
          </label>
          <label className="dash-label">
            إلى تاريخ
            <input
              type="date"
              className="dash-input mt-2"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="dash-card">
        <div className="dash-table overflow-auto">
          <table className="w-full min-w-[1200px] text-[13px]">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left">رقم القيد</th>
                <th className="px-3 py-2 text-left">التاريخ</th>
                <th className="px-3 py-2 text-left">بناء على</th>
                <th className="px-3 py-2 text-left">رقم المستند</th>
                <th className="px-3 py-2 text-left">الملاحظات</th>
                <th className="px-3 py-2 text-left">القسم</th>
                <th className="px-3 py-2 text-left">الفرع</th>
                <th className="px-3 py-2 text-left">إجمالى المدين</th>
                <th className="px-3 py-2 text-left">إجمالى الدائن</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry: AccountingEntry) => (
                <tr key={entry.id} className="border-t border-(--dash-border)">
                  <td className="px-3 py-2">{entry.voucher}</td>
                  <td className="px-3 py-2">{formatDate(entry.date)}</td>
                  <td className="px-3 py-2">{entry.base}</td>
                  <td className="px-3 py-2">{entry.document}</td>
                  <td className="px-3 py-2">{entry.memo}</td>
                  <td className="px-3 py-2">قيود</td>
                  <td className="px-3 py-2">{entry.branch}</td>
                  <td className="px-3 py-2">{entry.debit.toFixed(2)}</td>
                  <td className="px-3 py-2">{entry.credit.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-(--dash-border) font-semibold">
                <td className="px-3 py-2" colSpan={7}>
                  الإجمالي المعروض
                </td>
                <td className="px-3 py-2">{totals.debit.toFixed(2)}</td>
                <td className="px-3 py-2">{totals.credit.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
};

export default Page;
