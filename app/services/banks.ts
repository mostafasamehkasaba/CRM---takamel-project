import { deleteRequest, getRequest, postForm, putForm, type FormPayload, type QueryParams } from "./http";

export const listBanks = (params?: QueryParams) => getRequest("/banks", params);

export const getBank = (id: string | number) => getRequest(`/banks/${id}`);

export const createBank = (data: FormPayload) => postForm("/banks", data);

export const updateBank = (id: string | number, data: FormPayload) => putForm(`/banks/${id}`, data);

export const deleteBank = (id: string | number) => deleteRequest(`/banks/${id}`);
