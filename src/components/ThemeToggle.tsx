"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ scrolled }: { scrolled?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /* Avoid hydration mismatch — render only after mount */
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-white/10"
      style={{ color: scrolled ? "var(--nav-text)" : "rgba(255,255,255,0.7)" }}
    >
      {isDark ? (
        <Sun size={17} className="transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Moon size={17} className="transition-transform duration-300 rotate-0 scale-100" />
      )}
    </button>
  );
}
