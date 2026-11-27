import { defineConfig } from "vitest/config";
import { transformWithOxc } from "vite";

export default defineConfig({
  plugins: [{
    name: "next-jsx",
    enforce: "pre",
    async transform(code, id) {
      if (/app\/week-10\/.*\.js$/.test(id)) {
        return transformWithOxc(code, id, { lang: "jsx", jsx: { runtime: "automatic" } });
      }
    },
  }],
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.jsx"],
    clearMocks: true,
  },
});
