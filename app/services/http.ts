import { fetchFromApi } from "@/lib/fetchdataFromapi";

export type QueryParams = Record<string, string | number | boolean | null | undefined>;
export type FormValue = string | number | boolean | Blob | File | null | undefined;
export type FormPayload = Record<string, FormValue | FormValue[]>;
export type ApiList<T = unknown> = { data?: T[]; items?: T[]; result?: T[] } | T[];

export const buildQuery = (params?: QueryParams) => {
  if (!params) {
    return "";
  }
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }
    search.set(key, String(value));
  });
  const query = search.toString();
  return query ? `?${query}` : "";
};

export const toFormData = (data: FormPayload) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((entry, index) => {
        if (entry === undefined || entry === null) {
          return;
        }
        if (entry instanceof Blob) {
          formData.append(`${key}[${index}]`, entry);
          return;
        }
        formData.append(`${key}[${index}]`, String(entry));
      });
      return;
    }
    if (value instanceof Blob) {
      formData.append(key, value);
      return;
    }
    formData.append(key, String(value));
  });
  return formData;
};

export const getRequest = (path: string, params?: QueryParams) => fetchFromApi(`${path}${buildQuery(params)}`);

export const postForm = (path: string, data: FormPayload) =>
  fetchFromApi(path, { method: "POST", body: toFormData(data) });

export const putForm = (path: string, data: FormPayload) => postForm(path, { _method: "put", ...data });

export const deleteRequest = (path: string) => fetchFromApi(path, { method: "DELETE" });

export const extractList = <T>(payload: ApiList<T>): T[] => {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (Array.isArray(payload.data)) {
    return payload.data;
  }
  if (Array.isArray(payload.items)) {
    return payload.items;
  }
  if (Array.isArray(payload.result)) {
    return payload.result;
  }
  return [];
};
