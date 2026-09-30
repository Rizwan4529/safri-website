const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL ?? "",
);

export const TENANT_DOMAIN =
  import.meta.env.VITE_TENANT_DOMAIN ?? "safri-website.vercel.app";

/** API requests use same-origin `/api` in dev/preview (Vite proxy) to avoid CORS. */
export const apiUrl = (path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (import.meta.env.DEV) return normalized;
  return `${API_BASE_URL}${normalized}`;
};

export const mediaUrl = (path?: string | null) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
};
