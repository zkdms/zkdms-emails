import { jsx, jsxs } from "react/jsx-runtime";
import { Container, Section, Text, Button, Tailwind, pixelBasedPreset, Html, Head, Font } from "@react-email/components";
import { Trans, I18nProvider } from "@lingui/react";
import { defineConfig } from "@lingui/cli";
import { i18n } from "@lingui/core";
import { setI18n } from "@lingui/react/server";
const __variableDynamicImportRuntimeHelper = (glob$1, path$13, segs) => {
  const v = glob$1[path$13];
  if (v) return typeof v === "function" ? v() : Promise.resolve(v);
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, /* @__PURE__ */ new Error("Unknown variable dynamic import: " + path$13 + (path$13.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : ""))));
  });
};
const config = {
  sourceLocale: "en",
  locales: ["fr", "en"],
  catalogs: [{
    path: "<rootDir>/locales/{locale}/messages",
    include: ["lib"]
  }]
};
const config$1 = defineConfig(config);
const Providers = async ({
  children,
  locale
}) => {
  const defaultedLocale = locale || config$1.sourceLocale;
  const messages = (await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../locales/en/messages.js": () => import("./messages-D4rGa3y1.js"), "../locales/fr/messages.js": () => import("./messages-ocpZkpeu.js") }), `../locales/${defaultedLocale}/messages.js`, 4)).default.messages;
  console.log(messages);
  if (messages) {
    i18n.load(defaultedLocale, messages);
    i18n.activate(defaultedLocale);
    setI18n(i18n);
  }
  return /* @__PURE__ */ jsx(Tailwind, { config: {
    presets: [pixelBasedPreset],
    theme: {
      extend: {
        colors: {
          brand: "#007291",
          dark: "#1a1a1a",
          "blue-light": "#4facfe",
          "blue-dark": "#00f2fe",
          "accent-blue": "#2563eb"
        }
      }
    }
  }, children: /* @__PURE__ */ jsx(I18nProvider, { i18n, children: /* @__PURE__ */ jsxs(Html, { lang: defaultedLocale, children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx(Font, { fontFamily: "Roboto", fallbackFontFamily: "Verdana", webFont: {
      url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
      format: "woff2"
    }, fontWeight: 400, fontStyle: "normal" }) }),
    children
  ] }) }) });
};
const ZkdmsWelcome = ({
  locale
}) => {
  return /* @__PURE__ */ jsx(Providers, { locale, children: /* @__PURE__ */ jsxs(Container, { className: "bg-gradient-to-br from-gray-900 to-dark text-white p-6 rounded-lg max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxs(Section, { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-blue-light to-blue-dark bg-clip-text text-transparent", children: /* @__PURE__ */ jsx(Text, { className: "text-3xl font-bold mb-2", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "a5QAHm"
      } }) }) }),
      /* @__PURE__ */ jsx(Text, { className: "text-xl text-gray-300 italic", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "uQ1t5X"
      } }) })
    ] }),
    /* @__PURE__ */ jsxs(Section, { className: "mb-6", children: [
      /* @__PURE__ */ jsx(Text, { className: "text-lg mb-4", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "VYKOAp"
      } }) }),
      /* @__PURE__ */ jsx(Text, { className: "mb-4", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "ofx0Wo"
      } }) }),
      /* @__PURE__ */ jsx(Text, { className: "mb-4", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "ARNYKa"
      } }) }),
      /* @__PURE__ */ jsxs(Section, { className: "bg-gradient-to-r from-blue-dark/20 to-blue-light/20 border border-blue-500/30 p-4 rounded-lg my-6", children: [
        /* @__PURE__ */ jsx(Text, { className: "font-semibold text-blue-300 mb-2", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
        {
          id: "uryf3B"
        } }) }),
        /* @__PURE__ */ jsx(Text, { className: "mb-2", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
        {
          id: "RNB2ZI"
        } }) }),
        /* @__PURE__ */ jsx(Text, { className: "mb-2", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
        {
          id: "h+nSqT"
        } }) }),
        /* @__PURE__ */ jsx(Text, { className: "mb-2", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
        {
          id: "5Zq8gj"
        } }) }),
        /* @__PURE__ */ jsx(Text, { children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
        {
          id: "8r6Bay"
        } }) })
      ] }),
      /* @__PURE__ */ jsx(Text, { className: "italic text-blue-200 mb-6", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "lznQXh"
      } }) })
    ] }),
    /* @__PURE__ */ jsxs(Section, { className: "text-center mb-6", children: [
      /* @__PURE__ */ jsx(Text, { className: "mb-4 text-gray-300", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "p6hOiO"
      } }) }),
      /* @__PURE__ */ jsx(Button, { href: "https://app.zkdms.com/dashboard", className: "bg-gradient-to-r from-blue-light to-blue-dark px-6 py-3 font-bold text-white rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg hover:shadow-blue-500/25", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
      {
        id: "/eQqxT"
      } }) })
    ] }),
    /* @__PURE__ */ jsx(Section, { className: "border-t border-blue-800/50 pt-4", children: /* @__PURE__ */ jsx(Text, { className: "text-sm text-blue-200 text-center", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
    {
      id: "2dZoN9"
    } }) }) }),
    /* @__PURE__ */ jsx(Section, { className: "text-center mt-6 pt-4 border-t border-blue-800/50", children: /* @__PURE__ */ jsx(Text, { className: "text-xs text-blue-300", children: /* @__PURE__ */ jsx(Trans, { .../*i18n*/
    {
      id: "Dr7JdH",
      components: {
        0: /* @__PURE__ */ jsx("br", {}),
        1: /* @__PURE__ */ jsx("br", {}),
        2: /* @__PURE__ */ jsx("span", { className: "italic text-blue-200" })
      }
    } }) }) })
  ] }) });
};
export {
  ZkdmsWelcome as default
};
