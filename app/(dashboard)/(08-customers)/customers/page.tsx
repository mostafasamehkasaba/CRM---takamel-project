"use client";

import { useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import ConfirmModal from "@/app/(dashboard)/components/ConfirmModal";

type CustomerRow = {
  code: string;
  name: string;
  email: string;
  phone: string;
  pricingGroup: string;
  customerGroup: string;
  taxNumber: string;
  actualBalance: string;
  points: string;
};

const rows: CustomerRow[] = [
  {
    code: "103",
    name: "test010",
    email: "",
    phone: "",
    pricingGroup: "عام",
    customerGroup: "عام",
    taxNumber: "",
    actualBalance: "3.00-",
    points: "0.00",
  },
  {
    code: "104",
    name: "test",
    email: "admin@solution.com",
    phone: "966570357361",
    pricingGroup: "عام",
    customerGroup: "عام",
    taxNumber: "",
    actualBalance: "0.00",
    points: "0.00",
  },
  {
    code: "105",
    name: "new55",
    email: "",
    phone: "",
    pricingGroup: "عام",
    customerGroup: "عام",
    taxNumber: "",
    actualBalance: "8.00-",
    points: "3.25",
  },
  {
    code: "106",
    name: "محمد",
    email: "",
    phone: "",
    pricingGroup: "عام",
    customerGroup: "عام",
    taxNumber: "",
    actualBalance: "0.00",
    points: "129.25",
  },
  {
    code: "110",
    name: "123",
    email: "",
    phone: "",
    pricingGroup: "عام",
    customerGroup: "عام",
    taxNumber: "",
    actualBalance: "150.00-",
    points: "0.00",
  },
  {
    code: "109",
    name: "تكامل البيانات",
    email: "gmail.com@966540283038",
    phone: "966540283038",
    pricingGroup: "عام",
    customerGroup: "عام",
    taxNumber: "",
    actualBalance: "0.00",
    points: "0.00",
  },
  {
    code: "1",
    name: "عميل افتراضي",
    email: "info@posit.sa",
    phone: "00",
    pricingGroup: "عام",
    customerGroup: "عام",
    taxNumber: "",
    actualBalance: "258.25-",
    points: "0.00",
  },
  {
    code: "108",
    name: "محمددد",
    email: "",
    phone: "966592128972",
    pricingGroup: "عام",
    customerGroup: "عام",
    taxNumber: "",
    actualBalance: "0.00",
    points: "0.38",
  },
];

const Page = () => {
  const [query, setQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [rowsData, setRowsData] = useState(rows);
  const [pendingDelete, setPendingDelete] = useState<CustomerRow | null>(null);

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return rowsData;
    }
    return rowsData.filter((row) =>
      [
        row.code,
        row.name,
        row.email,
        row.phone,
        row.pricingGroup,
        row.customerGroup,
        row.taxNumber,
        row.actualBalance,
        row.points,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [query, rowsData]);

  const handleDelete = (code: string) => {
    const row = rowsData.find((entry) => entry.code === code);
    if (!row) {
      return;
    }
    setPendingDelete(row);
  };

  const confirmDelete = () => {
    if (!pendingDelete) {
      return;
    }
    const code = pendingDelete.code;
    setRowsData((prev) => prev.filter((row) => row.code !== code));
    setSelectedRows((prev) => prev.filter((id) => id !== code));
    setPendingDelete(null);
  };

  const allSelected = filteredRows.length > 0 && filteredRows.every((row) => selectedRows.includes(row.code));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedRows((prev) => prev.filter((code) => !filteredRows.some((row) => row.code === code)));
      return;
    }
    setSelectedRows((prev) => {
      const next = new Set(prev);
      filteredRows.forEach((row) => next.add(row.code));
      return Array.from(next);
    });
  };

  const toggleRow = (code: string) => {
    setSelectedRows((prev) => (prev.includes(code) ? prev.filter((id) => id !== code) : [...prev, code]));
  };

  return (
    <DashboardShell title="العملاء" subtitle="البداية / العملاء" hideHeaderFilters>
      <section className="space-y-4">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-(--dash-text)">العملاء</span>
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path fill="currentColor" d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h10v2H4v-2Z" />
                </svg>
              </button>
              <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42l2.3 2.3V4a1 1 0 0 1 1-1Z"
                  />
                </svg>
              </button>
              <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path fill="currentColor" d="M4 5h16v2H4V5Zm0 6h10v2H4v-2Zm0 6h16v2H4v-2Z" />
                </svg>
              </button>
            </div>
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
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="h-4 w-4 rounded border border-(--dash-border)"
                      aria-label="تحديد كل العملاء"
                    />
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">كود</th>
                  <th className="px-3 py-3 text-right font-semibold">اسم</th>
                  <th className="px-3 py-3 text-right font-semibold">عنوان البريد الإلكتروني</th>
                  <th className="px-3 py-3 text-right font-semibold">هاتف</th>
                  <th className="px-3 py-3 text-right font-semibold">مجموعة التسعير</th>
                  <th className="px-3 py-3 text-right font-semibold">مجموعة العملاء</th>
                  <th className="px-3 py-3 text-right font-semibold">الرقم الضريبي</th>
                  <th className="px-3 py-3 text-right font-semibold">الرصيد الفعلي</th>
                  <th className="px-3 py-3 text-right font-semibold">إجمالي النقاط المكتسبة</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.code} className="border-t border-(--dash-border) text-(--dash-text)">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.code)}
                        onChange={() => toggleRow(row.code)}
                        className="h-4 w-4 rounded border border-(--dash-border)"
                        aria-label={`تحديد العميل ${row.name}`}
                      />
                    </td>
                    <td className="px-3 py-3 font-semibold">{row.code}</td>
                    <td className="px-3 py-3">{row.name}</td>
                    <td className="px-3 py-3">{row.email}</td>
                    <td className="px-3 py-3">{row.phone}</td>
                    <td className="px-3 py-3">{row.pricingGroup}</td>
                    <td className="px-3 py-3">{row.customerGroup}</td>
                    <td className="px-3 py-3">{row.taxNumber}</td>
                    <td className="px-3 py-3">{row.actualBalance}</td>
                    <td className="px-3 py-3">{row.points}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
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
                        <button
                          type="button"
                          className="rounded-lg border border-(--dash-border) p-2 text-rose-500"
                          onClick={() => handleDelete(row.code)}
                          aria-label={`حذف العميل ${row.name}`}
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path
                              fill="currentColor"
                              d="M6 7h12v2H6zm2 3h8l-1 10H9L8 10Zm3-6h2l1 2H10z"
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
                  <td className="px-3 py-3">[إجمالي النقاط]</td>
                  <td className="px-3 py-3">[الرصيد الفعلي]</td>
                  <td className="px-3 py-3">[الرقم الضريبي]</td>
                  <td className="px-3 py-3">[مجموعة العملاء]</td>
                  <td className="px-3 py-3">[مجموعة التسعير]</td>
                  <td className="px-3 py-3">[هاتف]</td>
                  <td className="px-3 py-3">[عنوان البريد الإلكتروني]</td>
                  <td className="px-3 py-3">[اسم]</td>
                  <td className="px-3 py-3">[كود]</td>
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
      <ConfirmModal
        open={Boolean(pendingDelete)}
        message="هل أنت متأكد من حذف العميل؟"
        confirmLabel="حذف"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </DashboardShell>
  );
};

export default Page;
