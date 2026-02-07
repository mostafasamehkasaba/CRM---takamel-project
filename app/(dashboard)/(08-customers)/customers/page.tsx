"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import ConfirmModal from "@/app/(dashboard)/components/ConfirmModal";
import { deleteClient, listClients } from "@/app/services/clients";
import { extractList } from "@/app/services/http";

type CustomerRow = {
  id: string | number;
  apiId?: string | number;
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

const fallbackRows: CustomerRow[] = [
  {
    id: "103",
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
    id: "104",
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
    id: "105",
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
    id: "106",
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
    id: "110",
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
    id: "109",
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
    id: "1",
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
    id: "108",
    code: "108",
    name: "محمدددد",
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
  const [rowsData, setRowsData] = useState(fallbackRows);
  const [pendingDelete, setPendingDelete] = useState<CustomerRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mapCustomerRow = (entry: any, index: number): CustomerRow => {
    const apiId = entry.id ?? entry.client_id ?? entry.customer_id ?? entry.uuid ?? entry._id;
    const id = apiId ?? entry.code ?? entry.client_code ?? entry.customer_code ?? `${index + 1}`;
    const code = entry.code ?? entry.client_code ?? entry.customer_code ?? (apiId ?? id) ?? `${id}`;
    const name = entry.name ?? entry.full_name ?? "غير محدد";
    const email = entry.email ?? "";
    const phone = entry.phone ?? "";
    const pricingGroup = entry.pricing_type ?? entry.pricingGroup ?? "عام";
    const customerGroup = entry.group_type ?? entry.customer_group ?? entry.customerGroup ?? "عام";
    const taxNumber = entry.tax_number ?? entry.taxNumber ?? "";
    const actualBalance = entry.balance ?? entry.actual_balance ?? entry.actualBalance ?? "0.00";
    const points = entry.points ?? "0.00";
    return {
      id,
      apiId,
      code: String(code),
      name: String(name),
      email: String(email),
      phone: String(phone),
      pricingGroup: String(pricingGroup),
      customerGroup: String(customerGroup),
      taxNumber: String(taxNumber),
      actualBalance: String(actualBalance),
      points: String(points),
    };
  };

  const loadCustomers = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await listClients({ pagination: "on", limit_per_page: 200 });
      const list = extractList<any>(response);
      const mapped = list.map(mapCustomerRow);
      setRowsData(mapped.length ? mapped : fallbackRows);
    } catch (error) {
      console.error(error);
      setErrorMessage("تعذر تحميل العملاء من الخادم، يتم عرض بيانات تجريبية.");
      setRowsData(fallbackRows);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

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

  const handleDelete = (row: CustomerRow) => {
    if (!row.apiId) {
      setErrorMessage("لا يمكن حذف هذا العميل لأن رقم التعريف غير متوفر من الخادم.");
      return;
    }
    setPendingDelete(row);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) {
      return;
    }
    const targetId = String(pendingDelete.apiId ?? pendingDelete.id);
    setPendingDelete(null);
    try {
      await deleteClient(targetId);
      setRowsData((prev) => prev.filter((row) => String(row.id) !== targetId));
      setSelectedRows((prev) => prev.filter((id) => id !== targetId));
    } catch (error) {
      console.error(error);
      const message = error instanceof Error && error.message ? ` ${error.message}` : "";
      setErrorMessage(`تعذر حذف العميل.${message}`);
    }
  };

  const allSelected = filteredRows.length > 0 && filteredRows.every((row) => selectedRows.includes(String(row.id)));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedRows((prev) => prev.filter((id) => !filteredRows.some((row) => String(row.id) === id)));
      return;
    }
    setSelectedRows((prev) => {
      const next = new Set(prev);
      filteredRows.forEach((row) => next.add(String(row.id)));
      return Array.from(next);
    });
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id]));
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
              <span>إظهار</span>
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

        {errorMessage ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-700">
            {errorMessage}
          </div>
        ) : null}

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
                {isLoading ? (
                  <tr className="border-t border-(--dash-border) text-(--dash-muted)">
                    <td className="px-3 py-6 text-center" colSpan={11}>
                      جاري تحميل العملاء...
                    </td>
                  </tr>
                ) : null}
                {!isLoading && filteredRows.length === 0 ? (
                  <tr className="border-t border-(--dash-border) text-(--dash-muted)">
                    <td className="px-3 py-6 text-center" colSpan={11}>
                      لا توجد بيانات لعرضها.
                    </td>
                  </tr>
                ) : null}
                {!isLoading && filteredRows.map((row) => (
                  <tr key={row.id} className="border-t border-(--dash-border) text-(--dash-text)">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(String(row.id))}
                        onChange={() => toggleRow(String(row.id))}
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
                          onClick={() => handleDelete(row)}
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



