import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  server: {
    proxy: {
      "/api": {
        target: "https://www.thesportsdb.com/api/v1/json/3",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        team: resolve(__dirname, "src/pages/team.html"), // ✅ FIXED (remove ?id=ID)
        favorites: resolve(__dirname, "src/pages/favorites.html"), // ✅ FIXED path
      },
    },
  },
});
