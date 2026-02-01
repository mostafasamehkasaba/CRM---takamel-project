"use client";

import { useMemo, useState } from "react";
import DashboardShell from "../components/DashboardShell";
import ActionIconButton from "../components/ActionIconButton";
import { EditIcon, TrashIcon } from "../components/icons/ActionIcons";

type MarketerRow = {
  name: string;
  code: string;
  discountCode: string;
  discountRate: string;
  commission: string;
  method: string;
  status: string;
};

const rows: MarketerRow[] = [
  {
    name: "string",
    code: "103",
    discountCode: "DC-01",
    discountRate: "5%",
    commission: "لا توجد بيانات في الجدول",
    method: "طريقة حساب العمولة",
    status: "نشط",
  },
];

const Page = () => {
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return rows;
    }
    return rows.filter((row) =>
      [row.name, row.code, row.discountCode, row.discountRate, row.commission, row.method, row.status]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [query]);

  return (
    <DashboardShell title="المسوقين" subtitle="البداية / إعدادات النظام / المسوقين" hideHeaderFilters>
      <section className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <h2 className="text-sm font-semibold text-(--dash-text)">المسوقين</h2>
          <button type="button" className="flex items-center gap-2 rounded-xl border border-(--dash-border) px-3 py-2 text-xs text-(--dash-text)">
            <span className="text-lg">+</span>
            إضافة مسوق
          </button>
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
            <div className="flex min-w-60 flex-1 items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
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
                <th className="px-3 py-3 text-right font-semibold">الاسم</th>
                <th className="px-3 py-3 text-right font-semibold">كود الخصم</th>
                <th className="px-3 py-3 text-right font-semibold">نسبة خصم العميل</th>
                <th className="px-3 py-3 text-right font-semibold">عمولة المسوق</th>
                <th className="px-3 py-3 text-right font-semibold">طريقة حساب العمولة</th>
                <th className="px-3 py-3 text-right font-semibold">الحالة</th>
                <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.name} className="border-t border-(--dash-border) text-(--dash-text)">
                  <td className="px-3 py-3">{row.name}</td>
                  <td className="px-3 py-3">{row.discountCode}</td>
                  <td className="px-3 py-3">{row.discountRate}</td>
                  <td className="px-3 py-3">{row.commission}</td>
                  <td className="px-3 py-3">{row.method}</td>
                  <td className="px-3 py-3">{row.status}</td>
                  <td className="px-3 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <ActionIconButton
                          label="تعديل المسوق"
                          icon={<EditIcon className="h-4 w-4" />}
                        />
                        <ActionIconButton
                          label="حذف المسوق"
                          icon={<TrashIcon className="h-4 w-4" />}
                          tone="danger"
                        />
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-(--dash-border) text-(--dash-muted)">
              <tr>
                <td className="px-3 py-3">[الاسم]</td>
                <td className="px-3 py-3">[كود الخصم]</td>
                <td className="px-3 py-3">[نسبة خصم العميل]</td>
                <td className="px-3 py-3">[عمولة المسوق]</td>
                <td className="px-3 py-3">[طريقة حساب العمولة]</td>
                <td className="px-3 py-3">[الحالة]</td>
                <td className="px-3 py-3">الإجراءات</td>
              </tr>
            </tfoot>
            </table>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-(--dash-border) px-4 py-3 text-sm text-(--dash-muted)">
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">سابق</button>
              <span className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">1</span>
              <button className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">التالي</button>
            </div>
            <span>عرض {filteredRows.length} سجلات</span>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
