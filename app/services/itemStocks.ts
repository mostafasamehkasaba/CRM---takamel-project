import { putForm, type FormPayload } from "./http";

export const updateItemStock = (id: string | number, data: FormPayload) => putForm(`/item-stocks/${id}`, data);
