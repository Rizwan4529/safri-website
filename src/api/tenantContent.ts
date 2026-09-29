import { apiUrl } from "../config/env";
import type {
  ApiListResponse,
  TenantContentDocument,
  TenantSiteContent,
} from "../types/content";
import { authorizedFetch } from "./http";

export const fetchTenantContent = async (): Promise<TenantSiteContent> => {
  const response = await authorizedFetch(apiUrl("/api/v1/tenant-contents"));

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
