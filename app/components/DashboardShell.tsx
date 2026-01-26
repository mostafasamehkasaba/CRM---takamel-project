"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as XLSX from "xlsx";
import ThemeToggle from "./ThemeToggle";

const sidebarItems = [
  { label: "لوحة التحكم", href: "/dashboard" },
  { label: "الفواتير", href: "/invoices", badge: "5" },
  { label: "الدفعات", href: "/payments" },
  { label: "العملاء", href: "/customers" },
  { label: "الموردين", href: "/suppliers" },
  { label: "المنتجات", href: "/products" },
  { label: "المخزون", href: "/inventory", badge: "3" },
  { label: "المشتريات", href: "/purchases" },
  { label: "المصروفات", href: "/expenses" },
  { label: "الخزنة والبنوك", href: "/wallets" },
  { label: "التقارير", href: "/reports" },
  { label: "المستخدمون", href: "/users" },
  { label: "سجل الأنشطة", href: "/activity-log" },
  { label: "خطط الاشتراك", href: "/subscription-plans" },
  { label: "الإعدادات", href: "/settings" },
];

type SidebarLink = { label: string; href: string; badge?: string };
type SidebarGroup = { label: string; children: SidebarLink[]; iconKey?: string };

const iconPlus = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 5a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 0 1 1-1Z"
    />
  </svg>
);

