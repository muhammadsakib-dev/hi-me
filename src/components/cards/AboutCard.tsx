"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Sparkles } from "lucide-react";
import { FollowUpChips } from "@/components/cards/FollowUpChips";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/Icons";
import { FOLLOW_UP_MAP, PORTFOLIO_OWNER } from "@/data/portfolioData";
import type { ThemeConfig } from "@/lib/theme";

interface AboutCardProps {
  onSelectCommand: (command: string) => void;
  theme: ThemeConfig;
}

export function AboutCard({ onSelectCommand, theme }: AboutCardProps) {
  const followUpChips = FOLLOW_UP_MAP.about;

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
      {/* Header Profile Info */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center gap-4 pb-5 border-b ${
          theme.isLight ? "border-zinc-200" : "border-zinc-800"
        }`}
      >
        <div
          className={`relative w-18 h-18 rounded-2xl overflow-hidden ring-2 shadow-md flex-shrink-0 ${
            theme.isLight ? "ring-zinc-300" : "ring-zinc-700"
          }`}
        >
          <img
            src={PORTFOLIO_OWNER.avatarUrl}
            alt={PORTFOLIO_OWNER.name}
            className="w-full h-full object-cover object-top"
          />
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-white dark:bg-zinc-100 ring-2 ring-black animate-pulse" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={`text-2xl font-bold ${
                theme.isLight ? "text-zinc-950" : "text-white"
              }`}
            >
              {PORTFOLIO_OWNER.name}
            </h3>
            <span
              className={`text-xs px-3 py-1 rounded-full border font-medium ${
                theme.isLight
                  ? "bg-zinc-100 text-zinc-800 border-zinc-300"
                  : "bg-zinc-900 text-zinc-200 border-zinc-800"
              }`}
            >
              {PORTFOLIO_OWNER.status}
            </span>
          </div>
          <p
            className={`text-base mt-1 font-medium ${
              theme.isLight ? "text-zinc-600" : "text-zinc-300"
            }`}
          >
            {PORTFOLIO_OWNER.title}
          </p>
          <div
            className={`flex items-center gap-4 text-xs sm:text-sm mt-2 ${
              theme.isLight ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 opacity-75" />
              {PORTFOLIO_OWNER.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 opacity-75" />
              Full Stack Focus
            </span>
          </div>
        </div>
      </div>

      {/* Bio text (Standard Sizing) */}
      <div
        className={`mt-5 text-sm sm:text-base leading-relaxed space-y-3 ${
          theme.isLight ? "text-zinc-700" : "text-zinc-300"
        }`}
      >
        <p>
          I am a specialized{" "}
          <strong
            className={`font-semibold ${
              theme.isLight ? "text-zinc-950" : "text-white"
            }`}
          >
            Frontend Architect & Creative Engineer
          </strong>{" "}
          with a strong focus on high-performance web applications, fluid
          physics, and scalable design systems.
        </p>
        <p>
          Over the past 5+ years, I have architected and scaled complex digital
          products ranging from real-time financial trading dashboards and
          generative AI workspaces to open-source UI component suites.
        </p>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-3 gap-3 my-5">
        <div
          className={`p-3.5 rounded-xl border text-center ${
            theme.isLight
              ? "bg-zinc-50 border-zinc-200"
              : "bg-zinc-900/60 border-zinc-800"
          }`}
        >
          <div
            className={`text-xl sm:text-2xl font-black ${
              theme.isLight ? "text-zinc-950" : "text-white"
            }`}
          >
            {PORTFOLIO_OWNER.experienceYears}
          </div>
          <div className="text-xs text-zinc-500 mt-1 font-medium">
            Years Experience
          </div>
        </div>
        <div
          className={`p-3.5 rounded-xl border text-center ${
            theme.isLight
              ? "bg-zinc-50 border-zinc-200"
              : "bg-zinc-900/60 border-zinc-800"
          }`}
        >
          <div
            className={`text-xl sm:text-2xl font-black ${
              theme.isLight ? "text-zinc-950" : "text-white"
            }`}
          >
            {PORTFOLIO_OWNER.projectsCompleted}
          </div>
          <div className="text-xs text-zinc-500 mt-1 font-medium">
            Shipped Projects
          </div>
        </div>
        <div
          className={`p-3.5 rounded-xl border text-center ${
            theme.isLight
              ? "bg-zinc-50 border-zinc-200"
              : "bg-zinc-900/60 border-zinc-800"
          }`}
        >
          <div
            className={`text-xl sm:text-2xl font-black ${
              theme.isLight ? "text-zinc-950" : "text-white"
            }`}
          >
            {PORTFOLIO_OWNER.clientsSatisfied}
          </div>
          <div className="text-xs text-zinc-500 mt-1 font-medium">
            Satisfaction Rate
          </div>
        </div>
      </div>

      {/* Highlights Checkmarks (Standard Sizing) */}
      <div className="space-y-2 my-4 text-xs sm:text-sm">
        <div
          className={`flex items-center gap-2.5 ${
            theme.isLight ? "text-zinc-700" : "text-zinc-300"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 opacity-75 flex-shrink-0" />
          <span>Next.js App Router & React 19 architecture specialist</span>
        </div>
        <div
          className={`flex items-center gap-2.5 ${
            theme.isLight ? "text-zinc-700" : "text-zinc-300"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 opacity-75 flex-shrink-0" />
          <span>Framer Motion & fluid physics-based micro-interactions</span>
        </div>
        <div
          className={`flex items-center gap-2.5 ${
            theme.isLight ? "text-zinc-700" : "text-zinc-300"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 opacity-75 flex-shrink-0" />
          <span>Tailwind CSS v4 & modern tokenized design systems</span>
        </div>
      </div>

      {/* Social and Action Links */}
      <div
        className={`flex items-center gap-2.5 pt-4 border-t flex-wrap ${
          theme.isLight ? "border-zinc-200" : "border-zinc-800"
        }`}
      >
        <a
          href={PORTFOLIO_OWNER.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition ${
            theme.isLight
              ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-zinc-300"
              : "bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-800 hover:text-white"
          }`}
        >
          <GithubIcon className="w-4 h-4" /> GitHub
        </a>
        <a
          href={PORTFOLIO_OWNER.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition ${
            theme.isLight
              ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-zinc-300"
              : "bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-800 hover:text-white"
          }`}
        >
          <LinkedinIcon className="w-4 h-4" /> LinkedIn
        </a>
        <a
          href={PORTFOLIO_OWNER.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition ${
            theme.isLight
              ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-zinc-300"
              : "bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-800 hover:text-white"
          }`}
        >
          <TwitterIcon className="w-4 h-4" /> Twitter/X
        </a>
        <button
          type="button"
          onClick={() => onSelectCommand("contact")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold ml-auto transition shadow-sm cursor-pointer ${
            theme.isLight
              ? "bg-black text-white hover:bg-zinc-800"
              : "bg-white text-black hover:bg-zinc-200"
          }`}
        >
          <Mail className="w-4 h-4" /> Get in Touch
        </button>
      </div>

      {/* Next follow-up chips */}
      <FollowUpChips
        chips={followUpChips}
        onSelectCommand={onSelectCommand}
        theme={theme}
      />
    </motion.div>
  );
}
