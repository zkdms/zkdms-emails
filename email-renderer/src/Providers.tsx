import {
  Font,
  Head,
  Html,
  Tailwind,
  pixelBasedPreset,
} from "@react-email/components";
import { type PropsWithChildren } from "react";
import config from "../../lingui.config";
import twConfig from "../tailwind.config.js";
type Locale = (typeof config.locales)[number];
type LocaleProps = { locale: Locale };

export const Providers = ({
  locale,
  children,
}: PropsWithChildren<LocaleProps>) => {
  return (
    <Tailwind config={twConfig}>
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
