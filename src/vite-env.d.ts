/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional JSON POST target for wholesale pricing requests. */
  readonly VITE_QUOTE_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
