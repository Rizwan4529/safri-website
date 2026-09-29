/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_ACCESS_TOKEN?: string;
  readonly VITE_API_AUTH_EMAIL?: string;
  readonly VITE_API_AUTH_PASSWORD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
