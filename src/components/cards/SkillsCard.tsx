"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Database, Layers, Sparkles } from "lucide-react";
import { useState } from "react";
import { FollowUpChips } from "@/components/cards/FollowUpChips";
import { FOLLOW_UP_MAP, SKILLS_DATA } from "@/data/portfolioData";
import type { ThemeConfig } from "@/lib/theme";

interface SkillsCardProps {
  onSelectCommand: (command: string) => void;
  theme: ThemeConfig;
}

export function SkillsCard({ onSelectCommand, theme }: SkillsCardProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const followUpChips = FOLLOW_UP_MAP.skills;

  const currentCategory = SKILLS_DATA[activeTab];

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 className="w-4 h-4" />;
      case 1:
        return <Database className="w-4 h-4" />;
      case 2:
        return <Layers className="w-4 h-4" />;
      default:
        return <Cpu className="w-4 h-4" />;
    }
  };

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
              <Code2 className="w-5 h-5" />
            </div>
            <h3
              className={`text-xl font-bold ${
                theme.isLight ? "text-zinc-950" : "text-white"
              }`}
            >
              Technical Stack & Proficiency
            </h3>
          </div>
          <p
            className={`text-sm mt-1.5 ${
              theme.isLight ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            Specialized engineering toolkit built for production scalability
          </p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full border font-mono ${
            theme.isLight
              ? "bg-zinc-100 text-zinc-800 border-zinc-300"
              : "bg-zinc-900 text-zinc-200 border-zinc-800"
          }`}
        >
          React 19 Ready
        </span>
      </div>

      {/* Category Tabs */}
      <div
        className={`flex items-center gap-2 mt-5 p-1.5 rounded-xl border overflow-x-auto no-scrollbar ${
          theme.isLight
            ? "bg-zinc-100 border-zinc-200"
            : "bg-zinc-900/60 border-zinc-800"
        }`}
      >
        {SKILLS_DATA.map((cat, idx) => (
          <button
            type="button"
            key={cat.category}
            onClick={() => setActiveTab(idx)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === idx
                ? theme.isLight
                  ? "bg-white text-black shadow font-bold"
                  : "bg-white text-black font-bold shadow-md"
                : theme.isLight
                  ? "text-zinc-600 hover:text-black"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
            }`}
          >
            {getCategoryIcon(idx)}
            <span>{cat.category}</span>
          </button>
        ))}
      </div>

      {/* Category description */}
      <p
        className={`text-sm mt-3.5 italic ${
          theme.isLight ? "text-zinc-600" : "text-zinc-400"
        }`}
      >
        {currentCategory.description}
      </p>

      {/* Skill Progress Bars (Standard Sizing) */}
      <div className="mt-5 space-y-4">
        {currentCategory.skills.map((skill, sIdx) => (
          <div key={skill.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm font-medium">
              <span
                className={theme.isLight ? "text-zinc-800" : "text-zinc-200"}
              >
                {skill.name}
              </span>
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-zinc-500 font-mono">
                  {skill.years}
                </span>
                <span
                  className={`text-xs sm:text-sm font-bold font-mono ${
                    theme.isLight ? "text-zinc-950" : "text-white"
                  }`}
                >
                  {skill.level}%
                </span>
              </div>
            </div>

            <div
              className={`h-2.5 w-full rounded-full overflow-hidden ${
                theme.isLight ? "bg-zinc-200" : "bg-zinc-800"
              }`}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{
                  duration: 0.8,
                  delay: sIdx * 0.08,
                  ease: "easeOut",
                }}
                className={`h-full rounded-full ${
                  theme.isLight ? "bg-zinc-900" : "bg-white"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Stack Badges summary */}
      <div
        className={`mt-6 pt-4 border-t ${
          theme.isLight ? "border-zinc-200" : "border-zinc-800"
        }`}
      >
        <div className="text-xs text-zinc-500 mb-2.5 font-medium flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 opacity-70" />
          Primary Tech Ecosystem:
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "Next.js App Router",
            "TypeScript",
            "Tailwind v4",
            "Framer Motion",
            "React 19",
            "PostgreSQL",
            "MongoDB",
            "Node.js",
            "Docker",
            "Git CI/CD",
          ].map((tech) => (
            <span
              key={tech}
              className={`text-xs sm:text-sm px-3 py-1 rounded-lg border font-mono ${
                theme.isLight
                  ? "bg-zinc-100 text-zinc-800 border-zinc-200"
                  : "bg-zinc-900 text-zinc-200 border-zinc-800"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
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
