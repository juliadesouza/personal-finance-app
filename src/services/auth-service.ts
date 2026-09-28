import { api } from "./api";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
};

let accessToken: string | null = null;

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function handleLogin() {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
}

export async function handleRefresh() {
  const { data } = await api.post("/auth/refresh");

  const { accessToken } = data;

  setAccessToken(accessToken);
  return accessToken;
}

export async function handleLogout() {
  try {
    await api.post("/auth/logout");
  } finally {
    setAccessToken(null);
    window.location.href = "/";
  }
}

export async function getUser() {
  const { data } = await api.get("/auth/me");
  return data;
}
