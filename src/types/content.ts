export type ContentLink = {
  id?: number | string;
  title: string;
  path: string;
  external?: boolean;
  children?: ContentLink[];
};

export type ContentTheme = {
  primaryColor?: string;
  primaryDark?: string;
  primaryLight?: string;
  secondaryColor?: string;
  accentColor?: string;
  accentDark?: string;
  accentHover?: string;
  textColor?: string;
  textSecondary?: string;
  textMuted?: string;
  textInverse?: string;
  surface?: string;
  surfaceSubtle?: string;
  surfaceMuted?: string;
  border?: string;
  footer?: string;
  stats?: string;
  featurePanel?: string;
  contactHeroEnd?: string;
  buttonHoverColor?: string;
  fontHeading?: string;
  fontBody?: string;
};

export type ContentSection = {
  id: string;
  [key: string]: unknown;
};

export type ContentPage = {
  id: string;
  sections?: ContentSection[];
};

export type TenantSiteContent = {
  theme?: ContentTheme;
  pages?: ContentPage[];
};

export type TenantContentDocument = {
  _id: string;
  tenantId?: string;
  content: TenantSiteContent;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiListResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};
