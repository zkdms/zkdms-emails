export default {
  sourceLocale: "en",
  locales: ["fr", "en"],
  catalogs: [
    {
      path: "<rootDir>/locales/{locale}/messages",
      include: ["lib"],
    },
  ],
} as const;
