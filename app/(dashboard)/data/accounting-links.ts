export type AccountingLink = {
  id: string;
  branch: string;
  cashAccount: string;
  salesAccount: string;
  salesReturnAccount: string;
  purchasesAccount: string;
  purchasesReturnAccount: string;
  inventoryAccount: string;
  salesDiscount: string;
  purchasesDiscount: string;
  salesTax: string;
  purchasesTax: string;
  costOfGoodsSold: string;
  pointsOfSale: string;
  damageAccount: string;
  goldClosure: string;
};

export const linkOptions = [
  "صندوق رئيسي",
  "صندوق فرعي",
  "حساب مبيعات",
  "حساب مردود مبيعات",
  "حساب مشتريات",
  "حساب مردود مشتريات",
  "حساب مخزون",
  "حساب خصم المبيعات",
  "حساب خصم المشتريات",
  "حساب ضريبة المبيعات",
  "حساب ضريبة المشتريات",
  "حساب تكلفة الأصناف",
  "حساب نقاط البيع",
  "حساب التالف",
  "حساب إقفال الذهب",
];

export const initialAccountingLinks: AccountingLink[] = [
  {
    id: "LINK-001",
    branch: "مغسلة سيارات",
    cashAccount: "صندوق رئيسي",
    salesAccount: "حساب المبيعات",
    salesReturnAccount: "حساب مردود المبيعات",
    purchasesAccount: "حساب المشتريات",
    purchasesReturnAccount: "حساب مردود مشتريات",
    inventoryAccount: "حساب مخزون",
    salesDiscount: "حساب خصم المبيعات",
    purchasesDiscount: "حساب خصم المشتريات",
    salesTax: "حساب ضريبة المبيعات",
    purchasesTax: "حساب ضريبة المشتريات",
    costOfGoodsSold: "حساب تكلفة الأصناف",
    pointsOfSale: "حساب نقاط البيع",
    damageAccount: "حساب التالف",
    goldClosure: "حساب إقفال الذهب",
  },
  {
    id: "LINK-002",
    branch: "مغسلة ملابس",
    cashAccount: "صندوق فرعي",
    salesAccount: "حساب المبيعات",
    salesReturnAccount: "حساب مردود المبيعات",
    purchasesAccount: "حساب المشتريات",
    purchasesReturnAccount: "حساب مردود مشتريات",
    inventoryAccount: "حساب مخزون",
    salesDiscount: "حساب خصم المبيعات",
    purchasesDiscount: "حساب خصم المشتريات",
    salesTax: "حساب ضريبة المبيعات",
    purchasesTax: "حساب ضريبة المشتريات",
    costOfGoodsSold: "حساب تكلفة الأصناف",
    pointsOfSale: "حساب نقاط البيع",
    damageAccount: "حساب التالف",
    goldClosure: "حساب إقفال الذهب",
  },
];
