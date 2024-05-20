import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        sourcemap: 'inline'
    },
    css: {
        modules: { localsConvention: 'camelCase' },
        preprocessorOptions: {
            scss: {
                // additionalData: `@import "@/assets/scss/global.scss";`,
                // additionalData: '@import "node_modules/@shorelight/shorelight-common-components/src/theme/_color-palette.scss";'
                // additionalData: '@import "./src/styles/variables.scss";'
            }
        }
    }
})
