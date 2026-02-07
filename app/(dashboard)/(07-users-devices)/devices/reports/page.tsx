"use client";

import { useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import ConfirmModal from "@/app/(dashboard)/components/ConfirmModal";

type InvoiceDevice = {
  id: string;
  activityName: string;
  taxNumber: string;
  additionalId: string;
  address: string;
};

const devices: InvoiceDevice[] = [
  {
    id: "DEV-001",
    activityName: "شركة تجريبي",
    taxNumber: "300000000000003",
    additionalId: "0000000000",
    address: "المدينة المنورة-العزيزية-الحديثة",
  },
];

const Page = () => {
  const [deviceRows, setDeviceRows] = useState(devices);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [pendingDelete, setPendingDelete] = useState<InvoiceDevice | null>(null);
  const allSelected = deviceRows.length > 0 && deviceRows.every((device) => selectedDevices.includes(device.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedDevices([]);
      return;
    }
    setSelectedDevices(deviceRows.map((device) => device.id));
  };

  const toggleRow = (deviceId: string) => {
    setSelectedDevices((prev) => (prev.includes(deviceId) ? prev.filter((id) => id !== deviceId) : [...prev, deviceId]));
  };

  const handleDelete = (device: InvoiceDevice) => {
    setPendingDelete(device);
  };

  const confirmDelete = () => {
    if (!pendingDelete) {
      return;
    }
    setDeviceRows((prev) => prev.filter((item) => item.id !== pendingDelete.id));
    setSelectedDevices((prev) => prev.filter((id) => id !== pendingDelete.id));
    setPendingDelete(null);
  };

  return (
    <DashboardShell title="أجهزة إصدار الفواتير" subtitle="البداية / أجهزة إصدار الفواتير" hideHeaderFilters>
      <section className="space-y-4">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-(--dash-text)">أجهزة إصدار الفواتير</span>
            <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs">
              ☰
            </button>
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
                      aria-label="تحديد كل الأجهزة"
                    />
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">اسم النشاط</th>
                  <th className="px-3 py-3 text-right font-semibold">الرقم الضريبي</th>
                  <th className="px-3 py-3 text-right font-semibold">المعرف الإضافي</th>
                  <th className="px-3 py-3 text-right font-semibold">العنوان</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {deviceRows.map((device) => (
                  <tr key={device.id} className="border-t border-(--dash-border) text-(--dash-text)">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selectedDevices.includes(device.id)}
                        onChange={() => toggleRow(device.id)}
                        className="h-4 w-4 rounded border border-(--dash-border)"
                        aria-label={`تحديد الجهاز ${device.activityName}`}
                      />
                    </td>
                    <td className="px-3 py-3">{device.activityName}</td>
                    <td className="px-3 py-3">{device.taxNumber}</td>
                    <td className="px-3 py-3">{device.additionalId}</td>
                    <td className="px-3 py-3">{device.address}</td>
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
                        <button
                          type="button"
                          className="rounded-lg border border-(--dash-border) p-2 text-rose-500"
                          onClick={() => handleDelete(device)}
                          aria-label={`حذف الجهاز ${device.activityName}`}
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
                  <td className="px-3 py-3" />
                  <td className="px-3 py-3">[اسم النشاط]</td>
                  <td className="px-3 py-3">[الرقم الضريبي]</td>
                  <td className="px-3 py-3">[المعرف الإضافي]</td>
                  <td className="px-3 py-3">[العنوان]</td>
                  <td className="px-3 py-3">الإجراءات</td>
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
            <span>عرض 1 إلى {deviceRows.length} من {deviceRows.length} سجلات</span>
          </div>
        </div>
      </section>
      <ConfirmModal
        open={Boolean(pendingDelete)}
        message="هل أنت متأكد من حذف الجهاز؟"
        confirmLabel="حذف"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </DashboardShell>
  );
};

export default Page;
