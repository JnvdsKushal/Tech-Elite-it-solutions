import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc"
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime"

const ROOT = path.resolve(__dirname)

export default defineConfig({
  root: path.resolve(ROOT, "client"),

  plugins: [
    react(),
    tailwindcss(),
    jsxLocPlugin(),
    vitePluginManusRuntime()
  ],

  resolve: {
    alias: {
      "@": path.resolve(ROOT, "client/src"),
      "@shared": path.resolve(ROOT, "shared"),
      "@assets": path.resolve(ROOT, "attached_assets")
    }
  },

  envDir: ROOT,

  build: {
    outDir: path.resolve(ROOT, "dist/public"),
    emptyOutDir: true
  },

  server: {
    port: 3000,
    host: true,
    strictPort: false,

    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],

    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
})