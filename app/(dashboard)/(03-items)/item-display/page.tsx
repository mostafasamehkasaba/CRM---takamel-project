"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

type DisplayItem = {
  id: string;
  code: string;
  name: string;
  brand: string;
  agent: string;
  category: string;
  cost: number;
  salePrice: number;
  qty: number;
  unit: string;
  alertQty: number;
};

const initialItems: DisplayItem[] = [
  {
    id: "DISP-001",
    code: "6291100277919",
    name: "غسول ناشير يونك 150 مل",
    brand: "تكامل",
    agent: "عام",
    category: "عناية",
    cost: 4.8,
    salePrice: 8,
    qty: 0,
    unit: "حبة",
    alertQty: 10,
  },
  {
    id: "DISP-002",
    code: "+00001",
    name: "موز كيلو",
    brand: "تكامل",
    agent: "عام",
    category: "فواكه",
    cost: 0,
    salePrice: 7,
    qty: 0,
    unit: "حبة",
    alertQty: 0,
  },
  {
    id: "DISP-003",
    code: "+00002",
    name: "رمان",
    brand: "تكامل",
    agent: "عام",
    category: "فواكه",
    cost: 0,
    salePrice: 10,
    qty: 0,
    unit: "حبة",
    alertQty: 0,
  },
  {
    id: "DISP-004",
    code: "+00004",
    name: "خوخ",
    brand: "تكامل",
    agent: "عام",
    category: "فواكه",
    cost: 0,
    salePrice: 12,
    qty: 0,
    unit: "حبة",
    alertQty: 0,
  },
];

const formatCurrency = (value: number) => `${value.toLocaleString()} ر.س`;

const page = () => {
  const [items, setItems] = useState<DisplayItem[]>(initialItems);
  const [query, setQuery] = useState("");
  const [showCount, setShowCount] = useState("10");

  useEffect(() => {
    const stored = window.localStorage.getItem("item-display-data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch {
        // Ignore invalid stored data.
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("item-display-data", JSON.stringify(items));
  }, [items]);

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      if (!needle) {
        return true;
      }
      return [item.name, item.code, item.brand, item.category]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [items, query]);

  const perPage = Number.parseInt(showCount, 10) || 10;
  const totalRecords = filteredItems.length;
  const startIndex = totalRecords === 0 ? 0 : 1;
  const endIndex = Math.min(perPage, totalRecords);
  const totalPages = Math.max(1, Math.ceil(totalRecords / perPage));

  return (
    <DashboardShell
      title="عرض الصنف"
      subtitle="قائمة الأصناف مع التصنيفات والمخزون والإجراءات."
      hideHeaderFilters
    >
      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={showCount}
            onChange={(event) => setShowCount(event.target.value)}
            className="min-w-[170px] rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
          >
            <option value="10">إظهار 10</option>
            <option value="25">إظهار 25</option>
            <option value="50">إظهار 50</option>
          </select>
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="اكتب ما تريد أن تبحث عنه"
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-(--dash-border)">
          <table className="min-w-full text-sm">
            <thead className="bg-(--dash-primary) text-white">
              <tr>
                <th className="px-3 py-3 text-right font-semibold">صورة</th>
                <th className="px-3 py-3 text-right font-semibold">كود الصنف</th>
                <th className="px-3 py-3 text-right font-semibold">اسم</th>
                <th className="px-3 py-3 text-right font-semibold">الماركة</th>
                <th className="px-3 py-3 text-right font-semibold">الوكيل</th>
                <th className="px-3 py-3 text-right font-semibold">التصنيفات الرئيسية</th>
                <th className="px-3 py-3 text-right font-semibold">التكلفة</th>
                <th className="px-3 py-3 text-right font-semibold">سعر البيع</th>
                <th className="px-3 py-3 text-right font-semibold">كمية</th>
                <th className="px-3 py-3 text-right font-semibold">وحدة</th>
                <th className="px-3 py-3 text-right font-semibold">تنبيهات بكميات المخزون</th>
                <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-(--dash-border) text-(--dash-text) odd:bg-(--dash-panel) even:bg-(--dash-panel-soft)"
                >
                  <td className="px-3 py-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) text-(--dash-muted)">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm4 10 3-3 4 4 3-3 2 2v2H6v-2l2-2Z"
                        />
                      </svg>
                    </span>
                  </td>
                  <td className="px-3 py-3 text-(--dash-muted)">{item.code}</td>
                  <td className="px-3 py-3 font-semibold">{item.name}</td>
                  <td className="px-3 py-3 text-(--dash-muted)">{item.brand}</td>
                  <td className="px-3 py-3 text-(--dash-muted)">{item.agent}</td>
                  <td className="px-3 py-3 text-(--dash-muted)">{item.category}</td>
                  <td className="px-3 py-3">{formatCurrency(item.cost)}</td>
                  <td className="px-3 py-3">{formatCurrency(item.salePrice)}</td>
                  <td className="px-3 py-3 text-(--dash-muted)">{item.qty.toFixed(2)}</td>
                  <td className="px-3 py-3 text-(--dash-muted)">{item.unit}</td>
                  <td className="px-3 py-3 text-(--dash-muted)">{item.alertQty.toFixed(2)}</td>
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      className="rounded-full border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-xs text-(--dash-text)"
                    >
                      الإجراءات
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-(--dash-muted)">
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-full border border-(--dash-border) px-3 py-1">
              السابق
            </button>
            <span>1 من {totalPages}</span>
            <button type="button" className="rounded-full border border-(--dash-border) px-3 py-1">
              التالي
            </button>
          </div>
          <span>
            عرض {startIndex} إلى {endIndex} من {totalRecords} سجلات
          </span>
        </div>
      </section>
    </DashboardShell>
  );
};

export default page;
