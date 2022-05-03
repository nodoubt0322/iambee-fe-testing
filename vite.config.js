import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import WindiCSS from 'vite-plugin-windicss'
import Unocss from 'unocss/vite'
import path from 'path'

export default defineConfig({
  resolve: { alias: { "@": path.resolve(process.cwd(), "src") } },
  // plugins: [react(), WindiCSS()],
  plugins: [react(), Unocss()],
})
