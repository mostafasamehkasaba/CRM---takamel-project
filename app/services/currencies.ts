import { deleteRequest, getRequest, postForm, putForm, type FormPayload, type QueryParams } from "./http";

export const listCurrencies = (params?: QueryParams) => getRequest("/currencies", params);

export const getCurrency = (id: string | number) => getRequest(`/currencies/${id}`);

export const createCurrency = (data: FormPayload) => postForm("/currencies", data);

export const updateCurrency = (id: string | number, data: FormPayload) => putForm(`/currencies/${id}`, data);

export const deleteCurrency = (id: string | number) => deleteRequest(`/currencies/${id}`);
