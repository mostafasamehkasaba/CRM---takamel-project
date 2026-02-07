import { putForm, type FormPayload } from "./http";

export const updateItemBarcode = (id: string | number, data: FormPayload) =>
  putForm(`/item-barcodes/${id}`, data);
