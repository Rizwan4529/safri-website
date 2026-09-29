import {
  ensureAccessToken,
  loginForAccessToken,
} from "./auth";

type AuthorizedFetchOptions = RequestInit & {
  /** When true, skip the automatic 403 re-login retry. */
  skipAuthRetry?: boolean;
};

/**
 * Authenticated fetch that:
 * 1. Ensures an access token exists in localStorage (login if missing)
 * 2. Attaches Bearer token
 * 3. On 403, re-logins once, updates localStorage, and retries
 */
export const authorizedFetch = async (
  input: string,
  init: AuthorizedFetchOptions = {},
): Promise<Response> => {
  const { skipAuthRetry, headers: initHeaders, ...rest } = init;
  const token = await ensureAccessToken();

  const headers = new Headers(initHeaders);
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }
  headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(input, { ...rest, headers });

  if (response.status !== 403 || skipAuthRetry) {
    return response;
  }

  const freshToken = await loginForAccessToken();
  const retryHeaders = new Headers(initHeaders);
  if (!retryHeaders.has("Accept")) {
    retryHeaders.set("Accept", "application/json");
  }
  retryHeaders.set("Authorization", `Bearer ${freshToken}`);

  return fetch(input, { ...rest, headers: retryHeaders });
};
