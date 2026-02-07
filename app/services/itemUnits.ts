import { deleteRequest, getRequest, postForm, putForm, type FormPayload, type QueryParams } from "./http";

export const listItemUnits = (params?: QueryParams) => getRequest("/item-units", params);

export const getItemUnit = (id: string | number) => getRequest(`/item-units/${id}`);

export const createItemUnit = (data: FormPayload) => postForm("/item-units", data);

export const updateItemUnit = (id: string | number, data: FormPayload) => putForm(`/item-units/${id}`, data);

export const deleteItemUnit = (id: string | number) => deleteRequest(`/item-units/${id}`);
