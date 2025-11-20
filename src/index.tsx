import {
  Font,
  Head,
  Html,
  Tailwind,
  pixelBasedPreset,
  Button,
} from "@react-email/components";
import { type PropsWithChildren } from "react";
import React from "react";
const config = { locales: ["en", "fr"] } as const;
type Locale = (typeof config.locales)[number];
type LocaleProps = { locale: Locale };
const Providers = ({ children, locale }: PropsWithChildren<LocaleProps>) => {
  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
        theme: {
          extend: {
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >
      <Html lang={locale}>
        <Head>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        {children}
      </Html>
    </Tailwind>
  );
};
const ZkdmsWelcome = ({ locale }: LocaleProps) => {
  return (
    <Providers locale={locale}>
      <Button
        href="https://example.com"
        className="bg-brand px-3 py-2 font-medium leading-4 text-white rounded"
      >
        Go to app
      </Button>
    </Providers>
  );
};

export default ZkdmsWelcome;
