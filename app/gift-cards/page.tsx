"use client";

import { useState } from "react";
import DashboardShell from "../components/DashboardShell";
import ActionIconButton from "../components/ActionIconButton";
import { EditIcon, TrashIcon, ViewIcon } from "../components/icons/ActionIcons";

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

const rows: GiftCard[] = [
  {
    id: "1",
    cardNumber: "500",
    value: 200,
    balance: 200,
    createdBy: "admin",
    notes: "الائتات",
    client: "",
    expiry: "24/01/2028",
  },
  {
    id: "2",
    cardNumber: "3921510351549564",
    value: 100,
    balance: 80,
    createdBy: "admin",
    notes: "",
    client: "",
    expiry: "15/12/2027",
  },
];

const Page = () => {
  const [query, setQuery] = useState("");

  const filteredRows = rows.filter((row) => {
    if (!query.trim()) {
      return true;
    }
    const needle = query.trim().toLowerCase();
    return [row.cardNumber, row.createdBy, row.notes, row.client]
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });

  return (
    <DashboardShell title="بطاقات هدية" subtitle="البيع / المبيعات / بطاقات هدية" hideHeaderFilters>
      <section className="space-y-4">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-(--dash-text)">بطاقات هدية</span>
            <ActionIconButton
              label="مسح"
              tone="danger"
              icon={<TrashIcon className="h-4 w-4" />}
              className="rounded-xl px-3 py-2 text-xs"
            />
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
                      <input type="checkbox" className="h-4 w-4 rounded border border-(--dash-border)" />
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
                        />
                        <ActionIconButton
                          label="حذف البطاقة"
                          icon={<TrashIcon className="h-4 w-4" />}
                          tone="danger"
                        />
                        <ActionIconButton
                          label="عرض البطاقة"
                          icon={<ViewIcon className="h-4 w-4" />}
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
    </DashboardShell>
  );
};

export default Page;
