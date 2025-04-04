import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "html-transform",
      transformIndexHtml(html) {
        return html.replace(
          /<script type="module" src="\/src\/main.tsx"><\/script>/,
          mode === "production"
            ? '<script type="module" crossorigin src="/static/index.[hash].js"></script>'
            : '<script type="module" src="/src/main.tsx"></script>'
        );
      },
    },
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "static",
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      output: {
        assetFileNames: "static/[name].[hash].[ext]",
        entryFileNames: "static/[name].[hash].js",
        chunkFileNames: "static/[name].[hash].js",
      },
    },
  },
}));
