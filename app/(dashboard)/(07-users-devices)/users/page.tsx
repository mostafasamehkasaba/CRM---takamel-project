"use client";

import { useMemo, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import ConfirmModal from "@/app/(dashboard)/components/ConfirmModal";

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
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [users, setUsers] = useState(usersData);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [editingUser, setEditingUser] = useState<UserRow | null>(null);
  const [editForm, setEditForm] = useState<UserRow | null>(null);
  const [pendingDelete, setPendingDelete] = useState<UserRow | null>(null);

  const statusOptions = Object.keys(statusStyles) as UserStatus[];

  const openEditModal = (user: UserRow) => {
    setEditingUser(user);
    setEditForm({ ...user });
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setEditForm(null);
  };

  const handleEditChange = <K extends keyof UserRow>(field: K, value: UserRow[K]) => {
    setEditForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editForm) {
      return;
    }
    setUsers((prev) => prev.map((user) => (user.id === editForm.id ? editForm : user)));
    closeEditModal();
  };

  const handleDelete = (user: UserRow) => {
    setPendingDelete(user);
  };

  const confirmDelete = () => {
    if (!pendingDelete) {
      return;
    }
    setUsers((prev) => prev.filter((item) => item.id !== pendingDelete.id));
    if (editingUser?.id === pendingDelete.id) {
      closeEditModal();
    }
    setPendingDelete(null);
  };

  const filteredUsers = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return users;
    }
    return users.filter((user) =>
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
  }, [query, users]);

  const allSelected = filteredUsers.length > 0 && filteredUsers.every((user) => selectedUsers.includes(user.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedUsers((prev) => prev.filter((id) => !filteredUsers.some((user) => user.id === id)));
      return;
    }
    setSelectedUsers((prev) => {
      const next = new Set(prev);
      filteredUsers.forEach((user) => next.add(user.id));
      return Array.from(next);
    });
  };

  const toggleRow = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]));
  };

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
            <div className="ms-auto flex flex-wrap items-center gap-2">
              <div className="flex items-center rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("cards")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                    viewMode === "cards"
                      ? "bg-(--dash-primary) text-white"
                      : "text-(--dash-muted) hover:bg-(--dash-panel-glass)"
                  }`}
                  aria-pressed={viewMode === "cards"}
                  aria-label="عرض البطاقات"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                    viewMode === "table"
                      ? "bg-(--dash-primary) text-white"
                      : "text-(--dash-muted) hover:bg-(--dash-panel-glass)"
                  }`}
                  aria-pressed={viewMode === "table"}
                  aria-label="عرض الجدول"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path fill="currentColor" d="M4 6h16v2H4V6Zm0 6h16v2H4v-2Zm0 6h16v2H4v-2Z" />
                  </svg>
                </button>
              </div>
              <div className="flex min-w-60 items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
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
        </div>

        {viewMode === "table" ? (
        <div className="overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-primary) text-white">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="h-4 w-4 rounded border border-(--dash-border)"
                      aria-label="تحديد كل المستخدمين"
                    />
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
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleRow(user.id)}
                        className="h-4 w-4 rounded border border-(--dash-border)"
                        aria-label={`تحديد المستخدم ${user.firstName}`}
                      />
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
                        <button
                          type="button"
                          className="rounded-lg border border-(--dash-border) p-2 text-(--dash-muted)"
                          onClick={() => openEditModal(user)}
                          aria-label="تعديل المستخدم"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4">
                            <path
                              fill="currentColor"
                              d="M4 16.8V20h3.2l9.4-9.4-3.2-3.2L4 16.8zm15.7-9.5c.4-.4.4-1 0-1.4l-1.6-1.6c-.4-.4-1-.4-1.4 0l-1.3 1.3 3.2 3.2z"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-(--dash-border) p-2 text-rose-500"
                          onClick={() => handleDelete(user)}
                          aria-label="حذف المستخدم"
                        >
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
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="group relative overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4 shadow-(--dash-shadow) transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(0,0,0,0.2)]"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-(--dash-primary) via-emerald-400/60 to-transparent" />
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-xs text-(--dash-muted)">المستخدم</p>
                      <p className="text-base font-semibold text-(--dash-text)">{user.firstName} {user.lastName}</p>
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[user.status]}`}>
                        {user.status}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleRow(user.id)}
                      className="h-4 w-4 rounded border border-(--dash-border)"
                      aria-label={`تحديد المستخدم ${user.firstName}`}
                    />
                  </div>
                  <div className="mt-4 grid gap-2 text-xs text-(--dash-muted)">
                    <div className="flex items-center justify-between gap-3">
                      <span>الفرع</span>
                      <span className="text-(--dash-text)">{user.branch}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>البريد</span>
                      <span className="text-(--dash-text)">{user.email}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>المجموعة</span>
                      <span className="text-(--dash-text)">{user.group}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-(--dash-border) pt-3">
                    <span className="text-xs text-(--dash-muted)">إجراءات</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) p-2 text-(--dash-muted) transition hover:text-(--dash-text)"
                        onClick={() => openEditModal(user)}
                        aria-label="تعديل المستخدم"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4">
                          <path
                            fill="currentColor"
                            d="M4 16.8V20h3.2l9.4-9.4-3.2-3.2L4 16.8zm15.7-9.5c.4-.4.4-1 0-1.4l-1.6-1.6c-.4-.4-1-.4-1.4 0l-1.3 1.3 3.2 3.2z"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="rounded-xl border border-rose-200/60 bg-rose-50/60 p-2 text-rose-600 transition hover:bg-rose-100"
                        onClick={() => handleDelete(user)}
                        aria-label="حذف المستخدم"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4">
                          <path
                            fill="currentColor"
                            d="M6 7h12v2H6zm2 3h8l-1 10H9L8 10Zm3-6h2l1 2H10z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel) px-4 py-3 text-sm text-(--dash-muted)">
              <div className="flex items-center gap-2">
                <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">سابق</button>
                <span className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">1</span>
                <button type="button" className="rounded-lg border border-(--dash-border) px-2 py-1">التالي</button>
              </div>
              <span>عرض 1 إلى {filteredUsers.length} من {filteredUsers.length} سجلات</span>
            </div>
          </div>
        )}
      </section>

      <ConfirmModal
        open={Boolean(pendingDelete)}
        message="هل أنت متأكد من حذف المستخدم؟"
        confirmLabel="حذف"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      {editForm && (
        <div className="dash-modal">
          <div className="dash-modal-body max-w-xl p-6">
            <div className="flex items-center justify-between border-b border-(--dash-border) pb-3">
              <div>
                <h3 className="text-sm font-semibold text-(--dash-text)">تعديل المستخدم</h3>
                <p className="mt-1 text-xs text-(--dash-muted)">{editingUser?.id}</p>
              </div>
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-muted)"
              >
                إغلاق
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="dash-label">
                الاسم الأول
                <input
                  value={editForm.firstName}
                  onChange={(event) => handleEditChange("firstName", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                اللقب
                <input
                  value={editForm.lastName}
                  onChange={(event) => handleEditChange("lastName", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label sm:col-span-2">
                الفرع
                <input
                  value={editForm.branch}
                  onChange={(event) => handleEditChange("branch", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label sm:col-span-2">
                البريد الإلكتروني
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(event) => handleEditChange("email", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                الشركة
                <input
                  value={editForm.company}
                  onChange={(event) => handleEditChange("company", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                النقاط
                <input
                  type="number"
                  value={editForm.points}
                  onChange={(event) => handleEditChange("points", Number.parseInt(event.target.value || "0", 10))}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                المجموعة
                <input
                  value={editForm.group}
                  onChange={(event) => handleEditChange("group", event.target.value)}
                  className="dash-input mt-2"
                />
              </label>
              <label className="dash-label">
                الحالة
                <select
                  value={editForm.status}
                  onChange={(event) => handleEditChange("status", event.target.value as UserStatus)}
                  className="dash-select mt-2"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <div className="sm:col-span-2 mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-lg border border-(--dash-border) px-4 py-2 text-xs text-(--dash-muted)"
                >
                  إلغاء
                </button>
                <button type="submit" className="rounded-lg bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
                  حفظ التعديل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
};

export default Page;
