"use client";

import { motion } from "framer-motion";
import { Coffee, Heart, Keyboard, Moon, Palette, Sparkles } from "lucide-react";
import { FollowUpChips } from "@/components/cards/FollowUpChips";
import { FOLLOW_UP_MAP, HOBBIES_DATA } from "@/data/portfolioData";
import type { ThemeConfig } from "@/lib/theme";

interface HobbiesCardProps {
  onSelectCommand: (command: string) => void;
  theme: ThemeConfig;
}

const HOBBY_ICONS: Record<string, React.ElementType> = {
  Palette,
  Coffee,
  Keyboard,
  Moon,
};

export function HobbiesCard({ onSelectCommand, theme }: HobbiesCardProps) {
  const followUpChips = FOLLOW_UP_MAP.hobbies;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl p-6 md:p-7 border ${
        theme.isLight
          ? "bg-white border-zinc-200 shadow-lg text-zinc-900"
          : "bg-zinc-950/85 border-zinc-800 shadow-2xl text-zinc-100"
      } relative overflow-hidden max-w-2xl w-full`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between pb-4 border-b ${
          theme.isLight ? "border-zinc-200" : "border-zinc-800"
        }`}
      >
        <div>
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-xl border ${
                theme.isLight
                  ? "bg-zinc-100 border-zinc-200 text-zinc-900"
                  : "bg-zinc-900 border-zinc-700 text-white"
              }`}
            >
              <Heart className="w-5 h-5" />
            </div>
            <h3
              className={`text-xl font-bold ${
                theme.isLight ? "text-zinc-950" : "text-white"
              }`}
            >
              Creative Outlets & Passions
            </h3>
          </div>
          <p
            className={`text-sm mt-1.5 ${
              theme.isLight ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            What keeps curiosity sparked outside of shipping code
          </p>
        </div>

        <span
          className={`text-xs px-3 py-1.5 rounded-full border font-medium ${
            theme.isLight
              ? "bg-zinc-100 text-zinc-800 border-zinc-300"
              : "bg-zinc-900 text-zinc-200 border-zinc-800"
          }`}
        >
          Beyond The Screen
        </span>
      </div>

      {/* Hobbies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        {HOBBIES_DATA.map((hobby, idx) => {
          const IconComp = HOBBY_ICONS[hobby.icon] || Sparkles;
          return (
            <motion.div
              key={hobby.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`p-4 rounded-xl border flex flex-col justify-between ${
                theme.isLight
                  ? "bg-zinc-50 border-zinc-200"
                  : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2 rounded-lg border ${
                      theme.isLight
                        ? "bg-white border-zinc-200 text-zinc-900"
                        : "bg-zinc-950 border-zinc-800 text-white"
                    }`}
                  >
                    <IconComp className="w-4 h-4 opacity-80" />
                  </div>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    {hobby.category}
                  </span>
                </div>

                <h4
                  className={`text-base font-bold mt-3 ${
                    theme.isLight ? "text-zinc-950" : "text-white"
                  }`}
                >
                  {hobby.name}
                </h4>

                <p
                  className={`text-sm mt-1 leading-relaxed ${
                    theme.isLight ? "text-zinc-600" : "text-zinc-300"
                  }`}
                >
                  {hobby.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-zinc-200 dark:border-zinc-800">
                <span
                  className={`text-xs px-2.5 py-1 rounded border font-mono inline-block ${
                    theme.isLight
                      ? "bg-white text-zinc-800 border-zinc-300"
                      : "bg-zinc-950 text-zinc-400 border-zinc-800"
                  }`}
                >
                  {hobby.stats}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Follow-up chips */}
      <FollowUpChips
        chips={followUpChips}
        onSelectCommand={onSelectCommand}
        theme={theme}
      />
    </motion.div>
  );
}
