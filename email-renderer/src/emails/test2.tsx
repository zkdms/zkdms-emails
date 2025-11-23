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
import { type PropsWithChildren } from "react";
import config from "../../../lingui.config";
import { Providers } from "../Providers";

const ZkdmsWelcome = () => {
  return (
    <Container className="bg-linear-to-br from-gray-900 to-dark text-white p-6 rounded-lg max-w-2xl mx-auto">
      {/* Header with Gradient */}
      <Section className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-light to-blue-dark bg-clip-text text-transparent">
          <Text className="text-3xl font-bold mb-2">
            Welcome to ZKDMS test 2
          </Text>
        </div>
        <Text className="text-xl text-gray-300 italic">
          The Last App You'll Ever Need
        </Text>
      </Section>

      {/* Main Content */}
      <Section className="mb-6">
        <Text className="text-lg mb-4">Hi there,</Text>

        <Text className="mb-4">
          Welcome aboard! You've just taken the most important step in securing
          your digital legacy. We hope you use us, but we also hope you don't.
        </Text>

        <Text className="mb-4">
          With ZKDMS, you can finally rest easy knowing your secrets, messages,
          and important data are protected by our zero-knowledge protocol. We
          never see your data - not even when you're... unavailable.
        </Text>

        <Section className="bg-gradient-to-r from-blue-dark/20 to-blue-light/20 border border-blue-500/30 p-4 rounded-lg my-6">
          <Text className="font-semibold text-blue-300 mb-2">
            🎯 Your First Steps:
          </Text>
          <Text className="mb-2">• Set up your check-in schedule</Text>
          <Text className="mb-2">
            • Upload your important files and messages
          </Text>
          <Text className="mb-2">• Designate your trusted contacts</Text>
          <Text>• Then go live your life - we've got this</Text>
        </Section>

        <Text className="italic text-blue-200 mb-6">
          "Finally, an app that works better when you don't."
        </Text>
      </Section>

      {/* CTA Section with Gradient Button */}
      <Section className="text-center mb-6">
        <Text className="mb-4 text-gray-300">
          Ready to secure your digital afterlife?
        </Text>
        <Button
          href="https://app.zkdms.com/dashboard"
          className="bg-gradient-to-r from-blue-light to-blue-dark px-6 py-3 font-bold text-white rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg hover:shadow-blue-500/25"
        >
          Complete Your Setup
        </Button>
      </Section>

      {/* Security Note */}
      <Section className="border-t border-blue-800/50 pt-4">
        <Text className="text-sm text-blue-200 text-center">
          🔒 While we use humor to make a difficult topic approachable, we take
          the security of your data and your legacy with the utmost seriousness.
        </Text>
      </Section>

      {/* Footer */}
      <Section className="text-center mt-6 pt-4 border-t border-blue-800/50">
        <Text className="text-xs text-blue-300">
          Stay safe out there,
          <br />
          The ZKDMS Team
          <br />
          <span className="italic text-blue-200">
            Your friendly neighborhood digital grim reaper
          </span>
        </Text>
      </Section>
    </Container>
  );
};

export default ZkdmsWelcome;
