// components/EmailRenderer.tsx
"use client";

import React, { useState, useEffect } from "react";
import { toPlainText, render } from "@react-email/render";
import { Providers } from "./Providers";
// Define the email component type
type EmailComponent = React.ComponentType<any>;

// Define email metadata interface
interface EmailMetadata {
  id: string;
  name: string;
  component: EmailComponent;
  category?: string;
}

const EmailRenderer = () => {
  const [emails, setEmails] = useState<EmailMetadata[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Available languages
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "ja", name: "日本語" },
  ];

  // Dynamically import all email components
  useEffect(() => {
    const importEmails = async () => {
      try {
        setIsLoading(true);

        // This would typically use require.context or dynamic imports
        // For now, we'll manually import or use a build-time approach
        const emailModules = await Promise.all([
          import("./emails/test"),
          import("./emails/test2"),
          // Add more imports as needed
        ]);

        const emailList: EmailMetadata[] = emailModules.map(
          (module, index) => ({
            id: `email-${index + 1}`,
            name: `Email ${index + 1}`,
            component: module.default,
            category: "General",
          }),
        );

        setEmails(emailList);

        // Select first email by default
        if (emailList.length > 0 && !selectedEmail) {
          setSelectedEmail(emailList[0].id);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error importing emails:", error);
        setIsLoading(false);
      }
    };

    importEmails();
  }, []);

  // Render selected email
  useEffect(() => {
    if (selectedEmail && emails.length > 0) {
      const email = emails.find((e) => e.id === selectedEmail);
      if (email) {
        renderReactElement(email.component);
      }
    }
  }, [selectedEmail, emails, currentLanguage]);

  const renderReactElement = async (Component: EmailComponent) => {
    try {
      // Pass language prop to email component if it supports localization
      const emailElement = (
        <Providers locale={currentLanguage}>
          <Component></Component>
        </Providers>
      );

      const renderedHtml = await render(emailElement);
      const plainText = await toPlainText(renderedHtml);

      setHtml(renderedHtml);
      setText(plainText);
    } catch (error) {
      console.error("Error rendering email:", error);
    }
  };

  const handleEmailSelect = (emailId: string) => {
    setSelectedEmail(emailId);
  };

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
  };

  // Group emails by category for better organization
  const groupedEmails = emails.reduce(
    (acc, email) => {
      const category = email.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(email);
      return acc;
    },
    {} as Record<string, EmailMetadata[]>,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading emails...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Email Navigation */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Email Templates
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {emails.length} template{emails.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {Object.entries(groupedEmails).map(([category, categoryEmails]) => (
            <div key={category} className="py-2">
              <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {category}
              </h3>
              {categoryEmails.map((email) => (
                <button
                  key={email.id}
                  onClick={() => handleEmailSelect(email.id)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                    selectedEmail === email.id
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium">{email.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{email.id}</div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar with Language Switcher */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {emails.find((e) => e.id === selectedEmail)?.name ||
                "Select an Email"}
            </h1>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Language:</span>
            <select
              value={currentLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {languages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Email Preview Area */}
        <div className="flex-1 p-6 overflow-auto">
          {html ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Email Preview */}
              <div
                className="email-preview"
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              />

              {/* HTML Source (Optional) */}
              <div className="border-t border-gray-200">
                <details className="group">
                  <summary className="cursor-pointer p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-700">
                      View HTML Source
                    </span>
                  </summary>
                  <pre className="p-4 bg-gray-900 text-gray-100 text-sm overflow-x-auto max-h-96">
                    {html}
                  </pre>
                </details>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
              <div className="text-center">
                <div className="text-gray-400 text-lg mb-2">
                  No email selected
                </div>
                <div className="text-gray-500 text-sm">
                  Choose an email template from the left panel to preview
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailRenderer;
