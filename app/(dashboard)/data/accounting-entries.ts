export type AccountingEntry = {
  id: string;
  voucher: string;
  date: string;
  branch: string;
  base: string;
  document: string;
  memo: string;
  debit: number;
  credit: number;
};

const baseEntries: AccountingEntry[] = [
  {
    id: "ENTRY-001",
    voucher: "628",
    date: "2026-01-25T01:54:51",
    branch: "مغسلة سيارات",
    base: "فاتورة مبيعات",
    document: "IPAY0429",
    memo: "مدفوعات بطاقات هدايا",
    debit: 30,
    credit: 30,
  },
  {
    id: "ENTRY-002",
    voucher: "627",
    date: "2026-01-25T01:54:51",
    branch: "مغسلة ملابس",
    base: "فاتورة مبيعات",
    document: "SALE/POS0410",
    memo: "فاتورة مبيعات",
    debit: 30,
    credit: 30,
  },
  {
    id: "ENTRY-003",
    voucher: "622",
    date: "2026-01-24T00:35:00",
    branch: "مغسلة سيارات",
    base: "مصروفات",
    document: "4",
    memo: "شراء مستلزمات",
    debit: 20000,
    credit: 20000,
  },
  {
    id: "ENTRY-004",
    voucher: "602",
    date: "2026-01-17T12:32:47",
    branch: "مغسلة سيارات",
    base: "مدفوعات فاتورة مبيعات",
    document: "IPAY0418",
    memo: "تحويل بنكي",
    debit: 60,
    credit: 60,
  },
  {
    id: "ENTRY-005",
    voucher: "601",
    date: "2026-01-17T12:32:47",
    branch: "مغسلة ملابس",
    base: "فاتورة مبيعات",
    document: "SALE/POS0399",
    memo: "تحصيل نقدي",
    debit: 60,
    credit: 60,
  },
  {
    id: "ENTRY-006",
    voucher: "600",
    date: "2026-01-17T12:31:14",
    branch: "مغسلة سيارات",
    base: "مدفوعات فاتورة مبيعات",
    document: "IPAY0417",
    memo: "بطاقات هدايا",
    debit: 100,
    credit: 100,
  },
  {
    id: "ENTRY-007",
    voucher: "599",
    date: "2026-01-17T12:31:14",
    branch: "مغسلة سيارات",
    base: "مدفوعات فاتورة مبيعات",
    document: "IPAY0416",
    memo: "تحصيل نقدي",
    debit: 30,
    credit: 30,
  },
  {
    id: "ENTRY-008",
    voucher: "598",
    date: "2026-01-17T12:31:14",
    branch: "مغسلة ملابس",
    base: "فاتورة مبيعات",
    document: "SALE/POS0398",
    memo: "تحصيل نقدي",
    debit: 130,
    credit: 130,
  },
];

export const accountingEntries = baseEntries;
