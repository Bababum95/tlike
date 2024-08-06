import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tsconfigPaths()],
  publicDir: "./public",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "/src/assets/styles/variables", "/src/assets/styles/mixins";',
      },
    },
  },
});
