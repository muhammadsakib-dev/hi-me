"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles, Star } from "lucide-react";
import { FollowUpChips } from "@/components/cards/FollowUpChips";
import { FOLLOW_UP_MAP, TESTIMONIALS_DATA } from "@/data/portfolioData";
import type { ThemeConfig } from "@/lib/theme";

interface ClientsCardProps {
  onSelectCommand: (command: string) => void;
  theme: ThemeConfig;
}

export function ClientsCard({ onSelectCommand, theme }: ClientsCardProps) {
  const followUpChips = FOLLOW_UP_MAP.clients;

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
              <Sparkles className="w-5 h-5" />
            </div>
            <h3
              className={`text-xl font-bold ${
                theme.isLight ? "text-zinc-950" : "text-white"
              }`}
            >
              Client & Peer Testimonials
            </h3>
          </div>
          <p
            className={`text-sm mt-1.5 ${
              theme.isLight ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            What engineering leaders and design directors say about working
            together
          </p>
        </div>

        <div className="flex items-center gap-1 text-zinc-400">
          {[1, 2, 3, 4, 5].map((starNum) => (
            <Star
              key={`header-star-${starNum}`}
              className="w-4 h-4 fill-current"
            />
          ))}
        </div>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4 mt-5">
        {TESTIMONIALS_DATA.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className={`p-5 rounded-2xl border relative ${
              theme.isLight
                ? "bg-zinc-50 border-zinc-200"
                : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
            }`}
          >
            <Quote className="w-6 h-6 text-zinc-400/20 absolute top-4 right-4 pointer-events-none" />
            <p
              className={`text-sm sm:text-base leading-relaxed italic ${
                theme.isLight ? "text-zinc-700" : "text-zinc-200"
              }`}
            >
              "{item.quote}"
            </p>

            <div
              className={`flex items-center gap-3.5 mt-4 pt-3.5 border-t ${
                theme.isLight ? "border-zinc-200" : "border-zinc-800"
              }`}
            >
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-zinc-400 dark:ring-zinc-700"
              />
              <div>
                <span
                  className={`text-sm font-bold block leading-none ${
                    theme.isLight ? "text-zinc-950" : "text-white"
                  }`}
                >
                  {item.name}
                </span>
                <span className="text-xs text-zinc-500 mt-1 block">
                  {item.role} · {item.company}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
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
