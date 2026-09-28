import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = (env.VITE_API_BASE_URL || "https://apis.safri.food").replace(
    /\/+$/,
    "",
  );

  const apiProxy = {
    "/api": {
      target: apiTarget,
      changeOrigin: true,
      secure: true,
    },
  } as const;

  return {
    plugins: [
      react(),
      tailwindcss(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
    server: {
      proxy: { ...apiProxy },
    },
    preview: {
      proxy: { ...apiProxy },
    },
  };
});