const sidebarIconMap: Record<string, ReactNode> = {
  "/dashboard": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
      />
    </svg>
  ),
  "/invoices": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5Z"
      />
    </svg>
  ),
  "/payments": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3a1 1 0 0 1 1 1v1h2a1 1 0 1 1 0 2h-2v2h2a1 1 0 1 1 0 2h-2v2h2a1 1 0 1 1 0 2h-2v1a1 1 0 1 1-2 0v-1H9a1 1 0 1 1 0-2h2v-2H9a1 1 0 1 1 0-2h2V9H9a1 1 0 1 1 0-2h2V4a1 1 0 0 1 1-1Z"
      />
    </svg>
  ),
  "/payments/new": iconPlus,
  "/payments/expense": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3a1 1 0 0 1 1 1v1h2a1 1 0 1 1 0 2h-2v2h2a1 1 0 1 1 0 2h-2v2h2a1 1 0 1 1 0 2h-2v1a1 1 0 1 1-2 0v-1H9a1 1 0 1 1 0-2h2v-2H9a1 1 0 1 1 0-2h2V9H9a1 1 0 1 1 0-2h2V4a1 1 0 0 1 1-1Z"
      />
    </svg>
  ),
  "/payments/expense/new": iconPlus,
  "/payments/deposit": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M12 3 2 8v2h20V8l-10-5Zm-8 9h2v7H4v-7Zm5 0h2v7H9v-7Zm5 0h2v7h-2v-7Zm5 0h2v7h-2v-7Z" />
    </svg>
  ),
  "/payments/deposit/new": iconPlus,
  "/payments/withdraw": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 7h9l-1.5-1.5a1 1 0 1 1 1.4-1.4l3.2 3.2a1 1 0 0 1 0 1.4l-3.2 3.2a1 1 0 0 1-1.4-1.4L16 9H7a1 1 0 1 1 0-2Zm10 10H8l1.5 1.5a1 1 0 1 1-1.4 1.4l-3.2-3.2a1 1 0 0 1 0-1.4l3.2-3.2a1 1 0 0 1 1.4 1.4L8 15h9a1 1 0 1 1 0 2Z"
      />
    </svg>
  ),
  "/payments/withdraw/new": iconPlus,
  "/customers": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
      />
    </svg>
  ),
  "/suppliers": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 7h12v2H6V9Zm0 4h12v2H6v-2Z"
      />
    </svg>
  ),
  "/products": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M3 7 12 2l9 5-9 5-9-5Zm2 6 7 4 7-4v7l-7 4-7-4v-7Z" />
    </svg>
  ),
  "/item-types": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M3 7 12 2l9 5-9 5-9-5Zm2 6 7 4 7-4v7l-7 4-7-4v-7Z" />
    </svg>
  ),
  "/item-names": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M3 7 12 2l9 5-9 5-9-5Zm2 6 7 4 7-4v7l-7 4-7-4v-7Z" />
    </svg>
  ),
  "/item-codes": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M3 7 12 2l9 5-9 5-9-5Zm2 6 7 4 7-4v7l-7 4-7-4v-7Z" />
    </svg>
  ),
  "/item-brands": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M3 7 12 2l9 5-9 5-9-5Zm2 6 7 4 7-4v7l-7 4-7-4v-7Z" />
    </svg>
  ),
  "/item-costs": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M3 7 12 2l9 5-9 5-9-5Zm2 6 7 4 7-4v7l-7 4-7-4v-7Z" />
    </svg>
  ),
  "/item-max-qty": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M3 7 12 2l9 5-9 5-9-5Zm2 6 7 4 7-4v7l-7 4-7-4v-7Z" />
    </svg>
  ),
  "/item-units": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M3 7 12 2l9 5-9 5-9-5Zm2 6 7 4 7-4v7l-7 4-7-4v-7Z" />
    </svg>
  ),
  "/inventory": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm2 4h12v2H6V8Zm0 4h12v2H6v-2Z"
      />
    </svg>
  ),
  "/purchases": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 6h15a1 1 0 0 1 .98 1.2l-1.5 7A1 1 0 0 1 19.5 15H8a1 1 0 0 1-.96-.72L4.4 4H2a1 1 0 0 1 0-2h3a1 1 0 0 1 .96.72L6.7 6ZM9 22a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm9 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
      />
    </svg>
  ),
  "/expenses": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3a1 1 0 0 1 1 1v1h2a1 1 0 1 1 0 2h-2v2h2a1 1 0 1 1 0 2h-2v2h2a1 1 0 1 1 0 2h-2v1a1 1 0 1 1-2 0v-1H9a1 1 0 1 1 0-2h2v-2H9a1 1 0 1 1 0-2h2V9H9a1 1 0 1 1 0-2h2V4a1 1 0 0 1 1-1Z"
      />
    </svg>
  ),
  "/wallets": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 6h12a3 3 0 0 1 3 3v8a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2Zm0 4h14V9a1 1 0 0 0-1-1H5v2Zm0 4h10a2 2 0 0 0 2-2v-1H5v3Z"
      />
    </svg>
  ),
  "/reports": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M5 3h2v18H5V3Zm6 6h2v12h-2V9Zm6-4h2v16h-2V5Z" />
    </svg>
  ),
  "/users": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm6 8H6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4Z"
      />
    </svg>
  ),
  "/activity-log": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M4 13h5l2-5 4 10 2-5h3v2h-2l-3 7-4-10-2 5H4v-4h2v2Z" />
    </svg>
  ),
  "/subscription-plans": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm2 3h6v2H6V9Zm0 4h4v2H6v-2Z"
      />
    </svg>
  ),
  "/settings": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm9 4-2 1 .3 2.2-2 1.2-1.7-1.4-2 .8-.3 2.2H10l-.3-2.2-2-.8-1.7 1.4-2-1.2L4 13l-2-1 2-1-.3-2.2 2-1.2 1.7 1.4 2-.8L10 6h2l.3 2.2 2 .8 1.7-1.4 2 1.2L19 11Z"
      />
    </svg>
  ),
  "/cash": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 7h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm8 2a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z"
      />
    </svg>
  ),
  "/banks": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M12 3 2 8v2h20V8l-10-5Zm-8 9h2v7H4v-7Zm5 0h2v7H9v-7Zm5 0h2v7h-2v-7Zm5 0h2v7h-2v-7Z" />
    </svg>
  ),
  "/financial-transfers": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 7h9l-1.5-1.5a1 1 0 1 1 1.4-1.4l3.2 3.2a1 1 0 0 1 0 1.4l-3.2 3.2a1 1 0 0 1-1.4-1.4L16 9H7a1 1 0 1 1 0-2Zm10 10H8l1.5 1.5a1 1 0 1 1-1.4 1.4l-3.2-3.2a1 1 0 0 1 0-1.4l3.2-3.2a1 1 0 0 1 1.4 1.4L8 15h9a1 1 0 1 1 0 2Z"
      />
    </svg>
  ),
  "/movement-log": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M4 13h5l2-5 4 10 2-5h3v2h-2l-3 7-4-10-2 5H4v-4h2v2Z" />
    </svg>
  ),
  "wallets-group": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 6h12a3 3 0 0 1 3 3v8a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2Zm0 4h14V9a1 1 0 0 0-1-1H5v2Zm0 4h10a2 2 0 0 0 2-2v-1H5v3Z"
      />
    </svg>
  ),
};

