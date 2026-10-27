"use client";

import { useEffect, useState } from "react";
import { ChatStream } from "@/components/ChatStream";
import { CommandDock } from "@/components/CommandDock";
import { HeaderBadge } from "@/components/HeaderBadge";
import { HeroIntro } from "@/components/HeroIntro";
import { ProjectLightbox } from "@/components/ProjectLightbox";
import { ThemeBar } from "@/components/ThemeBar";
import {
  COMMAND_SYNONYMS,
  EXPERIENCE_DATA,
  PROJECTS_DATA,
} from "@/data/portfolioData";
import { THEME_CONFIGS, type ThemeConfig } from "@/lib/theme";
import type {
  ChatMessage,
  CommandType,
  ExperienceItem,
  Project,
  ThemeMode,
} from "@/types/chat";

export default function ChatfolioPage() {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>("dark");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Dynamic Portfolio Database State
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [experiences, setExperiences] =
    useState<ExperienceItem[]>(EXPERIENCE_DATA);

  const themeConfig: ThemeConfig = THEME_CONFIGS[currentTheme];

  // Sync dark class to html document element for Tailwind CSS
  useEffect(() => {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [currentTheme]);

  // Fetch dynamic portfolio data from MongoDB API on load
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const res = await fetch("/api/portfolio");
        const data = await res.json();
        if (data.success) {
          if (data.projects && data.projects.length > 0) {
            setProjects(data.projects);
          }
          if (data.experiences && data.experiences.length > 0) {
            setExperiences(data.experiences);
          }
          if (data.settings) {
            if (data.settings.fontSizeScale) {
              document.body.dataset.fontSize = data.settings.fontSizeScale;
            }
            if (data.settings.fontFamily) {
              document.body.dataset.fontFamily = data.settings.fontFamily;
            }
          }
        }
      } catch (err) {
        console.warn("Using offline portfolio cache:", err);
      }
    };
    fetchPortfolioData();
  }, []);

  // Helper to get formatted current time
  const getCurrentTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Resolve user input to a canonical command
  const parseCommand = (
    input: string,
  ): { command: CommandType; isNatural: boolean } => {
    const clean = input.trim().toLowerCase().replace(/^\/+/, "");

    // Check direct command or synonyms
    if (COMMAND_SYNONYMS[clean]) {
      return {
        command: COMMAND_SYNONYMS[clean] as CommandType,
        isNatural: false,
      };
    }

    // Natural language pattern matching
    if (
      clean.includes("skill") ||
      clean.includes("stack") ||
      clean.includes("tech")
    ) {
      return { command: "skills", isNatural: true };
    }
    if (
      clean.includes("project") ||
      clean.includes("work") ||
      clean.includes("portfolio")
    ) {
      return { command: "projects", isNatural: true };
    }
    if (
      clean.includes("about") ||
      clean.includes("who are") ||
      clean.includes("bio")
    ) {
      return { command: "about", isNatural: true };
    }
    if (
      clean.includes("contact") ||
      clean.includes("hire") ||
      clean.includes("email") ||
      clean.includes("message") ||
      clean.includes("contract")
    ) {
      return { command: "contact", isNatural: true };
    }
    if (
      clean.includes("review") ||
      clean.includes("client") ||
      clean.includes("testimonial")
    ) {
      return { command: "clients", isNatural: true };
    }
    if (
      clean.includes("hobby") ||
      clean.includes("interest") ||
      clean.includes("coffee") ||
      clean.includes("music")
    ) {
      return { command: "hobbies", isNatural: true };
    }
    if (
      clean.includes("age") ||
      clean.includes("old") ||
      clean.includes("birth") ||
      clean.includes("journey")
    ) {
      return { command: "age", isNatural: true };
    }
    if (
      clean.includes("cv") ||
      clean.includes("resume") ||
      clean.includes("download")
    ) {
      return { command: "cv", isNatural: true };
    }
    if (
      clean.includes("education") ||
      clean.includes("university") ||
      clean.includes("degree") ||
      clean.includes("study")
    ) {
      return { command: "education", isNatural: true };
    }
    if (
      clean.includes("experience") ||
      clean.includes("career") ||
      clean.includes("job") ||
      clean.includes("history")
    ) {
      return { command: "experience", isNatural: true };
    }
    if (
      clean.includes("award") ||
      clean.includes("honor") ||
      clean.includes("hackathon") ||
      clean.includes("trophy")
    ) {
      return { command: "awards", isNatural: true };
    }
    if (
      clean === "hi" ||
      clean === "hello" ||
      clean === "hey" ||
      clean.includes("greetings")
    ) {
      return { command: "about", isNatural: true };
    }
    if (
      clean === "help" ||
      clean.includes("command") ||
      clean.includes("options")
    ) {
      return { command: "help", isNatural: false };
    }
    if (clean === "clear" || clean === "reset") {
      return { command: "clear", isNatural: false };
    }

    return { command: "help", isNatural: false };
  };

  // Handle incoming message or command selection
  const handleSendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;

    const { command } = parseCommand(text);

    // Handle clear screen
    if (command === "clear") {
      setMessages([]);
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Realistic bot response delay
    const delay = Math.floor(Math.random() * 200) + 400;
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        commandType: command,
        timestamp: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, delay);
  };

  const handleResetChat = () => {
    setMessages([]);
  };

  return (
    <div
      className={`min-h-screen min-h-dvh relative flex flex-col justify-between overflow-x-hidden transition-colors duration-500 ${themeConfig.bgCanvas}`}
    >
      {/* Subtle Monochrome Ambient Radial Glow Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute -top-32 -left-32 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full blur-[140px] transition-colors duration-700 ${themeConfig.blob1}`}
        />
        <div
          className={`absolute top-1/3 -right-32 w-96 sm:w-[550px] h-96 sm:h-[550px] rounded-full blur-[150px] transition-colors duration-700 ${themeConfig.blob2}`}
        />
        <div
          className={`absolute -bottom-32 left-1/4 w-96 sm:w-[600px] h-96 sm:h-[600px] rounded-full blur-[160px] transition-colors duration-700 ${themeConfig.blob3}`}
        />
      </div>

      {/* Floating Header Identity Badge */}
      <HeaderBadge
        theme={themeConfig}
        onResetChat={handleResetChat}
        messageCount={messages.length}
      />

      {/* Standard Black & White Theme Bar */}
      <ThemeBar
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        themeConfig={themeConfig}
      />

      {/* Main Content Area */}
      <main
        className={`relative z-10 flex-1 flex flex-col w-full ${
          messages.length === 0 ? "justify-center my-auto" : ""
        }`}
      >
        {/* Prominent Hero Section */}
        <HeroIntro
          onSelectCommand={handleSendMessage}
          theme={themeConfig}
          collapsed={messages.length > 0}
        />

        {/* Scrollable Conversation Stream */}
        {messages.length > 0 && (
          <div className="flex-1 w-full pb-8">
            <ChatStream
              messages={messages}
              isTyping={isTyping}
              onSelectProject={setActiveProject}
              onSelectCommand={handleSendMessage}
              theme={themeConfig}
              projects={projects}
              experiences={experiences}
            />
          </div>
        )}
      </main>

      {/* Project Lightbox Modal */}
      <ProjectLightbox
        project={activeProject}
        onClose={() => setActiveProject(null)}
        theme={themeConfig}
      />

      {/* Enlarged Generous Command Dock */}
      <CommandDock
        onSendMessage={handleSendMessage}
        onClearChat={handleResetChat}
        isTyping={isTyping}
        theme={themeConfig}
        hasMessages={messages.length > 0}
      />
    </div>
  );
}
