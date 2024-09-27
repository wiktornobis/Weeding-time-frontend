import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    svgr({
      svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg',
    }),],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      },
    ]
  },
  server: {
    port: 8099,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8099"
  }
})