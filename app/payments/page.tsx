"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "../components/DashboardShell";

type Payment = {
  id: string;
  invoice: string;
  client: string;
  amount: number;
  method: string;
  wallet: string;
  status: "مكتملة" | "قيد المعالجة";
  date: string;
  reference: string;
};

const initialPayments: Payment[] = [
  {
    id: "RC-1102",
    invoice: "INV-001",
    client: "شركة النور للتجارة",
    amount: 15000,
    method: "تحويل بنكي",
    wallet: "البنك الأهلي",
    status: "مكتملة",
    date: "2026-01-15",
    reference: "TRX-123456",
  },
  {
    id: "RC-1103",
    invoice: "INV-005",
    client: "شركة الإبداع",
    amount: 5000,
    method: "نقدا",
    wallet: "الصندوق النقدي",
    status: "مكتملة",
    date: "2026-01-15",
    reference: "CASH-789",
  },
  {
    id: "RC-1104",
    invoice: "INV-002",
    client: "مؤسسة الأمل",
    amount: 8500,
    method: "شيك",
    wallet: "بنك الراجحي",
    status: "قيد المعالجة",
    date: "2026-01-14",
    reference: "CHK-456789",
  },
  {
    id: "RC-1105",
    invoice: "INV-003",
    client: "شركة المستقبل",
    amount: 12000,
    method: "بطاقة ائتمان",
    wallet: "نقاط البيع",
    status: "مكتملة",
    date: "2026-01-14",
    reference: "CC-987654",
  },
];

const statusStyles: Record<Payment["status"], string> = {
  مكتملة: "bg-emerald-100 text-emerald-700",
  "قيد المعالجة": "bg-amber-100 text-amber-700",
};

const statusLabels: Record<Payment["status"], string> = {
  مكتملة: "معتمد",
  "قيد المعالجة": "قيد المراجعة",
};

const formatCurrency = (value: number) => `${value.toLocaleString()} ريال`;

