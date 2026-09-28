import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import {
  getAccessToken,
  handleRefresh,
  setAccessToken,
} from "./auth-service";

const REFRESH_PATH = "/auth/refresh";

type RetriableRequest = InternalAxiosRequestConfig & { _retried?: boolean };

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let pendingRefresh: Promise<string> | null = null;

function refreshOnce() {
  pendingRefresh ??= handleRefresh().finally(() => {
    pendingRefresh = null;
  });
  return pendingRefresh;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const request = error.config as RetriableRequest | undefined;

    if (
      error.response?.status !== 401 ||
      !request ||
      request._retried ||
      request.url?.includes(REFRESH_PATH)
    ) {
      return Promise.reject(error);
    }

    request._retried = true;

    try {
      await refreshOnce();
      return await api(request);
    } catch {
      setAccessToken(null);
      return Promise.reject(error);
    }
  },
);
