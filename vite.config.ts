import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@lingui/vite-plugin";

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import pj from "./package.json";

import { nodePolyfills } from "vite-plugin-node-polyfills";
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@lingui/babel-plugin-lingui-macro"],
      },
    }),
    lingui(),
    nodePolyfills(),
  ],
  build: {
    ssr: true,
    outDir: "emails",
    target: ["esnext"],
    minify: false,
    lib: {
      formats: ["es"],
      entry: {
        "zkdms-welcome": resolve(__dirname, "lib/zkdms-welcome.tsx"),
      },
      name: "emails",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "react",
        "@react-email/components",
        "@lingui/core",
        "@lingui/react",
        "@lingui/react/macro",
      ],
    },
  },
});
