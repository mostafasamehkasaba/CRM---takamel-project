"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

type ItemTypeStatus = "نشط" | "افتراضي" | "موقوف";

type ItemType = {
  id: string;
  name: string;
  description: string;
  status: ItemTypeStatus;
};

const initialItemTypes: ItemType[] = [
  {
    id: "TYPE-001",
    name: "منتج",
    description: "أصناف قابلة للبيع والشراء",
    status: "نشط",
  },
  {
    id: "TYPE-002",
    name: "خدمة",
    description: "بنود خدمية بدون مخزون",
    status: "افتراضي",
  },
];

const statusStyles: Record<ItemTypeStatus, string> = {
  نشط: "bg-emerald-100 text-emerald-700",
  افتراضي: "bg-slate-100 text-slate-600",
  موقوف: "bg-rose-100 text-rose-700",
};

const page = () => {
  const [itemTypes, setItemTypes] = useState<ItemType[]>(initialItemTypes);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "نشط" as ItemTypeStatus,
  });

  useEffect(() => {
    const stored = window.localStorage.getItem("item-types-data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItemTypes(parsed);
        }
      } catch {
        // Ignore invalid stored data.
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("item-types-data", JSON.stringify(itemTypes));
  }, [itemTypes]);

  const filteredItemTypes = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return itemTypes.filter((item) => {
      if (!needle) {
        return true;
      }
      return [item.name, item.description, item.status, item.id]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [itemTypes, query]);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleStartNew = () => {
    setEditingId(null);
    setForm({ name: "", description: "", status: "نشط" });
    setShowForm(true);
  };

  const handleSave = () => {
    const name = form.name.trim();
    if (!name) {
      return;
    }

    const nextItem: ItemType = {
      id: editingId ?? `TYPE-${String(itemTypes.length + 1).padStart(3, "0")}`,
      name,
      description: form.description.trim() || "بدون وصف",
      status: form.status,
    };

    setItemTypes((prev) => {
      if (editingId) {
        return prev.map((item) => (item.id === editingId ? nextItem : item));
      }
      return [nextItem, ...prev];
    });

    setShowForm(false);
    setEditingId(null);
    setForm({ name: "", description: "", status: "نشط" });
  };

  const handleEdit = (item: ItemType) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description,
      status: item.status,
    });
    setShowForm(true);
  };

  const handleDelete = (itemId: string) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف النوع؟");
    if (!confirmed) {
      return;
    }
    setItemTypes((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <DashboardShell
      title="نوع الصنف"
      subtitle="تصنيف الأصناف إلى منتجات وخدمات وأنواع مخصصة."
      hideHeaderFilters
    >
      {showForm ? (
        <section className="mb-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
          <h2 className="text-lg font-semibold">
            {editingId ? "تعديل نوع الصنف" : "إضافة نوع صنف جديد"}
          </h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">نوع الصنف</span>
              <input
                type="text"
                value={form.name}
                onChange={(event) => handleFormChange("name", event.target.value)}
                placeholder="مثال: منتج"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted) lg:col-span-2">
              <span className="mb-2 block font-semibold text-(--dash-text)">الوصف</span>
              <input
                type="text"
                value={form.description}
                onChange={(event) => handleFormChange("description", event.target.value)}
                placeholder="وصف مختصر لنوع الصنف"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">الحالة</span>
              <select
                value={form.status}
                onChange={(event) => handleFormChange("status", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
              >
                <option value="نشط">نشط</option>
                <option value="موقوف">موقوف</option>
                <option value="افتراضي">افتراضي</option>
              </select>
            </label>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text)"
              onClick={() => setShowForm(false)}
            >
              إلغاء
            </button>
            <button
              type="button"
              className="rounded-xl bg-(--dash-primary) px-4 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
              onClick={handleSave}
            >
              حفظ النوع
            </button>
          </div>
        </section>
      ) : null}

      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex-1 rounded-2xl bg-(--dash-primary) px-5 py-3 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
            onClick={handleStartNew}
          >
            إضافة نوع
          </button>
          <div className="relative flex-1 min-w-[220px]">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث عن نوع صنف"
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-(--dash-border)">
          <table className="min-w-full text-sm">
            <thead className="bg-(--dash-primary) text-white">
              <tr>
                <th className="px-4 py-3 text-right font-semibold">نوع الصنف</th>
                <th className="px-4 py-3 text-right font-semibold">الوصف</th>
                <th className="px-4 py-3 text-right font-semibold">الحالة</th>
                <th className="px-4 py-3 text-right font-semibold">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {filteredItemTypes.map((item) => {
                const isDefault = item.status === "افتراضي";
                return (
                  <tr
                    key={item.id}
                    className="border-t border-(--dash-border) text-(--dash-text) odd:bg-(--dash-panel) even:bg-(--dash-panel-soft)"
                  >
                    <td className="px-4 py-3 font-semibold">{item.name}</td>
                    <td className="px-4 py-3 text-(--dash-muted)">{item.description}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-xs">
                        <button
                          type="button"
                          className="rounded-lg border border-(--dash-border) px-3 py-1 text-(--dash-text) hover:bg-(--dash-panel-soft)"
                          onClick={() => handleEdit(item)}
                        >
                          تعديل
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          disabled={isDefault}
                          className={`rounded-lg px-3 py-1 text-white ${isDefault ? "cursor-not-allowed bg-slate-300" : "bg-rose-500 hover:bg-rose-600"}`}
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardShell>
  );
};

export default page;
