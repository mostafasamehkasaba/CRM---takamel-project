"use client";

import { useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

type Transfer = {
  id: string;
  date: string;
  time: string;
  from: string;
  to: string;
  amount: number;
  fees: number;
  net: number;
  description: string;
  status: "مكتمل" | "قيد المعالجة";
};

const transfersData: Transfer[] = [
  {
    id: "TRF-001",
    date: "2026-01-16",
    time: "14:30",
    from: "الخزنة الرئيسية",
    to: "بنك الرياض - حساب جاري",
    amount: 50000,
    fees: 0,
    net: 50000,
    description: "تحويل من الخزنة إلى البنك",
    status: "مكتمل",
  },
  {
    id: "TRF-002",
    date: "2026-01-15",
    time: "11:20",
    from: "البنك الأهلي - حساب ادخار",
    to: "الخزنة الرئيسية",
    amount: 30000,
    fees: 0,
    net: 30000,
    description: "تحويل بين الخزنة والبنك",
    status: "مكتمل",
  },
  {
    id: "TRF-003",
    date: "2026-01-14",
    time: "10:00",
    from: "بنك الرياض - حساب جاري",
    to: "البنك الأهلي - حساب ادخار",
    amount: 100000,
    fees: 50,
    net: 99950,
    description: "تحويل لدعم السيولة التشغيلية",
    status: "مكتمل",
  },
  {
    id: "TRF-004",
    date: "2026-01-13",
    time: "13:45",
    from: "خزنة المصروفات",
    to: "HSBC - حساب دولاري",
    amount: 5000,
    fees: 10,
    net: 4990,
    description: "تحويل دولي من أحد البنوك",
    status: "قيد المعالجة",
  },
];

const formatCurrency = (value: number, currency: string) =>
  `${value.toLocaleString("en-US")} ${currency}`;

const page = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("كل الحالات");
  const [showNewTransfer, setShowNewTransfer] = useState(false);
  const [transfers, setTransfers] = useState<Transfer[]>(transfersData);
  const [showTransferView, setShowTransferView] = useState(false);
  const [activeTransfer, setActiveTransfer] = useState<Transfer | null>(null);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: "",
    fees: "0",
    description: "",
    reference: "",
  });

  const stats = useMemo(() => {
    const total = transfers.reduce((sum, item) => sum + item.amount, 0);
    const completed = transfers.filter((item) => item.status === "مكتمل").length;
    const pending = transfers.filter((item) => item.status === "قيد المعالجة").length;
    const totalTransfers = transfers.length;
    return [
      {
        label: "عدد التحويلات",
        value: totalTransfers.toString(),
        tone: "text-(--dash-primary)",
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="currentColor"
              d="M7 7h9l-1.5-1.5a1 1 0 1 1 1.4-1.4l3.2 3.2a1 1 0 0 1 0 1.4l-3.2 3.2a1 1 0 0 1-1.4-1.4L16 9H7a1 1 0 1 1 0-2Zm10 10H8l1.5 1.5a1 1 0 1 1-1.4 1.4l-3.2-3.2a1 1 0 0 1 0-1.4l3.2-3.2a1 1 0 0 1 1.4 1.4L8 15h9a1 1 0 1 1 0 2Z"
            />
          </svg>
        ),
      },
      {
        label: "مكتمل",
        value: completed.toString(),
        tone: "text-(--dash-success)",
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="currentColor"
              d="M9 12.5 11 14.5l4-4a1 1 0 0 1 1.4 1.4l-4.7 4.7a1 1 0 0 1-1.4 0L7.6 13.9a1 1 0 0 1 1.4-1.4Z"
            />
          </svg>
        ),
      },
      {
        label: "قيد المعالجة",
        value: pending.toString(),
        tone: "text-(--dash-warning)",
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 6a1 1 0 0 1 1 1v4.6l2.7 1.6a1 1 0 1 1-1 1.8l-3.2-1.9a1 1 0 0 1-.5-.9V7a1 1 0 0 1 1-1Z"
            />
          </svg>
        ),
      },
      {
        label: "إجمالي المبلغ",
        value: formatCurrency(total, "SAR"),
        tone: "text-(--dash-primary)",
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2a1 1 0 0 1 1 1v1.1a6.5 6.5 0 0 1 4.5 2.1l-1.4 1.4A4.5 4.5 0 0 0 13 6.1V9h2a1 1 0 1 1 0 2h-2v1.9a2.5 2.5 0 0 0 2.5 2.5H16a1 1 0 1 1 0 2h-.5A4.5 4.5 0 0 1 12 15.4V11H10a1 1 0 1 1 0-2h2V6.1a4.5 4.5 0 0 0-3.1 1.3L7.5 6A6.5 6.5 0 0 1 11 4.1V3a1 1 0 0 1 1-1Z"
            />
          </svg>
        ),
      },
    ];
  }, [transfers]);

  const filteredTransfers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return transfers.filter((item) => {
      const matchesQuery = normalizedQuery
        ? [item.from, item.to, item.description, item.date]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)
        : true;
      const matchesStatus = statusFilter === "كل الحالات" || item.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [transfers, query, statusFilter]);

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amountValue = Number.parseFloat(formData.amount);
    const feesValue = Number.parseFloat(formData.fees || "0");
    if (!formData.from || !formData.to || Number.isNaN(amountValue) || amountValue <= 0) {
      return;
    }
    const nextTransfer: Transfer = {
      id: `TRF-${String(transfers.length + 1).padStart(3, "0")}`,
      date: "2026-01-16",
      time: "12:00",
      from: formData.from,
      to: formData.to,
      amount: amountValue,
      fees: Number.isNaN(feesValue) ? 0 : feesValue,
      net: amountValue - (Number.isNaN(feesValue) ? 0 : feesValue),
      description: formData.description.trim() || "-",
      status: "قيد المعالجة",
    };
    setTransfers((prev) => [nextTransfer, ...prev]);
    setShowNewTransfer(false);
    setFormData({ from: "", to: "", amount: "", fees: "0", description: "", reference: "" });
  };

  const openTransferView = (transfer: Transfer) => {
    setActiveTransfer(transfer);
    setShowTransferView(true);
  };

  const closeTransferView = () => {
    setActiveTransfer(null);
    setShowTransferView(false);
  };

  return (
    <DashboardShell
      title="التحويلات المالية"
      subtitle="إدارة التحويلات المالية بين الخزائن والبنوك"
      searchValue={query}
      onSearchChange={setQuery}
      searchPlaceholder="بحث في التحويلات المالية..."
      headerAction={
        <button
          type="button"
          onClick={() => setShowNewTransfer(true)}
          className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white shadow-(--dash-primary-soft)"
        >
          إضافة تحويل +
        </button>
      }
    >
      <section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-3xl border border-(--dash-border) bg-(--dash-panel-soft) p-4 shadow-(--dash-shadow)"
            >
              <div>
                <p className="text-sm text-(--dash-muted)">{item.label}</p>
                <p className={`mt-2 text-2xl font-semibold ${item.tone}`}>{item.value}</p>
              </div>
              <span className={`rounded-2xl bg-(--dash-panel-glass) p-3 ${item.tone}`}>{item.icon}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs text-(--dash-muted)"
              >
                تصفية
              </button>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs text-(--dash-text)"
              >
                <option value="كل الحالات">كل الحالات</option>
                <option value="مكتمل">مكتمل</option>
                <option value="قيد المعالجة">قيد المعالجة</option>
              </select>
            </div>
            <span className="text-xs text-(--dash-muted)">عرض التحويلات</span>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-(--dash-border)">
            <div className="grid min-w-[980px] grid-cols-9 gap-4 border-b border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-xs font-semibold text-(--dash-muted)">
              <span className="text-right">التاريخ</span>
              <span className="text-right">من</span>
              <span className="text-right">إلى</span>
              <span className="text-right">المبلغ</span>
              <span className="text-right">الرسوم</span>
              <span className="text-right">الصافي</span>
              <span className="text-right">الوصف</span>
              <span className="text-right">الحالة</span>
              <span className="text-right">الإجراءات</span>
            </div>
            {filteredTransfers.map((item) => (
              <div
                key={item.id}
                className="grid min-w-[980px] grid-cols-9 gap-4 border-b border-(--dash-border) px-4 py-3 text-sm text-(--dash-text) last:border-b-0"
              >
                <span>
                  <span className="block">{item.date}</span>
                  <span className="text-xs text-(--dash-muted)">{item.time}</span>
                </span>
                <span>{item.from}</span>
                <span>{item.to}</span>
                <span className="font-semibold text-(--dash-text)">{formatCurrency(item.amount, "SAR")}</span>
                <span className={item.fees ? "text-(--dash-danger)" : "text-(--dash-muted)"}>
                  {item.fees ? formatCurrency(item.fees, "SAR") : "-"}
                </span>
                <span className="text-(--dash-success)">{formatCurrency(item.net, "SAR")}</span>
                <span>{item.description}</span>
                <span className="flex">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "مكتمل"
                        ? "bg-(--dash-success) text-white"
                        : "bg-(--dash-panel-glass) text-(--dash-muted)"
                    }`}
                  >
                    {item.status}
                  </span>
                </span>
                <div className="flex items-center gap-3 text-(--dash-muted)">
                  <button
                    type="button"
                    onClick={() => openTransferView(item)}
                    className="text-xs text-(--dash-primary) hover:underline"
                  >
                    عرض
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showTransferView && activeTransfer ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">تفاصيل التحويل</h3>
                <p className="text-xs text-(--dash-muted)">رقم التحويل: {activeTransfer.id}</p>
              </div>
              <button type="button" onClick={closeTransferView} className="text-sm text-(--dash-muted)">
                إغلاق
              </button>
            </div>
            <div className="mt-6 space-y-3 text-sm text-(--dash-muted)">
              <div className="flex items-center justify-between">
                <span>من</span>
                <span className="font-semibold text-(--dash-text)">{activeTransfer.from}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>إلى</span>
                <span className="font-semibold text-(--dash-text)">{activeTransfer.to}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>المبلغ</span>
                <span className="font-semibold text-(--dash-text)">{formatCurrency(activeTransfer.amount, "SAR")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>الرسوم</span>
                <span className="font-semibold text-(--dash-text)">
                  {activeTransfer.fees ? formatCurrency(activeTransfer.fees, "SAR") : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>الصافي</span>
                <span className="font-semibold text-(--dash-text)">{formatCurrency(activeTransfer.net, "SAR")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>الوصف</span>
                <span className="font-semibold text-(--dash-text)">{activeTransfer.description}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>الحالة</span>
                <span className="font-semibold text-(--dash-text)">{activeTransfer.status}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {showNewTransfer ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">إضافة تحويل جديد</h3>
                <p className="text-xs text-(--dash-muted)">أدخل بيانات التحويل بين الخزائن والبنوك</p>
              </div>
              <button
                type="button"
                onClick={() => setShowNewTransfer(false)}
                className="text-sm text-(--dash-muted)"
              >
                إغلاق
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs text-(--dash-muted)">من</label>
                <select
                  value={formData.from}
                  onChange={(event) => handleFormChange("from", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                >
                  <option value="">اختر المصدر</option>
                  <option value="الخزنة الرئيسية">الخزنة الرئيسية</option>
                  <option value="خزنة المبيعات اليومية">خزنة المبيعات اليومية</option>
                  <option value="خزنة المصروفات">خزنة المصروفات</option>
                  <option value="بنك الرياض - حساب جاري">بنك الرياض - حساب جاري</option>
                  <option value="البنك الأهلي - حساب ادخار">البنك الأهلي - حساب ادخار</option>
                </select>
              </div>
              <div className="flex justify-center">
                <span className="rounded-full border border-(--dash-border) bg-(--dash-panel-soft) p-2 text-(--dash-primary)">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M7 7h9l-1.5-1.5a1 1 0 1 1 1.4-1.4l3.2 3.2a1 1 0 0 1 0 1.4l-3.2 3.2a1 1 0 0 1-1.4-1.4L16 9H7a1 1 0 1 1 0-2Zm10 10H8l1.5 1.5a1 1 0 1 1-1.4 1.4l-3.2-3.2a1 1 0 0 1 0-1.4l3.2-3.2a1 1 0 0 1 1.4 1.4L8 15h9a1 1 0 1 1 0 2Z"
                    />
                  </svg>
                </span>
              </div>
              <div>
                <label className="text-xs text-(--dash-muted)">إلى</label>
                <select
                  value={formData.to}
                  onChange={(event) => handleFormChange("to", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                >
                  <option value="">اختر الوجهة</option>
                  <option value="الخزنة الرئيسية">الخزنة الرئيسية</option>
                  <option value="خزنة المبيعات اليومية">خزنة المبيعات اليومية</option>
                  <option value="خزنة المصروفات">خزنة المصروفات</option>
                  <option value="بنك الرياض - حساب جاري">بنك الرياض - حساب جاري</option>
                  <option value="البنك الأهلي - حساب ادخار">البنك الأهلي - حساب ادخار</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-(--dash-muted)">المبلغ</label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={formData.amount}
                  onChange={(event) => handleFormChange("amount", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-(--dash-muted)">الرسوم الإدارية (اختياري)</label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={formData.fees}
                  onChange={(event) => handleFormChange("fees", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-(--dash-muted)">الوصف</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(event) => handleFormChange("description", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-(--dash-muted)">رقم المرجع</label>
                <input
                  type="text"
                  value={formData.reference}
                  onChange={(event) => handleFormChange("reference", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewTransfer(false)}
                  className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-xs text-(--dash-muted)"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white shadow-(--dash-primary-soft)"
                >
                  حفظ التحويل
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
};

export default page;
