/// <reference types="vite/client" />

interface ImportMetaEnv {
	VITE_GOOGLE_CLIENT_ID: string
	VITE_BASE_URL: string
}

interface ImportMeta {
	env: ImportMetaEnv
}
