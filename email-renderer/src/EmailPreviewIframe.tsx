import React from "react";

interface EmailPreviewIFrameProps {
  html: string;
  className?: string;
}

export const EmailPreviewIframe: React.FC<EmailPreviewIFrameProps> = ({
  html,
  className = "w-full h-full border-0 overflow-scroll",
}) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};
