import {
  Font,
  Head,
  Html,
  Tailwind,
  pixelBasedPreset,
  Button,
  Text,
  Section,
  Container,
} from "@react-email/components";
import { Trans } from "@lingui/react/macro";
import { type PropsWithChildren } from "react";
import config from "../lingui.config";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { setI18n } from "@lingui/react/server";

type Locale = (typeof config.locales)[number];
type LocaleProps = { locale: Locale };

const Providers = async ({
  children,
  locale,
}: PropsWithChildren<LocaleProps>) => {
  const defaultedLocale = locale || (config.sourceLocale as string);
  const messages = (await import(`../locales/${defaultedLocale}/messages.js`))
    .default.messages;
  console.log(messages);
  if (messages) {
    i18n.load(defaultedLocale, messages);
    i18n.activate(defaultedLocale);
    setI18n(i18n);
  }
  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
        theme: {
          extend: {
            colors: {
              brand: "#007291",
              dark: "#1a1a1a",
              "blue-light": "#4facfe",
              "blue-dark": "#00f2fe",
              "accent-blue": "#2563eb",
            },
          },
        },
      }}
    >
      <I18nProvider i18n={i18n}>
        <Html lang={defaultedLocale}>
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
      </I18nProvider>
    </Tailwind>
  );
};

const ZkdmsWelcome = ({ locale }: LocaleProps) => {
  return (
    <Providers locale={locale}>
      <Container className="bg-gradient-to-br from-gray-900 to-dark text-white p-6 rounded-lg max-w-2xl mx-auto">
        {/* Header with Gradient */}
        <Section className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-light to-blue-dark bg-clip-text text-transparent">
            <Text className="text-3xl font-bold mb-2">
              <Trans>Welcome to ZKDMS</Trans>
            </Text>
          </div>
          <Text className="text-xl text-gray-300 italic">
            <Trans>The Last App You'll Ever Need</Trans>
          </Text>
        </Section>

        {/* Main Content */}
        <Section className="mb-6">
          <Text className="text-lg mb-4">
            <Trans>Hi there,</Trans>
          </Text>

          <Text className="mb-4">
            <Trans>
              Welcome aboard! You've just taken the most important step in
              securing your digital legacy. We hope you use us, but we also hope
              you don't.
            </Trans>
          </Text>

          <Text className="mb-4">
            <Trans>
              With ZKDMS, you can finally rest easy knowing your secrets,
              messages, and important data are protected by our zero-knowledge
              protocol. We never see your data - not even when you're...
              unavailable.
            </Trans>
          </Text>

          <Section className="bg-gradient-to-r from-blue-dark/20 to-blue-light/20 border border-blue-500/30 p-4 rounded-lg my-6">
            <Text className="font-semibold text-blue-300 mb-2">
              <Trans>🎯 Your First Steps:</Trans>
            </Text>
            <Text className="mb-2">
              <Trans>• Set up your check-in schedule</Trans>
            </Text>
            <Text className="mb-2">
              <Trans>• Upload your important files and messages</Trans>
            </Text>
            <Text className="mb-2">
              <Trans>• Designate your trusted contacts</Trans>
            </Text>
            <Text>
              <Trans>• Then go live your life - we've got this</Trans>
            </Text>
          </Section>

          <Text className="italic text-blue-200 mb-6">
            <Trans>"Finally, an app that works better when you don't."</Trans>
          </Text>
        </Section>

        {/* CTA Section with Gradient Button */}
        <Section className="text-center mb-6">
          <Text className="mb-4 text-gray-300">
            <Trans>Ready to secure your digital afterlife?</Trans>
          </Text>
          <Button
            href="https://app.zkdms.com/dashboard"
            className="bg-gradient-to-r from-blue-light to-blue-dark px-6 py-3 font-bold text-white rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg hover:shadow-blue-500/25"
          >
            <Trans>Complete Your Setup</Trans>
          </Button>
        </Section>

        {/* Security Note */}
        <Section className="border-t border-blue-800/50 pt-4">
          <Text className="text-sm text-blue-200 text-center">
            <Trans>
              🔒 While we use humor to make a difficult topic approachable, we
              take the security of your data and your legacy with the utmost
              seriousness.
            </Trans>
          </Text>
        </Section>

        {/* Footer */}
        <Section className="text-center mt-6 pt-4 border-t border-blue-800/50">
          <Text className="text-xs text-blue-300">
            <Trans>
              Stay safe out there,
              <br />
              The ZKDMS Team
              <br />
              <span className="italic text-blue-200">
                Your friendly neighborhood digital grim reaper
              </span>
            </Trans>
          </Text>
        </Section>
      </Container>
    </Providers>
  );
};

export default ZkdmsWelcome;
