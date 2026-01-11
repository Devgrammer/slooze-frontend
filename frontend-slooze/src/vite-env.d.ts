

interface ImportMetaEnv {
  readonly VITE_BASE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_IMAGE_KIT_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}