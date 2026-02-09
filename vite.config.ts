import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  server: {},
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "./",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: "index.html",
        sw: "sw.ts",
      },
      output: {
        entryFileNames: (chunk) =>
          chunk.name === "sw" ? "sw.js" : "[name].[hash].js",
      },
    },
  },
});
