const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL ?? "",
);

/** Current site hostname for the public tenant-content lookup (no protocol). */
export const getTenantDomain = (): string => {
  if (typeof window === "undefined") return "safri-website.vercel.app";

  const hostname = window.location.hostname.replace(/^www\./i, "").toLowerCase();

  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]"
  ) {
    return "safri-website.vercel.app";
  }

  return hostname;
};

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
