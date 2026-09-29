import { apiUrl } from "../config/env";

const ACCESS_TOKEN_KEY = "safri_access_token";

type LoginResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
  };
};

const authEmail =
  import.meta.env.VITE_API_AUTH_EMAIL ?? "admin@safrifoods.com";
const authPassword =
  import.meta.env.VITE_API_AUTH_PASSWORD ?? "admin@safrifoods.com";

export const getStoredAccessToken = (): string | null => {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setStoredAccessToken = (token: string) => {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch {
    // Ignore storage failures (private mode, etc.)
  }
};

export const clearStoredAccessToken = () => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch {
    // Ignore storage failures
  }
};

export const loginForAccessToken = async (): Promise<string> => {
  const response = await fetch(apiUrl("/api/v1/auth/login"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: authEmail,
      password: authPassword,
    }),
  });

  const payload = (await response.json()) as LoginResponse;

  if (!response.ok || !payload.data?.accessToken) {
    throw new Error(
      payload.message || `Login failed (${response.status})`,
    );
  }

  setStoredAccessToken(payload.data.accessToken);
  return payload.data.accessToken;
};

/** Returns a valid access token, logging in when localStorage has none. */
export const ensureAccessToken = async (): Promise<string> => {
  const existing = getStoredAccessToken();
  if (existing) return existing;
  return loginForAccessToken();
};
