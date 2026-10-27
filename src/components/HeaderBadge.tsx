"use client";

import { motion } from "framer-motion";
import { RotateCcw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { PORTFOLIO_OWNER } from "@/data/portfolioData";
import type { ThemeConfig } from "@/lib/theme";

interface HeaderBadgeProps {
  theme: ThemeConfig;
  onResetChat?: () => void;
  messageCount?: number;
}

export function HeaderBadge({
  theme,
  onResetChat,
  messageCount = 0,
}: HeaderBadgeProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-4 left-4 sm:top-5 sm:left-6 z-40 max-w-[calc(100vw-6rem)]"
    >
      <div
        className={`flex items-center gap-2.5 p-2 pr-4 rounded-full border shadow-xl backdrop-blur-2xl transition-all duration-300 ${
          theme.isLight
            ? "bg-white/95 border-zinc-200 text-zinc-900 shadow-zinc-200/60"
            : "bg-zinc-950/95 border-zinc-800 text-white shadow-black/60"
        }`}
      >
        {/* Avatar */}
        <div
          className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden flex-shrink-0 ring-1 ${
            theme.isLight ? "ring-zinc-300" : "ring-zinc-700"
          }`}
        >
          <img
            src={PORTFOLIO_OWNER.avatarUrl}
            alt={PORTFOLIO_OWNER.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Identity Info */}
        <div className="flex items-center gap-2 leading-none">
          <span className="font-bold text-sm truncate">
            {PORTFOLIO_OWNER.name}
          </span>
          <span
            className={`text-xs sm:text-sm hidden sm:inline ${
              theme.isLight ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            · {PORTFOLIO_OWNER.roleTagline}
          </span>
        </div>

        {/* Admin Link Badge */}
        <Link
          href="/admin"
          title="Open Admin Dashboard"
          className={`p-1.5 rounded-full transition ml-1 ${
            theme.isLight
              ? "text-zinc-500 hover:text-black hover:bg-zinc-100"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
        </Link>

        {/* Reset Chat Button */}
        {messageCount > 0 && onResetChat && (
          <button
            type="button"
            onClick={onResetChat}
            title="Reset conversation"
            className={`p-1.5 rounded-full transition cursor-pointer ${
              theme.isLight
                ? "text-zinc-500 hover:text-black hover:bg-zinc-100"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.header>
  );
}
