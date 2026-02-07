"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/app/(dashboard)/components/DashboardShell";
import ConfirmModal from "@/app/(dashboard)/components/ConfirmModal";
import { deleteBankTransfer, listBankTransfers } from "@/app/services/bankTransfers";
import { listBanks } from "@/app/services/banks";
import { extractList } from "@/app/services/http";

type ExternalTransferRow = {
  id: string | number;
  date: string;
  bankCode: string;
  bankName: string;
  amount: string;
  notes: string;
};

type BankOption = {
  id: string | number;
  name: string;
  code?: string;
};

const pageSizeOptions = [10, 20, 50];

const Page = () => {
  const router = useRouter();
  const [rows, setRows] = useState<ExternalTransferRow[]>([]);
  const [banks, setBanks] = useState<BankOption[]>([]);
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ExternalTransferRow | null>(null);

  const bankById = useMemo(() => {
    const map: Record<string, BankOption> = {};
    banks.forEach((bank) => {
      map[String(bank.id)] = bank;
    });
    return map;
  }, [banks]);

  const isExternalTransfer = (entry: any) => {
    const receiverId =
      entry.receiver_id ??
      entry.receiverId ??
      entry.receiver?.id ??
      entry.receiver?.uuid ??
      entry.receiver;
    return !receiverId;
  };

  const mapTransferRow = (entry: any, index: number): ExternalTransferRow => {
    const id = entry.id ?? entry.uuid ?? entry.code ?? entry._id ?? `${index + 1}`;
    const date =
      entry.date ??
      entry.transfer_date ??
      entry.created_at?.split("T")[0] ??
      new Date().toISOString().split("T")[0];
    const senderId =
      entry.sender_id ??
      entry.senderId ??
      entry.sender?.id ??
      entry.sender?.uuid ??
      entry.bank_id ??
      entry.bankId;
    const sender = senderId ? bankById[String(senderId)] : undefined;
    const bankName =
      entry.sender?.bank_name ??
      entry.sender?.name ??
      entry.sender_name ??
      entry.bank_name ??
      sender?.name ??
      "غير محدد";
    const bankCode =
      entry.sender?.bank_code ??
      entry.sender?.code ??
      entry.bank_code ??
      sender?.code ??
      "-";
    const amount = entry.amount ?? entry.paid ?? entry.total ?? "0.00";
    const notes = entry.note ?? entry.notes ?? "-";
    return {
      id,
      date: String(date),
      bankCode: String(bankCode),
      bankName: String(bankName),
      amount: String(amount),
      notes: String(notes),
    };
  };

  const loadTransfers = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await listBankTransfers({ pagination: "on", limit_per_page: 200 });
      const list = extractList<any>(response);
      const externalOnly = list.filter(isExternalTransfer);
      setRows(externalOnly.map(mapTransferRow));
    } catch (error) {
      console.error(error);
      setErrorMessage("تعذر تحميل التحويلات البنكية الخارجية.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadBanks = async () => {
    try {
      const response = await listBanks({ pagination: "on", limit_per_page: 200 });
      const list = extractList<any>(response);
      setBanks(
        list.map((entry: any, index: number) => ({
          id: entry.id ?? entry.uuid ?? entry.code ?? entry._id ?? `${index + 1}`,
          name: entry.bank_name ?? entry.name ?? "بنك",
          code: entry.code ?? entry.bank_code ?? undefined,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBanks();
    loadTransfers();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [query, pageSize]);

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return rows;
    }
    return rows.filter((row) =>
      [row.date, row.bankCode, row.bankName, row.amount, row.notes]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [rows, query]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    if (page !== safePage) {
      setPage(safePage);
    }
  }, [page, safePage]);

  const pagedRows = filteredRows.slice((safePage - 1) * pageSize, safePage * pageSize);
  const rangeStart = filteredRows.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const rangeEnd = Math.min(safePage * pageSize, filteredRows.length);

  const handleDeleteRow = (row: ExternalTransferRow) => {
    setPendingDelete(row);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) {
      return;
    }
    setIsSaving(true);
    try {
      await deleteBankTransfer(pendingDelete.id);
      await loadTransfers();
    } catch (error) {
      console.error(error);
      setErrorMessage("تعذر حذف التحويل البنكي.");
    } finally {
      setIsSaving(false);
      setPendingDelete(null);
    }
  };

  return (
    <DashboardShell title="تحويلات بنكية خارجية" subtitle="البداية / تحويلات بنكية خارجية" hideHeaderFilters>
      <section className="space-y-4">
        {errorMessage ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs text-rose-700">
            {errorMessage}
          </div>
        ) : null}
        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-(--dash-text)">تحويلات بنكية خارجية</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.push("/banks/external-transfers/new")}
                className="rounded-full border border-(--dash-border) px-3 py-2 text-xs text-(--dash-text)"
              >
                +
              </button>
              <span className="text-xs text-(--dash-muted)">إضافة تحويل بنكي خارجي</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-(--dash-muted)">الرجاء استخدام الجدول أدناه للتنقل أو تصفية النتائج.</p>
        </div>

        <div className="rounded-2xl border border-(--dash-border) bg-(--dash-panel) p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-(--dash-muted)">
              <span>إظهار</span>
              <select
                value={pageSize}
                onChange={(event) => setPageSize(Number(event.target.value))}
                className="rounded-lg border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-1 text-(--dash-text)"
              >
                {pageSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex min-w-60 flex-1 items-center gap-2 rounded-xl border border-(--dash-border) bg-(--dash-panel-soft) px-3 py-2 text-sm">
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
                  <th className="px-3 py-3 text-right font-semibold">التاريخ</th>
                  <th className="px-3 py-3 text-right font-semibold">كود البنك</th>
                  <th className="px-3 py-3 text-right font-semibold">اسم البنك</th>
                  <th className="px-3 py-3 text-right font-semibold">المبلغ</th>
                  <th className="px-3 py-3 text-right font-semibold">ملاحظات</th>
                  <th className="px-3 py-3 text-right font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr className="border-t border-(--dash-border) text-(--dash-muted)">
                    <td className="px-3 py-3" colSpan={6}>
                      جاري تحميل البيانات...
                    </td>
                  </tr>
                ) : pagedRows.length ? (
                  pagedRows.map((row) => (
                    <tr key={row.id} className="border-t border-(--dash-border) text-(--dash-text)">
                      <td className="px-3 py-3">{row.date}</td>
                      <td className="px-3 py-3">{row.bankCode}</td>
                      <td className="px-3 py-3">{row.bankName}</td>
                      <td className="px-3 py-3">{row.amount}</td>
                      <td className="px-3 py-3">{row.notes}</td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          onClick={() => handleDeleteRow(row)}
                          disabled={isSaving}
                          className="rounded-lg border border-(--dash-border) px-3 py-1 text-xs text-rose-500 disabled:opacity-60"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-t border-(--dash-border) text-(--dash-muted)">
                    <td className="px-3 py-3" colSpan={6}>
                      لا توجد بيانات في الجدول.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-(--dash-border) px-4 py-3 text-sm text-(--dash-muted)">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={safePage === 1}
                className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text) disabled:opacity-50"
              >
                السابق
              </button>
              <span className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text)">{safePage}</span>
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={safePage === totalPages}
                className="rounded-lg border border-(--dash-border) px-2 py-1 text-(--dash-text) disabled:opacity-50"
              >
                التالي
              </button>
            </div>
            <span>
              عرض {rangeStart} إلى {rangeEnd} من {filteredRows.length} سجلات
            </span>
          </div>
        </div>
      </section>
      <ConfirmModal
        open={Boolean(pendingDelete)}
        message="هل تريد حذف التحويل البنكي؟"
        confirmLabel="حذف"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </DashboardShell>
  );
};

export default Page;

