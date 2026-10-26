import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: "./src/pages",
      generatedRouteTree: "./src/app/providers/router/routeTree.gen.ts",
      routeFileIgnorePattern: "(^|/)(ui|model)(/|$)|\\.ts$",
    }),
    react(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
