"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import { BRANCHES_STORAGE_KEY, defaultBranches, type BranchRow } from "@/app/(dashboard)/data/branches";

const Page = () => {
  const [groupOptions, setGroupOptions] = useState(["owner", "sales", "manager"]);
  const [selectedGroup, setSelectedGroup] = useState(groupOptions[0]);
  const [showGroupInput, setShowGroupInput] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [branches, setBranches] = useState<BranchRow[]>(defaultBranches);
  const [selectedBranch, setSelectedBranch] = useState(defaultBranches[0]?.code ?? "");

  const handleAddGroup = () => {
    const name = newGroupName.trim();
    if (!name) {
      return;
    }
    setGroupOptions((prev) => (prev.includes(name) ? prev : [...prev, name]));
    setSelectedGroup(name);
    setNewGroupName("");
    setShowGroupInput(false);
  };

  useEffect(() => {
    const loadBranches = () => {
      const raw = window.localStorage.getItem(BRANCHES_STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as BranchRow[];
          if (Array.isArray(parsed)) {
            setBranches(parsed);
            setSelectedBranch((prev) => (parsed.some((branch) => branch.code === prev) ? prev : parsed[0]?.code ?? ""));
            return;
          }
        } catch (error) {
          console.error(error);
        }
      }
      window.localStorage.setItem(BRANCHES_STORAGE_KEY, JSON.stringify(defaultBranches));
      setBranches(defaultBranches);
      setSelectedBranch(defaultBranches[0]?.code ?? "");
    };

    loadBranches();
    const handleFocus = () => loadBranches();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  return (
    <DashboardShell title="إضافة مستخدم" subtitle="البداية / المستخدمين / إضافة مستخدم" hideHeaderFilters>
      <section className="space-y-5">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-(--dash-text)">إضافة مستخدم</span>
            <button type="button" className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs">
              ☰
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الاسم الأول *</span>
              <input
                type="text"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الحالة *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>نشط</option>
                <option>غير نشط</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">اللقب *</span>
              <input
                type="text"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="font-semibold text-(--dash-text)">مجموعة *</span>
                <button
                  type="button"
                  onClick={() => setShowGroupInput((prev) => !prev)}
                  className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-text)"
                  aria-label="إضافة مجموعة جديدة"
                >
                  +
                </button>
              </div>
              <select
                value={selectedGroup}
                onChange={(event) => setSelectedGroup(event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              >
                {groupOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {showGroupInput ? (
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="text"
                    value={newGroupName}
                    onChange={(event) => setNewGroupName(event.target.value)}
                    placeholder="اسم المجموعة"
                    className="flex-1 rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddGroup}
                    className="rounded-lg bg-(--dash-primary) px-3 py-2 text-xs font-semibold text-white"
                  >
                    إضافة
                  </button>
                </div>
              ) : null}
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الفرع *</span>
              <select
                value={selectedBranch}
                onChange={(event) => setSelectedBranch(event.target.value)}
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              >
                {branches.length === 0 ? <option value="">لا توجد فروع</option> : null}
                {branches.map((branch) => (
                  <option key={branch.code} value={branch.code}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">طريقة الدفع الافتراضية *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>شبكة</option>
                <option>نقدي</option>
                <option>تحويل</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">الشركة *</span>
              <input
                type="text"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">شركة الدفع الافتراضية *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>بدون</option>
                <option>Visa</option>
                <option>Mastercard</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">هاتف *</span>
              <input
                type="text"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">نوع الفاتورة الافتراضية *</span>
              <select className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
                <option>توصيل</option>
                <option>استلام</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">البريد الإلكتروني *</span>
              <input
                type="email"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <div className="flex items-center gap-2 text-sm text-(--dash-text)">
              <input type="checkbox" className="h-4 w-4 rounded border border-(--dash-border)" />
              <span>إبلاغ المستخدمين عن طريق البريد الإلكتروني</span>
            </div>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">اسم المستخدم / البريد الإلكتروني *</span>
              <input
                type="text"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">كلمة المرور *</span>
              <input
                type="password"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
              <p className="mt-2 text-xs text-(--dash-muted)">كلمة المرور يجب أن تحتوي حرف كبير أو رقم</p>
            </label>
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-(--dash-text)">تأكيد كلمة المرور *</span>
              <input
                type="password"
                className="w-full rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm"
              />
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <button type="button" className="rounded-xl bg-(--dash-primary) px-4 py-2 text-xs font-semibold text-white">
              إضافة مستخدم
            </button>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
};

export default Page;




