"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import { listItems } from "@/app/services/items";
import { extractList } from "@/app/services/http";

type DisplayItem = {
  id: string | number;
  code: string;
  name: string;
  imageUrl?: string | null;
  brand: string;
  agent: string;
  category: string;
  cost: number;
  salePrice: number;
  qty: number;
  unit: string;
  alertQty: number;
};

const formatCurrency = (value: number) => `${value.toLocaleString()} ر.س`;

const resolveAssetUrl = (value?: string | null) => {
  if (!value) {
    return null;
  }
  if (value.startsWith("http") || value.startsWith("blob:") || value.startsWith("data:")) {
    return value;
  }
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const root = base.replace(/\/api\/?$/, "");
  const trimmed = value.replace(/^\/+/, "");
  if (!root) {
    return value;
  }
  return `${root}/${trimmed}`;
};

const page = () => {
  const [items, setItems] = useState<DisplayItem[]>([]);
  const [query, setQuery] = useState("");
  const [showCount, setShowCount] = useState("10");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mapItem = (entry: any, index: number): DisplayItem => ({
    id: entry.id ?? entry.uuid ?? entry.code ?? entry._id ?? `${index + 1}`,
    code: entry.code ?? entry.sku ?? entry.barcode ?? "???",
    name: entry.name ?? "غير محدد",
    imageUrl: resolveAssetUrl(
      entry.image_url ?? entry.imageUrl ?? entry.image ?? entry.photo ?? entry.photo_url ?? entry.photoUrl ?? null
    ),
    brand: entry.brand?.name ?? entry.brand_name ?? entry.brand ?? "غير محدد",
    agent: entry.agent?.name ?? entry.agent_name ?? entry.agent ?? "عام",
    category: entry.category?.name ?? entry.category_name ?? entry.category ?? "غير محدد",
    cost: Number(entry.purchase_price ?? entry.cost ?? 0),
    salePrice: Number(entry.sale_price ?? entry.salePrice ?? 0),
    qty: Number(entry.current_stock ?? entry.stock ?? 0),
    unit: entry.item_unit?.name ?? entry.unit?.name ?? entry.unit_name ?? entry.unit ?? "قطعة",
    alertQty: Number(entry.notify_quantity ?? entry.alertQty ?? 0),
  });

  const fetchItems = async (searchValue = "") => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await listItems({
        pagination: "on",
        limit_per_page: 50,
        search: searchValue || undefined,
      });
      const list = extractList<any>(response);
      setItems(list.map(mapItem));
    } catch (error) {
      console.error(error);
      setErrorMessage("تعذر تحميل الأصناف.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handle = window.setTimeout(() => {
      fetchItems(query);
    }, 300);
    return () => window.clearTimeout(handle);
  }, [query]);

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
      {errorMessage ? (
        <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </div>
      ) : null}
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
              {isLoading ? (
                <tr className="border-t border-(--dash-border)">
                  <td className="px-4 py-6 text-center text-(--dash-muted)" colSpan={12}>
                    جاري التحميل...
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-(--dash-border) text-(--dash-text) odd:bg-(--dash-panel) even:bg-(--dash-panel-soft)"
                  >
                    <td className="px-3 py-3">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="h-8 w-8 rounded-lg border border-(--dash-border) object-cover"
                        />
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) text-(--dash-muted)">
                          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                            <path
                              fill="currentColor"
                              d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm4 10 3-3 4 4 3-3 2 2v2H6v-2l2-2Z"
                            />
                          </svg>
                        </span>
                      )}
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
                ))
              )}
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
