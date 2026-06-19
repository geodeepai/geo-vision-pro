"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/components/AuthProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
