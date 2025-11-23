// components/EmailRenderer.tsx
"use client";

import React, { useState, useEffect } from "react";
import { toPlainText, render } from "@react-email/render";
import { Providers } from "./Providers";
import { useEmailComponents } from "./useEmailComponents";

// Define the email component type
type EmailComponent = React.ComponentType<any>;

const EmailRenderer = () => {
  const { emails, isLoading, refresh } = useEmailComponents();
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const [activeTab, setActiveTab] = useState<"preview" | "html" | "text">(
    "preview",
  );

  // Available languages
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "ja", name: "日本語" },
  ];

  // Auto-select first email when emails are loaded
  useEffect(() => {
    if (emails.length > 0 && !selectedEmail) {
      setSelectedEmail(emails[0].id);
    }
  }, [emails, selectedEmail]);

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
          <Component />
        </Providers>
      );

      const renderedHtml = await render(emailElement, {
        pretty: true,
      });

      const plainText = toPlainText(renderedHtml);

      setHtml(renderedHtml);
      setText(plainText);
    } catch (error) {
      console.error("Error rendering email:", error);
    }
  };

  const handleEmailSelect = (emailId: string) => {
    setSelectedEmail(emailId);
    setActiveTab("preview"); // Reset to preview when selecting new email
  };

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
  };

  const handleRefreshEmail = () => {
    // Refresh the email components and re-render the current email
    refresh().then(() => {
      if (selectedEmail) {
        const email = emails.find((e) => e.id === selectedEmail);
        if (email) {
          renderReactElement(email.component);
        }
      }
    });
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
    {} as Record<string, typeof emails>,
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
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Email Templates
            </h2>
            <button
              onClick={handleRefreshEmail}
              className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
              title="Refresh all emails"
            >
              Refresh
            </button>
          </div>
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

          <div className="flex items-center space-x-4">
            {/* View Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "preview"
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setActiveTab("html")}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "html"
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                HTML
              </button>
              <button
                onClick={() => setActiveTab("text")}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "text"
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Text
              </button>
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

            {/* HMR Status Indicator */}
            {process.env.NODE_ENV === "development" && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">HMR Active</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Panel - Always shows the selected view */}
        <div className="flex-1 p-6 overflow-auto">
          {selectedEmail ? (
            <div className="h-full flex flex-col">
              {/* Preview Tab Content */}
              {activeTab === "preview" && html && (
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <iframe
                    srcDoc={html}
                    className="w-full h-full border-0"
                    title="Email Preview"
                    sandbox="allow-same-origin"
                  />
                </div>
              )}

              {/* HTML Tab Content */}
              {activeTab === "html" && (
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800">
                      HTML Source
                    </h3>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <pre className="bg-gray-900 text-gray-100 text-xs p-4 h-full overflow-x-auto">
                      <code>{html}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Text Tab Content */}
              {activeTab === "text" && (
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800">
                      Plain Text Version
                    </h3>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <pre className="bg-gray-100 text-gray-800 text-sm p-4 h-full whitespace-pre-wrap">
                      {text}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-white rounded-lg border border-gray-200">
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
