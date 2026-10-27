"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Code2,
  FileText,
  Mail,
  RotateCcw,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { QUICK_COMMANDS } from "@/data/portfolioData";
import type { ThemeConfig } from "@/lib/theme";

interface CommandDockProps {
  onSendMessage: (text: string) => void;
  onClearChat?: () => void;
  isTyping?: boolean;
  theme: ThemeConfig;
  hasMessages?: boolean;
}

const CMD_ICONS: Record<string, React.ElementType> = {
  about: User,
  skills: Code2,
  projects: Briefcase,
  contact: Mail,
  cv: FileText,
};

export function CommandDock({
  onSendMessage,
  onClearChat,
  isTyping = false,
  theme,
  hasMessages = false,
}: CommandDockProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;
    onSendMessage(input.trim());
    setInput("");
  };

  const handleChipClick = (cmd: string) => {
    if (isTyping) return;
    onSendMessage(cmd);
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 w-full px-3 sm:px-6 pb-4 sm:pb-6 pt-2">
      <div className="max-w-3xl sm:max-w-4xl mx-auto">
        <div
          className={`rounded-2xl sm:rounded-3xl border shadow-2xl p-3 sm:p-4 transition-all duration-300 ${
            theme.isLight
              ? "bg-white/95 backdrop-blur-2xl border-zinc-200 shadow-xl"
              : "bg-zinc-950/95 backdrop-blur-2xl border-zinc-800/90 shadow-2xl"
          }`}
        >
          {/* Quick Action Chips (Enlarged, Black & White Standard, Touch-Friendly on Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2.5 sm:pb-3 px-0.5">
            {QUICK_COMMANDS.slice(0, 7).map((item) => {
              const IconComp = CMD_ICONS[item.command] || Sparkles;
              return (
                <button
                  key={item.command}
                  type="button"
                  onClick={() => handleChipClick(item.command)}
                  disabled={isTyping}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 sm:px-4 sm:py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 disabled:opacity-50 ${
                    theme.isLight
                      ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 hover:border-zinc-300 shadow-sm"
                      : "bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  <IconComp className="w-4 h-4 opacity-75" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Generous Command Input Row (Big & Highly Visible) */}
          <form
            onSubmit={handleSubmit}
            className={`flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 pl-3.5 sm:pl-5 rounded-xl sm:rounded-2xl border transition-all duration-200 min-h-[56px] sm:min-h-[60px] ${
              theme.isLight
                ? "bg-zinc-50 border-zinc-300 focus-within:border-black focus-within:bg-white shadow-inner"
                : "bg-zinc-900/80 border-zinc-800 focus-within:border-zinc-400 focus-within:bg-black/90"
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Sakib (projects, experience, contact)..."
              disabled={isTyping}
              className={`w-full bg-transparent text-base sm:text-lg outline-none font-sans ${
                theme.isLight
                  ? "text-zinc-950 placeholder:text-zinc-400"
                  : "text-zinc-50 placeholder:text-zinc-500"
              }`}
            />

            {/* Clear Button (Visible when chat has history) */}
            {hasMessages && onClearChat && (
              <button
                type="button"
                onClick={onClearChat}
                title="Restart Conversation"
                className={`flex items-center justify-center w-11 h-11 sm:w-11 sm:h-11 rounded-xl transition cursor-pointer flex-shrink-0 ${
                  theme.isLight
                    ? "text-zinc-600 hover:text-black hover:bg-zinc-200"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            {/* Send Button (Big, High Contrast Monochrome) */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              disabled={!input.trim() || isTyping}
              className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl transition font-medium cursor-pointer flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed ${
                theme.isLight
                  ? "bg-black text-white hover:bg-zinc-800 shadow-md"
                  : "bg-white text-black hover:bg-zinc-200 shadow-md"
              }`}
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
