"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Clock,
  Code2,
  FileText,
  GraduationCap,
  Heart,
  HelpCircle,
  Mail,
  Sparkles,
  Trophy,
  User,
} from "lucide-react";
import type { ThemeConfig } from "@/lib/theme";
import type { FollowUpChip } from "@/types/chat";

interface FollowUpChipsProps {
  chips: FollowUpChip[];
  onSelectCommand: (command: string) => void;
  theme: ThemeConfig;
}

const ICON_MAP: Record<string, React.ElementType> = {
  about: User,
  skills: Code2,
  projects: Briefcase,
  experience: Clock,
  contact: Mail,
  cv: FileText,
  education: GraduationCap,
  awards: Trophy,
  clients: Sparkles,
  hobbies: Heart,
  age: Calendar,
  help: HelpCircle,
};

export function FollowUpChips({
  chips,
  onSelectCommand,
  theme,
}: FollowUpChipsProps) {
  if (!chips || chips.length === 0) return null;

  return (
    <div
      className={`mt-5 pt-3.5 border-t flex flex-wrap items-center gap-2 ${
        theme.isLight ? "border-zinc-200" : "border-zinc-800"
      }`}
    >
      <span
        className={`text-xs sm:text-sm font-medium mr-1.5 flex items-center gap-1.5 ${
          theme.isLight ? "text-zinc-500" : "text-zinc-400"
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 opacity-70" /> Suggested next:
      </span>
      {chips.map((chip, idx) => {
        const IconComponent = ICON_MAP[chip.command] || ArrowRight;
        return (
          <motion.button
            key={`${chip.command}-${idx}`}
            type="button"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectCommand(chip.command)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              theme.isLight
                ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 shadow-sm"
                : "bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 hover:text-white"
            }`}
          >
            <IconComponent className="w-3.5 h-3.5 opacity-70" />
            <span>{chip.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
