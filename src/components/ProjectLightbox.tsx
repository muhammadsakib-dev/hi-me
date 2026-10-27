"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Layers, Sparkles, X } from "lucide-react";
import { useEffect } from "react";
import { GithubIcon } from "@/components/Icons";
import type { ThemeConfig } from "@/lib/theme";
import type { Project } from "@/types/chat";

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
  theme: ThemeConfig;
}

export function ProjectLightbox({
  project,
  onClose,
  theme,
}: ProjectLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 240 }}
          className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden z-10 my-auto ${
            theme.isLight
              ? "bg-white text-zinc-900 border-zinc-200"
              : "bg-zinc-950 text-white border-zinc-800"
          }`}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 text-white hover:bg-black transition backdrop-blur-md border border-white/20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Image */}
          <div className="relative aspect-[21/9] sm:aspect-[2/1] w-full overflow-hidden bg-black">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            <div className="absolute bottom-4 left-6">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-black font-mono shadow-md">
                {project.category}
              </span>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black">
                {project.title}
              </h2>
              <p
                className={`text-base font-medium mt-1.5 ${
                  theme.isLight ? "text-zinc-600" : "text-zinc-400"
                }`}
              >
                {project.tagline}
              </p>
            </div>

            {/* Performance / Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((m) => (
                  <div
                    key={`${project.id}-${m.label}`}
                    className={`p-4 rounded-2xl border text-center ${
                      theme.isLight
                        ? "bg-zinc-50 border-zinc-200"
                        : "bg-zinc-900/60 border-zinc-800"
                    }`}
                  >
                    <div className="text-xs text-zinc-500">{m.label}</div>
                    <div
                      className={`text-lg sm:text-xl font-bold font-mono mt-0.5 ${
                        theme.isLight ? "text-zinc-950" : "text-white"
                      }`}
                    >
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Detailed Description */}
            <div
              className={`space-y-3 text-sm sm:text-base leading-relaxed ${
                theme.isLight ? "text-zinc-700" : "text-zinc-300"
              }`}
            >
              <h4
                className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                  theme.isLight ? "text-zinc-900" : "text-white"
                }`}
              >
                <Sparkles className="w-4 h-4 opacity-70" />
                Architecture & Implementation Highlights
              </h4>
              <p>{project.longDescription || project.description}</p>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <h4
                className={`text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2 ${
                  theme.isLight ? "text-zinc-600" : "text-zinc-400"
                }`}
              >
                <Layers className="w-4 h-4 opacity-70" />
                Technologies Deployed
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono border ${
                      theme.isLight
                        ? "bg-zinc-100 border-zinc-200 text-zinc-800"
                        : "bg-zinc-900 border-zinc-800 text-zinc-200"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`pt-5 border-t flex flex-wrap items-center justify-between gap-3 ${
                theme.isLight ? "border-zinc-200" : "border-zinc-800"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition ${
                      theme.isLight
                        ? "border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-900"
                        : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white"
                    }`}
                  >
                    <GithubIcon className="w-4 h-4" /> View Source
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-md ${
                      theme.isLight
                        ? "bg-black hover:bg-zinc-800 text-white"
                        : "bg-white hover:bg-zinc-200 text-black"
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" /> Launch Live Demo
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                  theme.isLight
                    ? "text-zinc-600 hover:text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Close View
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
