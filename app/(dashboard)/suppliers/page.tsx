"use client";

import { useMemo, useState } from "react";
import DashboardShell from "../components/DashboardShell";

type SupplierRow = {
  name: string;
  email: string;
  phone: string;
  taxNumber: string;
  commercialRegistration: string;
  accountCode: string;
  balance: string;
};

const rows: SupplierRow[] = [
  {
    name: "string",
    email: "user@example.com",
    phone: "201555544545",
    taxNumber: "312345678912343",
    commercialRegistration: "1010123456",
    accountCode: "2101-001",
    balance: "0.00",
  },
  {
    name: "مورد",
    email: "",
    phone: "",
    taxNumber: "",
    commercialRegistration: "",
    accountCode: "",
    balance: "0.00",
  },
];

const getRowId = (row: SupplierRow) =>
  `${row.name}-${row.email}-${row.phone}-${row.taxNumber}-${row.commercialRegistration}-${row.accountCode}-${row.balance}`;

const Page = () => {
  const [query, setQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [rowsData, setRowsData] = useState(rows);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<SupplierRow | null>(null);

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

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editForm || !editingRowId) {
      return;
    }
    const nextId = getRowId(editForm);
    setRowsData((prev) =>
      prev.map((row) => (getRowId(row) === editingRowId ? { ...editForm } : row)),
    );
    setSelectedRows((prev) => prev.map((id) => (id === editingRowId ? nextId : id)));
    closeEditModal();
  };

  const handleDelete = (row: SupplierRow) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف المورد؟");
    if (!confirmed) {
      return;
    }
    const rowId = getRowId(row);
    setRowsData((prev) => prev.filter((item) => getRowId(item) !== rowId));
    setSelectedRows((prev) => prev.filter((id) => id !== rowId));
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
                {filteredRows.map((row) => (
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
      </section>

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

