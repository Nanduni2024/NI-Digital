import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "./",
  publicDir: "public",
  build: {
    rollupOptions: {
      input: {
        home: `${root}index.html`,
        products: `${root}products.html`,
        about: `${root}about.html`,
        legacyHome: `${root}NI_DIGITAL_Professional_Website_Updated.html`,
      },
    },
  },
});