const getSidebarIcon = (key: string) => sidebarIconMap[key] ?? sidebarIconMap["/dashboard"];

/* 
const legacySidebarNavigation: Array<SidebarLink | SidebarGroup> = [
  { label: "لوحة التحكم", href: "/dashboard" },
  { label: "الفواتير", href: "/invoices", badge: "5" },
  { label: "الدفعات", href: "/payments" },
  { label: "العملاء", href: "/customers" },
  { label: "الموردين", href: "/suppliers" },
  { label: "المنتجات", href: "/products" },
  { label: "المخزون", href: "/inventory", badge: "3" },
  { label: "المشتريات", href: "/purchases" },
  { label: "المصروفات", href: "/expenses" },
  {
    label: "الخزنة والبنوك",
    children: [
      { label: "الخزنة", href: "/cash" },
      { label: "البنوك", href: "/banks" },
      { label: "التحويلات المالية", href: "/financial-transfers" },
      { label: "سجل الحركة", href: "/movement-log" },
    ],
  },
  { label: "المحفظة المالية", href: "/wallets" },
  { label: "التقارير", href: "/reports" },
  { label: "المستخدمون", href: "/users" },
  { label: "سجل الأنشطة", href: "/activity-log" },
  { label: "خطط الاشتراك", href: "/subscription-plans" },
  { label: "الإعدادات", href: "/settings" },
];

*/
const sidebarNavigation: Array<SidebarLink | SidebarGroup> = [
  { label: "الرئيسية", href: "/dashboard" },
  {
    label: "الأصناف",
    iconKey: "/products",
    children: [
      { label: "نوع الصنف", href: "/item-types" },
      { label: "اسم الصنف", href: "/item-names" },
      { label: "كود الصنف", href: "/item-codes" },
      { label: "الماركة", href: "/item-brands" },
      { label: "تكلفة الصنف", href: "/item-costs" },
      { label: "أقصى كمية للصنف", href: "/item-max-qty" },
      { label: "وحدة الصنف", href: "/item-units" },
    ],
  },
  { label: "الفواتير", href: "/invoices", badge: "5" },
  { label: "العملاء", href: "/customers" },
  { label: "المنتجات", href: "/products" },
  { label: "المشتريات", href: "/purchases" },
  { label: "الموردين", href: "/suppliers" },
  {
    label: "الحسابات",
    iconKey: "/wallets",
    children: [
      { label: "إدارة الورديات", href: "/shifts" },
      { label: "المحافظ المالية", href: "/wallets" },
    ],
  },
  { label: "التقرير", href: "/reports" },
  {
    label: "السندات",
    iconKey: "/payments",
    children: [
      { label: "سندات قبض نقدية", href: "/payments" },
      { label: "إضافة سند قبض نقدية", href: "/payments/new" },
      { label: "سندات صرف نقدية", href: "/payments/expense" },
      { label: "إضافة سند صرف نقدية", href: "/payments/expense/new" },
      { label: "سندات إيداع نقدية في البنك", href: "/payments/deposit" },
      { label: "إضافة سند إيداع نقدية في البنك", href: "/payments/deposit/new" },
      { label: "سحوبات نقدية من البنك", href: "/payments/withdraw" },
      { label: "إضافة سند سحب نقدية من البنك", href: "/payments/withdraw/new" },
    ],
  },
  { label: "الاعدادات", href: "/settings" },
  {
    label: "المزيد",
    iconKey: "/reports",
    children: [
      { label: "المخزون", href: "/inventory", badge: "3" },
      { label: "المصروفات", href: "/expenses" },
      { label: "الخزينة", href: "/cash" },
      { label: "التحويلات المالية", href: "/financial-transfers" },
      { label: "سجل الحركة", href: "/movement-log" },
      { label: "المستخدمين", href: "/users" },
      { label: "سجل النشاط", href: "/activity-log" },
      { label: "خطط الاشتراك", href: "/subscription-plans" },
    ],
  },
];

type DashboardShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  headerAction?: ReactNode;
  headerActionAlign?: "left" | "right";
  hideHeaderFilters?: boolean;
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  exportData?: {
    filename: string;
    headers: string[];
    rows: Array<Array<string | number>>;
  };
};

const timeFilters = ["اليوم", "هذا الأسبوع", "هذا الشهر", "هذا العام"];

const notifications = [
  {
    id: "stock",
    title: "تنبيه المخزون",
    description: "منتج XYZ - المخزون أقل من الحد الأدنى (5 وحدات متبقية)",
    time: "قبل 10 دقائق",
  },
  {
    id: "invoice",
    title: "فاتورة متأخرة",
    description: "فاتورة INV-004 لم يتم التحصيل حتى تاريخ 14 مارس",
    time: "قبل ساعة",
  },
  {
    id: "expiry",
    title: "قرب انتهاء الصلاحية",
    description: "منتج ABC قرب انتهاء الصلاحية خلال 7 أيام",
    time: "قبل يوم",
  },
];

const DashboardShell = ({
  title,
  subtitle,
  children,
  exportData,
  headerAction,
  headerActionAlign = "right",
  hideHeaderFilters,
  searchValue,
  searchPlaceholder,
  onSearchChange,
}: DashboardShellProps) => {
  const pathname = usePathname();
  const [selectedFilter, setSelectedFilter] = useState("هذا الشهر");
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [toast, setToast] = useState<{ message: string; tone: "success" | "info" | "warning" } | null>(null);
  const filterRef = useRef<HTMLDetailsElement | null>(null);
  const exportRef = useRef<HTMLDetailsElement | null>(null);
  const notificationsRef = useRef<HTMLDetailsElement | null>(null);
  const quickActionsRef = useRef<HTMLDivElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const showToast = (message: string, tone: "success" | "info" | "warning" = "info") => {
    setToast({ message, tone });
    window.setTimeout(() => setToast(null), 2500);
  };

  const handleFilterSelect = (value: string) => {
    setSelectedFilter(value);
    if (filterRef.current) {
      filterRef.current.open = false;
    }
  };

  const handleExportExcel = () => {
    if (!exportData) {
      if (exportRef.current) {
        exportRef.current.open = false;
      }
      return;
    }

    const { filename, headers, rows } = exportData;
    const sheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "Report");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
    if (exportRef.current) {
      exportRef.current.open = false;
    }
  };

  const handleExportPdf = () => {
    window.print();
    if (exportRef.current) {
      exportRef.current.open = false;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!showQuickActions || !quickActionsRef.current) {
        return;
      }
      if (!quickActionsRef.current.contains(event.target as Node)) {
        setShowQuickActions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showQuickActions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!showProfileMenu || !profileMenuRef.current) {
        return;
      }
      if (!profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileMenu]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--dash-panel-glass) text-(--dash-primary)">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                fill="currentColor"
                d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
              />
            </svg>
          </span>
          <div className="text-sm">
            <p className="font-semibold">تكامل البيانات</p>
            <p className="text-xs text-(--dash-muted)">نظام إدارة الأعمال</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-(--dash-border) bg-(--dash-panel-glass) text-(--dash-muted) lg:hidden"
          aria-label="إغلاق الشريط الجانبي"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path fill="currentColor" d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setIsDesktopSidebarCollapsed(true)}
          className="hidden h-9 w-9 items-center justify-center rounded-xl border border-(--dash-border) bg-(--dash-panel-glass) text-(--dash-muted) lg:flex"
          aria-label="إخفاء الشريط الجانبي"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path fill="currentColor" d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <nav className="dash-scroll mt-8 flex-1 space-y-3 overflow-y-auto pr-1 text-sm">
        {sidebarNavigation.map((item) => {
          const isGroup = "children" in item;
          const isActive = isGroup ? item.children.some((child) => child.href === pathname) : pathname === item.href;

          if (isGroup) {
            return (
              <details
                key={item.label}
                open={isActive}
                className="group rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              >
                <summary
                  className={`flex cursor-pointer list-none items-center justify-between rounded-lg px-2 py-2 transition ${
                    isActive ? "text-(--dash-text)" : "text-(--dash-muted)"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        isActive
                          ? "bg-(--dash-primary) text-white"
                          : "bg-(--dash-panel-glass) text-(--dash-muted-2)"
                      }`}
                    >
                      {getSidebarIcon(item.iconKey ?? "wallets-group")}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-(--dash-muted-2) transition group-open:rotate-180"
                    aria-hidden="true"
                  >
                    <path fill="currentColor" d="M7 10l5 5 5-5H7Z" />
                  </svg>
                </summary>
                <div className="mt-2 space-y-2 pb-2">
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href;
                    return (
                      <Link
                        key={child.label}
                        href={child.href}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs transition ${
                          isChildActive
                            ? "bg-(--dash-primary) text-white shadow-(--dash-primary-soft)"
                            : "text-(--dash-muted) hover:bg-(--dash-panel-glass)"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                              isChildActive
                                ? "bg-white/15 text-white"
                                : "bg-(--dash-panel-glass) text-(--dash-muted-2)"
                            }`}
                          >
                            {getSidebarIcon(child.href)}
                          </span>
                          <span>{child.label}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </details>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-(--dash-primary) text-white shadow-(--dash-primary-soft)"
                  : "text-(--dash-muted) hover:bg-(--dash-panel-soft)"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    isActive ? "bg-white/15 text-white" : "bg-(--dash-panel-glass) text-(--dash-muted-2)"
                  }`}
                >
                  {getSidebarIcon(item.href)}
                </span>
                <span className="font-medium">{item.label}</span>
              </span>
              {item.badge ? (
                <span className="rounded-full bg-(--dash-danger) px-2 py-0.5 text-xs font-semibold text-white">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        className="mt-8 flex w-full items-center justify-between rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-muted)"
      >
        <span>مركز المساعدة</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-(--dash-panel-glass) text-(--dash-text)">
          ?
        </span>
      </button>
    </div>
  );

  return (
    <div dir="rtl" className="min-h-screen bg-(--dash-bg) text-(--dash-text)">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 left-16 h-72 w-72 rounded-full bg-sky-500/15 dark:bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-10 right-28 h-80 w-80 rounded-full bg-indigo-500/15 dark:bg-indigo-500/20 blur-3xl" />
      </div>

      {isSidebarOpen ? (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed right-0 top-0 z-40 h-full w-72 border-l border-(--dash-border) bg-(--dash-panel) p-6 backdrop-blur transition-transform lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      <aside
        className={`fixed right-0 top-0 z-20 hidden h-full w-72 border-l border-(--dash-border) bg-(--dash-panel) p-6 backdrop-blur transition-transform lg:block ${
          isDesktopSidebarCollapsed ? "lg:translate-x-full" : "lg:translate-x-0"
        }`}
      >
        {sidebarContent}
      </aside>

      <main
        className={`relative z-10 px-4 pb-16 pt-10 sm:px-6 lg:pl-12 ${isDesktopSidebarCollapsed ? "lg:pr-6" : "lg:pr-76"}`}
      >
        <header className="flex flex-col gap-4">
  <div className="flex flex-wrap items-center justify-between gap-3">
    <div className="flex w-full max-w-xl flex-1 items-center gap-3 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2">
      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--dash-border) bg-(--dash-panel-glass) text-(--dash-muted) lg:hidden"
        aria-label="فتح الشريط الجانبي"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path fill="currentColor" d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => setIsDesktopSidebarCollapsed((prev) => !prev)}
        className="hidden h-10 w-10 items-center justify-center rounded-xl border border-(--dash-border) bg-(--dash-panel-glass) text-(--dash-muted) lg:flex"
        aria-label={isDesktopSidebarCollapsed ? "إظهار الشريط الجانبي" : "إخفاء الشريط الجانبي"}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          {isDesktopSidebarCollapsed ? (
            <path fill="currentColor" d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
          ) : (
            <path fill="currentColor" d="M9 6l6 6-6 6" />
          )}
        </svg>
      </button>
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-(--dash-muted-2)" aria-hidden="true">
        <path
          fill="currentColor"
          d="M10 2a8 8 0 1 0 5.29 14l4.7 4.7a1 1 0 0 0 1.42-1.4l-4.7-4.7A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
        />
      </svg>
      <input
        type="text"
        value={onSearchChange ? searchValue ?? "" : undefined}
        defaultValue={onSearchChange ? undefined : searchValue}
        onChange={onSearchChange ? (event) => onSearchChange(event.target.value) : undefined}
        readOnly={!onSearchChange}
        placeholder={searchPlaceholder ?? "بحث سريع عن العملاء، المنتجات، الفواتير..."}
        className="w-full bg-transparent text-sm text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
      />
    </div>

    <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
      <div className="relative" ref={quickActionsRef}>
        <button
          type="button"
          onClick={() => {
            setShowQuickActions((prev) => !prev);
            showToast("تم فتح الإجراءات السريعة.", "info");
          }}
          className="flex items-center gap-2 rounded-2xl bg-(--dash-primary) px-5 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
        >
          <span className="text-lg">+</span>
          إجراء جديد
        </button>
        {showQuickActions ? (
          <div className="absolute right-0 top-12 z-30 w-56 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-2 text-sm shadow-(--dash-shadow)">
        <Link
              href="/invoices/new"
              onClick={() => {
                setShowQuickActions(false);
                showToast("تم فتح نموذج فاتورة جديدة", "success");
              }}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-(--dash-muted-2)" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5Z"
                />
              </svg>
              فاتورة جديدة
            </Link>
            <Link
              href="/payments"
              onClick={() => setShowQuickActions(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-(--dash-muted-2)" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 3a1 1 0 0 1 1 1v1h2a1 1 0 1 1 0 2h-2v2h2a1 1 0 1 1 0 2h-2v2h2a1 1 0 1 1 0 2h-2v1a1 1 0 1 1-2 0v-1H9a1 1 0 1 1 0-2h2v-2H9a1 1 0 1 1 0-2h2V9H9a1 1 0 1 1 0-2h2V4a1 1 0 0 1 1-1Z"
                />
              </svg>
              دفعة جديدة
            </Link>
            <Link
              href="/products"
              onClick={() => setShowQuickActions(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-(--dash-muted-2)" aria-hidden="true">
                <path fill="currentColor" d="M3 7 12 2l9 5-9 5-9-5Zm2 6 7 4 7-4v7l-7 4-7-4v-7Z" />
              </svg>
              منتج جديد
            </Link>
            <Link
              href="/customers"
              onClick={() => setShowQuickActions(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-(--dash-muted-2)" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
                />
              </svg>
              عميل جديد
            </Link>
            <Link
              href="/expenses"
              onClick={() => setShowQuickActions(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-(--dash-muted-2)" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 3a1 1 0 0 1 1 1v1h2a1 1 0 1 1 0 2h-2v2h2a1 1 0 1 1 0 2h-2v2h2a1 1 0 1 1 0 2h-2v1a1 1 0 1 1-2 0v-1H9a1 1 0 1 1 0-2h2v-2H9a1 1 0 1 1 0-2h2V9H9a1 1 0 1 1 0-2h2V4a1 1 0 0 1 1-1Z"
                />
              </svg>
              مصروف جديد
            </Link>
          </div>
        ) : null}
      </div>

      <ThemeToggle />

      <div className="relative" ref={profileMenuRef}>
        <button
          type="button"
          onClick={() => setShowProfileMenu((prev) => !prev)}
          className="flex items-center gap-3 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-right"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--dash-primary) text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
              />
            </svg>
          </span>
          <div className="text-sm">
            <p className="font-semibold">أحمد محمد</p>
            <p className="text-xs text-(--dash-muted)">مدير النظام</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-(--dash-panel-glass)" />
        </button>
        {showProfileMenu ? (
          <div className="absolute right-0 top-12 z-30 w-48 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-2 text-sm shadow-(--dash-shadow)">
            <Link
              href="/profile"
              onClick={() => setShowProfileMenu(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-(--dash-panel-glass)">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
                  />
                </svg>
              </span>
              الملف الشخصي
            </Link>
            <button
              type="button"
              onClick={() => {
                setShowProfileMenu(false);
                showToast("تم تسجيل الخروج", "warning");
              }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-right text-rose-600 hover:bg-rose-50"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M5 4h9a2 2 0 0 1 2 2v3h-2V6H5v12h9v-3h2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm11.6 4.6 4 4a1 1 0 0 1 0 1.4l-4 4-1.4-1.4L17.8 14H9v-2h8.8l-2.6-2.6 1.4-1.4Z"
                  />
                </svg>
              </span>
              تسجيل الخروج
            </button>
          </div>
        ) : null}
      </div>
    </div>
  </div>
</header>

        <section className="mt-10">
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <h1 className="text-3xl font-semibold">{title}</h1>
              {subtitle ? <p className="mt-2 text-sm text-(--dash-muted)">{subtitle}</p> : null}
            </div>
            {hideHeaderFilters ? null : (
            <div className="ms-auto flex flex-wrap items-center gap-3">
              <details ref={filterRef} className="relative">
                <summary className="flex cursor-pointer list-none items-center gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text)">
                  {selectedFilter}
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-(--dash-muted-2)" aria-hidden="true">
                    <path fill="currentColor" d="M7 10l5 5 5-5H7Z" />
                  </svg>
                </summary>
                <div className="absolute right-0 top-12 z-20 w-44 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-2 text-sm shadow-(--dash-shadow)">
                  {timeFilters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleFilterSelect(item)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
                    >
                      <span>{item}</span>
                      {selectedFilter === item ? <span className="text-(--dash-primary)">✓</span> : null}
                    </button>
                  ))}
                </div>
              </details>
              <details ref={exportRef} className="relative">
                <summary className="flex cursor-pointer list-none items-center gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text)">
                  تصدير التقرير
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-(--dash-muted-2)" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V7h3.5L14 3.5Z"
                    />
                  </svg>
                </summary>
                <div className="absolute right-0 top-12 z-20 w-44 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-2 text-sm shadow-(--dash-shadow)">
                  <button
                    type="button"
                    onClick={handleExportExcel}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
                  >
                    <span>تصدير Excel</span>
                    <span className="text-(--dash-muted-2)">.xlsx</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleExportPdf}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
                  >
                    <span>تصدير PDF</span>
                    <span className="text-(--dash-muted-2)">PDF</span>
                  </button>
                </div>
              </details>
            </div>            )}

            {headerAction ? (
              <div
                className={`flex items-center gap-2 ${
                  headerActionAlign === "left" ? "ms-auto" : ""
                }`}
              >
                {headerAction}
              </div>
            ) : null}
          </div>
        </section>

        <div className="mt-6">{children}</div>
      </main>

      {toast ? (
        <div className="fixed bottom-6 left-6 z-50">
          <div
            className={`rounded-2xl border px-4 py-3 text-sm text-white shadow-lg ${
              toast.tone === "success"
                ? "border-(--dash-success) bg-(--dash-success)"
                : toast.tone === "warning"
                ? "border-(--dash-warning) bg-(--dash-warning)"
                : "border-(--dash-info) bg-(--dash-info)"
            }`}
          >
            {toast.message}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DashboardShell;
