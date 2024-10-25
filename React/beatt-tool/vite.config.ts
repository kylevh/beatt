import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths(), svgr()],
  base: "./",
  resolve: {
    alias: {
      src: "/src",
      assets: "/src/assets",
      components: "/src/components",
      pages: "/src/pages",
      features: "/src/features",
      types: "/src/types",
    },
  }
})
