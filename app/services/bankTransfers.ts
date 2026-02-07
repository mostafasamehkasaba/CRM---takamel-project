import { deleteRequest, getRequest, postForm, type FormPayload, type QueryParams } from "./http";

export const listBankTransfers = (params?: QueryParams) => getRequest("/bank-transfers", params);

export const getBankTransfer = (id: string | number) => getRequest(`/bank-transfers/${id}`);

export const createBankTransfer = (data: FormPayload) => postForm("/bank-transfers", data);

export const deleteBankTransfer = (id: string | number) => deleteRequest(`/bank-transfers/${id}`);
