import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
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
        team: resolve(__dirname, "src/pages/team.html"),
        favorites: resolve(__dirname, "src/pages/favorites.html"),
      },
    },
  },
});
