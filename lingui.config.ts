import { defineConfig } from "@lingui/cli";
export const config = {
  sourceLocale: "en",
  locales: ["fr", "en"],
  catalogs: [
    {
      path: "<rootDir>/locales/{locale}/messages",
      include: ["lib"],
    },
  ],
} as const;
// @ts-expect-error Config satisfies but type not exported
export default defineConfig(config);