const page = () => {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [notice, setNotice] = useState<{ message: string; paymentId: string } | null>(null);
  const [form, setForm] = useState({
    invoice: "",
    client: "",
    amount: "",
    method: "تحويل بنكي",
    wallet: "",
    status: "مكتملة",
    date: "",
    reference: "",
  });

  useEffect(() => {
    const stored = window.localStorage.getItem("payments-data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setPayments(parsed);
        }
      } catch {
        // Ignore invalid stored data.
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("payments-data", JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    if (!notice) {
      return;
    }
    const timer = window.setTimeout(() => setNotice(null), 2500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const filteredPayments = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return payments.filter((item) => {
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      if (!matchesStatus) {
        return false;
      }
      if (!needle) {
        return true;
      }
      return [
        item.id,
        item.invoice,
        item.client,
        item.method,
        item.wallet,
        item.status,
        item.reference,
        item.date,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [payments, query, statusFilter]);

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddPayment = () => {
    const client = form.client.trim();
    const amount = Number.parseFloat(form.amount);
    if (!client || Number.isNaN(amount)) {
      return;
    }
    const nextPayment: Payment = {
      id: `RC-${String(1101 + payments.length).padStart(4, "0")}`,
      invoice: form.invoice.trim() || "INV-000",
      client,
      amount,
      method: form.method,
      wallet: form.wallet.trim() || "المحفظة الرئيسية",
      status: form.status as Payment["status"],
      date: form.date || new Date().toISOString().slice(0, 10),
      reference: form.reference.trim() || "REF-000",
    };
    setPayments((prev) => [nextPayment, ...prev]);
    setForm({
      invoice: "",
      client: "",
      amount: "",
      method: "تحويل بنكي",
      wallet: "",
      status: "مكتملة",
      date: "",
      reference: "",
    });
    setShowForm(false);
  };

  const handleViewPayment = (paymentId: string) => {
    const target = payments.find((item) => item.id === paymentId) ?? null;
    setSelectedPayment(target);
  };

  const handleNotifyPayment = (payment: Payment) => {
    setNotice({
      paymentId: payment.id,
      message: `تم إرسال إشعار سند قبض ${payment.id} إلى ${payment.client}.`,
    });
  };

  return (
    <DashboardShell
      title="سندات قبض نقدية"
      subtitle="عرض سندات القبض مع الحالة"
      exportData={{
        filename: "payments",
        headers: [
          "رقم السند",
          "رقم الفاتورة",
          "العميل",
          "المبلغ",
          "طريقة القبض",
          "المحفظة",
          "الحالة",
          "التاريخ",
          "المرجع",
        ],
        rows: payments.map((item) => [
          item.id,
          item.invoice,
          item.client,
          item.amount,
          item.method,
          item.wallet,
          statusLabels[item.status],
          item.date,
          item.reference,
        ]),
      }}
    >
      {notice ? (
        <div className="mb-6 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text)">
          <div className="flex items-center justify-between gap-3">
            <span>{notice.message}</span>
            <button
              type="button"
              onClick={() => setNotice(null)}
              className="rounded-lg border border-(--dash-border) px-3 py-1 text-xs text-(--dash-text)"
            >
              إغلاق
            </button>
          </div>
        </div>
      ) : null}

      {showForm ? (
        <section className="mb-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
          <h2 className="text-lg font-semibold">إضافة سند قبض جديد</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">اسم العميل</span>
              <input
                type="text"
                value={form.client}
                onChange={(event) => handleFormChange("client", event.target.value)}
                placeholder="اسم العميل"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">رقم الفاتورة</span>
              <input
                type="text"
                value={form.invoice}
                onChange={(event) => handleFormChange("invoice", event.target.value)}
                placeholder="INV-000"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">المبلغ</span>
              <input
                type="number"
                value={form.amount}
                onChange={(event) => handleFormChange("amount", event.target.value)}
                placeholder="0"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">طريقة القبض</span>
              <select
                value={form.method}
                onChange={(event) => handleFormChange("method", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
              >
                <option value="تحويل بنكي">تحويل بنكي</option>
                <option value="نقدا">نقدا</option>
                <option value="شيك">شيك</option>
                <option value="بطاقة ائتمان">بطاقة ائتمان</option>
              </select>
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">المحفظة</span>
              <input
                type="text"
                value={form.wallet}
                onChange={(event) => handleFormChange("wallet", event.target.value)}
                placeholder="المحفظة الرئيسية"
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
                <option value="مكتملة">مكتملة</option>
                <option value="قيد المعالجة">قيد المعالجة</option>
              </select>
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">التاريخ</span>
              <input
                type="date"
                value={form.date}
                onChange={(event) => handleFormChange("date", event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) focus:outline-none"
              />
            </label>
            <label className="text-sm text-(--dash-muted)">
              <span className="mb-2 block font-semibold text-(--dash-text)">المرجع</span>
              <input
                type="text"
                value={form.reference}
                onChange={(event) => handleFormChange("reference", event.target.value)}
                placeholder="REF-000"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
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
              onClick={handleAddPayment}
            >
              حفظ السند
            </button>
          </div>
        </section>
      ) : null}

      {selectedPayment ? (
        <section className="mb-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">تفاصيل السند {selectedPayment.id}</h2>
              <p className="mt-1 text-xs text-(--dash-muted)">
                العميل: {selectedPayment.client} - الفاتورة {selectedPayment.invoice}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedPayment(null)}
              className="rounded-xl border border-(--dash-border) px-4 py-2 text-sm text-(--dash-text)"
            >
              إغلاق
            </button>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) p-4 text-sm text-(--dash-muted)">
              <p className="font-semibold text-(--dash-text)">بيانات السند</p>
              <div className="mt-3 space-y-2">
                <p>المبلغ: {formatCurrency(selectedPayment.amount)}</p>
                <p>الحالة: {statusLabels[selectedPayment.status]}</p>
                <p>التاريخ: {selectedPayment.date}</p>
                <p>المرجع: {selectedPayment.reference}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) p-4 text-sm text-(--dash-muted)">
              <p className="font-semibold text-(--dash-text)">وسائل القبض</p>
              <div className="mt-3 space-y-2">
                <p>طريقة القبض: {selectedPayment.method}</p>
                <p>المحفظة: {selectedPayment.wallet}</p>
                <p>رقم الفاتورة: {selectedPayment.invoice}</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 shadow-(--dash-shadow)">
        <div className="relative overflow-hidden rounded-2xl bg-(--dash-primary) px-5 py-4 text-white">
          <div className="absolute inset-y-0 left-0 w-28 bg-(--dash-primary-soft)" />
          <div className="relative flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold">سندات قبض نقدية</h3>
            <span className="text-xs text-white/80">عرض سندات القبض مع الحالة.</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-2xl bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
            onClick={() => setShowForm(true)}
          >
            <span className="text-lg">+</span>
            سند قبض جديد
          </button>
          <div className="relative flex-1 min-w-[220px]">
            <svg viewBox="0 0 24 24" className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--dash-muted-2)">
              <path
                fill="currentColor"
                d="M15.5 14h-.8l-.3-.3a6.5 6.5 0 10-.7.7l.3.3v.8l4.5 4.5 1.3-1.3zM10.5 15a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"
              />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث عن سند قبض..."
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) py-2 pr-10 pl-4 text-sm text-(--dash-text) focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <div className="min-w-full overflow-hidden rounded-2xl border border-(--dash-border)">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-primary) text-white">
                <tr>
                  <th className="px-4 py-3 text-right font-semibold">رقم السند</th>
                  <th className="px-4 py-3 text-right font-semibold">العميل</th>
                  <th className="px-4 py-3 text-right font-semibold">المبلغ</th>
                  <th className="px-4 py-3 text-right font-semibold">التاريخ</th>
                  <th className="px-4 py-3 text-right font-semibold">الحالة</th>
                  <th className="px-4 py-3 text-right font-semibold">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-(--dash-border) text-(--dash-text) odd:bg-(--dash-panel) even:bg-(--dash-panel-soft)"
                  >
                    <td className="px-4 py-3 font-semibold">{row.id}</td>
                    <td className="px-4 py-3">{row.client}</td>
                    <td className="px-4 py-3">{formatCurrency(row.amount)}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[row.status]}`}
                      >
                        {statusLabels[row.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-xs">
                        <button
                          type="button"
                          className="rounded-lg border border-(--dash-border) px-3 py-1 text-(--dash-text) hover:bg-(--dash-panel-soft)"
                          onClick={() => handleViewPayment(row.id)}
                        >
                          عرض
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-(--dash-border) px-3 py-1 text-(--dash-text) hover:bg-(--dash-panel-soft)"
                          onClick={() => handleNotifyPayment(row)}
                        >
                          إشعار
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default page;

