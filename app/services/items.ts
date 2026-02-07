import { deleteRequest, getRequest, postForm, putForm, type FormPayload, type QueryParams } from "./http";

export const listItems = (params?: QueryParams) => getRequest("/items", params);

export const getItem = (id: string | number) => getRequest(`/items/${id}`);

export const createItem = (data: FormPayload) => postForm("/items", data);

export const updateItem = (id: string | number, data: FormPayload) => putForm(`/items/${id}`, data);

export const deleteItem = (id: string | number) => deleteRequest(`/items/${id}`);
