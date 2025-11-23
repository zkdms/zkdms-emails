import {
  Button,
  Text,
  Section,
  Container,
  Row,
  Column,
  Heading,
  Hr,
} from "@react-email/components";

const ZkdmsWelcome = () => {
  const firstSteps = [
    {
      number: 1,
      title: "Set up your check-in schedule",
      description:
        "Configure your regular check-in intervals to keep your account active and secure.",
      icon: "📅",
    },
    {
      number: 2,
      title: "Upload your important files and messages",
      description:
        "Securely store your critical documents, passwords, and personal messages.",
      icon: "📁",
    },
    {
      number: 3,
      title: "Designate your trusted contacts",
      description:
        "Choose who you trust to access your information when needed.",
      icon: "👥",
    },
    {
      number: 4,
      title: "Then go live your life - we've got this",
      description:
        "Rest easy knowing your digital legacy is protected and automated.",
      icon: "✨",
    },
  ];
  return (
    <Section className="bg-slate-900 w-full py-8 px-4">
      <Container className="bg-slate-800 border border-slate-700 rounded-2xl max-w-2xl mx-auto p-8">
        {/* Header */}
        <Row className="text-center mb-12">
          <Column className="p-4">
            <Heading className="text-4xl font-bold text-blue-200">
              Welcome to ZKDMS
            </Heading>
            <Text className="text-xl text-slate-300 font-light m-0">
              The Last App You'll Ever Need
            </Text>
          </Column>
        </Row>

        {/* Greeting */}
        <Row className="mb-8">
          <Column className="p-4">
            <Text className="text-lg text-slate-200 mb-6">Hi there,</Text>
            <Text className="text-slate-300 mb-6">
              Welcome aboard! You've just taken the most important step in
              securing your digital legacy. We hope you use us, but we also hope
              you don't.
            </Text>
            <Text className="text-slate-300 mb-8">
              With ZKDMS, you can finally rest easy knowing your secrets,
              messages, and important data are protected by our zero-knowledge
              protocol. We never see your data - not even when you're
              unavailable.
            </Text>
          </Column>
        </Row>

        {/* Steps Section */}
        <Section className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-700/30 p-8 rounded-2xl mb-8">
          <Row className="mb-6">
            <Column>
              <Heading className="font-semibold text-blue-200 text-xl m-0 p-4">
                🎯 Your First Steps:
              </Heading>
            </Column>
          </Row>

          {firstSteps.map((step, index) => (
            <div key={step.number}>
              <Row className="mb-6 last:mb-0">
                <Column className="w-4/5">
                  <Row>
                    <Column className="w-1/6 pr-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
                        <Text className="text-white font-bold text-lg m-0">
                          {step.number}
                        </Text>
                      </div>
                    </Column>
                    <Column className="w-5/6">
                      <Heading className="text-blue-100 text-lg font-semibold m-0 mb-2">
                        {step.title}
                      </Heading>
                      <Text className="text-blue-200/90 text-sm m-0">
                        {step.description}
                      </Text>
                    </Column>
                  </Row>
                </Column>
                <Column className="w-1/5 text-right">
                  <Text className="text-3xl m-0">{step.icon}</Text>
                </Column>
              </Row>
              {index < firstSteps.length - 1 && (
                <Hr className="border-blue-700/30 my-6" />
              )}
            </div>
          ))}
        </Section>

        {/* Quote */}
        <Row className="text-center mb-8">
          <Column>
            <Text className="italic text-blue-300 text-lg bg-blue-900/20 border border-blue-700/30 py-4 px-6 rounded-xl m-0">
              "Finally, an app that works better when you don't."
            </Text>
          </Column>
        </Row>

        {/* CTA */}
        <Row className="text-center mb-8">
          <Column>
            <Text className="text-slate-300 text-lg mb-6">
              Ready to secure your digital afterlife?
            </Text>
            <Button
              href="https://app.zkdms.com/dashboard"
              className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 font-bold text-white rounded-xl"
            >
              Complete Your Setup
            </Button>
          </Column>
        </Row>

        {/* Security Note */}
        <Row className="border-t border-blue-800/50 pt-6 mb-6">
          <Column>
            <Text className="text-sm text-blue-300/90 text-center bg-blue-900/20 py-3 px-4 rounded-lg m-0">
              🔒 While we use humor to make a difficult topic approachable, we
              take the security of your data and your legacy with the utmost
              seriousness.
            </Text>
          </Column>
        </Row>

        {/* Footer */}
        <Row className="text-center border-t border-blue-800/50 pt-6">
          <Column>
            <Text className="text-sm text-blue-300/80 mb-2">
              Stay safe out there,
            </Text>
            <Text className="text-lg font-semibold text-blue-200 mb-2">
              The ZKDMS Team
            </Text>
            <Text className="text-xs text-blue-400/70 italic m-0">
              Your friendly neighborhood digital grim reaper
            </Text>
          </Column>
        </Row>
      </Container>
    </Section>
  );
};

export default ZkdmsWelcome;
