"use client";

import type { ReactElement, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowLeftRight,
  Banknote,
  Barcode,
  BarChart3,
  BookOpen,
  Boxes,
  Building2,
  ClipboardList,
  Coins,
  CreditCard,
  FileCheck2,
  FilePlus,
  FileText,
  FileUp,
  Gauge,
  Gift,
  LayoutDashboard,
  LayoutGrid,
  Layers,
  Link2,
  MapPin,
  Monitor,
  Package,
  Percent,
  Plus,
  Receipt,
  Ruler,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Store,
  Settings,
  Table2,
  Tag,
  Truck,
  User,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
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
  { label: "التصنيفات الرئيسية", href: "/products" },
  { label: "المخزون", href: "/inventory", badge: "3" },
  {
    label: "المشتريات",
    iconKey: "/purchases",
    children: [
      { label: "قائمة المشتريات", href: "/purchases" },
      { label: "إضافة عملية شراء", href: "/purchases/new" },
      { label: "إضافة شراء من ملف CSV", href: "/purchases/import-csv" },
      { label: "قائمة المصروفات", href: "/expenses" },
      { label: "إضافة المصروفات", href: "/expenses/new" },
    ],
  },
  { label: "المصروفات", href: "/expenses" },
  { label: "الخزنة والبنوك", href: "/wallets" },
  { label: "التقارير", href: "/reports" },
  { label: "المستخدمون", href: "/users" },
  { label: "سجل الأنشطة", href: "/activity-log" },
  { label: "خطط الاشتراك", href: "/subscription-plans" },
  { label: "الفروع", href: "/branches" },
  { label: "الإعدادات", href: "/settings" },
];

type SidebarLink = { label: string; href: string; badge?: string };
type SidebarGroup = { label: string; children: Array<SidebarLink | SidebarGroup>; iconKey?: string };
type SidebarItem = SidebarLink | SidebarGroup;

