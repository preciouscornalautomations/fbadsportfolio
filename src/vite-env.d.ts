/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEAD_ENDPOINT?: string
  readonly VITE_LEAD_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
