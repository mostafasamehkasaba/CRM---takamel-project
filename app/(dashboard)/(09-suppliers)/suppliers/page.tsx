"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import ConfirmModal from "@/app/(dashboard)/components/ConfirmModal";
import { deleteSupplier, listSuppliers, updateSupplier } from "@/app/services/suppliers";
import { extractList } from "@/app/services/http";

type SupplierRow = {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  taxNumber: string;
  commercialRegistration: string;
  accountCode: string;
  balance: string;
  address?: string;
};

const fallbackRows: SupplierRow[] = [
  {
    id: "supplier-1",
    name: "string",
    email: "user@example.com",
    phone: "201555544545",
    taxNumber: "312345678912343",
    commercialRegistration: "1010123456",
    accountCode: "2101-001",
    balance: "0.00",
    address: "",
  },
  {
    id: "supplier-2",
    name: "مورد",
    email: "",
    phone: "",
    taxNumber: "",
    commercialRegistration: "",
    accountCode: "",
    balance: "0.00",
    address: "",
  },
];

const getRowId = (row: SupplierRow) => String(row.id);

const Page = () => {
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [rowsData, setRowsData] = useState(fallbackRows);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<SupplierRow | null>(null);
  const [pendingDelete, setPendingDelete] = useState<SupplierRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mapSupplierRow = (entry: any, index: number): SupplierRow => {
    const id = entry.id ?? entry.uuid ?? entry.code ?? entry._id ?? `${index + 1}`;
    return {
      id,
      name: entry.name ?? "غير محدد",
      email: entry.email ?? "",
      phone: entry.phone ?? "",
      taxNumber: entry.tax_number ?? entry.taxNumber ?? "",
      commercialRegistration: entry.commercial_number ?? entry.commercialRegistration ?? "",
      accountCode: entry.account_code ?? entry.accountCode ?? "",
      balance: String(entry.balance ?? "0.00"),
      address: entry.address ?? "",
    };
  };

  const loadSuppliers = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await listSuppliers({ pagination: "on", limit_per_page: 200 });
      const list = extractList<any>(response);
      const mapped = list.map(mapSupplierRow);
      setRowsData(mapped.length ? mapped : fallbackRows);
    } catch (error) {
      console.error(error);
      setErrorMessage("تعذر تحميل الموردين من الخادم، يتم عرض بيانات تجريبية.");
      setRowsData(fallbackRows);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return rowsData;
    }
    return rowsData.filter((row) =>
      [
        row.name,
        row.email,
        row.phone,
        row.taxNumber,
        row.commercialRegistration,
        row.accountCode,
        row.balance,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [query, rowsData]);

  const openEditModal = (row: SupplierRow) => {
    setEditingRowId(getRowId(row));
    setEditForm({ ...row });
  };

  const closeEditModal = () => {
    setEditingRowId(null);
    setEditForm(null);
  };

  const handleEditChange = <K extends keyof SupplierRow>(field: K, value: SupplierRow[K]) => {
    setEditForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editForm || !editingRowId) {
      return;
    }
    setIsSaving(true);
    try {
      await updateSupplier(editingRowId, {
        name: editForm.name.trim(),
        email: editForm.email.trim() || undefined,
        phone: editForm.phone.trim() || undefined,
        tax_number: editForm.taxNumber.trim() || undefined,
        commercial_number: editForm.commercialRegistration.trim() || undefined,
        address: editForm.address?.trim() || undefined,
        balance: editForm.balance.trim() || "0",
      });
      await loadSuppliers();
      closeEditModal();
    } catch (error) {
      console.error(error);
      setErrorMessage("تعذر تحديث المورد.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (row: SupplierRow) => {
    setPendingDelete(row);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) {
      return;
    }
    const rowId = getRowId(pendingDelete);
    setPendingDelete(null);
    setIsSaving(true);
    try {
      await deleteSupplier(rowId);
      setRowsData((prev) => prev.filter((item) => getRowId(item) !== rowId));
      setSelectedRows((prev) => prev.filter((id) => id !== rowId));
    } catch (error) {
      console.error(error);
      setErrorMessage("تعذر حذف المورد.");
    } finally {
      setIsSaving(false);
    }
  };

  const allSelected = filteredRows.length > 0 && filteredRows.every((row) => selectedRows.includes(getRowId(row)));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedRows((prev) => prev.filter((id) => !filteredRows.some((row) => getRowId(row) === id)));
      return;
    }
    setSelectedRows((prev) => {
      const next = new Set(prev);
      filteredRows.forEach((row) => next.add(getRowId(row)));
      return Array.from(next);
    });
  };

  const toggleRow = (rowId: string) => {
    setSelectedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]));
  };

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
              <span>إظهار</span>
              <select className="rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-(--dash-text) focus:outline-none">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            <div className="ms-auto flex flex-wrap items-center gap-2">
              <div className="flex items-center rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("cards")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                    viewMode === "cards"
                      ? "bg-(--dash-primary) text-white"
                      : "text-(--dash-muted) hover:bg-(--dash-panel-glass)"
                  }`}
                  aria-pressed={viewMode === "cards"}
                  aria-label="عرض البطاقات"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                    viewMode === "table"
                      ? "bg-(--dash-primary) text-white"
                      : "text-(--dash-muted) hover:bg-(--dash-panel-glass)"
                  }`}
                  aria-pressed={viewMode === "table"}
                  aria-label="عرض الجدول"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path fill="currentColor" d="M4 6h16v2H4V6Zm0 6h16v2H4v-2Zm0 6h16v2H4v-2Z" />
                  </svg>
                </button>
              </div>
              <div className="flex min-w-60 items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
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
        </div>

        {errorMessage ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-700">
            {errorMessage}
          </div>
        ) : null}

        {viewMode === "table" ? (
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
                        aria-label="تحديد كل الموردين"
                      />
                    </th>
                    <th className="px-3 py-3 text-right font-semibold">اسم</th>
                    <th className="px-3 py-3 text-right font-semibold">عنوان البريد الإلكتروني</th>
                    <th className="px-3 py-3 text-right font-semibold">هاتف</th>
                    <th className="px-3 py-3 text-right font-semibold">الرقم الضريبي</th>
                    <th className="px-3 py-3 text-right font-semibold">السجل التجاري</th>
                    <th className="px-3 py-3 text-right font-semibold">كود الحساب</th>
                    <th className="px-3 py-3 text-right font-semibold">الرصيد</th>
                    <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr className="border-t border-(--dash-border) text-(--dash-muted)">
                      <td className="px-3 py-6 text-center" colSpan={9}>
                        جاري تحميل الموردين...
                      </td>
                    </tr>
                  ) : null}
                  {!isLoading && filteredRows.length === 0 ? (
                    <tr className="border-t border-(--dash-border) text-(--dash-muted)">
                      <td className="px-3 py-6 text-center" colSpan={9}>
                        لا توجد بيانات لعرضها.
                      </td>
                    </tr>
                  ) : null}
                  {!isLoading && filteredRows.map((row) => (
                    <tr key={getRowId(row)} className="border-t border-(--dash-border) text-(--dash-text)">
                      <td className="px-3 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(getRowId(row))}
                          onChange={() => toggleRow(getRowId(row))}
                          className="h-4 w-4 rounded border border-(--dash-border)"
                          aria-label={`تحديد المورد ${row.name}`}
                        />
                      </td>
                      <td className="px-3 py-3">{row.name}</td>
                      <td className="px-3 py-3">{row.email}</td>
                      <td className="px-3 py-3">{row.phone}</td>
                      <td className="px-3 py-3">{row.taxNumber}</td>
                      <td className="px-3 py-3">{row.commercialRegistration}</td>
                      <td className="px-3 py-3">{row.accountCode}</td>
                      <td className="px-3 py-3">{row.balance}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="rounded-lg border border-(--dash-border) p-2 text-(--dash-muted)"
                            onClick={() => openEditModal(row)}
                            aria-label={`تعديل المورد ${row.name}`}
                          >
                            <svg viewBox="0 0 24 24" className="h-4 w-4">
                              <path
                                fill="currentColor"
                                d="M4 16.8V20h3.2l9.4-9.4-3.2-3.2L4 16.8zm15.7-9.5c.4-.4.4-1 0-1.4l-1.6-1.6c-.4-.4-1-.4-1.4 0l-1.3 1.3 3.2 3.2z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="rounded-lg border border-(--dash-border) p-2 text-rose-500"
                            onClick={() => handleDelete(row)}
                            aria-label={`حذف المورد ${row.name}`}
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
                    <td className="px-3 py-3">[اسم]</td>
                    <td className="px-3 py-3">[عنوان البريد الإلكتروني]</td>
                    <td className="px-3 py-3">[هاتف]</td>
                    <td className="px-3 py-3">[الرقم الضريبي]</td>
                    <td className="px-3 py-3">[السجل التجاري]</td>
                    <td className="px-3 py-3">[كود الحساب]</td>
                    <td className="px-3 py-3">[الرصيد]</td>
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
        ) : (
          <div className="space-y-4">
            {isLoading ? (
              <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-6 text-center text-sm text-(--dash-muted)">
                جاري تحميل الموردين...
              </div>
            ) : null}
            {!isLoading && filteredRows.length === 0 ? (
              <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-6 text-center text-sm text-(--dash-muted)">
                لا توجد بيانات لعرضها.
              </div>
            ) : null}
            {!isLoading && filteredRows.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredRows.map((row) => (
                  <div
                    key={getRowId(row)}
                    className="group relative overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 shadow-(--dash-shadow) transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(0,0,0,0.2)]"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-(--dash-primary) via-emerald-400/60 to-transparent" />
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-xs text-(--dash-muted)">المورد</p>
                        <p className="text-base font-semibold text-(--dash-text)">{row.name}</p>
                        <span className="inline-flex items-center rounded-full border border-(--dash-border) bg-(--dash-panel-soft) px-2 py-0.5 text-xs text-(--dash-muted)">
                          كود الحساب {row.accountCode || "-"}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(getRowId(row))}
                        onChange={() => toggleRow(getRowId(row))}
                        className="h-4 w-4 rounded border border-(--dash-border)"
                        aria-label={`تحديد المورد ${row.name}`}
                      />
                    </div>
                    <div className="mt-4 grid gap-2 text-xs text-(--dash-muted)">
                      <div className="flex items-center justify-between gap-3">
                        <span>الهاتف</span>
                        <span className="text-(--dash-text)">{row.phone || "-"}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>البريد</span>
                        <span className="text-(--dash-text)">{row.email || "-"}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>الرصيد</span>
                        <span className="text-(--dash-text)">{row.balance}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-(--dash-border) pt-3">
                      <span className="text-xs text-(--dash-muted)">إجراءات</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) p-2 text-(--dash-muted) transition hover:text-(--dash-text)"
                          onClick={() => openEditModal(row)}
                          aria-label={`تعديل المورد ${row.name}`}
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path
                              fill="currentColor"
                              d="M4 16.8V20h3.2l9.4-9.4-3.2-3.2L4 16.8zm15.7-9.5c.4-.4.4-1 0-1.4l-1.6-1.6c-.4-.4-1-.4-1.4 0l-1.3 1.3 3.2 3.2z"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="rounded-xl border border-rose-200/60 bg-rose-50/60 p-2 text-rose-600 transition hover:bg-rose-100"
                          onClick={() => handleDelete(row)}
                          aria-label={`حذف المورد ${row.name}`}
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path
                              fill="currentColor"
                              d="M6 7h12v2H6zm2 3h8l-1 10H9L8 10Zm3-6h2l1 2H10z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="flex items-center justify-between gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-3 text-sm text-(--dash-muted)">
              <div className="flex items-center gap-2">
                <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">سابق</button>
                <span className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">1</span>
                <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">التالي</button>
              </div>
              <span>عرض 1 إلى {filteredRows.length} من {filteredRows.length} سجلات</span>
            </div>
          </div>
        )}
      </section>
      <ConfirmModal
        open={Boolean(pendingDelete)}
        message="هل أنت متأكد من حذف المورد؟"
        confirmLabel="حذف"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      {editForm && (
        <div className="dash-modal">
          <div className="dash-modal-body max-w-xl p-6">
            <div className="flex items-center justify-between border-b border-(--dash-border) pb-3">
              <div>
                <h3 className="text-sm font-semibold text-(--dash-text)">تعديل المورد</h3>
                <p className="mt-1 text-xs text-(--dash-muted)">{editingRowId}</p>
              </div>
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-muted)"
              >
                إغلاق
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="dash-label sm:col-span-2">
                الاسم
                <input
                  value={editForm.name}
                  onChange={(event) => handleEditChange("name", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label sm:col-span-2">
                البريد الإلكتروني
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(event) => handleEditChange("email", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                الهاتف
                <input
                  value={editForm.phone}
                  onChange={(event) => handleEditChange("phone", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                الرقم الضريبي
                <input
                  value={editForm.taxNumber}
                  onChange={(event) => handleEditChange("taxNumber", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                السجل التجاري
                <input
                  value={editForm.commercialRegistration}
                  onChange={(event) => handleEditChange("commercialRegistration", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                كود الحساب
                <input
                  value={editForm.accountCode}
                  onChange={(event) => handleEditChange("accountCode", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                الرصيد
                <input
                  value={editForm.balance}
                  onChange={(event) => handleEditChange("balance", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <div className="sm:col-span-2 mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-lg border border-(--dash-border) px-4 py-2 text-xs text-(--dash-muted)"
                >
                  إلغاء
                </button>
                <button type="submit" className="rounded-lg bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
                  حفظ التعديل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
};

export default Page;
