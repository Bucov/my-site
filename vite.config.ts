import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/my-site/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                photos: resolve(__dirname, 'photos.html'),
                projects: resolve(__dirname, 'projects.html'),
            }
        }
    }
})