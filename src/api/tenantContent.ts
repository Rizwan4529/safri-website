import { apiUrl, getTenantDomain } from "../config/env";
import type { ApiListResponse, TenantSiteContent } from "../types/content";

type PublicTenantContentData = {
  content: TenantSiteContent;
  _id?: string;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export const fetchTenantContent = async (): Promise<TenantSiteContent> => {
  const query = new URLSearchParams({ domain: getTenantDomain() });
  const response = await fetch(
    apiUrl(`/api/v1/public/tenant-contents?${query.toString()}`),
    {
      headers: { Accept: "application/json" },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to load tenant content (${response.status})`);
  }

  const payload =
    (await response.json()) as ApiListResponse<PublicTenantContentData>;

  const content = payload.data?.content;
  if (!content) {
    throw new Error("No tenant content returned from the API");
  }

  return content;
};
