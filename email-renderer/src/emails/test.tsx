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

const ZkdmsWelcome = () => {
  return (
    <Section className="bg-dark">
      <Container className="text-white mx-auto my-8 px-6 py-8 rounded-lg max-w-2xl">
        {/* Header */}
        <Section className="text-center mb-8">
          <Text className="text-3xl font-bold mb-2 text-blue-400">
            Welcome to ZKDMS
          </Text>
          <Text className="text-xl text-gray-300 italic">
            The Last App You'll Ever Need
          </Text>
        </Section>

        {/* Main Content */}
        <Section className="mb-6">
          <Text className="text-lg mb-4">Hi there,</Text>

          <Text className="mb-4">
            Welcome aboard! You've just taken the most important step in
            securing your digital legacy. We hope you use us, but we also hope
            you don't.
          </Text>

          <Text className="mb-4">
            With ZKDMS, you can finally rest easy knowing your secrets,
            messages, and important data are protected by our zero-knowledge
            protocol. We never see your data - not even when you're...
            unavailable.
          </Text>

          {/* Feature Box with Solid Background */}
          <Section className="bg-blue-900 border border-blue-500 p-4 rounded-lg my-6">
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

          <Text className="italic text-blue-300 mb-6">
            "Finally, an app that works better when you don't."
          </Text>
        </Section>

        {/* CTA Section with Solid Button */}
        <Section className="text-center mb-6">
          <Text className="mb-4 text-gray-300">
            Ready to secure your digital afterlife?
          </Text>
          <Button
            href="https://app.zkdms.com/dashboard"
            className="bg-blue-600 px-6 py-3 font-bold text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg"
          >
            Complete Your Setup
          </Button>
        </Section>

        {/* Security Note */}
        <Section className="border-t border-blue-800 pt-4">
          <Text className="text-sm text-blue-300 text-center">
            🔒 While we use humor to make a difficult topic approachable, we
            take the security of your data and your legacy with the utmost
            seriousness.
          </Text>
        </Section>

        {/* Footer */}
        <Section className="text-center mt-6 pt-4 border-t border-blue-800">
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
    </Section>
  );
};

export default ZkdmsWelcome;
