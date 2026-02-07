"use client";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({
  open,
  title = "تأكيد الحذف",
  message,
  confirmLabel = "تأكيد",
  cancelLabel = "إلغاء",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="dash-modal">
      <div className="dash-modal-body max-w-md p-6">
        <div className="flex items-center justify-between border-b border-(--dash-border) pb-3">
          <h3 className="text-sm font-semibold text-(--dash-text)">{title}</h3>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-(--dash-border) px-2 py-1 text-xs text-(--dash-muted)"
          >
            إغلاق
          </button>
        </div>
        <p className="mt-4 text-sm text-(--dash-text)">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-(--dash-border) px-4 py-2 text-xs text-(--dash-muted)"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
