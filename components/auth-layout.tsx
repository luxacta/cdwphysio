"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface AuthLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export function AuthLayout({ header, children }: AuthLayoutProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // To prevent hydration mismatch issues in Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine the active theme (system or user-set)
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Handle mount delay
  if (!mounted) {
    return (
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">{header}</div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">{children}</div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block"></div>
      </div>
    );
  }

  // Choose BioDigital background color based on theme
  const bgColor = currentTheme === "dark" ? "0.059,0.090,0.165,1,0.059,0.090,0.165,1" : "1,1,1,1,1,1,1,1";

  // Construct dynamic iframe URL
  const iframeUrl = `https://human.biodigital.com/widget/?be=2Ejx&background.colors=${bgColor}&initial.hand-hint=true&ui-fullscreen=true&ui-center=false&ui-dissect=true&ui-zoom=true&ui-help=true&ui-tools-display=primary&ui-info=true&uaid=3bF12`;

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">{header}</div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <iframe
          key={currentTheme}
          src={iframeUrl}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen></iframe>
      </div>
    </div>
  );
}
