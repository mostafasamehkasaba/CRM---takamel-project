"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "../../components/DashboardShell";
import ActionIconButton from "../../components/ActionIconButton";
import { EditIcon, TrashIcon } from "../../components/icons/ActionIcons";

type LinkRow = {
  branch: string;
  cashAccount: string;
  salesAccount: string;
  purchasesAccount: string;
  salesReturnAccount: string;
  purchasesReturnAccount: string;
  inventoryAccount: string;
  salesDiscountAccount: string;
  salesTaxAccount: string;
  purchasesDiscountAccount: string;
  purchasesTaxAccount: string;
};

const initialRows: LinkRow[] = [
  {
    branch: "مغسلة سيارات",
    cashAccount: "صندوق رئيسي",
    salesAccount: "إجمالي المبيعات الفرع الرئيسي",
    purchasesAccount: "إجمالي مشتريات الفرع الرئيسي",
    salesReturnAccount: "مردودات مبيعات الفرع الرئيسي",
    purchasesReturnAccount: "مردودات مشتريات الفرع الرئيسي",
    inventoryAccount: "المخزون الرئيسي",
    salesDiscountAccount: "خصم مسموح الفرع الرئيسي",
    salesTaxAccount: "ضريبة القيمة المضافة على المبيعات",
    purchasesDiscountAccount: "خصم مكتسب الفرع الرئيسي",
    purchasesTaxAccount: "ضريبة القيمة المضافة على المشتريات",
  },
  {
    branch: "مغسلة ملابس",
    cashAccount: "صندوق رئيسي",
    salesAccount: "إجمالي المبيعات الفرع الرئيسي",
    purchasesAccount: "إجمالي مشتريات الفرع الرئيسي",
    salesReturnAccount: "مردودات مبيعات الفرع الرئيسي",
    purchasesReturnAccount: "مردودات مشتريات الفرع الرئيسي",
    inventoryAccount: "المخزون الرئيسي",
    salesDiscountAccount: "خصم مسموح الفرع الرئيسي",
    salesTaxAccount: "ضريبة القيمة المضافة على المبيعات",
    purchasesDiscountAccount: "خصم مكتسب الفرع الرئيسي",
    purchasesTaxAccount: "ضريبة القيمة المضافة على المشتريات",
  },
  {
    branch: "نشاط الصالون",
    cashAccount: "صندوق رئيسي",
    salesAccount: "إجمالي المبيعات الفرع الرئيسي",
    purchasesAccount: "إجمالي مشتريات الفرع الرئيسي",
    salesReturnAccount: "مردودات مبيعات الفرع الرئيسي",
    purchasesReturnAccount: "مردودات مشتريات الفرع الرئيسي",
    inventoryAccount: "المخزون الرئيسي",
    salesDiscountAccount: "خصم مسموح الفرع الرئيسي",
    salesTaxAccount: "ضريبة القيمة المضافة على المبيعات",
    purchasesDiscountAccount: "خصم مكتسب الفرع الرئيسي",
    purchasesTaxAccount: "ضريبة القيمة المضافة على المشتريات",
  },
  {
    branch: "نشاط الكوافير / التجميل",
    cashAccount: "صندوق رئيسي",
    salesAccount: "إجمالي المبيعات الفرع الرئيسي",
    purchasesAccount: "إجمالي مشتريات الفرع الرئيسي",
    salesReturnAccount: "مردودات مبيعات الفرع الرئيسي",
    purchasesReturnAccount: "مردودات مشتريات الفرع الرئيسي",
    inventoryAccount: "المخزون الرئيسي",
    salesDiscountAccount: "خصم مسموح الفرع الرئيسي",
    salesTaxAccount: "ضريبة القيمة المضافة على المبيعات",
    purchasesDiscountAccount: "خصم مكتسب الفرع الرئيسي",
    purchasesTaxAccount: "ضريبة القيمة المضافة على المشتريات",
  },
  {
    branch: "نشاط المطاعم",
    cashAccount: "صندوق رئيسي",
    salesAccount: "إجمالي المبيعات الفرع الرئيسي",
    purchasesAccount: "إجمالي مشتريات الفرع الرئيسي",
    salesReturnAccount: "مردودات مبيعات الفرع الرئيسي",
    purchasesReturnAccount: "مردودات مشتريات الفرع الرئيسي",
    inventoryAccount: "المخزون الرئيسي",
    salesDiscountAccount: "خصم مسموح الفرع الرئيسي",
    salesTaxAccount: "ضريبة القيمة المضافة على المبيعات",
    purchasesDiscountAccount: "خصم مكتسب الفرع الرئيسي",
    purchasesTaxAccount: "ضريبة القيمة المضافة على المشتريات",
  },
  {
    branch: "نشاط سوبرماركت",
    cashAccount: "صندوق رئيسي",
    salesAccount: "إجمالي المبيعات الفرع الرئيسي",
    purchasesAccount: "إجمالي مشتريات الفرع الرئيسي",
    salesReturnAccount: "مردودات مبيعات الفرع الرئيسي",
    purchasesReturnAccount: "مردودات مشتريات الفرع الرئيسي",
    inventoryAccount: "المخزون الرئيسي",
    salesDiscountAccount: "خصم مسموح الفرع الرئيسي",
    salesTaxAccount: "ضريبة القيمة المضافة على المبيعات",
    purchasesDiscountAccount: "خصم مكتسب الفرع الرئيسي",
    purchasesTaxAccount: "ضريبة القيمة المضافة على المشتريات",
  },
  {
    branch: "نشاط صيدلية",
    cashAccount: "صندوق رئيسي",
    salesAccount: "إجمالي المبيعات الفرع الرئيسي",
    purchasesAccount: "إجمالي مشتريات الفرع الرئيسي",
    salesReturnAccount: "مردودات مبيعات الفرع الرئيسي",
    purchasesReturnAccount: "مردودات مشتريات الفرع الرئيسي",
    inventoryAccount: "المخزون الرئيسي",
    salesDiscountAccount: "خصم مسموح الفرع الرئيسي",
    salesTaxAccount: "ضريبة القيمة المضافة على المبيعات",
    purchasesDiscountAccount: "خصم مكتسب الفرع الرئيسي",
    purchasesTaxAccount: "ضريبة القيمة المضافة على المشتريات",
  },
  {
    branch: "نشاط مكتبة",
    cashAccount: "صندوق رئيسي",
    salesAccount: "إجمالي المبيعات الفرع الرئيسي",
    purchasesAccount: "إجمالي مشتريات الفرع الرئيسي",
    salesReturnAccount: "مردودات مبيعات الفرع الرئيسي",
    purchasesReturnAccount: "مردودات مشتريات الفرع الرئيسي",
    inventoryAccount: "المخزون الرئيسي",
    salesDiscountAccount: "خصم مسموح الفرع الرئيسي",
    salesTaxAccount: "ضريبة القيمة المضافة على المبيعات",
    purchasesDiscountAccount: "خصم مكتسب الفرع الرئيسي",
    purchasesTaxAccount: "ضريبة القيمة المضافة على المشتريات",
  },
  {
    branch: "نشاط ملحمة",
    cashAccount: "صندوق رئيسي",
    salesAccount: "إجمالي المبيعات الفرع الرئيسي",
    purchasesAccount: "إجمالي مشتريات الفرع الرئيسي",
    salesReturnAccount: "مردودات مبيعات الفرع الرئيسي",
    purchasesReturnAccount: "مردودات مشتريات الفرع الرئيسي",
    inventoryAccount: "المخزون الرئيسي",
    salesDiscountAccount: "خصم مسموح الفرع الرئيسي",
    salesTaxAccount: "ضريبة القيمة المضافة على المبيعات",
    purchasesDiscountAccount: "خصم مكتسب الفرع الرئيسي",
    purchasesTaxAccount: "ضريبة القيمة المضافة على المشتريات",
  },
  {
    branch: "نشاط عيادة",
    cashAccount: "صندوق رئيسي",
    salesAccount: "إجمالي المبيعات الفرع الرئيسي",
    purchasesAccount: "إجمالي مشتريات الفرع الرئيسي",
    salesReturnAccount: "مردودات مبيعات الفرع الرئيسي",
    purchasesReturnAccount: "مردودات مشتريات الفرع الرئيسي",
    inventoryAccount: "المخزون الرئيسي",
    salesDiscountAccount: "خصم مسموح الفرع الرئيسي",
    salesTaxAccount: "ضريبة القيمة المضافة على المبيعات",
    purchasesDiscountAccount: "خصم مكتسب الفرع الرئيسي",
    purchasesTaxAccount: "ضريبة القيمة المضافة على المشتريات",
  },
];