const iconPlus = <Plus className="h-5 w-5" aria-hidden="true" />;

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
  "/invoices/tax": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5Z"
      />
    </svg>
  ),
  "/invoices/tax-simplified": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5Z"
      />
    </svg>
  ),
  "/quotes": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5Z"
      />
    </svg>
  ),
  "/quotes/new": iconPlus,
  "/invoices/new": iconPlus,
  "/sales/new": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3a1 1 0 0 1 1 1v1h2a1 1 0 1 1 0 2h-2v2h2a1 1 0 1 1 0 2h-2v2h2a1 1 0 1 1 0 2h-2v1a1 1 0 1 1-2 0v-1H9a1 1 0 1 1 0-2h2v-2H9a1 1 0 1 1 0-2h2V9H9a1 1 0 1 1 0-2h2V4a1 1 0 0 1 1-1Z"
      />
    </svg>
  ),
  "/sales/new/tax-invoice": iconPlus,
  "/sales/new/simplified-tax-invoice": iconPlus,
  "/sales/new/import-csv": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42l2.3 2.3V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v2h12v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1Z"
      />
    </svg>
  ),
  "/gift-cards": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 6h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 3h18V8H3v1Zm3 5h5v2H6v-2Z"
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
  "/customers/new": iconPlus,
  "/suppliers": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 7h12v2H6V9Zm0 4h12v2H6v-2Z"
      />
    </svg>
  ),
  "/suppliers/new": iconPlus,
  "/products": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M3 7 12 2l9 5-9 5-9-5Zm2 6 7 4 7-4v7l-7 4-7-4v-7Z" />
    </svg>
  ),
  "/branches": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm2 4h5v4H6V8Zm7 0h5v4h-5V8ZM6 14h5v4H6v-4Zm7 0h5v4h-5v-4Z"
      />
    </svg>
  ),
  "/tables": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 6h16a2 2 0 0 1 2 2v2H2V8a2 2 0 0 1 2-2Zm-2 6h20v6a2 2 0 0 1-2 2h-2v-4h-4v4h-4v-4H6v4H4a2 2 0 0 1-2-2v-6Z"
      />
    </svg>
  ),
  "/agents-employees": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm6 8H6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4Z"
      />
    </svg>
  ),
  "/promotions": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 7a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v.6l5 2.9v5l-5 2.9V19a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7Zm4 2h6v2H7V9Zm0 4h5v2H7v-2Z"
      />
    </svg>
  ),
  "/regions": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2 3 5v6c0 5 4 9 9 11 5-2 9-6 9-11V5l-9-3Zm0 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
      />
    </svg>
  ),
  "/delivery-companies": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 7h11v6h2V9h3l2 3v3h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H3V7Zm5 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
      />
    </svg>
  ),
  "/item-display": (
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
  "/purchases/new": iconPlus,
  "/purchases/import-csv": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42l2.3 2.3V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v2h12v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1Z"
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
  "/expenses/new": iconPlus,
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
  "/users/new": iconPlus,
  "/devices/reports": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-6v2h3a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2h3v-2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v10h16V6H4Z"
      />
    </svg>
  ),
  "/devices/new": iconPlus,
  "/profile": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2c-4.97 0-9 2.52-9 5.5V21h18v-1.5c0-2.98-4.03-5.5-9-5.5Z"
      />
    </svg>
  ),
  "/profile/activity": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="currentColor" d="M4 13h5l2-5 4 10 2-5h3v2h-2l-3 7-4-10-2 5H4v-4h2v2Z" />
    </svg>
  ),
  "/profile/notifications": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a6 6 0 0 1 6 6v3.2l1.6 2.4a1 1 0 0 1-.84 1.44H5.24a1 1 0 0 1-.84-1.44L6 11.2V8a6 6 0 0 1 6-6Zm0 20a2.5 2.5 0 0 0 2.4-1.8h-4.8A2.5 2.5 0 0 0 12 22Z"
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
  "/banks/new": iconPlus,
  "/banks/external-transfers": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 7h9l-1.5-1.5a1 1 0 1 1 1.4-1.4l3.2 3.2a1 1 0 0 1 0 1.4l-3.2 3.2a1 1 0 0 1-1.4-1.4L16 9H7a1 1 0 1 1 0-2Zm10 10H8l1.5 1.5a1 1 0 1 1-1.4 1.4l-3.2-3.2a1 1 0 0 1 0-1.4l3.2-3.2a1 1 0 0 1 1.4 1.4L8 15h9a1 1 0 1 1 0 2Z"
      />
    </svg>
  ),
  "/banks/external-transfers/new": iconPlus,
  "/banks/internal-transfers": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 7h9l-1.5-1.5a1 1 0 1 1 1.4-1.4l3.2 3.2a1 1 0 0 1 0 1.4l-3.2 3.2a1 1 0 0 1-1.4-1.4L16 9H7a1 1 0 1 1 0-2Zm10 10H8l1.5 1.5a1 1 0 1 1-1.4 1.4l-3.2-3.2a1 1 0 0 1 0-1.4l3.2-3.2a1 1 0 0 1 1.4 1.4L8 15h9a1 1 0 1 1 0 2Z"
      />
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
  "/accounts/tree": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 3h4v4H6V3Zm8 0h4v4h-4V3ZM4 10h16v2h-7v3h3v6h-8v-6h3v-3H4v-2Z"
      />
    </svg>
  ),
  "/accounts/new": iconPlus,
  "/accounts/links": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.5 12a3.5 3.5 0 0 1 3.5-3.5h3v2h-3a1.5 1.5 0 0 0 0 3h3v2h-3A3.5 3.5 0 0 1 7.5 12Zm3.5 1.5h3a3.5 3.5 0 0 0 0-7h-3v2h3a1.5 1.5 0 0 1 0 3h-3v2Z"
      />
    </svg>
  ),
  "/accounts/links/new": iconPlus,
  "/accounts/entries": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 3h16v2H4V3Zm0 6h16v2H4V9Zm0 6h16v2H4v-2Zm0 4h10v2H4v-2Z"
      />
    </svg>
  ),
  "/accounts/entries/new-cash": iconPlus,
  "/accounts/opening-entry": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 4h16v3H4V4Zm0 5h16v11H4V9Zm4 2v7h2v-7H8Zm4 0v7h2v-7h-2Z"
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

