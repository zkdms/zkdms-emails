// components/EmailRenderer.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { toPlainText, render } from "@react-email/render";
import { Providers } from "./Providers";
import { useEmailComponents, type EmailMetadata } from "./useEmailComponents";
import { EmailPreviewIframe } from "./EmailPreviewIframe";

type ViewTab = "preview" | "html" | "text";

interface Language {
  code: string;
  name: string;
}

const LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ja", name: "日本語" },
];

interface RenderedEmail {
  html: string;
  text: string;
}

const EmailRenderer: React.FC = () => {
  const { emails, isLoading, error, refresh } = useEmailComponents();

  const [selectedEmailId, setSelectedEmailId] = useState<string>("");
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const [activeTab, setActiveTab] = useState<ViewTab>("preview");
  const [renderedEmail, setRenderedEmail] = useState<RenderedEmail>({
    html: "",
    text: "",
  });
  const [isRendering, setIsRendering] = useState(false);

  // Get selected email
  const selectedEmail = useMemo(
    () => emails.find((e) => e.id === selectedEmailId),
    [emails, selectedEmailId],
  );

  // Group emails by category
  const groupedEmails = useMemo(() => {
    return emails.reduce(
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
  }, [emails]);

  // Auto-select first email on initial load
  useEffect(() => {
    if (emails.length > 0 && !selectedEmailId) {
      setSelectedEmailId(emails[0].id);
    }
  }, [emails, selectedEmailId]);

  // Render email when selection or language changes
  useEffect(() => {
    const renderEmail = async () => {
      if (!selectedEmail) {
        setRenderedEmail({ html: "", text: "" });
        return;
      }

      setIsRendering(true);

      try {
        const emailElement = (
          <Providers locale={currentLanguage}>
            <selectedEmail.component />
          </Providers>
        );

        const html = await render(emailElement, { pretty: true });
        const text = toPlainText(html);

        setRenderedEmail({ html, text });
      } catch (err) {
        console.error("Error rendering email:", err);
        setRenderedEmail({
          html: `<p style="color: red;">Error rendering email: ${err}</p>`,
          text: `Error rendering email: ${err}`,
        });
      } finally {
        setIsRendering(false);
      }
    };

    renderEmail();
  }, [selectedEmail, currentLanguage]);

  // Handlers
  const handleEmailSelect = (emailId: string) => {
    setSelectedEmailId(emailId);
    setActiveTab("preview");
  };

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
  };

  const handleRefresh = async () => {
    await refresh();
  };

  // Loading state
  if (isLoading && emails.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-lg text-gray-700">
            Loading email templates...
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && emails.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button
            onClick={handleRefresh}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Email Navigation */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Email Templates
            </h2>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="text-sm bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh all emails"
            >
              {isLoading ? "Loading..." : "Refresh"}
            </button>
          </div>
          <p className="text-sm text-gray-500">
            {emails.length} template{emails.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {Object.entries(groupedEmails).length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No email templates found
            </div>
          ) : (
            Object.entries(groupedEmails).map(([category, categoryEmails]) => (
              <div key={category} className="py-2">
                <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {category}
                </h3>
                {categoryEmails.map((email) => (
                  <button
                    key={email.id}
                    onClick={() => handleEmailSelect(email.id)}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                      selectedEmailId === email.id
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-medium">{email.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{email.id}</div>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar - Moved outside of the conditional rendering */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {selectedEmail?.name || "Select an Email"}
            </h1>
            {selectedEmailId && (
              <p className="text-sm text-gray-600 mt-1">
                Locale: {currentLanguage}
                {isRendering && (
                  <span className="ml-2 text-blue-500">Rendering...</span>
                )}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* View Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(["preview", "html", "text"] as ViewTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors capitalize ${
                    activeTab === tab
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Language:</span>
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {LANGUAGES.map((language) => (
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

        {/* Main Content Panel */}
        <div className="flex-1 p-6 overflow-auto">
          {selectedEmailId ? (
            <div className="h-full flex flex-col">
              {/* Preview Tab - Fixed overflow */}
              {activeTab === "preview" && (
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-auto">
                  <EmailPreviewIframe
                    key={`${selectedEmailId}-${currentLanguage}`}
                    html={renderedEmail.html}
                  />
                </div>
              )}

              {/* HTML Tab */}
              {activeTab === "html" && (
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-800">
                      HTML Source
                    </h3>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(renderedEmail.html)
                      }
                      className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <pre className="bg-gray-900 text-gray-100 text-xs p-4 h-full overflow-x-auto">
                      <code>{renderedEmail.html}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Text Tab */}
              {activeTab === "text" && (
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-800">
                      Plain Text Version
                    </h3>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(renderedEmail.text)
                      }
                      className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <pre className="bg-gray-100 text-gray-800 text-sm p-4 h-full whitespace-pre-wrap">
                      {renderedEmail.text}
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
