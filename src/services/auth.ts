import { api } from "./api";

export type User = {
  id: string;
  name: string;
  email: string;
};

let accessToken: string | null = null;

export function getAccessToken() {
  return accessToken;
}

function setAccessToken(token: string | null) {
  accessToken = token;
}

export function handleLoginWithGoogle() {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth`;
}

export async function handleRefreshToken() {
  const { data } = await api.post("/auth/refresh");
  console.log(data);

  const { accessToken } = data;

  setAccessToken(accessToken);
  return accessToken;
}

export async function logout() {
  try {
    await api.post("/auth/logout");
  } finally {
    setAccessToken(null);
    window.location.href = "/";
  }
}
