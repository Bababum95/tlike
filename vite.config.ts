import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(() => {
  process.env.VITE_APP_BUILD_TIME = new Date().toISOString().slice(0, 16);

  return {
    base: "/",
    plugins: [react(), tsconfigPaths(), ViteImageOptimizer()],
    publicDir: "./public",
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "/src/assets/styles/_main.scss" as *;',
        },
      },
    },
  };
});
