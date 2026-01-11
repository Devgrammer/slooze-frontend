

interface ImportMetaEnv {
  readonly VITE_BASE_API_URL: string;
  readonly VITE_APP_NAME: string;
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}