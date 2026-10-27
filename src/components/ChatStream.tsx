"use client";

import { AnimatePresence, motion } from "framer-motion";
import { User } from "lucide-react";
import { useEffect, useRef } from "react";
import { AboutCard } from "@/components/cards/AboutCard";
import { ClientsCard } from "@/components/cards/ClientsCard";
import { ContactCard } from "@/components/cards/ContactCard";
import { HobbiesCard } from "@/components/cards/HobbiesCard";
import { InfoCards } from "@/components/cards/InfoCards";
import { ProjectsCard } from "@/components/cards/ProjectsCard";
import { SkillsCard } from "@/components/cards/SkillsCard";
import { PORTFOLIO_OWNER } from "@/data/portfolioData";
import type { ThemeConfig } from "@/lib/theme";
import type { ChatMessage, ExperienceItem, Project } from "@/types/chat";

interface ChatStreamProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onSelectProject: (project: Project) => void;
  onSelectCommand: (command: string) => void;
  theme: ThemeConfig;
  projects?: Project[];
  experiences?: ExperienceItem[];
}

export function ChatStream({
  messages,
  isTyping,
  onSelectProject,
  onSelectCommand,
  theme,
  projects,
  experiences,
}: ChatStreamProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages || isTyping) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const renderBotContent = (msg: ChatMessage) => {
    const cmd = msg.commandType;

    switch (cmd) {
      case "about":
        return <AboutCard onSelectCommand={onSelectCommand} theme={theme} />;
      case "skills":
        return <SkillsCard onSelectCommand={onSelectCommand} theme={theme} />;
      case "projects":
        return (
          <ProjectsCard
            onSelectProject={onSelectProject}
            onSelectCommand={onSelectCommand}
            theme={theme}
            projects={projects}
          />
        );
      case "clients":
        return <ClientsCard onSelectCommand={onSelectCommand} theme={theme} />;
      case "contact":
        return <ContactCard onSelectCommand={onSelectCommand} theme={theme} />;
      case "hobbies":
        return <HobbiesCard onSelectCommand={onSelectCommand} theme={theme} />;
      case "age":
      case "cv":
      case "education":
      case "experience":
      case "awards":
      case "help":
        return (
          <InfoCards
            type={cmd}
            onSelectCommand={onSelectCommand}
            theme={theme}
            experiences={experiences}
          />
        );
      default:
        if (msg.text) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl p-5 sm:p-6 border ${
                theme.isLight
                  ? "bg-white border-zinc-200 text-zinc-900 shadow-lg"
                  : "bg-zinc-950/85 border-zinc-800 text-zinc-100 shadow-2xl"
              } max-w-xl text-sm sm:text-base leading-relaxed`}
            >
              <p>{msg.text}</p>
            </motion.div>
          );
        }
        return (
          <InfoCards
            type={cmd || "fallback"}
            onSelectCommand={onSelectCommand}
            theme={theme}
            experiences={experiences}
          />
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4 space-y-7">
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            {/* Sender identity & timestamp */}
            <div
              className={`flex items-center gap-2 mb-2 px-1 text-xs ${
                theme.isLight ? "text-zinc-500" : "text-zinc-400"
              }`}
            >
              {msg.sender === "bot" ? (
                <>
                  <div
                    className={`w-6 h-6 rounded-full overflow-hidden ring-1 flex-shrink-0 ${
                      theme.isLight ? "ring-zinc-300" : "ring-zinc-700"
                    }`}
                  >
                    <img
                      src={PORTFOLIO_OWNER.avatarUrl}
                      alt={PORTFOLIO_OWNER.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span
                    className={`font-semibold ${
                      theme.isLight ? "text-zinc-900" : "text-white"
                    }`}
                  >
                    {PORTFOLIO_OWNER.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono">
                    AI
                  </span>
                </>
              ) : (
                <>
                  <span className="font-semibold">You</span>
                  <div className="w-5 h-5 rounded-full bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 flex items-center justify-center">
                    <User className="w-3 h-3" />
                  </div>
                </>
              )}
              <span className="text-xs opacity-60">· {msg.timestamp}</span>
            </div>

            {/* Bubble content (Black & White Standard) */}
            {msg.sender === "user" ? (
              <div
                className={`rounded-2xl rounded-tr-sm px-5 py-3 max-w-md text-sm sm:text-base shadow-md font-medium ${
                  theme.isLight
                    ? "bg-black text-white"
                    : "bg-white text-black font-semibold"
                }`}
              >
                {msg.text}
              </div>
            ) : (
              <div className="w-full">{renderBotContent(msg)}</div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 3-Dot Typing Indicator (Black & White Standard) */}
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3"
        >
          <div
            className={`w-7 h-7 rounded-full overflow-hidden ring-1 flex-shrink-0 mt-1 ${
              theme.isLight ? "ring-zinc-300" : "ring-zinc-700"
            }`}
          >
            <img
              src={PORTFOLIO_OWNER.avatarUrl}
              alt={PORTFOLIO_OWNER.name}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div
            className={`p-4 rounded-2xl rounded-tl-sm border shadow-lg flex items-center gap-2 ${
              theme.isLight
                ? "bg-white border-zinc-200 text-zinc-800"
                : "bg-zinc-950 border-zinc-800 text-zinc-200"
            }`}
          >
            <span className="text-xs mr-1 font-mono">Sakib is typing</span>
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
              className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-400"
            />
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
              className="w-2 h-2 rounded-full bg-zinc-600 dark:bg-zinc-200"
            />
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
              className="w-2 h-2 rounded-full bg-zinc-800 dark:bg-white"
            />
          </div>
        </motion.div>
      )}

      <div ref={bottomRef} className="h-6" />
    </div>
  );
}