const lucideIconMap: Record<string, ReactNode> = {
  "/dashboard": <LayoutDashboard className="h-5 w-5" aria-hidden="true" />,
  "/invoices": <FileText className="h-5 w-5" aria-hidden="true" />,
  "/invoices/tax": <FileText className="h-5 w-5" aria-hidden="true" />,
  "/invoices/tax-simplified": <FileText className="h-5 w-5" aria-hidden="true" />,
  "/quotes": <FileText className="h-5 w-5" aria-hidden="true" />,
  "/quotes/new": iconPlus,
  "/invoices/new": iconPlus,
  "/sales/new": <ShoppingCart className="h-5 w-5" aria-hidden="true" />,
  "/sales/new/tax-invoice": iconPlus,
  "/sales/new/simplified-tax-invoice": iconPlus,
  "/sales/new/import-csv": <FileUp className="h-5 w-5" aria-hidden="true" />,
  "/gift-cards": <Gift className="h-5 w-5" aria-hidden="true" />,
  "/payments": <CreditCard className="h-5 w-5" aria-hidden="true" />,
  "/payments/new": iconPlus,
  "/payments/expense": <Receipt className="h-5 w-5" aria-hidden="true" />,
  "/payments/expense/new": iconPlus,
  "/payments/deposit": <Wallet className="h-5 w-5" aria-hidden="true" />,
  "/payments/deposit/new": iconPlus,
  "/payments/withdraw": <Wallet className="h-5 w-5" aria-hidden="true" />,
  "/payments/withdraw/new": iconPlus,
  "/customers": <Users className="h-5 w-5" aria-hidden="true" />,
  "/customers/new": <UserPlus className="h-5 w-5" aria-hidden="true" />,
  "/suppliers": <Building2 className="h-5 w-5" aria-hidden="true" />,
  "/suppliers/new": iconPlus,
  "/products": <Boxes className="h-5 w-5" aria-hidden="true" />,
  "/item-display": <Monitor className="h-5 w-5" aria-hidden="true" />,
  "/inventory": <Package className="h-5 w-5" aria-hidden="true" />,
  "/purchases": <ShoppingBag className="h-5 w-5" aria-hidden="true" />,
  "/purchases/new": iconPlus,
  "/purchases/import-csv": <FileUp className="h-5 w-5" aria-hidden="true" />,
  "/expenses": <Receipt className="h-5 w-5" aria-hidden="true" />,
  "/expenses/new": iconPlus,
  "/wallets": <Wallet className="h-5 w-5" aria-hidden="true" />,
  "/reports": <BarChart3 className="h-5 w-5" aria-hidden="true" />,
  "/users": <Users className="h-5 w-5" aria-hidden="true" />,
  "/users/new": <UserPlus className="h-5 w-5" aria-hidden="true" />,
  "/devices/reports": <Smartphone className="h-5 w-5" aria-hidden="true" />,
  "/devices/new": iconPlus,
  "/profile": <User className="h-5 w-5" aria-hidden="true" />,
  "/profile/activity": <Activity className="h-5 w-5" aria-hidden="true" />,
  "/profile/notifications": <Activity className="h-5 w-5" aria-hidden="true" />,
  "/activity-log": <Activity className="h-5 w-5" aria-hidden="true" />,
  "/subscription-plans": <Percent className="h-5 w-5" aria-hidden="true" />,
  "/settings": <Settings className="h-5 w-5" aria-hidden="true" />,
  "/cash": <Banknote className="h-5 w-5" aria-hidden="true" />,
  "/banks": <Building2 className="h-5 w-5" aria-hidden="true" />,
  "/banks/new": iconPlus,
  "/banks/external-transfers": <ArrowLeftRight className="h-5 w-5" aria-hidden="true" />,
  "/banks/external-transfers/new": iconPlus,
  "/banks/internal-transfers": <ArrowLeftRight className="h-5 w-5" aria-hidden="true" />,
  "/financial-transfers": <ArrowLeftRight className="h-5 w-5" aria-hidden="true" />,
  "/accounts/tree": <BookOpen className="h-5 w-5" aria-hidden="true" />,
  "/accounts/new": iconPlus,
  "/accounts/links": <Link2 className="h-5 w-5" aria-hidden="true" />,
  "/accounts/links/new": iconPlus,
  "/accounts/entries": <ClipboardList className="h-5 w-5" aria-hidden="true" />,
  "/accounts/entries/new-cash": iconPlus,
  "/accounts/opening-entry": <FileCheck2 className="h-5 w-5" aria-hidden="true" />,
  "/movement-log": <Activity className="h-5 w-5" aria-hidden="true" />,
  "wallets-group": <Wallet className="h-5 w-5" aria-hidden="true" />,
  "/branches": <Store className="h-5 w-5" aria-hidden="true" />,
  "/tables": <Table2 className="h-5 w-5" aria-hidden="true" />,
  "/agents-employees": <Users className="h-5 w-5" aria-hidden="true" />,
  "/promotions": <Percent className="h-5 w-5" aria-hidden="true" />,
  "/regions": <MapPin className="h-5 w-5" aria-hidden="true" />,
  "/delivery-companies": <Truck className="h-5 w-5" aria-hidden="true" />,
  "/reports-group": <BarChart3 className="h-5 w-5" aria-hidden="true" />,
  "/products-group": <Boxes className="h-5 w-5" aria-hidden="true" />,
  "/sales-group": <ShoppingCart className="h-5 w-5" aria-hidden="true" />,
};

