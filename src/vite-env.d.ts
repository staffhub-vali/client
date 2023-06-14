/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_GOOGLE_CLIENT_ID: string
	readonly VITE_BASE_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
