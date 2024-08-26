import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'node:path'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
    },
    resolve: {
        alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
    },
})
