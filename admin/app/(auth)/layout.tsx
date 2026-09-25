"use client";

import { ThemeProvider } from "next-themes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      forcedTheme="light"
      enableSystem={false}
    >
      <main className="min-h-screen bg-background text-foreground">
        {children}
      </main>
    </ThemeProvider>
  );
}