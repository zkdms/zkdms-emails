// hooks/useEmailComponents.ts
import { useState, useEffect, useCallback } from "react";

type EmailComponent = React.ComponentType<any>;

export interface EmailMetadata {
  id: string;
  name: string;
  component: EmailComponent;
  category?: string;
  description?: string;
  lastUpdated?: Date;
}

export const useEmailComponents = () => {
  const [emails, setEmails] = useState<EmailMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const importEmails = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Dynamically import all email components from the emails directory
      const emailModules = await Promise.all([
        import("./emails/test"),
        import("./emails/test2"),
        // Add more imports as needed, or use a dynamic approach
      ]);

      const emailList: EmailMetadata[] = emailModules.map((module, index) => {
        const componentName =
          module.default.displayName || `Email ${index + 1}`;
        return {
          id: `email-${index + 1}`,
          name: componentName,
          component: module.default,
          category: module.default.category || "General",
          description: module.default.description,
          lastUpdated: new Date(),
        };
      });

      setEmails(emailList);
      setIsLoading(false);
    } catch (err) {
      console.error("Error importing emails:", err);
      setError("Failed to load email templates");
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    importEmails();
  }, [importEmails]);

  // HMR support for development
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && import.meta.hot) {
      const hmr = import.meta.hot;

      // Listen for updates to email components
      hmr.accept(["./emails/test", "./emails/test2"], async () => {
        console.log("🔄 Email components updated via HMR");
        await importEmails();
      });

      // Optional: Handle HMR errors
      hmr.on("vite:beforeUpdate", () => {
        console.log("🔄 Hot update pending...");
      });

      hmr.on("vite:afterUpdate", () => {
        console.log("✅ Hot update applied");
      });
    }
  }, [importEmails]);

  // Function to get a specific email by ID
  const getEmailById = useCallback(
    (id: string) => {
      return emails.find((email) => email.id === id);
    },
    [emails],
  );

  // Function to get emails by category
  const getEmailsByCategory = useCallback(
    (category: string) => {
      return emails.filter((email) => email.category === category);
    },
    [emails],
  );

  return {
    emails,
    isLoading,
    error,
    refresh: importEmails,
    getEmailById,
    getEmailsByCategory,
  };
};
