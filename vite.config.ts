import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import { viteSingleFile } from "vite-plugin-singlefile"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src",
  plugins: [reactRefresh(), viteSingleFile()],
  build: {
    target: "esnext",
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    outDir: "../dist",
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@layouts": path.resolve(__dirname, "./src/layouts")
    }
  }
})
