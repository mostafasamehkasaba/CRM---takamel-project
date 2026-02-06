"use client";

import { useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

type Shift = {
  id: string;
  employee: string;
  date: string;
  startTime: string;
  endTime: string;
  notes: string;
  status: "مفتوحة" | "مغلقة";
};

const employees = ["محمد علي", "سارة أحمد", "خالد سالم", "ريم فهد"];

const initialShifts: Shift[] = [
  {
    id: "SHIFT-001",
    employee: "محمد علي",
    date: "2026-01-15",
    startTime: "09:00",
    endTime: "17:00",
    notes: "-",
    status: "مغلقة",
  },
  {
    id: "SHIFT-002",
    employee: "سارة أحمد",
    date: "2026-01-16",
    startTime: "10:00",
    endTime: "",
    notes: "متابعة تحويلات اليوم",
    status: "مفتوحة",
  },
];

const page = () => {
  const [shiftQuery, setShiftQuery] = useState("");
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [shiftForm, setShiftForm] = useState({
    employee: "",
    date: "",
    startTime: "",
    endTime: "",
    notes: "",
  });

  const filteredShifts = useMemo(() => {
    const normalizedQuery = shiftQuery.trim().toLowerCase();
    return shifts.filter((shift) => {
      if (!normalizedQuery) {
        return true;
      }
      return [shift.employee, shift.date, shift.notes, shift.status]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [shifts, shiftQuery]);

  const handleShiftChange = (field: keyof typeof shiftForm, value: string) => {
    setShiftForm((prev) => ({ ...prev, [field]: value }));
  };

  const parseTimeToMinutes = (value: string) => {
    if (!value) {
      return null;
    }
    const [hours, minutes] = value.split(":").map((item) => Number(item));
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return null;
    }
    return hours * 60 + minutes;
  };

  const getShiftDuration = (startTime: string, endTime: string) => {
    const startMinutes = parseTimeToMinutes(startTime);
    const endMinutes = parseTimeToMinutes(endTime);
    if (startMinutes === null || endMinutes === null || endMinutes < startMinutes) {
      return "—";
    }
    const totalMinutes = endMinutes - startMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (!minutes) {
      return `${hours} ساعة`;
    }
    return `${hours} ساعة ${minutes} دقيقة`;
  };

  const handleAddShift = () => {
    if (!shiftForm.employee || !shiftForm.date || !shiftForm.startTime) {
      return;
    }
    const status: Shift["status"] = shiftForm.endTime ? "مغلقة" : "مفتوحة";
    const nextShift: Shift = {
      id: `SHIFT-${String(shifts.length + 1).padStart(3, "0")}`,
      employee: shiftForm.employee,
      date: shiftForm.date,
      startTime: shiftForm.startTime,
      endTime: shiftForm.endTime,
      notes: shiftForm.notes.trim() || "-",
      status,
    };
    setShifts((prev) => [nextShift, ...prev]);
    setShiftForm({ employee: "", date: "", startTime: "", endTime: "", notes: "" });
  };

  return (
    <DashboardShell title="إدارة الورديات" subtitle="إضافة وردية جديدة وتتبع جدول الموظفين" hideHeaderFilters>
      <section className="dash-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-(--dash-text)">إضافة وردية جديدة</h2>
            <p className="text-sm text-(--dash-muted)">سجّل بيانات الوردية واضف ملاحظات داخلية.</p>
          </div>
          <span className="rounded-full bg-(--dash-panel-soft) px-3 py-1 text-xs text-(--dash-muted)">
            نموذج الوردية
          </span>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-4">
          <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
            <span>اسم الموظف *</span>
            <select
              value={shiftForm.employee}
              onChange={(event) => handleShiftChange("employee", event.target.value)}
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
            >
              <option value="">اختر الموظف</option>
              {employees.map((employee) => (
                <option key={employee} value={employee}>
                  {employee}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
            <span>تاريخ الوردية *</span>
            <input
              type="date"
              value={shiftForm.date}
              onChange={(event) => handleShiftChange("date", event.target.value)}
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
            <span>وقت البداية *</span>
            <input
              type="time"
              value={shiftForm.startTime}
              onChange={(event) => handleShiftChange("startTime", event.target.value)}
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
            <span>وقت النهاية</span>
            <input
              type="time"
              value={shiftForm.endTime}
              onChange={(event) => handleShiftChange("endTime", event.target.value)}
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
            />
          </label>
        </div>
        <label className="mt-4 flex flex-col gap-2 text-sm text-(--dash-muted)">
          <span>ملاحظات</span>
          <input
            type="text"
            value={shiftForm.notes}
            onChange={(event) => handleShiftChange("notes", event.target.value)}
            placeholder="أضف ملاحظات إضافية"
            className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
          />
        </label>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleAddShift}
            className="rounded-2xl bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
          >
            إضافة الوردية
          </button>
        </div>
      </section>

      <section className="dash-card mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-(--dash-text)">قائمة الورديات</h3>
          <div className="relative w-full max-w-xs">
            <svg viewBox="0 0 24 24" className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--dash-muted)">
              <path
                fill="currentColor"
                d="M15.5 14h-.8l-.3-.3a6.5 6.5 0 10-.7.7l.3.3v.8l4.5 4.5 1.3-1.3zM10.5 15a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"
              />
            </svg>
            <input
              value={shiftQuery}
              onChange={(event) => setShiftQuery(event.target.value)}
              placeholder="بحث عن موظف أو تاريخ..."
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) py-2 pr-10 pl-4 text-sm text-(--dash-text) focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-(--dash-muted)">
              <tr className="border-b border-(--dash-border)">
                <th className="px-3 py-3 text-right">الموظف</th>
                <th className="px-3 py-3 text-right">التاريخ</th>
                <th className="px-3 py-3 text-right">وقت البداية</th>
                <th className="px-3 py-3 text-right">وقت النهاية</th>
                <th className="px-3 py-3 text-right">إجمالي الساعات</th>
                <th className="px-3 py-3 text-right">الملاحظات</th>
                <th className="px-3 py-3 text-right">حالة الوردية</th>
              </tr>
            </thead>
            <tbody>
              {filteredShifts.map((shift) => (
                <tr key={shift.id} className="border-b border-(--dash-border) text-xs text-(--dash-muted)">
                  <td className="px-3 py-4 text-sm text-(--dash-text)">{shift.employee}</td>
                  <td className="px-3 py-4">{shift.date}</td>
                  <td className="px-3 py-4">{shift.startTime || "-"}</td>
                  <td className="px-3 py-4">{shift.endTime || "-"}</td>
                  <td className="px-3 py-4">{getShiftDuration(shift.startTime, shift.endTime)}</td>
                  <td className="px-3 py-4">{shift.notes}</td>
                  <td className="px-3 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                        shift.status === "مغلقة"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {shift.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardShell>
  );
};

export default page;
