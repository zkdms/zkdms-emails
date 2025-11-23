// hooks/useEmailComponents.ts
import { useState, useEffect, useCallback, useRef } from "react";

type EmailComponent = React.ComponentType<any>;

export interface EmailMetadata {
  id: string;
  name: string;
  component: EmailComponent;
  category?: string;
  description?: string;
  lastUpdated?: Date;
}

interface UseEmailComponentsReturn {
  emails: EmailMetadata[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getEmailById: (id: string) => EmailMetadata | undefined;
  getEmailsByCategory: (category: string) => EmailMetadata[];
}

// Email module paths - centralized configuration
const EMAIL_MODULES = [
  "./emails/welcome",
  "./emails/test2",
  // Add more email paths here
] as const;

export const useEmailComponents = (): UseEmailComponentsReturn => {
  const [emails, setEmails] = useState<EmailMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use ref to track if we're currently importing to prevent race conditions
  const isImportingRef = useRef(false);

  const importEmails = useCallback(async () => {
    // Prevent concurrent imports
    if (isImportingRef.current) {
      console.log("Import already in progress, skipping...");
      return;
    }

    isImportingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      console.log("🔄 Starting email import...");

      // Use timestamp for cache busting in development
      const timestamp = Date.now();
      const isDev = process.env.NODE_ENV === "development";

      console.log("Environment:", process.env.NODE_ENV);
      console.log("Importing modules:", EMAIL_MODULES);

      // Dynamically import all email components
      const emailModules = await Promise.all(
        EMAIL_MODULES.map(async (path, index) => {
          try {
            const fullPath = isDev ? `${path}?t=${timestamp}` : path;
            console.log(
              `Importing ${index + 1}/${EMAIL_MODULES.length}: ${fullPath}`,
            );
            const module = await import(/* @vite-ignore */ fullPath);
            console.log(`✓ Imported ${path}`, module);
            return module;
          } catch (err) {
            console.error(`✗ Failed to import ${path}:`, err);
            throw err;
          }
        }),
      );

      const emailList: EmailMetadata[] = emailModules.map((module, index) => {
        const component = module.default;
        const componentName =
          component?.displayName || component?.name || `Email ${index + 1}`;

        return {
          id: `email-${index + 1}`,
          name: componentName,
          component,
          category: component?.category || "General",
          description: component?.description,
          lastUpdated: new Date(),
        };
      });

      setEmails(emailList);
      setIsLoading(false);
      console.log(`✅ Successfully loaded ${emailList.length} email templates`);
    } catch (err) {
      console.error("❌ Error importing emails:", err);
      setError(
        `Failed to load email templates: ${err instanceof Error ? err.message : String(err)}`,
      );
      setIsLoading(false);
    } finally {
      isImportingRef.current = false;
    }
  }, []);

  // Initial load
  useEffect(() => {
    importEmails();
  }, [importEmails]);

  // HMR support for development
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    // Check if HMR is available
    if (typeof import.meta !== "undefined" && import.meta.hot) {
      const hmr = import.meta.hot;

      console.log("🔥 HMR enabled for email components");

      // Handle hot updates for email components
      const handleUpdate = (mod: any) => {
        console.log("🔄 Email component updated via HMR", mod);
        // Small delay to ensure module is updated
        setTimeout(() => {
          importEmails();
        }, 100);
      };

      // Accept updates for each email module individually
      EMAIL_MODULES.forEach((modulePath) => {
        console.log(`📦 Watching for changes: ${modulePath}`);
        hmr.accept(modulePath, handleUpdate);
      });

      // Also listen for any child updates
      hmr.on("vite:beforeUpdate", (event) => {
        console.log("⚡ Vite beforeUpdate event", event);
      });

      hmr.on("vite:afterUpdate", (event) => {
        console.log("✨ Vite afterUpdate event", event);
        importEmails();
      });

      // Cleanup function
      return () => {
        hmr.dispose(() => {
          console.log("🧹 Cleaning up HMR listeners");
        });
      };
    } else {
      console.log("⚠️ HMR not available");
    }
  }, [importEmails]);

  // Memoized getter functions
  const getEmailById = useCallback(
    (id: string): EmailMetadata | undefined => {
      return emails.find((email) => email.id === id);
    },
    [emails],
  );

  const getEmailsByCategory = useCallback(
    (category: string): EmailMetadata[] => {
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
