import { API_ACCESS_TOKEN, apiUrl } from "../config/env";
import type {
  ApiListResponse,
  TenantContentDocument,
  TenantSiteContent,
} from "../types/content";

export const fetchTenantContent = async (): Promise<TenantSiteContent> => {
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (API_ACCESS_TOKEN) {
    headers.Authorization = `Bearer ${API_ACCESS_TOKEN}`;
  }

  const response = await fetch(apiUrl("/api/v1/tenant-contents"), {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to load tenant content (${response.status})`);
  }

  const payload =
    (await response.json()) as ApiListResponse<TenantContentDocument[]>;

  const latest = payload.data?.[0];
  if (!latest?.content) {
    throw new Error("No tenant content returned from the API");
  }

  return latest.content;
};
