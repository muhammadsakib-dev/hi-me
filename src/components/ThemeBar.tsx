"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import type { ThemeConfig } from "@/lib/theme";
import type { ThemeMode } from "@/types/chat";

interface ThemeBarProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  themeConfig: ThemeConfig;
}

export function ThemeBar({
  currentTheme,
  onThemeChange,
  themeConfig,
}: ThemeBarProps) {
  const isDark = currentTheme === "dark";

  return (
    <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-40">
      <div
        className={`flex items-center p-1.5 rounded-full border shadow-xl backdrop-blur-2xl transition-all duration-300 ${
          themeConfig.isLight
            ? "bg-white/95 border-zinc-200 text-zinc-900 shadow-zinc-200/60"
            : "bg-zinc-950/95 border-zinc-800 text-white shadow-black/60"
        }`}
      >
        {/* Dark Mode Button */}
        <button
          type="button"
          onClick={() => onThemeChange("dark")}
          className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
            isDark
              ? "text-black"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
          }`}
          aria-label="Switch to Dark Mode"
        >
          {isDark && (
            <motion.div
              layoutId="theme-pill"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="absolute inset-0 rounded-full bg-white shadow-sm"
            />
          )}
          <Moon
            className={`w-4 h-4 relative z-10 ${
              isDark ? "text-black" : "text-zinc-400"
            }`}
          />
          <span className="hidden sm:inline relative z-10">Dark</span>
        </button>

        {/* Light Mode Button */}
        <button
          type="button"
          onClick={() => onThemeChange("light")}
          className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
            !isDark
              ? "text-white"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
          }`}
          aria-label="Switch to Light Mode"
        >
          {!isDark && (
            <motion.div
              layoutId="theme-pill"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="absolute inset-0 rounded-full bg-black shadow-sm"
            />
          )}
          <Sun
            className={`w-4 h-4 relative z-10 ${
              !isDark ? "text-white" : "text-zinc-400"
            }`}
          />
          <span
            className={`hidden sm:inline relative z-10 ${
              !isDark ? "text-white" : "text-zinc-400"
            }`}
          >
            Light
          </span>
        </button>
      </div>
    </div>
  );
}
