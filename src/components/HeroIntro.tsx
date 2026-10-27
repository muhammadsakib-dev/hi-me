"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Mail,
  Quote,
  Star,
  User,
} from "lucide-react";
import { PORTFOLIO_OWNER, TESTIMONIALS_DATA } from "@/data/portfolioData";
import type { ThemeConfig } from "@/lib/theme";

interface HeroIntroProps {
  onSelectCommand: (command: string) => void;
  theme: ThemeConfig;
  collapsed?: boolean;
}

export function HeroIntro({
  onSelectCommand,
  theme,
  collapsed = false,
}: HeroIntroProps) {
  const featuredTestimonial = TESTIMONIALS_DATA[0];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-4xl mx-auto pt-20 sm:pt-24 pb-6 sm:pb-10 px-4 transition-all duration-300 ${
        collapsed ? "opacity-30 pointer-events-none scale-95" : ""
      }`}
    >
      <div className="flex flex-col items-center text-center">
        {/* Standard Prominent Profile Photo with Screen Adjustment */}
        <div className="relative mb-8 sm:mb-9">
          {/* Subtle Ambient Monochrome Glow */}
          <div
            className={`absolute -inset-4 rounded-full blur-2xl transition-all duration-500 ${
              theme.isLight ? "bg-zinc-300/50" : "bg-zinc-800/60"
            }`}
          />

          {/* Standard Big Profile Photo */}
          <div
            className={`relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl transition-all duration-300 ring-4 ${
              theme.isLight
                ? "ring-zinc-300 shadow-zinc-300/70"
                : "ring-zinc-800 shadow-black/90"
            }`}
          >
            <img
              src={PORTFOLIO_OWNER.avatarUrl}
              alt={PORTFOLIO_OWNER.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* High-Contrast Online Badge */}
          <div
            className={`absolute -bottom-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-xl flex items-center gap-2.5 whitespace-nowrap border transition-all duration-300 ${
              theme.isLight
                ? "bg-white text-zinc-900 border-zinc-300 shadow-zinc-200"
                : "bg-zinc-900 text-zinc-100 border-zinc-700 shadow-black/80"
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  theme.isLight ? "bg-zinc-800" : "bg-white"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  theme.isLight ? "bg-zinc-900" : "bg-white"
                }`}
              />
            </span>
            <span className="tracking-wide">Online • Active Now</span>
          </div>
        </div>

        {/* Greeting Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-3.5 border ${
            theme.isLight
              ? "bg-zinc-100 text-zinc-800 border-zinc-300"
              : "bg-zinc-900 text-zinc-300 border-zinc-800"
          }`}
        >
          <span>👋</span>
          <span>Hi, I'm {PORTFOLIO_OWNER.name}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-3xl sm:text-5xl md:text-6xl font-black tracking-tight max-w-3xl leading-tight ${
            theme.isLight ? "text-zinc-950" : "text-white"
          }`}
        >
          Frontend Architect & Creative Engineer
        </motion.h1>

        {/* Subtitle (Standard Legible Size) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-3.5 sm:mt-4 text-sm sm:text-base md:text-xl max-w-2xl leading-relaxed ${
            theme.isLight ? "text-zinc-600" : "text-zinc-300"
          }`}
        >
          Crafting high-performance web systems, interactive design
          architectures, and robust digital experiences. Explore my background
          and projects interactively below.
        </motion.p>

        {/* Quick Starter Action Buttons (Generous & Monochrome) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-6 sm:mt-8"
        >
          <button
            type="button"
            onClick={() => onSelectCommand("projects")}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-lg transition-all hover:scale-105 cursor-pointer ${
              theme.isLight
                ? "bg-black text-white hover:bg-zinc-800"
                : "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Explore Projects</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            type="button"
            onClick={() => onSelectCommand("skills")}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium border backdrop-blur-xl transition-all hover:scale-105 cursor-pointer ${
              theme.isLight
                ? "bg-white border-zinc-300 text-zinc-900 hover:bg-zinc-50"
                : "bg-zinc-900/80 border-zinc-800 text-zinc-100 hover:bg-zinc-800"
            }`}
          >
            <Code2 className="w-4 h-4 opacity-70" />
            <span>Tech Stack</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCommand("about")}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium border backdrop-blur-xl transition-all hover:scale-105 cursor-pointer ${
              theme.isLight
                ? "bg-white border-zinc-300 text-zinc-900 hover:bg-zinc-50"
                : "bg-zinc-900/80 border-zinc-800 text-zinc-100 hover:bg-zinc-800"
            }`}
          >
            <User className="w-4 h-4 opacity-70" />
            <span>About Me</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCommand("contact")}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium border backdrop-blur-xl transition-all hover:scale-105 cursor-pointer ${
              theme.isLight
                ? "bg-white border-zinc-300 text-zinc-900 hover:bg-zinc-50"
                : "bg-zinc-900/80 border-zinc-800 text-zinc-100 hover:bg-zinc-800"
            }`}
          >
            <Mail className="w-4 h-4 opacity-70" />
            <span>Contact</span>
          </button>
        </motion.div>

        {/* Hero Testimonial Card - Hidden on Mobile View */}
        {featuredTestimonial && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`hidden sm:block mt-8 sm:mt-10 max-w-xl w-full p-5 rounded-2xl border backdrop-blur-xl text-left relative overflow-hidden shadow-lg ${
              theme.isLight
                ? "bg-white/95 border-zinc-200"
                : "bg-zinc-950/80 border-zinc-800"
            }`}
          >
            <Quote className="w-5 h-5 text-zinc-500/20 absolute top-4 right-4" />
            <div className="flex items-center gap-1 text-zinc-400 mb-2">
              {[1, 2, 3, 4, 5].map((starNum) => (
                <Star
                  key={`hero-star-${starNum}`}
                  className="w-3.5 h-3.5 fill-current"
                />
              ))}
            </div>
            <p
              className={`text-sm sm:text-base italic leading-relaxed ${
                theme.isLight ? "text-zinc-700" : "text-zinc-300"
              }`}
            >
              "{featuredTestimonial.quote}"
            </p>
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <img
                src={featuredTestimonial.avatar}
                alt={featuredTestimonial.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-zinc-400 dark:ring-zinc-700"
              />
              <div>
                <span
                  className={`text-sm font-bold block leading-none ${
                    theme.isLight ? "text-zinc-950" : "text-white"
                  }`}
                >
                  {featuredTestimonial.name}
                </span>
                <span className="text-xs text-zinc-500">
                  {featuredTestimonial.role} · {featuredTestimonial.company}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
