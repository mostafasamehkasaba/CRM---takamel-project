"use client";

import { useMemo, useState } from "react";
import DashboardShell from "../components/DashboardShell";

type UserStatus = "نشط" | "غير نشط";

type UserRow = {
  id: string;
  firstName: string;
  lastName: string;
  branch: string;
  email: string;
  company: string;
  points: number;
  group: string;
  status: UserStatus;
};

const usersData: UserRow[] = [
  {
    id: "USR-001",
    firstName: "admin",
    lastName: ".",
    branch: "الكل",
    email: "ds@hotmail.com",
    company: "ds",
    points: 0,
    group: "owner",
    status: "نشط",
  },
  {
    id: "USR-002",
    firstName: "clothes",
    lastName: ".",
    branch: "مغسلة ملابس",
    email: "ff.cok@25",
    company: "tt",
    points: 0,
    group: "sales",
    status: "نشط",
  },
  {
    id: "USR-003",
    firstName: "جوزات",
    lastName: ".",
    branch: "نشاط الصالون",
    email: "tt.cim@65",
    company: "55",
    points: 0,
    group: "sales",
    status: "نشط",
  },
  {
    id: "USR-004",
    firstName: "car",
    lastName: "car",
    branch: "مغسلة سيارات",
    email: "mtawssss12b@gmail.com",
    company: "Tkamul",
    points: 0,
    group: "eeee",
    status: "نشط",
  },
  {
    id: "USR-005",
    firstName: "cofe",
    lastName: "cofe",
    branch: "نشاط الكوفي / الدوبلاينه",
    email: "mmmmmm11m@gmail.com",
    company: "Tkamul1",
    points: 0,
    group: "sales",
    status: "نشط",
  },
  {
    id: "USR-006",
    firstName: "market",
    lastName: "market",
    branch: "نشاط سوبرماركت",
    email: "mtaffik12b@gmail.com",
    company: "Tkamul",
    points: 0,
    group: "sales",
    status: "نشط",
  },
  {
    id: "USR-007",
    firstName: "rest",
    lastName: "rest",
    branch: "نشاط المطاعم",
    email: "mmmmmmmg@gmail.com",
    company: "Tkamul",
    points: 0,
    group: "sales",
    status: "نشط",
  },
  {
    id: "USR-008",
    firstName: "salon",
    lastName: "salon",
    branch: "نشاط الصالون",
    email: "info11@posit2030.com",
    company: "salon",
    points: 0,
    group: "sales",
    status: "نشط",
  },
];

const statusStyles: Record<UserStatus, string> = {
  نشط: "bg-(--dash-success) text-white",
  "غير نشط": "bg-(--dash-warning) text-white",
};

const Page = () => {
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return usersData;
    }
    return usersData.filter((user) =>
      [
        user.firstName,
        user.lastName,
        user.branch,
        user.email,
        user.company,
        user.group,
        user.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [query]);

  return (
    <DashboardShell title="المستخدمون" subtitle="البداية / المستخدمين" hideHeaderFilters>
      <section className="space-y-4">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-(--dash-text)">المستخدمين</span>
            <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs">
              ☰
            </button>
          </div>
          <p className="mt-3 text-sm text-(--dash-muted)">الرجاء استخدام الجدول أدناه للتنقل أو تصفية النتائج.</p>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-(--dash-muted)">
              <span>اظهار</span>
              <select className="rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-(--dash-text) focus:outline-none">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            <div className="ms-auto flex min-w-60 items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="بحث"
                className="w-full bg-transparent text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-primary) text-white">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">
                    <input type="checkbox" className="h-4 w-4 rounded border border-(--dash-border)" />
                  </th>
                  <th className="px-3 py-3 text-right font-semibold">الاسم الأول</th>
                  <th className="px-3 py-3 text-right font-semibold">اللقب</th>
                  <th className="px-3 py-3 text-right font-semibold">الفرع</th>
                  <th className="px-3 py-3 text-right font-semibold">عنوان البريد الإلكتروني</th>
                  <th className="px-3 py-3 text-right font-semibold">الشركة</th>
                  <th className="px-3 py-3 text-right font-semibold">إجمالي النقاط المكتسبة</th>
                  <th className="px-3 py-3 text-right font-semibold">مجموعة</th>
                  <th className="px-3 py-3 text-right font-semibold">الحالة</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t border-(--dash-border) text-(--dash-text)">
                    <td className="px-3 py-3">
                      <input type="checkbox" className="h-4 w-4 rounded border border-(--dash-border)" />
                    </td>
                    <td className="px-3 py-3">{user.firstName}</td>
                    <td className="px-3 py-3">{user.lastName}</td>
                    <td className="px-3 py-3">{user.branch}</td>
                    <td className="px-3 py-3">{user.email}</td>
                    <td className="px-3 py-3">{user.company}</td>
                    <td className="px-3 py-3">{user.points}</td>
                    <td className="px-3 py-3">{user.group}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[user.status]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button type="button" className="rounded-lg border border-(--dash-border) p-2 text-(--dash-muted)">
                          <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path
                              fill="currentColor"
                              d="M4 16.8V20h3.2l9.4-9.4-3.2-3.2L4 16.8zm15.7-9.5c.4-.4.4-1 0-1.4l-1.6-1.6c-.4-.4-1-.4-1.4 0l-1.3 1.3 3.2 3.2z"
                            />
                          </svg>
                        </button>
                        <button type="button" className="rounded-lg border border-(--dash-border) p-2 text-rose-500">
                          <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path
                              fill="currentColor"
                              d="M6 7h12v2H6zm2 3h8l-1 10H9L8 10Zm3-6h2l1 2H10z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-(--dash-border) text-(--dash-muted)">
                <tr>
                  <td className="px-3 py-3" />
                  <td className="px-3 py-3">[الاسم الأول]</td>
                  <td className="px-3 py-3">[اللقب]</td>
                  <td className="px-3 py-3">[الفرع]</td>
                  <td className="px-3 py-3">[عنوان البريد الإلكتروني]</td>
                  <td className="px-3 py-3">[الشركة]</td>
                  <td className="px-3 py-3">[إجمالي النقاط]</td>
                  <td className="px-3 py-3">[مجموعة]</td>
                  <td className="px-3 py-3">[الحالة]</td>
                  <td className="px-3 py-3">الإجراءات</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-(--dash-border) px-4 py-3 text-sm text-(--dash-muted)">
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">سابق</button>
              <span className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">1</span>
              <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">التالي</button>
            </div>
            <span>عرض 1 إلى {filteredUsers.length} من {filteredUsers.length} سجلات</span>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;
