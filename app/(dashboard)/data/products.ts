export type ProductStatus = "متوفر" | "منخفض" | "نافد";

export type Product = {
  id: string;
  name: string;
  category: string;
  sku: string;
  supplier: string;
  status: ProductStatus;
  stock: number;
  price: number;
  imageTone: string;
  expiryDate?: string;
};

export const initialProducts: Product[] = [
  {
    id: "PROD-001",
    name: "لابتوب HP EliteBook",
    category: "الإلكترونيات",
    sku: "LAP-HP-001",
    supplier: "مورد المواد الإلكترونية",
    status: "منخفض",
    stock: 6,
    price: 3500,
    imageTone: "/images/لابتوب HP EliteBook.png",
  },
  {
    id: "PROD-002",
    name: "ماوس لاسلكي Logitech",
    category: "ملحقات",
    sku: "ACC-MS-045",
    supplier: "شركة التوريدات التقنية",
    status: "متوفر",
    stock: 45,
    price: 150,
    imageTone: "/images/Mouse.jpg",
  },
  {
    id: "PROD-003",
    name: "كيبورد ميكانيكي",
    category: "ملحقات",
    sku: "ACC-KB-120",
    supplier: "شركة التوريدات التقنية",
    status: "متوفر",
    stock: 22,
    price: 580,
    imageTone: "/images/keyboard.jpg",
  },
  {
    id: "PROD-004",
    name: "شاشة Dell 27",
    category: "الإلكترونيات",
    sku: "MON-DE-027",
    supplier: "مورد المواد الإلكترونية",
    status: "نافد",
    stock: 0,
    price: 1200,
    imageTone: "/images/شاشة Dell 27.jpg",
  },
];
