export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export type LegalChapter = {
  id: string;
  heading: string;
  level?: 2 | 3;
  blocks: LegalBlock[];
};

export type LegalDocumentSection = {
  id: string;
  title?: string;
  effectiveDate?: string;
  lastUpdated?: string;
  chapters?: LegalChapter[];
};
