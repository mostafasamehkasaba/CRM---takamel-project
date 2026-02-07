import { deleteRequest, getRequest, postForm, putForm, type FormPayload, type QueryParams } from "./http";

export const listItemBrands = (params?: QueryParams) => getRequest("/item-brands", params);

export const getItemBrand = (id: string | number) => getRequest(`/item-brands/${id}`);

export const createItemBrand = (data: FormPayload) => postForm("/item-brands", data);

export const updateItemBrand = (id: string | number, data: FormPayload) => putForm(`/item-brands/${id}`, data);

export const deleteItemBrand = (id: string | number) => deleteRequest(`/item-brands/${id}`);
