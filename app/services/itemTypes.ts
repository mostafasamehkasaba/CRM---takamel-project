import { deleteRequest, getRequest, postForm, putForm, type FormPayload, type QueryParams } from "./http";

export const listItemTypes = (params?: QueryParams) => getRequest("/item-types", params);

export const getItemType = (id: string | number) => getRequest(`/item-types/${id}`);

export const createItemType = (data: FormPayload) => postForm("/item-types", data);

export const updateItemType = (id: string | number, data: FormPayload) => putForm(`/item-types/${id}`, data);

export const deleteItemType = (id: string | number) => deleteRequest(`/item-types/${id}`);
