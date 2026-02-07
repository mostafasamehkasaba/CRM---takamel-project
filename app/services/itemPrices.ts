import { getRequest, putForm, type FormPayload, type QueryParams } from "./http";

export const listItemPrices = (params?: QueryParams) => getRequest("/item-prices", params);

export const updateItemPrice = (id: string | number, data: FormPayload) => putForm(`/item-prices/${id}`, data);
