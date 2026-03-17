import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const proxyTarget = env.VITE_PROXY_TARGET || 'http://localhost:5000'

    return {
        plugins: [
            react(),
            tailwindcss(),
        ],
        server: {
            proxy: proxyTarget
                ? {
                    '/api': {
                        target: proxyTarget,
                        changeOrigin: true,
                    },
                    '/uploads': {
                        target: proxyTarget,
                        changeOrigin: true,
                    },
                }
                : undefined,
        },
    }
})
