import { deleteRequest, getRequest, postForm, putForm, type FormPayload, type QueryParams } from "./http";

export const listCategories = (params?: QueryParams) => getRequest("/categories", params);

export const getCategory = (id: string | number) => getRequest(`/categories/${id}`);

export const createCategory = (data: FormPayload) => postForm("/categories", data);

export const updateCategory = (id: string | number, data: FormPayload) => putForm(`/categories/${id}`, data);

export const deleteCategory = (id: string | number) => deleteRequest(`/categories/${id}`);

