import { deleteRequest, getRequest, postForm, putForm, type FormPayload, type QueryParams } from "./http";

export const listClients = (params?: QueryParams) => getRequest("/clients", params);

export const getClient = (id: string | number) => getRequest(`/clients/${id}`);

export const createClient = (data: FormPayload) => postForm("/clients", data);

export const updateClient = (id: string | number, data: FormPayload) => putForm(`/clients/${id}`, data);

export const deleteClient = async (id: string | number) => {
  try {
    return await deleteRequest(`/clients/${id}`);
  } catch (error) {
    return postForm(`/clients/${id}`, { _method: "delete" });
  }
};
