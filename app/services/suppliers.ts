import { deleteRequest, getRequest, postForm, putForm, type FormPayload, type QueryParams } from "./http";

export const listSuppliers = (params?: QueryParams) => getRequest("/suppliers", params);

export const getSupplier = (id: string | number) => getRequest(`/suppliers/${id}`);

export const createSupplier = (data: FormPayload) => postForm("/suppliers", data);

export const updateSupplier = (id: string | number, data: FormPayload) => putForm(`/suppliers/${id}`, data);

export const deleteSupplier = (id: string | number) => deleteRequest(`/suppliers/${id}`);
