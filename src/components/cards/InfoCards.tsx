"use client";

import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  FileCheck,
  FileText,
  GraduationCap,
  HelpCircle,
} from "lucide-react";
import { FollowUpChips } from "@/components/cards/FollowUpChips";
import {
  AGE_DATA,
  AWARDS_DATA,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  FOLLOW_UP_MAP,
  PORTFOLIO_OWNER,
  QUICK_COMMANDS,
} from "@/data/portfolioData";
import type { ThemeConfig } from "@/lib/theme";
import type { CommandType, ExperienceItem } from "@/types/chat";

interface InfoCardProps {
  type: CommandType | string;
  onSelectCommand: (command: string) => void;
  theme: ThemeConfig;
  experiences?: ExperienceItem[];
}

export function InfoCards({
  type,
  onSelectCommand,
  theme,
  experiences = EXPERIENCE_DATA,
}: InfoCardProps) {
  // 1. AGE & JOURNEY
  if (type === "age") {
    const followUpChips = FOLLOW_UP_MAP.age;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 md:p-7 border ${
          theme.isLight
            ? "bg-white border-zinc-200 shadow-lg text-zinc-900"
            : "bg-zinc-950/85 border-zinc-800 shadow-2xl text-zinc-100"
        } relative overflow-hidden max-w-2xl w-full`}
      >
        <div
          className={`flex items-center justify-between pb-4 border-b ${
            theme.isLight ? "border-zinc-200" : "border-zinc-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-xl border ${
                theme.isLight
                  ? "bg-zinc-100 border-zinc-200 text-zinc-900"
                  : "bg-zinc-900 border-zinc-700 text-white"
              }`}
            >
              <Calendar className="w-5 h-5" />
            </div>
            <h3
              className={`text-xl font-bold ${
                theme.isLight ? "text-zinc-950" : "text-white"
              }`}
            >
              Age & Developer Journey
            </h3>
          </div>
          <span
            className={`text-xs px-3 py-1.5 rounded-full border font-mono ${
              theme.isLight
                ? "border-zinc-300 text-zinc-700 bg-zinc-100"
                : "border-zinc-800 text-zinc-300 bg-zinc-900"
            }`}
          >
            Born 1999
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div
            className={`p-4 rounded-xl border text-center ${
              theme.isLight
                ? "bg-zinc-50 border-zinc-200"
                : "bg-zinc-900/60 border-zinc-800"
            }`}
          >
            <div
              className={`text-2xl font-black ${
                theme.isLight ? "text-zinc-950" : "text-white"
              }`}
            >
              {AGE_DATA.ageYears}
            </div>
            <div className="text-xs text-zinc-500 font-medium mt-1">
              Years of Age
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border text-center ${
              theme.isLight
                ? "bg-zinc-50 border-zinc-200"
                : "bg-zinc-900/60 border-zinc-800"
            }`}
          >
            <div
              className={`text-2xl font-black ${
                theme.isLight ? "text-zinc-950" : "text-white"
              }`}
            >
              {AGE_DATA.journeyStartedYear}
            </div>
            <div className="text-xs text-zinc-500 font-medium mt-1">
              Journey Started
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border text-center ${
              theme.isLight
                ? "bg-zinc-50 border-zinc-200"
                : "bg-zinc-900/60 border-zinc-800"
            }`}
          >
            <div
              className={`text-2xl font-black ${
                theme.isLight ? "text-zinc-950" : "text-white"
              }`}
            >
              {AGE_DATA.totalYearsCoding}
            </div>
            <div className="text-xs text-zinc-500 font-medium mt-1">
              Coding Experience
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border text-center ${
              theme.isLight
                ? "bg-zinc-50 border-zinc-200"
                : "bg-zinc-900/60 border-zinc-800"
            }`}
          >
            <div
              className={`text-2xl font-black ${
                theme.isLight ? "text-zinc-950" : "text-white"
              }`}
            >
              {AGE_DATA.cupsOfCoffee}
            </div>
            <div className="text-xs text-zinc-500 font-medium mt-1">
              Cups of Coffee
            </div>
          </div>
        </div>

        <div
          className={`space-y-3 text-sm leading-relaxed p-4 rounded-2xl border ${
            theme.isLight
              ? "bg-zinc-50 border-zinc-200 text-zinc-700"
              : "bg-zinc-900/40 border-zinc-800 text-zinc-300"
          }`}
        >
          <div className="text-xs text-zinc-500 font-mono uppercase">
            Engineering Philosophy
          </div>
          <p className="italic font-medium">"{AGE_DATA.favoriteQuote}"</p>
          <p className="text-xs text-zinc-500">
            Total active commits: {AGE_DATA.totalCommits}
          </p>
        </div>

        <FollowUpChips
          chips={followUpChips}
          onSelectCommand={onSelectCommand}
          theme={theme}
        />
      </motion.div>
    );
  }

  // 2. CV / RESUME
  if (type === "cv") {
    const followUpChips = FOLLOW_UP_MAP.cv;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 md:p-7 border ${
          theme.isLight
            ? "bg-white border-zinc-200 shadow-lg text-zinc-900"
            : "bg-zinc-950/85 border-zinc-800 shadow-2xl text-zinc-100"
        } relative overflow-hidden max-w-2xl w-full`}
      >
        <div
          className={`flex items-center justify-between pb-4 border-b ${
            theme.isLight ? "border-zinc-200" : "border-zinc-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-xl border ${
                theme.isLight
                  ? "bg-zinc-100 border-zinc-200 text-zinc-900"
                  : "bg-zinc-900 border-zinc-700 text-white"
              }`}
            >
              <FileText className="w-5 h-5" />
            </div>
            <h3
              className={`text-xl font-bold ${
                theme.isLight ? "text-zinc-950" : "text-white"
              }`}
            >
              Curriculum Vitae / Resume
            </h3>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full border font-mono ${
              theme.isLight
                ? "bg-zinc-100 border-zinc-300 text-zinc-800"
                : "bg-zinc-900 border-zinc-800 text-zinc-200"
            }`}
          >
            Updated 2026
          </span>
        </div>

        <div
          className={`my-5 p-5 rounded-2xl border ${
            theme.isLight
              ? "bg-zinc-50 border-zinc-200"
              : "bg-zinc-900/50 border-zinc-800"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h4
                className={`text-lg font-bold ${
                  theme.isLight ? "text-zinc-950" : "text-white"
                }`}
              >
                {PORTFOLIO_OWNER.name}
              </h4>
              <p
                className={`text-sm font-medium mt-1 ${
                  theme.isLight ? "text-zinc-700" : "text-zinc-300"
                }`}
              >
                {PORTFOLIO_OWNER.title}
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                {PORTFOLIO_OWNER.location} · {PORTFOLIO_OWNER.email}
              </p>
            </div>
            <div
              className={`p-3 rounded-xl border flex-shrink-0 ${
                theme.isLight
                  ? "bg-white border-zinc-300 text-zinc-900"
                  : "bg-zinc-950 border-zinc-800 text-white"
              }`}
            >
              <FileCheck className="w-6 h-6" />
            </div>
          </div>

          <div
            className={`mt-4 pt-4 border-t text-sm space-y-2 ${
              theme.isLight
                ? "border-zinc-200 text-zinc-700"
                : "border-zinc-800 text-zinc-300"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 opacity-75 flex-shrink-0" />
              <span>
                5+ years professional experience in production Next.js & React
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 opacity-75 flex-shrink-0" />
              <span>
                Full track record in SaaS, Fintech terminals & Design Systems
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 opacity-75 flex-shrink-0" />
              <span>
                B.Sc. in Computer Science & Engineering (Dean's Honor List)
              </span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                alert(
                  "Downloading: Md_Sakib_Resume_2026.pdf is downloaded successfully.",
                );
              }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-md cursor-pointer ${
                theme.isLight
                  ? "bg-black text-white hover:bg-zinc-800"
                  : "bg-white text-black hover:bg-zinc-200"
              }`}
            >
              <Download className="w-4 h-4" /> Download Full CV (PDF)
            </button>
            <button
              type="button"
              onClick={() => onSelectCommand("experience")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition cursor-pointer ${
                theme.isLight
                  ? "border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900"
                  : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white"
              }`}
            >
              <Briefcase className="w-4 h-4 opacity-75" /> View Timeline
            </button>
          </div>
        </div>

        <FollowUpChips
          chips={followUpChips}
          onSelectCommand={onSelectCommand}
          theme={theme}
        />
      </motion.div>
    );
  }

  // 3. EDUCATION
  if (type === "education") {
    const followUpChips = FOLLOW_UP_MAP.education;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 md:p-7 border ${
          theme.isLight
            ? "bg-white border-zinc-200 shadow-lg text-zinc-900"
            : "bg-zinc-950/85 border-zinc-800 shadow-2xl text-zinc-100"
        } relative overflow-hidden max-w-2xl w-full`}
      >
        <div
          className={`flex items-center justify-between pb-4 border-b ${
            theme.isLight ? "border-zinc-200" : "border-zinc-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-xl border ${
                theme.isLight
                  ? "bg-zinc-100 border-zinc-200 text-zinc-900"
                  : "bg-zinc-900 border-zinc-700 text-white"
              }`}
            >
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3
              className={`text-xl font-bold ${
                theme.isLight ? "text-zinc-950" : "text-white"
              }`}
            >
              Academic Background
            </h3>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full border font-mono ${
              theme.isLight
                ? "bg-zinc-100 border-zinc-300 text-zinc-800"
                : "bg-zinc-900 border-zinc-800 text-zinc-200"
            }`}
          >
            Computer Science
          </span>
        </div>

        <div className="space-y-4 my-5">
          {EDUCATION_DATA.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border ${
                theme.isLight
                  ? "bg-zinc-50 border-zinc-200"
                  : "bg-zinc-900/50 border-zinc-800"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <h4
                  className={`text-base font-bold ${
                    theme.isLight ? "text-zinc-950" : "text-white"
                  }`}
                >
                  {item.degree}
                </h4>
                <span className="text-xs font-mono text-zinc-500">
                  {item.period}
                </span>
              </div>
              <p
                className={`text-sm font-medium mt-1 ${
                  theme.isLight ? "text-zinc-700" : "text-zinc-300"
                }`}
              >
                {item.institution} · {item.grade}
              </p>
              <div className="space-y-1 mt-2.5">
                {item.highlights.map((h) => (
                  <p
                    key={h}
                    className={`text-sm leading-relaxed ${
                      theme.isLight ? "text-zinc-600" : "text-zinc-400"
                    }`}
                  >
                    • {h}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <FollowUpChips
          chips={followUpChips}
          onSelectCommand={onSelectCommand}
          theme={theme}
        />
      </motion.div>
    );
  }

  // 4. EXPERIENCE TIMELINE (Using Dynamic Experiences from MongoDB/API)
  if (type === "experience") {
    const followUpChips = FOLLOW_UP_MAP.experience;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 md:p-7 border ${
          theme.isLight
            ? "bg-white border-zinc-200 shadow-lg text-zinc-900"
            : "bg-zinc-950/85 border-zinc-800 shadow-2xl text-zinc-100"
        } relative overflow-hidden max-w-2xl w-full`}
      >
        <div
          className={`flex items-center justify-between pb-4 border-b ${
            theme.isLight ? "border-zinc-200" : "border-zinc-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-xl border ${
                theme.isLight
                  ? "bg-zinc-100 border-zinc-200 text-zinc-900"
                  : "bg-zinc-900 border-zinc-700 text-white"
              }`}
            >
              <Clock className="w-5 h-5" />
            </div>
            <h3
              className={`text-xl font-bold ${
                theme.isLight ? "text-zinc-950" : "text-white"
              }`}
            >
              Professional Career Timeline
            </h3>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full border font-mono ${
              theme.isLight
                ? "bg-zinc-100 border-zinc-300 text-zinc-800"
                : "bg-zinc-900 border-zinc-800 text-zinc-200"
            }`}
          >
            {experiences.length} Positions
          </span>
        </div>

        {/* Timeline list */}
        <div
          className={`relative pl-6 space-y-6 my-5 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 ${
            theme.isLight ? "before:bg-zinc-300" : "before:bg-zinc-800"
          }`}
        >
          {experiences.map((exp) => (
            <div key={exp.id || exp.role} className="relative">
              {/* Timeline marker */}
              <div
                className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full ring-4 ${
                  theme.isLight
                    ? "bg-black ring-white"
                    : "bg-white ring-zinc-950"
                }`}
              />

              <div
                className={`p-5 rounded-2xl border ${
                  theme.isLight
                    ? "bg-zinc-50 border-zinc-200"
                    : "bg-zinc-900/50 border-zinc-800"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4
                    className={`text-base font-bold ${
                      theme.isLight ? "text-zinc-950" : "text-white"
                    }`}
                  >
                    {exp.role}
                  </h4>
                  <span className="text-xs font-mono font-semibold text-zinc-500">
                    {exp.period}
                  </span>
                </div>

                <div
                  className={`text-xs sm:text-sm font-medium mt-1 flex items-center gap-2 ${
                    theme.isLight ? "text-zinc-700" : "text-zinc-300"
                  }`}
                >
                  <span className="font-semibold">{exp.company}</span>
                  <span>·</span>
                  <span className="text-zinc-500">{exp.location}</span>
                </div>

                <p
                  className={`text-sm mt-2.5 leading-relaxed ${
                    theme.isLight ? "text-zinc-600" : "text-zinc-300"
                  }`}
                >
                  {exp.description}
                </p>

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div
                    className={`mt-3 space-y-1.5 text-xs sm:text-sm ${
                      theme.isLight ? "text-zinc-700" : "text-zinc-300"
                    }`}
                  >
                    {exp.achievements.map((ach) => (
                      <div key={ach} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 opacity-60 flex-shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Pills */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className={`text-xs px-2.5 py-0.5 rounded-md font-mono border ${
                          theme.isLight
                            ? "bg-white text-zinc-800 border-zinc-300"
                            : "bg-zinc-950 text-zinc-300 border-zinc-800"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <FollowUpChips
          chips={followUpChips}
          onSelectCommand={onSelectCommand}
          theme={theme}
        />
      </motion.div>
    );
  }

  // 5. AWARDS
  if (type === "awards") {
    const followUpChips = FOLLOW_UP_MAP.awards;
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 md:p-7 border ${
          theme.isLight
            ? "bg-white border-zinc-200 shadow-lg text-zinc-900"
            : "bg-zinc-950/85 border-zinc-800 shadow-2xl text-zinc-100"
        } relative overflow-hidden max-w-2xl w-full`}
      >
        <div
          className={`flex items-center justify-between pb-4 border-b ${
            theme.isLight ? "border-zinc-200" : "border-zinc-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-xl border ${
                theme.isLight
                  ? "bg-zinc-100 border-zinc-200 text-zinc-900"
                  : "bg-zinc-900 border-zinc-700 text-white"
              }`}
            >
              <Award className="w-5 h-5" />
            </div>
            <h3
              className={`text-xl font-bold ${
                theme.isLight ? "text-zinc-950" : "text-white"
              }`}
            >
              Honors & Certifications
            </h3>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full border font-mono ${
              theme.isLight
                ? "bg-zinc-100 border-zinc-300 text-zinc-800"
                : "bg-zinc-900 border-zinc-800 text-zinc-200"
            }`}
          >
            Verified Credentials
          </span>
        </div>

        <div className="space-y-4 my-5">
          {AWARDS_DATA.map((award) => (
            <div
              key={award.id}
              className={`p-5 rounded-2xl border ${
                theme.isLight
                  ? "bg-zinc-50 border-zinc-200"
                  : "bg-zinc-900/50 border-zinc-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
                  {award.year}
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  {award.organization}
                </span>
              </div>
              <h4
                className={`text-base font-bold mt-2 ${
                  theme.isLight ? "text-zinc-950" : "text-white"
                }`}
              >
                {award.title}
              </h4>
              <p
                className={`text-sm mt-1 leading-relaxed ${
                  theme.isLight ? "text-zinc-600" : "text-zinc-300"
                }`}
              >
                {award.description}
              </p>
            </div>
          ))}
        </div>

        <FollowUpChips
          chips={followUpChips}
          onSelectCommand={onSelectCommand}
          theme={theme}
        />
      </motion.div>
    );
  }

  // 6. DEFAULT / HELP / COMMANDS DIRECTORY
  const helpChips = FOLLOW_UP_MAP.help;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-6 md:p-7 border ${
        theme.isLight
          ? "bg-white border-zinc-200 shadow-lg text-zinc-900"
          : "bg-zinc-950/85 border-zinc-800 shadow-2xl text-zinc-100"
      } relative overflow-hidden max-w-2xl w-full`}
    >
      <div
        className={`flex items-center justify-between pb-4 border-b ${
          theme.isLight ? "border-zinc-200" : "border-zinc-800"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl border ${
              theme.isLight
                ? "bg-zinc-100 border-zinc-200 text-zinc-900"
                : "bg-zinc-900 border-zinc-700 text-white"
            }`}
          >
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3
            className={`text-xl font-bold ${
              theme.isLight ? "text-zinc-950" : "text-white"
            }`}
          >
            Interactive Command Directory
          </h3>
        </div>
        <span
          className={`text-xs px-3 py-1 rounded-full border font-mono ${
            theme.isLight
              ? "bg-zinc-100 border-zinc-300 text-zinc-800"
              : "bg-zinc-900 border-zinc-800 text-zinc-200"
          }`}
        >
          {QUICK_COMMANDS.length} Commands
        </span>
      </div>

      <p
        className={`text-sm mt-4 leading-relaxed ${
          theme.isLight ? "text-zinc-600" : "text-zinc-300"
        }`}
      >
        You can type naturally or click any of the quick-action commands below
        to explore Sakib's background:
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-5">
        {QUICK_COMMANDS.map((item) => (
          <button
            key={item.command}
            type="button"
            onClick={() => onSelectCommand(item.command)}
            className={`p-3 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
              theme.isLight
                ? "bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-900"
                : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white"
            }`}
          >
            <span className="font-mono text-sm font-semibold">
              {item.command}
            </span>
            <span className="text-xs text-zinc-500">{item.label}</span>
          </button>
        ))}
      </div>

      <FollowUpChips
        chips={helpChips}
        onSelectCommand={onSelectCommand}
        theme={theme}
      />
    </motion.div>
  );
}
