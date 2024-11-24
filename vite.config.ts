import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        app: resolve(__dirname, "src", "app"),
        components: resolve(__dirname, "src", "components"),
        hooks: resolve(__dirname, "src", "hooks"),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['src/**/__tests__/**/*.[jt]s?(x)'],
      exclude: ['src/**/__fixtures__/**'],    
      setupFiles: ['./vitest.setup.ts'],
    },
  };
});
