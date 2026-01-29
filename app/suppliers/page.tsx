"use client";

import { useMemo, useState } from "react";
import DashboardShell from "../components/DashboardShell";

type SupplierRow = {
  name: string;
  email: string;
  phone: string;
  taxNumber: string;
};

const rows: SupplierRow[] = [
  {
    name: "string",
    email: "user@example.com",
    phone: "201555544545",
    taxNumber: "312345678912343",
  },
  {
    name: "مورد",
    email: "",
    phone: "",
    taxNumber: "",
  },
];

const Page = () => {
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return rows;
    }
    return rows.filter((row) =>
      [row.name, row.email, row.phone, row.taxNumber].join(" ").toLowerCase().includes(needle)
    );
  }, [query]);

  return (
    <DashboardShell title="الموردين" subtitle="البداية / الموردين" hideHeaderFilters>
      <section className="space-y-4">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-(--dash-text)">الموردين</span>
            <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path fill="currentColor" d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h10v2H4v-2Z" />
              </svg>
            </button>
          </div>
          <p className="mt-3 text-sm text-(--dash-muted)">الرجاء استخدام الجدول أدناه للتنقل أو تصفية النتائج.</p>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-(--dash-muted)">
              <span>اظهار</span>
              <select className="rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-(--dash-text) focus:outline-none">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            <div className="ms-auto flex min-w-60 items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="بحث"
                className="w-full bg-transparent text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-primary) text-white">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">
                    <input type="checkbox" className="h-4 w-4 rounded border border-(--dash-border)" />
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">اسم</th>
                  <th className="px-3 py-3 text-right font-semibold">عنوان البريد الإلكتروني</th>
                  <th className="px-3 py-3 text-right font-semibold">هاتف</th>
                  <th className="px-3 py-3 text-right font-semibold">الرقم الضريبي</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={`${row.name}-${index}`} className="border-t border-(--dash-border) text-(--dash-text)">
                    <td className="px-3 py-3">
                      <input type="checkbox" className="h-4 w-4 rounded border border-(--dash-border)" />
                    </td>
                    <td className="px-3 py-3">{row.name}</td>
                    <td className="px-3 py-3">{row.email}</td>
                    <td className="px-3 py-3">{row.phone}</td>
                    <td className="px-3 py-3">{row.taxNumber}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button type="button" className="rounded-lg border border-(--dash-border) p-2 text-rose-500">
                          <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path
                              fill="currentColor"
                              d="M6 7h12v2H6zm2 3h8l-1 10H9L8 10Zm3-6h2l1 2H10z"
                            />
                          </svg>
                        </button>
                        <button type="button" className="rounded-lg border border-(--dash-border) p-2 text-(--dash-muted)">
                          <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path
                              fill="currentColor"
                              d="M4 16.8V20h3.2l9.4-9.4-3.2-3.2L4 16.8zm15.7-9.5c.4-.4.4-1 0-1.4l-1.6-1.6c-.4-.4-1-.4-1.4 0l-1.3 1.3 3.2 3.2z"
                            />
                          </svg>
                        </button>
                        <button type="button" className="rounded-lg border border-(--dash-border) p-2 text-(--dash-muted)">
                          <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path fill="currentColor" d="M12 5v14m-7-7h14" />
                          </svg>
                        </button>
                        <button type="button" className="rounded-lg border border-(--dash-border) p-2 text-(--dash-muted)">
                          <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path
                              fill="currentColor"
                              d="M4 6h2v12H4V6Zm4 4h2v8H8v-8Zm4-6h2v14h-2V4Zm4 3h2v11h-2V7Z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-(--dash-border) text-(--dash-muted)">
                <tr>
                  <td className="px-3 py-3">الإجراءات</td>
                  <td className="px-3 py-3">[اسم]</td>
                  <td className="px-3 py-3">[عنوان البريد الإلكتروني]</td>
                  <td className="px-3 py-3">[هاتف]</td>
                  <td className="px-3 py-3">[الرقم الضريبي]</td>
                  <td className="px-3 py-3" />
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-(--dash-border) px-4 py-3 text-sm text-(--dash-muted)">
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">سابق</button>
              <span className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">1</span>
              <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">التالي</button>
            </div>
            <span>عرض 1 إلى {filteredRows.length} من {filteredRows.length} سجلات</span>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
