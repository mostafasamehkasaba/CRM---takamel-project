"use client";

import { useMemo, useState } from "react";
import DashboardShell from "../components/DashboardShell";
import { useRouter } from "next/navigation";

type Wallet = {
  id: string;
  name: string;
  type: string;
  currency: string;
  balance: number;
  status: "نشط" | "معلق";
  accent: "primary" | "success" | "warning" | "info";
};

type WalletMovement = {
  id: string;
  date: string;
  time: string;
  title: string;
  amount: number;
  currency: string;
  type: "إيداع" | "سحب";
  reference: string;
};

const wallets: Wallet[] = [
  {
    id: "WAL-001",
    name: "محفظة التشغيل الرئيسية",
    type: "محفظة تشغيلية",
    currency: "SAR",
    balance: 250000,
    status: "نشط",
    accent: "primary",
  },
  {
    id: "WAL-002",
    name: "محفظة المبيعات اليومية",
    type: "محفظة تشغيلية",
    currency: "SAR",
    balance: 180000,
    status: "نشط",
    accent: "primary",
  },
  {
    id: "WAL-003",
    name: "محفظة الادخار",
    type: "محفظة توفير",
    currency: "SAR",
    balance: 85000,
    status: "نشط",
    accent: "success",
  },
  {
    id: "WAL-004",
    name: "محفظة الدولار",
    type: "محفظة تشغيلية",
    currency: "USD",
    balance: 15000,
    status: "نشط",
    accent: "info",
  },
  {
    id: "WAL-005",
    name: "محفظة الطوارئ",
    type: "محفظة طوارئ",
    currency: "SAR",
    balance: 45000,
    status: "نشط",
    accent: "warning",
  },
];

const movements: WalletMovement[] = [
  {
    id: "MOV-901",
    date: "2026-01-16",
    time: "10:30",
    title: "إيداع من المبيعات",
    amount: 15000,
    currency: "SAR",
    type: "إيداع",
    reference: "INV-101",
  },
  {
    id: "MOV-902",
    date: "2026-01-15",
    time: "14:00",
    title: "دفع فاتورة كهرباء",
    amount: 1500,
    currency: "SAR",
    type: "سحب",
    reference: "EXP-001",
  },
  {
    id: "MOV-903",
    date: "2026-01-13",
    time: "16:00",
    title: "مستلزمات مكتبية",
    amount: 850,
    currency: "SAR",
    type: "سحب",
    reference: "EXP-004",
  },
  {
    id: "MOV-904",
    date: "2026-01-12",
    time: "12:20",
    title: "تحويل من عميل",
    amount: 25000,
    currency: "SAR",
    type: "إيداع",
    reference: "PAY-301",
  },
  {
    id: "MOV-905",
    date: "2026-01-14",
    time: "11:45",
    title: "صيانة معدات",
    amount: 3200,
    currency: "SAR",
    type: "سحب",
    reference: "EXP-002",
  },
];

const formatCurrency = (value: number, currency: string) =>
  `${value.toLocaleString("en-US", { maximumFractionDigits: 2 })} ${currency}`;

