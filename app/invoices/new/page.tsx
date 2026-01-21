"use client";

import { useState } from "react";
import DashboardShell from "../../components/DashboardShell";

const page = () => {
  const [items, setItems] = useState([
    { name: "منتج تجريبي", desc: "وصف", qty: "2", price: "500", tax: "15", total: "1,150" },
    { name: "إضافة يدوية", desc: "وصف", qty: "1", price: "0", tax: "15", total: "0" },
  ]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", desc: "", price: "0", tax: "15" });
  const [toast, setToast] = useState<{ message: string; tone: "success" | "info" } | null>(null);

  const showToast = (message: string, tone: "success" | "info" = "info") => {
    setToast({ message, tone });
    window.setTimeout(() => setToast(null), 2500);
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { name: "منتج جديد", desc: "وصف", qty: "1", price: "0", tax: "15", total: "0" },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  const handleSaveProduct = () => {
    setItems((prev) => [
      ...prev,
      {
        name: newProduct.name || "منتج جديد",
        desc: newProduct.desc || "وصف",
        qty: "1",
        price: newProduct.price || "0",
        tax: newProduct.tax || "15",
        total: "0",
      },
    ]);
    setNewProduct({ name: "", desc: "", price: "0", tax: "15" });
    setShowProductModal(false);
  };

  const handleSaveDraft = () => {
    showToast("تم حفظ الفاتورة كمسودة", "success");
  };

  const handleSaveInvoice = () => {
    showToast("تم حفظ الفاتورة وإرسالها", "success");
  };

  const handleDownloadPdf = () => {
    window.print();
    showToast("تم تجهيز نموذج PDF للتحميل", "info");
  };

  const handleShareLink = async () => {
    const shareText = "رابط نموذج الفاتورة";
    try {
      await navigator.clipboard.writeText(shareText);
      showToast("تم نسخ رابط النموذج", "success");
    } catch {
      showToast("لم يتم نسخ الرابط", "info");
    }
  };

  return (
    <DashboardShell
      title="فاتورة جديدة"
      subtitle="إدخال بيانات الفاتورة وإضافة الأصناف"
      hideHeaderFilters
      headerAction={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="flex items-center gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text)"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                fill="currentColor"
                d="M5 4h12l4 4v11a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3 9h8v2H8v-2Zm0-4h8v2H8V9Z"
              />
            </svg>
            حفظ كمسودة
          </button>
          <button
            type="button"
            onClick={handleSaveInvoice}
            className="flex items-center gap-2 rounded-2xl bg-(--dash-primary) px-4 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                fill="currentColor"
                d="M3 12a1 1 0 0 1 1-1h8.2l-2.4-2.4a1 1 0 1 1 1.4-1.4l4.1 4.1a1 1 0 0 1 0 1.4l-4.1 4.1a1 1 0 1 1-1.4-1.4l2.4-2.4H4a1 1 0 0 1-1-1Z"
              />
            </svg>
            حفظ وإرسال
          </button>
        </div>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-start">
        <div className="min-w-0 space-y-6">
          <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6">
            <div className="grid gap-4 lg:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                <span>العميل *</span>
                <select className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none">
                  <option value="">اختر العميل</option>
                  <option>أحمد محمد</option>
                  <option>سارة العبدالله</option>
                  <option>مؤسسة النور</option>
                  <option>شركة المدار</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                <span>العملة *</span>
                <select className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none">
                  <option value="">اختر العملة</option>
                  <option>ريال سعودي (SAR)</option>
                  <option>دولار أمريكي (USD)</option>
                  <option>درهم إماراتي (AED)</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                <span>تاريخ الفاتورة *</span>
                <input
                  type="date"
                  className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                <span>تاريخ الاستحقاق *</span>
                <input
                  type="date"
                  className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-(--dash-muted) lg:col-span-2">
                <span>المحفظة / الحساب</span>
                <select className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none">
                  <option value="">اختر الحساب لاستلام الدفعة</option>
                  <option>بنك الراجحي - حساب رئيسي</option>
                  <option>البنك الأهلي - حساب جاري</option>
                  <option>بنك الرياض - حساب تجاري</option>
                  <option>بنك البلاد - حساب تشغيل</option>
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-2 rounded-2xl bg-(--dash-primary) px-4 py-2 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
              >
                <span className="text-lg">+</span>
                إضافة صنف
              </button>
              <button
                type="button"
                onClick={() => setShowProductModal(true)}
                className="inline-flex items-center gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text)"
              >
                <span className="text-lg">+</span>
                منتج جديد
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-(--dash-border)">
              <div className="overflow-x-hidden lg:overflow-x-auto">
                <div className="min-w-0 lg:min-w-[760px]">
                  <div className="hidden grid-cols-[28px_1.2fr_1fr_0.8fr_0.8fr_1fr_1fr] gap-3 bg-(--dash-panel-soft) px-4 py-3 text-xs text-(--dash-muted) lg:grid">
                    <span />
                    <span>المنتج</span>
                    <span>الوصف</span>
                    <span>الكمية</span>
                    <span>السعر</span>
                    <span>الضريبة %</span>
                    <span>المجموع</span>
                  </div>
                  {items.map((row, index) => (
                    <div
                      key={`${row.name}-${index}`}
                      className="grid gap-3 border-t border-(--dash-border) px-4 py-4 text-sm lg:grid-cols-[28px_1.2fr_1fr_0.8fr_0.8fr_1fr_1fr] lg:items-center"
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="flex items-center gap-2 text-rose-500 lg:justify-self-center"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                          <path
                            fill="currentColor"
                            d="M7 6h10v2H7V6Zm2 3h6l-1 10H10L9 9Zm2-5h2l1 2H10l1-2Z"
                          />
                        </svg>
                        <span className="text-xs lg:hidden">حذف</span>
                      </button>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-(--dash-muted) lg:hidden">المنتج</span>
                        <input
                          type="text"
                          defaultValue={row.name}
                          className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-(--dash-muted) lg:hidden">الوصف</span>
                        <input
                          type="text"
                          defaultValue={row.desc}
                          className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-(--dash-muted) lg:hidden">الكمية</span>
                        <input
                          type="text"
                          defaultValue={row.qty}
                          className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-(--dash-muted) lg:hidden">السعر</span>
                        <input
                          type="text"
                          defaultValue={row.price}
                          className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-(--dash-muted) lg:hidden">الضريبة %</span>
                        <input
                          type="text"
                          defaultValue={row.tax}
                          className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-(--dash-muted) lg:hidden">المجموع</span>
                        <div className="text-sm">{row.total}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6">
            <h3 className="text-lg font-semibold">خيارات إضافية</h3>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {[
                { label: "الخصم", value: "0" },
                { label: "الضريبة %", value: "15" },
                { label: "الشحن", value: "0" },
              ].map((field) => (
                <label key={field.label} className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                  <span>{field.label}</span>
                  <input
                    type="text"
                    defaultValue={field.value}
                    className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
                  />
                </label>
              ))}
            </div>
            <label className="mt-4 flex flex-col gap-2 text-sm text-(--dash-muted)">
              <span>ملاحظات</span>
              <textarea
                rows={3}
                placeholder="أضف أي ملاحظات إضافية للفاتورة..."
                className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
              />
            </label>
          </div>
        </div>

        <aside className="min-w-0 space-y-6">
          <div className="rounded-3xl border border-(--dash-border) bg-(--dash-panel) p-6 text-sm">
            <h3 className="text-lg font-semibold">ملخص الفاتورة</h3>
            <div className="mt-4 space-y-2 text-(--dash-muted)">
              <div className="flex items-center justify-between">
                <span>المجموع الفرعي</span>
                <span className="text-(--dash-text)">1,000 ريال</span>
              </div>
              <div className="flex items-center justify-between">
                <span>الضريبة (15%)</span>
                <span className="text-(--dash-text)">150 ريال</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-base font-semibold text-(--dash-text)">
                <span>الإجمالي</span>
                <span>1,150 ريال</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleSaveInvoice}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-(--dash-primary) px-4 py-3 text-sm font-semibold text-white shadow-(--dash-primary-soft)"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M5 5h10l4 4v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm2 9h10v2H7v-2Zm0-4h10v2H7V10Z"
                  />
                </svg>
                حفظ وإرسال
              </button>
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text)"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 3a1 1 0 0 1 1 1v8.6l2.3-2.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L11 12.6V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1a1 1 0 0 1 1-1Z"
                  />
                </svg>
                تحميل PDF
              </button>
              <button
                type="button"
                onClick={handleShareLink}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text)"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M15 8a3 3 0 1 0-2.83-4H12a3 3 0 0 0 0 6 2.97 2.97 0 0 0 1.9-.7l-4.2 2.2a3 3 0 1 0 0 3l4.2 2.2A3 3 0 1 0 15 16a2.97 2.97 0 0 0-1.9.7l-4.2-2.2a2.9 2.9 0 0 0 0-1l4.2-2.2A2.97 2.97 0 0 0 15 8Z"
                  />
                </svg>
                مشاركة رابط
              </button>
            </div>
          </div>
        </aside>
      </section>

      {showProductModal ? (
        <div className="dash-modal">
          <div className="dash-modal-body max-w-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">إضافة منتج جديد</h3>
                <p className="mt-1 text-sm text-(--dash-muted)">أضف منتج جديد بسرعة من هنا</p>
              </div>
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-(--dash-border) bg-(--dash-panel-soft) text-(--dash-muted)"
                aria-label="إغلاق النافذة"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6 6.4 5Z"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                <span>اسم المنتج *</span>
                <input
                  type="text"
                  placeholder="أدخل اسم المنتج"
                  value={newProduct.name}
                  onChange={(event) => setNewProduct((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                <span>الباركود</span>
                <input
                  type="text"
                  placeholder="أدخل الباركود"
                  className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                <span>السعر *</span>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(event) => setNewProduct((prev) => ({ ...prev, price: event.target.value }))}
                  className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-(--dash-muted)">
                <span>الفئة</span>
                <select className="w-full rounded-2xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-3 text-sm text-(--dash-text) focus:outline-none">
                  <option value="">اختر الفئة</option>
                  <option>إلكترونيات</option>
                  <option>أغذية</option>
                  <option>ملابس</option>
                  <option>أدوات منزلية</option>
                </select>
              </label>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-4 py-2 text-sm text-(--dash-text)"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleSaveProduct}
                className="rounded-xl bg-(--dash-primary) px-4 py-2 text-sm font-semibold text-white"
              >
                حفظ المنتج
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? (
        <div className="fixed bottom-6 left-6 z-50">
          <div
            className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm text-white shadow-lg ${
              toast.tone === "success"
                ? "border-(--dash-success) bg-(--dash-success)"
                : "border-(--dash-info) bg-(--dash-info)"
            }`}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M9.5 16.2 5.8 12.5l1.4-1.4 2.3 2.3 6.1-6.1 1.4 1.4-7.5 7.5Z"
                />
              </svg>
            </span>
            {toast.message}
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
};

export default page;
