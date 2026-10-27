"use client";

import { motion } from "framer-motion";
import { Briefcase, ExternalLink, Eye } from "lucide-react";
import { useState } from "react";
import { FollowUpChips } from "@/components/cards/FollowUpChips";
import { GithubIcon } from "@/components/Icons";
import { FOLLOW_UP_MAP, PROJECTS_DATA } from "@/data/portfolioData";
import type { ThemeConfig } from "@/lib/theme";
import type { Project } from "@/types/chat";

interface ProjectsCardProps {
  onSelectProject: (project: Project) => void;
  onSelectCommand: (command: string) => void;
  theme: ThemeConfig;
  projects?: Project[];
}

export function ProjectsCard({
  onSelectProject,
  onSelectCommand,
  theme,
  projects = PROJECTS_DATA,
}: ProjectsCardProps) {
  const [filter, setFilter] = useState<string>("All");
  const followUpChips = FOLLOW_UP_MAP.projects;

  const categories = ["All", "AI & ML", "Full Stack", "Design Engineering"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.category.toLowerCase().includes(filter.toLowerCase()) ||
            (filter === "Full Stack" && p.category.includes("Full")),
        );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl p-6 md:p-7 border ${
        theme.isLight
          ? "bg-white border-zinc-200 shadow-lg text-zinc-900"
          : "bg-zinc-950/85 border-zinc-800 shadow-2xl text-zinc-100"
      } relative overflow-hidden max-w-3xl w-full`}
    >
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b ${
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
              <Briefcase className="w-5 h-5" />
            </div>
            <h3
              className={`text-xl font-bold ${
                theme.isLight ? "text-zinc-950" : "text-white"
              }`}
            >
              Featured Works & Case Studies
            </h3>
          </div>
          <p
            className={`text-sm mt-1.5 ${
              theme.isLight ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            Production web platforms engineered for performance, scalability,
            and UX
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer whitespace-nowrap ${
                filter === cat
                  ? theme.isLight
                    ? "bg-black text-white shadow font-semibold"
                    : "bg-white text-black font-semibold shadow"
                  : theme.isLight
                    ? "text-zinc-600 hover:bg-zinc-100"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -3 }}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col ${
              theme.isLight
                ? "bg-zinc-50/70 border-zinc-200 hover:border-zinc-400 shadow-sm"
                : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/80"
            }`}
          >
            {/* Image Thumbnail */}
            <button
              type="button"
              className="relative aspect-video w-full overflow-hidden group cursor-pointer text-left block"
              onClick={() => onSelectProject(project)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute top-3 left-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
                  {project.category}
                </span>
              </div>

              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white text-black shadow-lg">
                  <Eye className="w-3.5 h-3.5" /> Quick View
                </span>
              </div>
            </button>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4
                  className={`font-bold text-base line-clamp-1 ${
                    theme.isLight ? "text-zinc-950" : "text-white"
                  }`}
                >
                  {project.title}
                </h4>
                <p
                  className={`text-sm mt-1.5 line-clamp-2 leading-relaxed ${
                    theme.isLight ? "text-zinc-600" : "text-zinc-300"
                  }`}
                >
                  {project.description}
                </p>

                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div
                    className={`grid grid-cols-3 gap-2 my-4 py-2.5 px-3 rounded-xl border text-center ${
                      theme.isLight
                        ? "bg-white border-zinc-200 shadow-xs"
                        : "bg-zinc-950 border-zinc-800"
                    }`}
                  >
                    {project.metrics.map((m) => (
                      <div key={`${project.id}-${m.label}`} className="text-xs">
                        <div className="text-zinc-500 truncate">{m.label}</div>
                        <div
                          className={`font-bold font-mono mt-0.5 truncate ${
                            theme.isLight ? "text-zinc-950" : "text-white"
                          }`}
                        >
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-0.5 rounded-md border font-mono ${
                        theme.isLight
                          ? "bg-zinc-200/60 text-zinc-800 border-zinc-300"
                          : "bg-zinc-900 text-zinc-300 border-zinc-800"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div
                className={`flex items-center justify-between pt-4 mt-4 border-t text-sm ${
                  theme.isLight ? "border-zinc-200" : "border-zinc-800"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className={`inline-flex items-center gap-1.5 font-semibold cursor-pointer ${
                    theme.isLight
                      ? "text-black hover:underline"
                      : "text-white hover:underline"
                  }`}
                >
                  <Eye className="w-4 h-4" /> View Case Study
                </button>

                <div className="flex items-center gap-2.5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white transition"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white transition"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
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