const page = () => {
  const router = useRouter();
  const [walletsData, setWalletsData] = useState<Wallet[]>(wallets);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("كل الأنواع");
  const [statusFilter, setStatusFilter] = useState("كل الحالات");
  const [navigationTarget, setNavigationTarget] = useState("wallets");
  const [showNewWallet, setShowNewWallet] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    type: string;
    currency: string;
    balance: string;
    status: Wallet["status"];
  }>({
    name: "",
    type: "محفظة تشغيلية",
    currency: "SAR",
    balance: "0.00",
    status: "نشط",
  });

  const stats = useMemo(() => {
    const totalWallets = walletsData.length;
    const totalBalance = walletsData.reduce((sum, wallet) => sum + (wallet.currency === "SAR" ? wallet.balance : 0), 0);
    const deposits = movements.filter((item) => item.type === "إيداع").reduce((sum, item) => sum + item.amount, 0);
    const withdrawals = movements.filter((item) => item.type === "سحب").reduce((sum, item) => sum + item.amount, 0);
    return [
      {
        label: "عدد المحافظ",
        value: totalWallets.toString(),
        tone: "text-(--dash-primary)",
        iconTone: "bg-sky-500/15 text-sky-400",
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="currentColor"
              d="M4 6h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4Z"
            />
          </svg>
        ),
      },
      {
        label: "المصروفات",
        value: formatCurrency(withdrawals, "SAR"),
        tone: "text-(--dash-danger)",
        iconTone: "bg-rose-500/15 text-rose-400",
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path fill="currentColor" d="M7 7h10v2H7zm10 10H7v-2h10zm0-6H7v2h10z" />
          </svg>
        ),
      },
      {
        label: "الدخل",
        value: formatCurrency(deposits, "SAR"),
        tone: "text-(--dash-success)",
        iconTone: "bg-emerald-500/15 text-emerald-400",
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path fill="currentColor" d="M12 6l6 6-1.4 1.4L13 9.8V18h-2V9.8l-3.6 3.6L6 12z" />
          </svg>
        ),
      },
      {
        label: "إجمالي الرصيد",
        value: formatCurrency(totalBalance, "SAR"),
        tone: "text-(--dash-primary)",
        iconTone: "bg-indigo-500/15 text-indigo-400",
        icon: (
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="currentColor"
              d="M5 6h12a3 3 0 0 1 3 3v8a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2Zm0 4h14V9a1 1 0 0 0-1-1H5v2Z"
            />
          </svg>
        ),
      },
    ];
  }, [walletsData]);

  const filteredWallets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return walletsData.filter((wallet) => {
      const matchesType = typeFilter === "كل الأنواع" || wallet.type === typeFilter;
      const matchesStatus = statusFilter === "كل الحالات" || wallet.status === statusFilter;
      const matchesQuery = normalizedQuery
        ? [wallet.name, wallet.type, wallet.currency]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)
        : true;
      return matchesType && matchesStatus && matchesQuery;
    });
  }, [walletsData, query, typeFilter, statusFilter]);

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "status" ? (value as Wallet["status"]) : value,
    }));
  };

  const handleNavigationChange = (value: string) => {
    setNavigationTarget(value);
    if (value === "shifts") {
      router.push("/shifts");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name.trim()) {
      return;
    }
    const balanceValue = Number.parseFloat(formData.balance);
    const accent: Wallet["accent"] =
      formData.type === "محفظة توفير"
        ? "success"
        : formData.type === "محفظة طوارئ"
          ? "warning"
          : formData.currency === "USD"
            ? "info"
            : "primary";
    const newWallet: Wallet = {
      id: `WAL-${String(walletsData.length + 1).padStart(3, "0")}`,
      name: formData.name.trim(),
      type: formData.type,
      currency: formData.currency,
      balance: Number.isNaN(balanceValue) ? 0 : balanceValue,
      status: formData.status,
      accent,
    };
    setWalletsData((prev) => [newWallet, ...prev]);
    setShowNewWallet(false);
    setFormData({
      name: "",
      type: "محفظة تشغيلية",
      currency: "SAR",
      balance: "0.00",
      status: "نشط",
    });
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setShowNewWallet(false);
    }
  };

  const accentIcon = (accent: Wallet["accent"]) => {
    if (accent === "success") {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path fill="currentColor" d="M4 7h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4Z" />
        </svg>
      );
    }
    if (accent === "warning") {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path fill="currentColor" d="M4 6h16v12H4z" />
        </svg>
      );
    }
    if (accent === "info") {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path fill="currentColor" d="M5 6h14v12H5z" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path fill="currentColor" d="M6 7h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6Z" />
      </svg>
    );
  };

  const accentClasses: Record<Wallet["accent"], string> = {
    primary: "text-(--dash-primary) bg-(--dash-panel-soft)",
    success: "text-emerald-600 bg-emerald-50",
    warning: "text-amber-600 bg-amber-50",
    info: "text-sky-600 bg-sky-50",
  };

  return (
    <DashboardShell
      title="المحافظ المالية"
      subtitle="إدارة المحافظ المالية والحسابات"
      searchValue={query}
      onSearchChange={setQuery}
      searchPlaceholder="بحث في المحافظ..."
      headerAction={
        <button
          type="button"
          onClick={() => setShowNewWallet(true)}
          className="rounded-2xl bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
        >
          محفظة جديدة +
        </button>
      }
    >
      <section className="mt-2">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between rounded-3xl border border-(--dash-border) bg-(--dash-panel-soft) p-4 shadow-(--dash-shadow)"
            >
              <div className="text-right">
                <p className="text-xs text-(--dash-muted)">{stat.label}</p>
                <p className={`mt-2 text-xl font-semibold ${stat.tone}`}>{stat.value}</p>
              </div>
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${stat.iconTone}`}>
                {stat.icon}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-(--dash-border) bg-(--dash-panel-soft) p-4 shadow-(--dash-shadow)">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-sm text-(--dash-text)"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 16 7 11h3V4h4v7h3l-5 5Zm-7 4a2 2 0 0 1-2-2v-3h2v3h14v-3h2v3a2 2 0 0 1-2 2H5Z"
              />
            </svg>
            تصدير
          </button>
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-sm text-(--dash-text)"
          >
            <option>كل الأنواع</option>
            <option value="محفظة تشغيلية">محفظة تشغيلية</option>
            <option value="محفظة توفير">محفظة توفير</option>
            <option value="محفظة استثمارية">محفظة استثمارية</option>
            <option value="محفظة طوارئ">محفظة طوارئ</option>
          </select>
          <select
            value={navigationTarget}
            onChange={(event) => handleNavigationChange(event.target.value)}
            className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-2 text-sm text-(--dash-text)"
          >
            <option value="wallets">المحافظ المالية</option>
          </select>
          <div className="relative flex-1 min-w-[240px]">
            <svg viewBox="0 0 24 24" className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--dash-muted)">
              <path
                fill="currentColor"
                d="M15.5 14h-.8l-.3-.3a6.5 6.5 0 10-.7.7l.3.3v.8l4.5 4.5 1.3-1.3zM10.5 15a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"
              />
            </svg>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="بحث في المحفظة..."
              className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) py-2 pr-10 pl-4 text-sm text-(--dash-text) focus:border-(--dash-primary) focus:outline-none focus:ring-2 focus:ring-(--dash-primary-soft)"
            />
          </div>
        </div>
      </section>

      <section className="dash-card mb-6 mt-6">
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {filteredWallets.map((wallet) => (
            <div key={wallet.id} className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-(--dash-primary) px-2 py-1 text-[10px] font-semibold text-white">
                  {wallet.status}
                </span>
                <span className={`dash-icon ${accentClasses[wallet.accent]}`}>{accentIcon(wallet.accent)}</span>
              </div>
              <div className="mt-6 text-right">
                <h3 className="text-sm font-semibold text-(--dash-text)">{wallet.name}</h3>
                <p className="mt-1 text-xs text-(--dash-muted)">{wallet.type}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-(--dash-muted)">
                <span className="rounded-md border border-(--dash-border) px-2 py-1 text-[10px]">
                  {wallet.currency}
                </span>
                <div className="text-right">
                  <p className="text-[10px] text-(--dash-muted)">الرصيد الحالي</p>
                  <p className="text-sm font-semibold text-(--dash-text)">
                    {formatCurrency(wallet.balance, wallet.currency)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

            <section className="dash-card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-(--dash-text)">آخر الحركات</h3>
        </div>
        <div className="space-y-4">
          {movements.map((movement) => {
            const amountLabel = movement.currency === "SAR" ? "ريال" : movement.currency;
            const amountText = `${amountLabel} ${movement.amount.toLocaleString("en-US")}${
              movement.type === "إيداع" ? "+" : "-"
            }`;
            return (
              <div
                key={movement.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-(--dash-text)">{movement.title}</p>
                    <p className="mt-1 text-xs text-(--dash-muted)">
                      {movement.reference}
                      <span className="mx-2">•</span>
                      {movement.date}
                    </p>
                  </div>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      movement.type === "إيداع"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d={
                          movement.type === "إيداع"
                            ? "M12 5v12l4-4 1.4 1.4-6.4 6.4-6.4-6.4L6 13l4 4V5h2Z"
                            : "M12 19V7l-4 4-1.4-1.4 6.4-6.4 6.4 6.4L18 11l-4-4v12h-2Z"
                        }
                      />
                    </svg>
                  </span>
                </div>
                <div
                  className={`text-lg font-semibold ${
                    movement.type === "إيداع" ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  {amountText}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {showNewWallet && (
        <div className="dash-modal" onClick={handleOverlayClick}>
          <div className="dash-modal-body max-w-xl max-h-[85vh] overflow-auto p-6">
            <div className="flex items-center justify-between border-b border-(--dash-border) pb-3">
              <div>
                <h3 className="text-base font-semibold text-(--dash-text)">إضافة محفظة جديدة</h3>
                <p className="mt-1 text-xs text-(--dash-muted)">أدخل بيانات المحفظة الجديدة وإعدادات الرصيد.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowNewWallet(false)}
                className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-muted)"
              >
                إغلاق
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <label className="flex flex-col gap-2 text-sm text-(--dash-text)">
                <span className="text-xs text-(--dash-muted)">اسم المحفظة</span>
                <input
                  value={formData.name}
                  onChange={(event) => handleFormChange("name", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text) focus:border-(--dash-primary) focus:outline-none focus:ring-2 focus:ring-(--dash-primary-soft)"
                  placeholder="مثال: محفظة التشغيل الرئيسية"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-(--dash-text)">
                <span className="text-xs text-(--dash-muted)">النوع</span>
                <select
                  value={formData.type}
                  onChange={(event) => handleFormChange("type", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text) focus:border-(--dash-primary) focus:outline-none focus:ring-2 focus:ring-(--dash-primary-soft)"
                >
                  <option value="محفظة تشغيلية">محفظة تشغيلية</option>
                  <option value="محفظة ادخار">محفظة ادخار</option>
                  <option value="محفظة استثمارية">محفظة استثمارية</option>
                  <option value="محفظة نقدية">محفظة نقدية</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-(--dash-text)">
                <span className="text-xs text-(--dash-muted)">العملة</span>
                <select
                  value={formData.currency}
                  onChange={(event) => handleFormChange("currency", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text) focus:border-(--dash-primary) focus:outline-none focus:ring-2 focus:ring-(--dash-primary-soft)"
                >
                  <option value="SAR">ريال سعودي (SAR)</option>
                  <option value="USD">دولار أمريكي (USD)</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-(--dash-text)">
                <span className="text-xs text-(--dash-muted)">الرصيد الافتتاحي</span>
                <input
                  value={formData.balance}
                  onChange={(event) => handleFormChange("balance", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text) focus:border-(--dash-primary) focus:outline-none focus:ring-2 focus:ring-(--dash-primary-soft)"
                  placeholder="0.00"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-(--dash-text)">
                <span className="text-xs text-(--dash-muted)">الحالة</span>
                <select
                  value={formData.status}
                  onChange={(event) => handleFormChange("status", event.target.value)}
                  className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text) focus:border-(--dash-primary) focus:outline-none focus:ring-2 focus:ring-(--dash-primary-soft)"
                >
                  <option value="نشط">نشط</option>
                  <option value="معلق">معلق</option>
                </select>
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewWallet(false)}
                  className="rounded-lg border border-(--dash-border) px-4 py-2 text-xs text-(--dash-muted)"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
};

export default page;