const getSidebarIcon = (key: string) => lucideIconMap[key] ?? lucideIconMap["/dashboard"];

const collectSidebarLinks = (items: SidebarItem[]): SidebarLink[] => {
  const links: SidebarLink[] = [];
  items.forEach((item) => {
    if ("href" in item) {
      links.push({ label: item.label, href: item.href, badge: item.badge });
      return;
    }
    item.children.forEach((child) => {
      if ("href" in child) {
        links.push({ label: child.label, href: child.href, badge: child.badge });
        return;
      }
      links.push(...collectSidebarLinks([child]));
    });
  });
  return links;
};

/* 
const legacySidebarNavigation: Array<SidebarLink | SidebarGroup> = [
  { label: "لوحة التحكم", href: "/dashboard" },
  { label: "الفواتير", href: "/invoices", badge: "5" },
  { label: "الدفعات", href: "/payments" },
  {
    label: "العملاء",
    iconKey: "/customers",
    children: [
      { label: "قائمة العملاء", href: "/customers" },
      { label: "إضافة العملاء", href: "/customers/new" },
    ],
  },
  {
    label: "الموردين",
    iconKey: "/suppliers",
    children: [
      { label: "قائمة الموردين", href: "/suppliers" },
      { label: "إضافة مورد", href: "/suppliers/new" },
    ],
  },
  { label: "التصنيفات الرئيسية", href: "/products" },
  { label: "المخزون", href: "/inventory", badge: "3" },
  {
    label: "المشتريات",
    iconKey: "/purchases",
    children: [
      { label: "قائمة المشتريات", href: "/purchases" },
      { label: "إضافة عملية شراء", href: "/purchases/new" },
      { label: "شراء ملف من CSV", href: "/purchases/import-csv" },
      { label: "قائمة المصروفات", href: "/expenses" },
      { label: "إضافة مصروفات", href: "/expenses/new" },
    ],
  },
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
  { label: "الفروع", href: "/branches" },
  { label: "الإعدادات", href: "/settings" },
];

*/
const sidebarNavigation: Array<SidebarItem> = [
  { label: "الرئيسية", href: "/dashboard" },
  { label: "التصنيفات الرئيسية", href: "/products" },
  {
    label: "الأصناف",
    iconKey: "/products",
    children: [
      { label: "عرض الصنف", href: "/item-display" },
      { label: "إضافة الصنف", href: "/items/new" },
    ],
  },
  {
    label: "المبيعات",
    iconKey: "/invoices",
    children: [
      { label: "جميع المبيعات", href: "/invoices", badge: "5" },
      { label: "فواتير ضريبية", href: "/invoices/tax" },
      { label: "فواتير ضريبية مبسطة", href: "/invoices/tax-simplified" },
      {
        label: "عملية بيع جديدة",
        iconKey: "/sales/new",
        children: [
          { label: "إضافة فاتورة بسيطة", href: "/sales/new/tax-invoice" },
          { label: "إضافة فاتورة ضريبية مبسطة", href: "/sales/new/simplified-tax-invoice" },
          { label: "إضافة بيع من ملف CSV", href: "/sales/new/import-csv" },
        ],
      },
      { label: "قائمة كروت الهدايا", href: "/gift-cards" },
    ],
  },
  {
    label: "عروض الأسعار",
    iconKey: "/quotes",
    children: [
      { label: "قائمة عروض الأسعار", href: "/quotes" },
      { label: "إضافة عرض سعر جديد", href: "/quotes/new" },
    ],
  },
  {
    label: "المشتريات",
    iconKey: "/purchases",
    children: [
      { label: "قائمة المشتريات", href: "/purchases" },
      { label: "إضافة عملية شراء", href: "/purchases/new" },
      { label: "إضافة شراء من ملف CSV", href: "/purchases/import-csv" },
      { label: "قائمة المصروفات", href: "/expenses" },
      { label: "إضافة المصروفات", href: "/expenses/new" },
    ],
  },
  {
    label: "المستخدمين والأجهزة",
    iconKey: "/users",
    children: [
      { label: "قائمة المستخدمين", href: "/users" },
      { label: "إضافة مستخدم", href: "/users/new" },
      { label: "أجهزة إصدار التقارير", href: "/devices/reports" },
      { label: "إضافة جهاز", href: "/devices/new" },
    ],
  },
  {
    label: "العملاء",
    iconKey: "/customers",
    children: [
      { label: "قائمة العملاء", href: "/customers" },
      { label: "إضافة العملاء", href: "/customers/new" },
    ],
  },
  {
    label: "الموردين",
    iconKey: "/suppliers",
    children: [
      { label: "قائمة الموردين", href: "/suppliers" },
      { label: "إضافة مورد", href: "/suppliers/new" },
    ],
  },
  {
    label: "البنوك",
    iconKey: "/banks",
    children: [
      { label: "قائمة البنوك", href: "/banks" },
      { label: "إضافة بنك", href: "/banks/new" },
      { label: "تحويلات بنكية خارجية", href: "/banks/external-transfers" },
      { label: "إضافة تحويل بنكي خارجي", href: "/banks/external-transfers/new" },
      { label: "تحويلات بنكية داخلية", href: "/banks/internal-transfers" },
    ],
  },
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
  {
    label: "الحسابات العامة",
    iconKey: "/wallets",
    children: [
      { label: "الشجرة المحاسبية", href: "/accounts/tree" },
      { label: "إضافة حساب", href: "/accounts/new" },
      { label: "الروابط المحاسبية", href: "/accounts/links" },
      { label: "إضافة روابط محاسبية", href: "/accounts/links/new" },
      { label: "القيود المحاسبية", href: "/accounts/entries" },
      { label: "إضافة سند قيد يدوي", href: "/accounts/entries/new-cash" },
      { label: "القيد الافتتاحي", href: "/accounts/opening-entry" },
    ],
  },
      { label: "التقارير", href: "/reports" },
    { label: "الفروع", href: "/branches" },
    { label: "الطاولات", href: "/tables" },
    { label: "المندوبين والموظفين", href: "/agents-employees" },
    { label: "العروض الترويجية", href: "/promotions" },
    { label: "المناطق", href: "/regions" },
    { label: "شركات التوصيل", href: "/delivery-companies" },
    {
      label: "المزيد",
      iconKey: "/reports",
      children: [
        { label: "إضافة فاتورة", href: "/invoices/new" },
        { label: "المخزون", href: "/inventory", badge: "3" },
        { label: "سجل النشاط", href: "/activity-log" },
        { label: "خطط الاشتراك", href: "/subscription-plans" },
        { label: "الإعدادات", href: "/settings" },
        { label: "الملف الشخصي", href: "/profile" },
        { label: "سجل النشاط الشخصي", href: "/profile/activity" },
        { label: "إعدادات الإشعارات", href: "/profile/notifications" },
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
  hidePageHeader?: boolean;
  hideTopSearch?: boolean;
  topSearchLabel?: string;
  layout?: "default" | "compact" | "fullscreen";
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
  hidePageHeader,
  hideTopSearch,
  topSearchLabel,
  layout = "default",
  searchValue,
  searchPlaceholder,
  onSearchChange,
}: DashboardShellProps) => {
  const pathname = usePathname();
  const isCompact = layout === "compact";
  const isFullscreen = layout === "fullscreen";
  const mainPadding = isFullscreen ? "pb-4 pt-4" : isCompact ? "pb-8 pt-6" : "pb-16 pt-10";
  const headerGap = isFullscreen ? "gap-2" : isCompact ? "gap-3" : "gap-4";
  const controlPadding = isFullscreen ? "px-3 py-1" : isCompact ? "px-3 py-1.5" : "px-4 py-2";
  const quickActionPadding = isFullscreen ? "px-4 py-1" : isCompact ? "px-4 py-1.5" : "px-5 py-2";
  const iconButtonSize = isFullscreen ? "h-8 w-8" : isCompact ? "h-9 w-9" : "h-10 w-10";
  const titleSize = isFullscreen ? "text-xl" : isCompact ? "text-2xl" : "text-3xl";
  const sectionMargin = isFullscreen ? "mt-2" : isCompact ? "mt-2" : "mt-10";
  const contentMargin = isFullscreen ? "mt-2" : isCompact ? "mt-2" : "mt-6";
  const subtitleMargin = isFullscreen || isCompact ? "mt-1" : "mt-2";
  const subtitleSize = isFullscreen || isCompact ? "text-xs" : "text-sm";
  const [selectedFilter, setSelectedFilter] = useState("هذا الشهر");
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
    const [toast, setToast] = useState<{ message: string; tone: "success" | "info" | "warning" } | null>(null);
    const [globalSearch, setGlobalSearch] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);
    const filterRef = useRef<HTMLDetailsElement | null>(null);
    const exportRef = useRef<HTMLDetailsElement | null>(null);
    const notificationsRef = useRef<HTMLDetailsElement | null>(null);
    const quickActionsRef = useRef<HTMLDivElement | null>(null);
    const profileMenuRef = useRef<HTMLDivElement | null>(null);
    const searchRef = useRef<HTMLDivElement | null>(null);

    const isExternalSearch = Boolean(onSearchChange);
    const currentSearchValue = isExternalSearch ? searchValue ?? "" : globalSearch;
    const searchableLinks = useMemo(() => collectSidebarLinks(sidebarNavigation), []);
    const searchResults = useMemo(() => {
      const needle = currentSearchValue.trim().toLowerCase();
      if (!needle || isExternalSearch) {
        return [];
      }
      return searchableLinks
        .filter((item: SidebarLink) => `${item.label} ${item.href}`.toLowerCase().includes(needle))
        .slice(0, 8);
    }, [currentSearchValue, searchableLinks, isExternalSearch]);

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
      if (!showSearchResults) {
        return;
      }
      const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
          setShowSearchResults(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showSearchResults]);

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

  const isSidebarGroup = (item: SidebarItem): item is SidebarGroup => "children" in item;

  const hasActiveChild = (items: SidebarItem[]): boolean =>
    items.some((child) => (isSidebarGroup(child) ? hasActiveChild(child.children) : child.href === pathname));

  const renderSidebarItems = (items: SidebarItem[], depth = 0): ReactElement[] =>
      items.map((item) => {
        if (isSidebarGroup(item)) {
          const isActive = hasActiveChild(item.children);
          const isNested = depth > 0;
          const hideLabels = isDesktopSidebarCollapsed && !isNested;
          return (
            <details
              key={item.label}
              open={isActive}
              className={`group rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 ${
                isNested ? "text-xs" : "text-sm"
              }`}
            >
              <summary
                className={`flex cursor-pointer list-none items-center rounded-lg px-2 py-2 transition ${
                  hideLabels ? "justify-center" : "justify-between"
                } ${isActive ? "text-(--dash-text)" : "text-(--dash-muted)"}`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`flex items-center justify-center rounded-lg ${
                      isNested ? "h-7 w-7" : "h-8 w-8"
                    } ${
                      isActive
                        ? "bg-(--dash-primary) text-white"
                        : "bg-(--dash-panel-glass) text-(--dash-muted-2)"
                    }`}
                  >
                    {getSidebarIcon(item.iconKey ?? "wallets-group")}
                  </span>
                  <span className={hideLabels ? "sr-only" : isNested ? "text-xs font-medium" : "font-medium"}>{item.label}</span>
                </span>
                {hideLabels ? null : (
                  <svg
                    viewBox="0 0 24 24"
                    className={`${isNested ? "h-3 w-3" : "h-4 w-4"} text-(--dash-muted-2) transition group-open:rotate-180`}
                    aria-hidden="true"
                  >
                    <path fill="currentColor" d="M7 10l5 5 5-5H7Z" />
                  </svg>
                )}
              </summary>
              <div className={`mt-2 space-y-2 pb-2 ${isNested ? "ps-3" : ""}`}>
                {renderSidebarItems(item.children, depth + 1)}
              </div>
            </details>
        );
      }

        const isActive = pathname === item.href;
        const isNested = depth > 0;
        const hideLabels = isDesktopSidebarCollapsed && !isNested;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`${
              isNested
                ? "flex items-center justify-between rounded-lg px-3 py-2 text-xs transition"
                : `flex w-full items-center rounded-xl px-4 py-3 transition ${
                    hideLabels ? "justify-center px-2" : "justify-between"
                  }`
            } ${
              isActive
                ? "bg-(--dash-primary) text-white shadow-(--dash-primary-soft)"
                : isNested
                ? "text-(--dash-muted) hover:bg-(--dash-panel-glass)"
                : "text-(--dash-muted) hover:bg-(--dash-panel-soft)"
            }`}
          >
            <span className="flex items-center gap-2">
              <span
                className={`flex items-center justify-center rounded-lg ${isNested ? "h-7 w-7" : "h-8 w-8"} ${
                  isActive ? "bg-white/15 text-white" : "bg-(--dash-panel-glass) text-(--dash-muted-2)"
                }`}
              >
                {getSidebarIcon(item.href)}
              </span>
              <span className={hideLabels ? "sr-only" : isNested ? "text-xs" : "font-medium"}>{item.label}</span>
            </span>
            {!hideLabels && item.badge ? (
              <span className="rounded-full bg-(--dash-danger) px-2 py-0.5 text-xs font-semibold text-white">
                {item.badge}
              </span>
            ) : null}
          </Link>
        );
      });

  const sidebarContent = (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) p-4">
          <div className={`flex w-full items-center ${isDesktopSidebarCollapsed ? "justify-center" : "gap-3"}`}>
            <Link
              href="/dashboard"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--dash-panel-glass) text-(--dash-primary)"
              aria-label="الانتقال إلى الرئيسية"
            >
              <LayoutGrid className="h-5 w-5" aria-hidden="true" />
            </Link>
            <div className={`text-sm ${isDesktopSidebarCollapsed ? "sr-only" : ""}`}>
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
        </div>

      <nav
        className={`dash-scroll mt-8 flex-1 space-y-3 overflow-y-auto pr-1 text-sm ${
          isDesktopSidebarCollapsed ? "items-center" : ""
        }`}
      >
        {renderSidebarItems(sidebarNavigation)}
      </nav>

      
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
        className={`fixed right-0 top-0 z-20 hidden h-full border-l border-(--dash-border) bg-(--dash-panel) backdrop-blur transition-all lg:block ${
          isDesktopSidebarCollapsed ? "lg:w-20 p-3" : "lg:w-72 p-6"
        }`}
      >
        {sidebarContent}
      </aside>

      <main
        className={`relative z-10 px-4 ${mainPadding} sm:px-6 lg:pl-12 ${isDesktopSidebarCollapsed ? "lg:pr-24" : "lg:pr-76"}`}
      >
        <header className={`flex flex-col ${headerGap}`}>
  {isFullscreen ? null : (
  <div className={`flex flex-wrap items-center ${hideTopSearch ? "gap-2 justify-between" : "gap-3 justify-between"}`}>
    {hideTopSearch ? (
      topSearchLabel ? (
        <div className="shrink-0 text-right text-lg font-semibold text-(--dash-text)">
          {topSearchLabel}
        </div>
      ) : null
    ) : (
      <div
        ref={searchRef}
        className={`relative flex w-full max-w-xl flex-1 items-center gap-3 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) ${controlPadding}`}
      >
      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        className={`flex ${iconButtonSize} items-center justify-center rounded-xl border border-(--dash-border) bg-(--dash-panel-glass) text-(--dash-muted) lg:hidden`}
        aria-label="فتح الشريط الجانبي"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path fill="currentColor" d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => setIsDesktopSidebarCollapsed((prev) => !prev)}
        className={`hidden ${iconButtonSize} items-center justify-center rounded-xl border border-(--dash-border) bg-(--dash-panel-glass) text-(--dash-muted) lg:flex`}
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
        value={currentSearchValue}
        onChange={(event) => {
          const nextValue = event.target.value;
          if (isExternalSearch && onSearchChange) {
            onSearchChange(nextValue);
            return;
          }
          setGlobalSearch(nextValue);
          setShowSearchResults(true);
        }}
        onFocus={() => {
          if (!isExternalSearch) {
            setShowSearchResults(true);
          }
        }}
        placeholder={searchPlaceholder ?? "بحث سريع عن العملاء، المنتجات، الفواتير..."}
        className="w-full bg-transparent text-sm text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
      />
      {!isExternalSearch && showSearchResults && currentSearchValue.trim() ? (
        <div className="absolute right-0 top-full z-30 mt-2 w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-2 text-sm shadow-(--dash-shadow)">
          {searchResults.length ? (
            searchResults.map((item: SidebarLink) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  setShowSearchResults(false);
                  setGlobalSearch("");
                }}
                className="flex items-center rounded-xl px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
              >
                <span>{item.label}</span>
              </Link>
            ))
          ) : (
            <div className="px-3 py-2 text-xs text-(--dash-muted)">لا توجد نتائج مطابقة.</div>
          )}
        </div>
      ) : null}
    </div>
    )}

    <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
      <div className="relative" ref={quickActionsRef}>
        <button
          type="button"
          onClick={() => {
            setShowQuickActions((prev) => !prev);
            showToast("تم فتح الإجراءات السريعة.", "info");
          }}
          className={`flex items-center gap-2 rounded-2xl bg-(--dash-primary) ${quickActionPadding} text-sm font-semibold text-white shadow-(--dash-primary-soft)`}
        >
          <span className="text-lg">+</span>
          إجراء جديد
        </button>
        {showQuickActions ? (
          <div className="absolute right-0 top-12 z-30 w-56 rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-2 text-sm shadow-(--dash-shadow)">
        <Link
          href="/sales/new/tax-invoice"
          onClick={() => {
            setShowQuickActions(false);
            showToast("تم فتح صفحة الفاتورة الضريبية لعملية البيع الجديدة", "success");
          }}
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-(--dash-muted-2)" aria-hidden="true">
            <path
              fill="currentColor"
              d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5Z"
            />
          </svg>
          فاتورة بسيطة
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
              href="/sales/new/simplified-tax-invoice"
              onClick={() => {
                setShowQuickActions(false);
                showToast("تم فتح نموذج الفاتورة الضريبية المبسطة لعملية البيع الجديدة", "success");
              }}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-(--dash-text) hover:bg-(--dash-panel-soft)"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-(--dash-muted-2)" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 3a1 1 0 1 1 1 1v8.6l2.3-2.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L11 12.6V4a1 1 0 0 1 1-1Z"
                />
              </svg>
              فاتورة ضريبية
            </Link>
            <Link
              href="/customers/new"
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
          className={`flex items-center gap-3 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) ${controlPadding} text-right`}
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
  )}
</header>

        {hidePageHeader ? null : (
          <section className={sectionMargin}>
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <h1 className={`${titleSize} font-semibold`}>{title}</h1>
                {subtitle ? <p className={`${subtitleMargin} ${subtitleSize} text-(--dash-muted)`}>{subtitle}</p> : null}
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
        )}

        <div className={contentMargin}>{children}</div>
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
