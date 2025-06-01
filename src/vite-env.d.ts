/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA4_ENABLED: string
  readonly VITE_GA4_MEASUREMENT_ID: string
  readonly VITE_GA4_PROPERTY_ID: string
  readonly VITE_GA4_API_ENABLED: string
  readonly VITE_ADSENSE_ENABLED: string
  readonly VITE_ADSENSE_PUBLISHER_ID: string
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
