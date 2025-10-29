import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { inconsolata, inter, kodeMono, notoSans, outfit } from "@/lib/font";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "CDWPHYSIO | Fracture Clinical Data Warehouse",
  description:
    "CDWPHYSIO is a modern, secure, and scalable clinical data warehouse focused on managing and analyzing fracture-related healthcare data for research and clinical decision-making.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inconsolata.variable} ${outfit.variable} ${kodeMono.variable} ${inter.variable} ${notoSans.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors={true} />
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
