import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchTenantContent } from "../api/tenantContent";
import fallbackPayload from "../data/fallbackTenantContent.json";
import { applyTheme, getPage, getSection } from "../lib/content";
import { normalizeDegreeMarks } from "../lib/formatCopy";
import type {
  ContentPage,
  ContentSection,
  TenantSiteContent,
} from "../types/content";

type ContentStatus = "loading" | "ready" | "error";

type ContentContextValue = {
  content: TenantSiteContent | null;
  status: ContentStatus;
  error: string | null;
  getPage: (pageId: string) => ContentPage | undefined;
  getSection: <T extends ContentSection = ContentSection>(
    pageId: string,
    sectionId: string,
  ) => T | undefined;
};

const fallbackContent = normalizeDegreeMarks(
  (fallbackPayload as { content: TenantSiteContent }).content,
);

const ContentContext = createContext<ContentContextValue | null>(null);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<TenantSiteContent | null>(null);
  const [status, setStatus] = useState<ContentStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const next = normalizeDegreeMarks(await fetchTenantContent());
        if (cancelled) return;
        applyTheme(next.theme);
        setContent(next);
        setStatus("ready");
        setError(null);
      } catch (err) {
        if (cancelled) return;
        applyTheme(fallbackContent.theme);
        setContent(fallbackContent);
        setStatus("ready");
        setError(err instanceof Error ? err.message : "Failed to load content");
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const value: ContentContextValue = {
    content,
    status,
    error,
    getPage: (pageId) => getPage(content, pageId),
    getSection: (pageId, sectionId) => getSection(content, pageId, sectionId),
  };

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return ctx;
};

export const usePageSection = <T extends ContentSection = ContentSection>(
  pageId: string,
  sectionId: string,
) => {
  const { getSection, status } = useContent();
  return {
    section: getSection<T>(pageId, sectionId),
    status,
  };
};
