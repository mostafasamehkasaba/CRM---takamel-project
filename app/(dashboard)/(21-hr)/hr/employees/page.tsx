"use client";

import { useState } from "react";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";

const steps = [
  { id: "personal", label: "البيانات الشخصية" },
  { id: "job", label: "بيانات العمل" },
  { id: "salary", label: "الراتب والبدلات" },
];

const Page = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const closeModal = () => {
    setShowAddModal(false);
    setActiveStep(0);
  };

  return (
    <DashboardShell title="إدارة الموظفين" subtitle="الموارد البشرية / إدارة الموظفين" hideHeaderFilters>
      <section className="space-y-4">
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--dash-panel-soft) text-(--dash-primary)">
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm7 8H5a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4Z"
                  />
                </svg>
              </span>
              <div>
                <h2 className="text-xl font-semibold text-(--dash-text)">إدارة الموظفين</h2>
                <p className="text-sm text-(--dash-muted)">
                  عرض بيانات الموظفين وإدارة عقود العمل والهياكل الوظيفية.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-(--dash-text)"
              >
                تصدير
              </button>
              <button
                type="button"
                className="rounded-xl bg-(--dash-primary) px-4 py-2 font-semibold text-white"
                onClick={() => setShowAddModal(true)}
              >
                إضافة موظف
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {[
            { label: "إجمالي الموظفين", value: "0", tone: "bg-(--dash-panel-soft)" },
            { label: "نشط", value: "0", tone: "bg-emerald-50/80 text-emerald-600" },
            { label: "غير نشط", value: "0", tone: "bg-rose-50/80 text-rose-600" },
            { label: "إجمالي الرواتب", value: "0", tone: "bg-(--dash-panel-soft)" },
            { label: "متوسط الراتب", value: "0", tone: "bg-(--dash-panel-soft)" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-(--dash-muted)">{item.label}</span>
                <span className={`rounded-xl px-2 py-1 text-[11px] ${item.tone}`}>HR</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-(--dash-text)">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-(--dash-muted)">
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-(--dash-text)"
              >
                فلترة
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M4 6h16v2l-6 6v4l-4 2v-6L4 8V6Z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex min-w-64 flex-1 items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-(--dash-muted-2)" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M10 2a8 8 0 1 0 5.29 14l4.7 4.7a1 1 0 0 0 1.42-1.4l-4.7-4.7A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
                />
              </svg>
              <input
                type="text"
                placeholder="بحث بالاسم، الوظيفة، القسم أو الرقم القومي..."
                className="w-full bg-transparent text-(--dash-text) placeholder:text-(--dash-muted-2) focus:outline-none"
              />
            </div>
            <span className="text-xs text-(--dash-muted)">عرض 0 من 0 موظف</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-(--dash-border) bg-(--dash-panel) shadow-(--dash-shadow)">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-(--dash-panel-soft) text-(--dash-muted)">
                <tr>
                  <th className="px-3 py-3 text-right font-semibold">الموظف</th>
                  <th className="px-3 py-3 text-right font-semibold">الوظيفة / القسم</th>
                  <th className="px-3 py-3 text-right font-semibold">نوع التعاقد</th>
                  <th className="px-3 py-3 text-right font-semibold">الراتب الأساسي</th>
                  <th className="px-3 py-3 text-right font-semibold">الفرع</th>
                  <th className="px-3 py-3 text-right font-semibold">تاريخ التعيين</th>
                  <th className="px-3 py-3 text-right font-semibold">الحالة</th>
                  <th className="px-3 py-3 text-right font-semibold">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-(--dash-border)">
                  <td className="px-3 py-10 text-center text-sm text-(--dash-muted)" colSpan={8}>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft)">
                        <svg viewBox="0 0 24 24" className="h-6 w-6 text-(--dash-muted-2)" aria-hidden="true">
                          <path
                            fill="currentColor"
                            d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm7 8H5a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4Z"
                          />
                        </svg>
                      </span>
                      <span className="text-sm font-semibold text-(--dash-text)">لا يوجد موظفين</span>
                      <span className="text-xs text-(--dash-muted)">لم يتم العثور على موظفين مطابقة لمعايير البحث الحالية.</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {showAddModal ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
          <button
            type="button"
            onClick={closeModal}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            aria-label="إغلاق النافذة"
          />
          <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm7 8H5a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4Z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">إضافة موظف جديد</h3>
                  <p className="text-xs text-slate-500">أدخل بيانات الموظف الأساسية ثم تابع للخطوات التالية.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500"
                aria-label="إغلاق"
              >
                ×
              </button>
            </div>

            <div className="mt-5 flex items-center gap-3">
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 px-3 py-2 text-right"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-600"
                          : isActive
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </span>
                    <div className="text-xs">
                      <p className={`font-semibold ${isActive ? "text-slate-900" : "text-slate-500"}`}>{step.label}</p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        {index === 0 ? "البيانات الأساسية" : index === 1 ? "تفاصيل الوظيفة" : "الراتب والبدلات"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-4">
              {activeStep === 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900">البيانات الأساسية</h4>
                    <span className="text-xs text-rose-500">* حقول مطلوبة</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">اسم الموظف *</span>
                      <input
                        type="text"
                        placeholder="أدخل اسم الموظف الكامل"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </label>
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">الرقم القومي</span>
                      <input
                        type="text"
                        placeholder="14 رقم"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </label>
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">المسمى الوظيفي</span>
                      <input
                        type="text"
                        placeholder="مثال: محاسب، مندوب مبيعات"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </label>
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">القسم</span>
                      <input
                        type="text"
                        placeholder="القسم"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </label>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">رقم الهاتف</span>
                      <input
                        type="text"
                        placeholder="01XXXXXXXXX"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </label>
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">البريد الإلكتروني</span>
                      <input
                        type="email"
                        placeholder="example@email.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </label>
                    <label className="text-xs text-slate-500 sm:col-span-2">
                      <span className="mb-2 block font-semibold text-slate-700">العنوان</span>
                      <input
                        type="text"
                        placeholder="المدينة، المنطقة"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </label>
                  </div>
                </>
              ) : null}

              {activeStep === 1 ? (
                <>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900">بيانات العمل</h4>
                    <span className="text-xs text-rose-500">* حقول مطلوبة</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">نوع التعاقد *</span>
                      <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none">
                        <option>دوام كامل</option>
                        <option>دوام جزئي</option>
                        <option>عقد مؤقت</option>
                        <option>متدرب</option>
                      </select>
                    </label>
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">الفرع *</span>
                      <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none">
                        <option>الفرع الرئيسي</option>
                        <option>فرع المنطقة الشرقية</option>
                        <option>فرع المنطقة الغربية</option>
                      </select>
                    </label>
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">تاريخ التعيين *</span>
                      <input
                        type="date"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </label>
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">المدير المباشر</span>
                      <input
                        type="text"
                        placeholder="اسم المدير"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </label>
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">نظام الدوام</span>
                      <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none">
                        <option>صباحي</option>
                        <option>مسائي</option>
                        <option>مرن</option>
                      </select>
                    </label>
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">الحالة</span>
                      <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none">
                        <option>نشط</option>
                        <option>غير نشط</option>
                        <option>موقوف</option>
                      </select>
                    </label>
                  </div>
                </>
              ) : null}

              {activeStep === 2 ? (
                <>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900">الراتب والبدلات</h4>
                    <span className="text-xs text-rose-500">* حقول مطلوبة</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">الراتب الأساسي *</span>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </label>
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">البدلات</span>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </label>
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">الاستقطاعات</span>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </label>
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">طريقة الدفع</span>
                      <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none">
                        <option>تحويل بنكي</option>
                        <option>نقدي</option>
                        <option>شيك</option>
                      </select>
                    </label>
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">البنك</span>
                      <input
                        type="text"
                        placeholder="اسم البنك"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </label>
                    <label className="text-xs text-slate-500">
                      <span className="mb-2 block font-semibold text-slate-700">رقم الحساب/IBAN</span>
                      <input
                        type="text"
                        placeholder="SA000000000000000"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </label>
                  </div>
                </>
              ) : null}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button type="button" onClick={closeModal} className="text-sm text-slate-500">
                إلغاء
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600"
                >
                  السابق
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  {activeStep === steps.length - 1 ? "حفظ" : "التالي"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
};

export default Page;
