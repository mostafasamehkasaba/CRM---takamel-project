export type BranchRow = {
  code: string;
  name: string;
  priceGroup: string;
  phone: string;
  email: string;
  address: string;
};

export const BRANCHES_STORAGE_KEY = "branches-data";

export const defaultBranches: BranchRow[] = [
  {
    code: "001",
    name: "نشاط المطاعم",
    priceGroup: "عام",
    phone: "0500000000",
    email: "info@example.com",
    address: "الرياض - حي المروج",
  },
  {
    code: "003",
    name: "نشاط الصالون",
    priceGroup: "عام",
    phone: "0500000001",
    email: "salon@example.com",
    address: "الرياض - حي النرجس",
  },
  {
    code: "004",
    name: "نشاط الكوفي / الديوانية",
    priceGroup: "عام",
    phone: "0500000002",
    email: "coffee@example.com",
    address: "الرياض - حي الياسمين",
  },
  {
    code: "008",
    name: "مغسلة ملابس",
    priceGroup: "عام",
    phone: "0500000003",
    email: "laundry@example.com",
    address: "الرياض - حي الندى",
  },
  {
    code: "WH009",
    name: "مغسلة سيارات",
    priceGroup: "عام",
    phone: "0500000004",
    email: "cars@example.com",
    address: "الرياض - حي القادسية",
  },
];