const Page = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<LinkRow[]>(initialRows);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("accountingLinksRows");
      if (!raw) {
        window.localStorage.setItem(
          "accountingLinksRows",
          JSON.stringify(initialRows),
        );
        return;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const hasNewShape = parsed.every(
          (row) =>
            row &&
            typeof row === "object" &&
            "cashAccount" in row &&
            "salesAccount" in row &&
            "purchasesAccount" in row,
        );
        if (hasNewShape) {
          setRows(parsed);
        } else {
          window.localStorage.setItem(
            "accountingLinksRows",
            JSON.stringify(initialRows),
          );
          setRows(initialRows);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [rows, search]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));

  const { visibleRows, startIndex, endIndex } = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = Math.min(start + rowsPerPage, filteredRows.length);
    return {
      visibleRows: filteredRows.slice(start, end),
      startIndex: start,
      endIndex: end,
    };
  }, [page, rowsPerPage, filteredRows]);

  const handleDelete = (row: LinkRow) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف الرابط؟");
    if (!confirmed) {
      return;
    }
    setRows((prev) => prev.filter((item) => item !== row));
  };

  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  return (
    <DashboardShell
      title="الروابط المحاسبية"
      subtitle="الرجاء استخدام الجدول أدناه للانتقال أو تصفية النتائج."
      hideHeaderFilters
    >
      <section className="space-y-4" dir="rtl">
        <div className="dash-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-(--dash-text)">
              الروابط المحاسبية
            </span>
            <button
              type="button"
              onClick={() => router.push("/accounts/links/new")}
              className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white shadow-(--dash-primary-soft)"
            >
              + إضافة رابط محاسبي
            </button>
          </div>
          <p className="mt-3 text-sm text-(--dash-muted)">
            الرجاء استخدام الجدول أدناه للانتقال أو تصفية النتائج.
          </p>
        </div>

        <div className="dash-card">
          <div className="grid gap-3 md:grid-cols-4">
            <div className="md:col-span-3">
              <div className="flex items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="بحث"
                  className="w-full bg-transparent text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-(--dash-muted)">
              <span>إظهار</span>
              <select
                value={rowsPerPage}
                onChange={(event) => {
                  setRowsPerPage(Number(event.target.value));
                  setPage(1);
                }}
                className="dash-select"
              >
                {[10, 25, 50].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="dash-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[1400px] text-sm text-(--dash-text)">
              <thead className="bg-(--dash-primary) text-white">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">
                    الفرع
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
                    حساب الصندوق
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
                    حساب المبيعات
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
                    حساب المشتريات
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
                    حساب مردود المبيعات
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
                    حساب مردود المشتريات
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
                    حساب المخزون
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
                    حساب خصم المبيعات
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
                    حساب ضريبة المبيعات
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
                    حساب خصم المشتريات
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">
                    حساب ضريبة المشتريات
                  </th>
                  <th className="px-3 py-3 text-center font-semibold">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="text-(--dash-text)">
                {visibleRows.map((row, rowOffset) => (
                  <tr
                    key={`${row.branch}-${rowOffset}`}
                    className={`border-t border-(--dash-border) text-(--dash-text) ${
                      rowOffset % 2 === 0
                        ? "bg-(--dash-panel)"
                        : "bg-(--dash-panel-soft)"
                    }`}
                  >
                    <td className="px-3 py-3 font-semibold text-right text-(--dash-text)">
                      {row.branch}
                    </td>
                    <td className="px-3 py-3 text-right text-(--dash-text)">
                      {row.cashAccount}
                    </td>
                    <td className="px-3 py-3 text-right text-(--dash-text)">
                      {row.salesAccount}
                    </td>
                    <td className="px-3 py-3 text-right text-(--dash-text)">
                      {row.purchasesAccount}
                    </td>
                    <td className="px-3 py-3 text-right text-(--dash-text)">
                      {row.salesReturnAccount}
                    </td>
                    <td className="px-3 py-3 text-right text-(--dash-text)">
                      {row.purchasesReturnAccount}
                    </td>
                    <td className="px-3 py-3 text-right text-(--dash-text)">
                      {row.inventoryAccount}
                    </td>
                    <td className="px-3 py-3 text-right text-(--dash-text)">
                      {row.salesDiscountAccount}
                    </td>
                    <td className="px-3 py-3 text-right text-(--dash-text)">
                      {row.salesTaxAccount}
                    </td>
                    <td className="px-3 py-3 text-right text-(--dash-text)">
                      {row.purchasesDiscountAccount}
                    </td>
                    <td className="px-3 py-3 text-right text-(--dash-text)">
                      {row.purchasesTaxAccount}
                    </td>
                    <td className="px-3 py-3 text-center text-(--dash-text)">
                      <div className="flex items-center justify-center gap-2">
                        <ActionIconButton
                          label="تعديل الرابط"
                          icon={<EditIcon className="h-4 w-4" />}
                          onClick={() => {
                            const globalIndex = startIndex + rowOffset;
                            const payload = { ...row };
                            router.push(
                              `/accounts/links/new?mode=edit&index=${globalIndex}&data=${encodeURIComponent(
                                JSON.stringify(payload),
                              )}`,
                            );
                          }}
                        />
                        <ActionIconButton
                          label="حذف الرابط"
                          tone="danger"
                          icon={<TrashIcon className="h-4 w-4" />}
                          onClick={() => handleDelete(row)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-(--dash-border) px-4 py-3 text-sm text-(--dash-muted)">
            <div>
              عرض {filteredRows.length === 0 ? 0 : startIndex + 1} إلى{" "}
              {endIndex} من {filteredRows.length} سجلات
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-lg border border-(--dash-border) px-2 py-1"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                السابق
              </button>
              <span className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">
                {page}
              </span>
              <button
                type="button"
                className="rounded-lg border border-(--dash-border) px-2 py-1"
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
              >
                التالي
              </button>
            </div>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
