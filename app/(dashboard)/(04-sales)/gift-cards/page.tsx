"use client";

import { useState, type FormEvent } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import ConfirmModal from "@/app/(dashboard)/components/ConfirmModal";
import ActionIconButton from "@/app/(dashboard)/components/ActionIconButton";
import { EditIcon, TrashIcon, ViewIcon } from "@/app/(dashboard)/components/icons/ActionIcons";

type GiftCard = {
  id: string;
  cardNumber: string;
  value: number;
  balance: number;
  createdBy: string;
  notes: string;
  client: string;
  expiry: string;
};

type GiftCardForm = {
  cardNumber: string;
  value: string;
  balance: string;
  createdBy: string;
  notes: string;
  client: string;
  expiry: string;
};

const rows: GiftCard[] = [
  {
    id: "1",
    cardNumber: "500",
    value: 200,
    balance: 200,
    createdBy: "مدير النظام",
    notes: "الائتات",
    client: "",
    expiry: "24/01/2028",
  },
  {
    id: "2",
    cardNumber: "3921510351549564",
    value: 100,
    balance: 80,
    createdBy: "مدير النظام",
    notes: "",
    client: "",
    expiry: "15/12/2027",
  },
];

const createdByOptions = ["مدير النظام", "كاشير"];

const Page = () => {
  const [query, setQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [cardRows, setCardRows] = useState(rows);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const emptyForm: GiftCardForm = {
    cardNumber: "",
    value: "",
    balance: "",
    createdBy: createdByOptions[0],
    notes: "",
    client: "",
    expiry: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [viewCard, setViewCard] = useState<GiftCard | null>(null);
  const [editingCard, setEditingCard] = useState<GiftCard | null>(null);
  const [editForm, setEditForm] = useState<GiftCardForm | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<
    | {
        type: "selected";
        ids: string[];
      }
    | {
        type: "single";
        id: string;
      }
    | null
  >(null);

  const filteredRows = cardRows.filter((row) => {
    if (!query.trim()) {
      return true;
    }
    const needle = query.trim().toLowerCase();
    return [row.cardNumber, row.createdBy, row.notes, row.client]
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });

  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) {
      return;
    }
    setPendingDelete({ type: "selected", ids: [...selectedRows] });
  };

  const handleDeleteRow = (rowId: string) => {
    setPendingDelete({ type: "single", id: rowId });
  };

  const confirmDelete = () => {
    if (!pendingDelete) {
      return;
    }
    if (pendingDelete.type === "selected") {
      const ids = pendingDelete.ids;
      setCardRows((prev) => prev.filter((row) => !ids.includes(row.id)));
      setSelectedRows([]);
      if (viewCard && ids.includes(viewCard.id)) {
        setViewCard(null);
      }
      if (editingCard && ids.includes(editingCard.id)) {
        setEditingCard(null);
        setEditForm(null);
        setEditError(null);
      }
    } else {
      const rowId = pendingDelete.id;
      setCardRows((prev) => prev.filter((row) => row.id !== rowId));
      setSelectedRows((prev) => prev.filter((id) => id !== rowId));
      if (viewCard?.id === rowId) {
        setViewCard(null);
      }
      if (editingCard?.id === rowId) {
        setEditingCard(null);
        setEditForm(null);
        setEditError(null);
      }
    }
    setPendingDelete(null);
  };

  const allSelected = filteredRows.length > 0 && filteredRows.every((row) => selectedRows.includes(row.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedRows((prev) => prev.filter((id) => !filteredRows.some((row) => row.id === id)));
      return;
    }
    setSelectedRows((prev) => {
      const next = new Set(prev);
      filteredRows.forEach((row) => next.add(row.id));
      return Array.from(next);
    });
  };

  const toggleRow = (rowId: string) => {
    setSelectedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]));
  };

  const handleFormChange = (field: keyof typeof emptyForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const openForm = () => {
    setForm(emptyForm);
    setFormError(null);
    setViewCard(null);
    setEditingCard(null);
    setEditForm(null);
    setEditError(null);
    setShowForm(true);
  };

  const handleAddCard = () => {
    const cardNumber = form.cardNumber.trim();
    const value = Number(form.value);
    if (!cardNumber || Number.isNaN(value) || value <= 0) {
      setFormError("الرجاء إدخال رقم البطاقة وقيمتها بشكل صحيح.");
      return;
    }
    const balanceInput = Number(form.balance);
    const balance = Number.isFinite(balanceInput) && balanceInput >= 0 ? balanceInput : value;
    const nextRow: GiftCard = {
      id: `${Date.now()}`,
      cardNumber,
      value,
      balance,
      createdBy: form.createdBy.trim() || createdByOptions[0],
      notes: form.notes.trim(),
      client: form.client.trim(),
      expiry: form.expiry.trim(),
    };
    setCardRows((prev) => [nextRow, ...prev]);
    setSelectedRows([]);
    setForm(emptyForm);
    setFormError(null);
    setShowForm(false);
  };

  const openViewModal = (row: GiftCard) => {
    setViewCard(row);
    setShowForm(false);
    setEditingCard(null);
    setEditForm(null);
    setEditError(null);
  };

  const openEditModal = (row: GiftCard) => {
    setEditingCard(row);
    setEditForm({
      cardNumber: row.cardNumber,
      value: String(row.value),
      balance: String(row.balance),
      createdBy: row.createdBy,
      notes: row.notes,
      client: row.client,
      expiry: row.expiry,
    });
    setEditError(null);
    setShowForm(false);
    setViewCard(null);
  };

  const closeEditModal = () => {
    setEditingCard(null);
    setEditForm(null);
    setEditError(null);
  };

  const handleEditChange = <K extends keyof GiftCardForm>(field: K, value: GiftCardForm[K]) => {
    setEditForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editForm || !editingCard) {
      return;
    }
    const cardNumber = editForm.cardNumber.trim();
    const value = Number(editForm.value);
    if (!cardNumber || Number.isNaN(value) || value <= 0) {
      setEditError("الرجاء إدخال رقم البطاقة وقيمتها بشكل صحيح.");
      return;
    }
    const balanceValue = editForm.balance.trim();
    const balance = balanceValue ? Number(balanceValue) : value;
    if (Number.isNaN(balance) || balance < 0) {
      setEditError("الرجاء إدخال الرصيد بشكل صحيح.");
      return;
    }

    const nextRow: GiftCard = {
      ...editingCard,
      cardNumber,
      value,
      balance,
      createdBy: editForm.createdBy || createdByOptions[0],
      notes: editForm.notes.trim(),
      client: editForm.client.trim(),
      expiry: editForm.expiry.trim(),
    };

    setCardRows((prev) => prev.map((row) => (row.id === editingCard.id ? nextRow : row)));
    if (viewCard?.id === editingCard.id) {
      setViewCard(nextRow);
    }
    closeEditModal();
  };

  return (
    <DashboardShell title="بطاقات هدية" subtitle="البيع / المبيعات / بطاقات هدية" hideHeaderFilters>
      <section className="space-y-4">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-(--dash-text)">بطاقات هدية</span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="rounded-xl bg-(--dash-primary) px-3 py-2 text-xs font-semibold text-white"
                onClick={openForm}
              >
                إضافة كارت هدايا
              </button>
              <ActionIconButton
                label="مسح"
                tone="danger"
                icon={<TrashIcon className="h-4 w-4" />}
                className="rounded-xl px-3 py-2 text-xs"
                onClick={handleDeleteSelected}
              />
            </div>
          </div>
          <p className="mt-3 text-sm text-(--dash-muted)">الرجاء استخدام الجدول أدناه للتنقل أو تصفية النتائج.</p>
        </div>

        {showForm ? (
          <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-(--dash-text)">إضافة كارت هدايا</h3>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-text)"
              >
                إغلاق
              </button>
            </div>
            {formError ? (
              <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                {formError}
              </div>
            ) : null}
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">رقم البطاقة *</span>
                <input
                  type="text"
                  value={form.cardNumber}
                  onChange={(event) => handleFormChange("cardNumber", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">القيمة *</span>
                <input
                  type="number"
                  min={0}
                  value={form.value}
                  onChange={(event) => handleFormChange("value", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">الرصيد</span>
                <input
                  type="number"
                  min={0}
                  value={form.balance}
                  onChange={(event) => handleFormChange("balance", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">مدخل البيانات</span>
                <select
                  value={form.createdBy}
                  onChange={(event) => handleFormChange("createdBy", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                >
                  {createdByOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">عميل</span>
                <input
                  type="text"
                  value={form.client}
                  onChange={(event) => handleFormChange("client", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">إنتهاء الصلاحية</span>
                <input
                  type="date"
                  value={form.expiry}
                  onChange={(event) => handleFormChange("expiry", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted) md:col-span-2">
                <span className="mb-2 block font-semibold text-(--dash-text)">ملاحظات</span>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(event) => handleFormChange("notes", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-(--dash-border) px-4 py-2 text-xs text-(--dash-text)"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleAddCard}
                className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white"
              >
                حفظ الكارت
              </button>
            </div>
          </div>
        ) : null}

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
                      aria-label="تحديد كل البطاقات"
                    />
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">رقم البطاقة</th>
                  <th className="px-3 py-3 text-right font-semibold">قيمة</th>
                  <th className="px-3 py-3 text-right font-semibold">الرصيد</th>
                  <th className="px-3 py-3 text-right font-semibold">مدخل البيانات</th>
                  <th className="px-3 py-3 text-right font-semibold">ملاحظات</th>
                  <th className="px-3 py-3 text-right font-semibold">عميل</th>
                  <th className="px-3 py-3 text-right font-semibold">إنتهاء الصلاحية</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id} className="border-t border-(--dash-border) text-(--dash-text)">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => toggleRow(row.id)}
                        className="h-4 w-4 rounded border border-(--dash-border)"
                        aria-label={`تحديد البطاقة ${row.cardNumber}`}
                      />
                    </td>
                    <td className="px-3 py-3 font-semibold">{row.cardNumber}</td>
                    <td className="px-3 py-3">{row.value.toFixed(2)}</td>
                    <td className="px-3 py-3">{row.balance.toFixed(2)}</td>
                    <td className="px-3 py-3">{row.createdBy}</td>
                    <td className="px-3 py-3">{row.notes}</td>
                    <td className="px-3 py-3">{row.client}</td>
                    <td className="px-3 py-3">{row.expiry}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <ActionIconButton
                          label="تعديل البطاقة"
                          icon={<EditIcon className="h-4 w-4" />}
                          onClick={() => openEditModal(row)}
                        />
                        <ActionIconButton
                          label="حذف البطاقة"
                          icon={<TrashIcon className="h-4 w-4" />}
                          tone="danger"
                          onClick={() => handleDeleteRow(row.id)}
                        />
                        <ActionIconButton
                          label="عرض البطاقة"
                          icon={<ViewIcon className="h-4 w-4" />}
                          onClick={() => openViewModal(row)}
                        />
                      </div>
                    </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-(--dash-border) px-4 py-3 text-sm text-(--dash-muted)">
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">التالي</button>
              <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">سابق</button>
            </div>
            <span>عرض 1 إلى 2 من 2 سجلات</span>
          </div>
        </div>
      </section>

      {viewCard ? (
        <div className="dash-modal">
          <div className="dash-modal-body max-w-2xl p-6">
            <div className="flex items-center justify-between border-b border-(--dash-border) pb-3">
              <div>
                <h3 className="text-sm font-semibold text-(--dash-text)">عرض البطاقة</h3>
                <p className="mt-1 text-xs text-(--dash-muted)">{viewCard.cardNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => setViewCard(null)}
                className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-muted)"
              >
                إغلاق
              </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-(--dash-border) p-3">
                <p className="text-xs text-(--dash-muted)">القيمة</p>
                <p className="mt-1 text-sm font-semibold text-(--dash-text)">{viewCard.value.toFixed(2)}</p>
              </div>
              <div className="rounded-xl border border-(--dash-border) p-3">
                <p className="text-xs text-(--dash-muted)">الرصيد</p>
                <p className="mt-1 text-sm font-semibold text-(--dash-text)">{viewCard.balance.toFixed(2)}</p>
              </div>
              <div className="rounded-xl border border-(--dash-border) p-3">
                <p className="text-xs text-(--dash-muted)">مدخل البيانات</p>
                <p className="mt-1 text-sm font-semibold text-(--dash-text)">{viewCard.createdBy || "-"}</p>
              </div>
              <div className="rounded-xl border border-(--dash-border) p-3">
                <p className="text-xs text-(--dash-muted)">عميل</p>
                <p className="mt-1 text-sm font-semibold text-(--dash-text)">{viewCard.client || "-"}</p>
              </div>
              <div className="rounded-xl border border-(--dash-border) p-3">
                <p className="text-xs text-(--dash-muted)">إنتهاء الصلاحية</p>
                <p className="mt-1 text-sm font-semibold text-(--dash-text)">{viewCard.expiry || "-"}</p>
              </div>
              <div className="rounded-xl border border-(--dash-border) p-3 sm:col-span-2">
                <p className="text-xs text-(--dash-muted)">ملاحظات</p>
                <p className="mt-1 text-sm font-semibold text-(--dash-text)">{viewCard.notes || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {editForm && editingCard ? (
        <div className="dash-modal">
          <div className="dash-modal-body max-w-2xl p-6">
            <div className="flex items-center justify-between border-b border-(--dash-border) pb-3">
              <div>
                <h3 className="text-sm font-semibold text-(--dash-text)">تعديل البطاقة</h3>
                <p className="mt-1 text-xs text-(--dash-muted)">{editingCard.cardNumber}</p>
              </div>
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-muted)"
              >
                إغلاق
              </button>
            </div>
            {editError ? (
              <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                {editError}
              </div>
            ) : null}
            <form onSubmit={handleEditSubmit} className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">رقم البطاقة *</span>
                <input
                  type="text"
                  value={editForm.cardNumber}
                  onChange={(event) => handleEditChange("cardNumber", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">القيمة *</span>
                <input
                  type="number"
                  min={0}
                  value={editForm.value}
                  onChange={(event) => handleEditChange("value", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">الرصيد</span>
                <input
                  type="number"
                  min={0}
                  value={editForm.balance}
                  onChange={(event) => handleEditChange("balance", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">مدخل البيانات</span>
                <select
                  value={editForm.createdBy}
                  onChange={(event) => handleEditChange("createdBy", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                >
                  {createdByOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">عميل</span>
                <input
                  type="text"
                  value={editForm.client}
                  onChange={(event) => handleEditChange("client", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted)">
                <span className="mb-2 block font-semibold text-(--dash-text)">إنتهاء الصلاحية</span>
                <input
                  type="date"
                  value={editForm.expiry}
                  onChange={(event) => handleEditChange("expiry", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="text-sm text-(--dash-muted) md:col-span-2">
                <span className="mb-2 block font-semibold text-(--dash-text)">ملاحظات</span>
                <textarea
                  rows={3}
                  value={editForm.notes}
                  onChange={(event) => handleEditChange("notes", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text) focus:outline-none"
                />
              </label>
              <div className="md:col-span-2 mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-xl border border-(--dash-border) px-4 py-2 text-xs text-(--dash-text)"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white"
                >
                  حفظ التعديل
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <ConfirmModal
        open={Boolean(pendingDelete)}
        message={
          pendingDelete?.type === "selected"
            ? "هل أنت متأكد من حذف البطاقات المحددة؟"
            : "هل أنت متأكد من حذف البطاقة؟"
        }
        confirmLabel="حذف"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </DashboardShell>
  );
};

export default Page;
