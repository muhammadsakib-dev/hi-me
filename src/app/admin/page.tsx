"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Clock,
  ExternalLink,
  KeyRound,
  LayoutDashboard,
  Loader2,
  Lock,
  LogOut,
  Mail,
  Palette,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  Type,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AdminProject {
  _id?: string;
  projectId?: string;
  title: string;
  category: "Full-Stack" | "AI & ML" | "Frontend" | "Mobile";
  shortDesc: string;
  fullDesc: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  metrics?: {
    stars?: string;
    users?: string;
    performance?: string;
  };
  featured: boolean;
  order: number;
}

interface AdminExperience {
  _id?: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  order: number;
}

interface AdminMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface AdminSettings {
  owner: {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    avatarUrl: string;
    location: string;
    email: string;
    status: string;
    social: {
      github: string;
      linkedin: string;
      twitter: string;
    };
  };
  fontFamily: string;
  fontSizeScale: "compact" | "standard" | "large";
  stats: {
    experienceYears: number;
    projectsCompleted: number;
    satisfiedClients: number;
    githubContributions: number;
  };
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Tab State
  const [activeTab, setActiveTab] = useState<
    "overview" | "projects" | "experiences" | "messages" | "settings"
  >("overview");

  // Dashboard Data State
  const [connected, setConnected] = useState(false);
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [experiences, setExperiences] = useState<AdminExperience[]>([]);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [settings, setSettings] = useState<AdminSettings | null>(null);

  // Modals & Forms
  const [editingProject, setEditingProject] = useState<AdminProject | null>(
    null,
  );
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<AdminExperience | null>(null);
  const [isCreatingExperience, setIsCreatingExperience] = useState(false);

  // Feedback Notification
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const showNotification = (
    text: string,
    type: "success" | "error" = "success",
  ) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 3500);
  };

  const fetchAdminData = async () => {
    setIsLoadingData(true);
    try {
      const res = await fetch("/api/admin/data");
      const data = await res.json();
      if (data.success) {
        setConnected(data.connected);
        setProjects(data.projects || []);
        setExperiences(data.experiences || []);
        setMessages(data.messages || []);
        setSettings(data.settings || null);
      }
    } catch (err: unknown) {
      const error = err as Error;
      showNotification(error.message || "Failed to load admin data", "error");
    } finally {
      setIsLoadingData(false);
    }
  };

  // Check initial authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/auth-check");
        if (res.ok) {
          setIsAuthenticated(true);
          const dataRes = await fetch("/api/admin/data");
          const data = await dataRes.json();
          if (data.success) {
            setConnected(data.connected);
            setProjects(data.projects || []);
            setExperiences(data.experiences || []);
            setMessages(data.messages || []);
            setSettings(data.settings || null);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoadingData(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchAdminData();
      } else {
        setLoginError(data.error || "Incorrect admin password");
      }
    } catch {
      setLoginError("Failed to connect to authentication server");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleSeedData = async () => {
    if (!confirm("Seed or restore database with default portfolio data?"))
      return;
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification("Database successfully seeded with default data!");
        fetchAdminData();
      } else {
        showNotification(data.error || "Seed failed", "error");
      }
    } catch (err: unknown) {
      const error = err as Error;
      showNotification(error.message, "error");
    }
  };

  // 1. SAVE PROJECT (CREATE OR UPDATE)
  const handleSaveProject = async (projectData: Partial<AdminProject>) => {
    const isEdit = Boolean(projectData._id);
    const url = isEdit
      ? `/api/admin/projects/${projectData._id}`
      : "/api/admin/projects";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification(
          isEdit
            ? "Project updated successfully!"
            : "Project created successfully!",
        );
        setEditingProject(null);
        setIsCreatingProject(false);
        fetchAdminData();
      } else {
        showNotification(data.error || "Failed to save project", "error");
      }
    } catch (err: unknown) {
      const error = err as Error;
      showNotification(error.message, "error");
    }
  };

  // 2. DELETE PROJECT
  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification("Project deleted successfully");
        fetchAdminData();
      } else {
        showNotification(data.error || "Failed to delete project", "error");
      }
    } catch (err: unknown) {
      const error = err as Error;
      showNotification(error.message, "error");
    }
  };

  // 3. SAVE EXPERIENCE (CREATE OR UPDATE)
  const handleSaveExperience = async (expData: Partial<AdminExperience>) => {
    const isEdit = Boolean(expData._id);
    const url = isEdit
      ? `/api/admin/experiences/${expData._id}`
      : "/api/admin/experiences";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification(
          isEdit ? "Experience updated!" : "Experience created!",
        );
        setEditingExperience(null);
        setIsCreatingExperience(false);
        fetchAdminData();
      } else {
        showNotification(data.error || "Failed to save experience", "error");
      }
    } catch (err: unknown) {
      const error = err as Error;
      showNotification(error.message, "error");
    }
  };

  // 4. DELETE EXPERIENCE
  const handleDeleteExperience = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    try {
      const res = await fetch(`/api/admin/experiences/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification("Experience deleted successfully");
        fetchAdminData();
      } else {
        showNotification(data.error || "Failed to delete", "error");
      }
    } catch (err: unknown) {
      const error = err as Error;
      showNotification(error.message, "error");
    }
  };

  // 5. TOGGLE READ MESSAGE / DELETE MESSAGE
  const handleToggleMessageRead = async (id: string, read: boolean) => {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      });
      fetchAdminData();
    } catch (err: unknown) {
      const error = err as Error;
      showNotification(error.message, "error");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      showNotification("Message deleted");
      fetchAdminData();
    } catch (err: unknown) {
      const error = err as Error;
      showNotification(error.message, "error");
    }
  };

  // 6. SAVE SETTINGS & TYPOGRAPHY
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification("Settings & Typography saved to database!");
        // Update local dataset for immediate preview
        if (typeof document !== "undefined") {
          document.body.dataset.fontFamily = settings.fontFamily;
          document.body.dataset.fontSize = settings.fontSizeScale;
        }
      } else {
        showNotification(data.error || "Failed to update settings", "error");
      }
    } catch (err: unknown) {
      const error = err as Error;
      showNotification(error.message, "error");
    }
  };

  // LOCK SCREEN (WHEN NOT LOGGED IN)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl relative"
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 mx-auto mb-6">
            <Lock className="w-7 h-7 text-white" />
          </div>

          <h1 className="text-2xl font-black text-center tracking-tight">
            Chatfolio Admin Access
          </h1>
          <p className="text-sm text-zinc-400 text-center mt-2">
            Enter your admin password to manage projects, experiences,
            inquiries, and appearance settings.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2"
              >
                Admin Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password (default: admin1234)"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-white focus:outline-none text-white text-sm"
                />
                <KeyRound className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-red-400 font-medium">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Access Dashboard</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Live Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // MAIN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl border shadow-2xl flex items-center gap-2.5 text-sm font-semibold ${
            notification.type === "success"
              ? "bg-zinc-900 border-zinc-700 text-white"
              : "bg-red-950 border-red-800 text-red-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-white" />
          ) : (
            <X className="w-4 h-4 text-red-400" />
          )}
          <span>{notification.text}</span>
        </motion.div>
      )}

      {/* Top Navbar */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-black font-black flex items-center justify-center text-base">
              CF
            </div>
            <div>
              <h2 className="font-bold text-base leading-none">
                Chatfolio Architect Console
              </h2>
              <span className="text-xs text-zinc-500">
                MongoDB Master Management
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* MongoDB Connection Status Badge */}
            <div
              className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-2 ${
                connected
                  ? "bg-zinc-900 border-zinc-700 text-white"
                  : "bg-zinc-900/60 border-zinc-800 text-zinc-400"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  connected ? "bg-white animate-pulse" : "bg-zinc-600"
                }`}
              />
              <span>{connected ? "MongoDB Live" : "Local Storage Mode"}</span>
            </div>

            {/* View Live Portfolio */}
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <span>Live Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </Link>

            {/* Seed Data Button */}
            <button
              type="button"
              onClick={handleSeedData}
              title="Restore / Seed Initial Projects and Experiences"
              className="px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 opacity-70" />
              <span>Seed Data</span>
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto no-scrollbar pt-1">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            {
              id: "projects",
              label: `Projects (${projects.length})`,
              icon: Briefcase,
            },
            {
              id: "experiences",
              label: `Experience (${experiences.length})`,
              icon: Clock,
            },
            {
              id: "messages",
              label: `Inquiries (${messages.length})`,
              icon: Mail,
            },
            { id: "settings", label: "Appearance & Profile", icon: Palette },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as
                      | "overview"
                      | "projects"
                      | "experiences"
                      | "messages"
                      | "settings",
                  )
                }
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "border-white text-white"
                    : "border-transparent text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {isLoadingData ? (
          <div className="flex flex-col items-center justify-center py-24 text-zinc-500">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-white" />
            <p className="text-sm">Loading portfolio database records...</p>
          </div>
        ) : (
          <>
            {/* 1. OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500 uppercase font-mono font-bold">
                        Projects Catalog
                      </span>
                      <Briefcase className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div className="text-3xl font-black mt-2 text-white">
                      {projects.length}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">
                      {projects.filter((p) => p.featured).length} Featured
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500 uppercase font-mono font-bold">
                        Work Experience
                      </span>
                      <Clock className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div className="text-3xl font-black mt-2 text-white">
                      {experiences.length}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">
                      Career Positions
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500 uppercase font-mono font-bold">
                        Visitor Inquiries
                      </span>
                      <Mail className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div className="text-3xl font-black mt-2 text-white">
                      {messages.length}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">
                      {messages.filter((m) => !m.read).length} Unread
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500 uppercase font-mono font-bold">
                        Active Typography
                      </span>
                      <Type className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div className="text-2xl font-bold mt-2 text-white truncate">
                      {settings?.fontFamily || "Space Grotesk"}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1 capitalize">
                      Scale: {settings?.fontSizeScale || "standard"}
                    </div>
                  </div>
                </div>

                {/* Quick Actions & System Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
                    <h3 className="text-lg font-bold">
                      System Status & Environment
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                        <div>
                          <span className="font-semibold block">
                            MongoDB Status
                          </span>
                          <span className="text-xs text-zinc-400">
                            {connected
                              ? "Connected to MongoDB via MONGODB_URI in .env"
                              : "Local fallback mode active. Configure MONGODB_URI in .env for persistent database storage."}
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            connected
                              ? "bg-white text-black"
                              : "bg-zinc-800 text-zinc-300"
                          }`}
                        >
                          {connected ? "CONNECTED" : "LOCAL MODE"}
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                        <div>
                          <span className="font-semibold block">
                            Admin Authentication
                          </span>
                          <span className="text-xs text-zinc-400">
                            HMAC SHA-256 session token active. Change password
                            in .env (ADMIN_PASSWORD).
                          </span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono font-bold">
                          PROTECTED
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingProject(true);
                          setActiveTab("projects");
                        }}
                        className="px-4 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Add New Project
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingExperience(true);
                          setActiveTab("experiences");
                        }}
                        className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-semibold text-sm transition flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Add Experience
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab("settings")}
                        className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-semibold text-sm transition flex items-center gap-2 cursor-pointer"
                      >
                        <Palette className="w-4 h-4" /> Typography & Theme
                      </button>
                    </div>
                  </div>

                  {/* Profile Quick Summary */}
                  <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-4">
                        Portfolio Identity
                      </h3>
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={
                            settings?.owner.avatarUrl ||
                            "https://ik.imagekit.io/muhammadsakib/dd.JPG"
                          }
                          alt="Avatar"
                          className="w-14 h-14 rounded-full object-cover ring-2 ring-zinc-800"
                        />
                        <div>
                          <h4 className="font-bold text-base">
                            {settings?.owner.name || "Md Sakib"}
                          </h4>
                          <span className="text-xs text-zinc-400 block">
                            {settings?.owner.title || "Frontend Architect"}
                          </span>
                          <span className="text-xs text-zinc-500">
                            {settings?.owner.location || "Dhaka, Bangladesh"}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                        {settings?.owner.bio}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab("settings")}
                      className="mt-6 w-full py-2.5 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-xs font-semibold transition cursor-pointer"
                    >
                      Edit Bio & Social Links
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PROJECTS TAB */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black">Project Catalog</h3>
                    <p className="text-sm text-zinc-400">
                      Create, update, or remove projects displayed in the
                      portfolio chat.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProject(null);
                      setIsCreatingProject(true);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" /> Create New Project
                  </button>
                </div>

                {/* Projects List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {projects.map((proj) => (
                    <div
                      key={proj._id || proj.projectId}
                      className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-zinc-800">
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-black/80 text-white border border-white/20">
                            {proj.category}
                          </span>
                        </div>

                        <h4 className="font-bold text-base line-clamp-1">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                          {proj.shortDesc}
                        </p>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {proj.tags?.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-zinc-800 flex items-center justify-between">
                        <span className="text-xs text-zinc-500 font-mono">
                          Order: {proj.order}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProject(proj);
                              setIsCreatingProject(false);
                            }}
                            className="p-2 rounded-lg hover:bg-zinc-900 text-zinc-300 hover:text-white transition cursor-pointer"
                            title="Edit Project"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(proj._id || "")}
                            className="p-2 rounded-lg hover:bg-red-950 text-zinc-400 hover:text-red-400 transition cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. EXPERIENCES TAB */}
            {activeTab === "experiences" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black">Career Timeline</h3>
                    <p className="text-sm text-zinc-400">
                      Manage positions, companies, achievements, and tech
                      stacks.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingExperience(null);
                      setIsCreatingExperience(true);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" /> Add Experience
                  </button>
                </div>

                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div
                      key={exp._id || exp.role}
                      className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-lg font-bold">{exp.role}</h4>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-300">
                          {exp.company} ·{" "}
                          <span className="text-zinc-500">{exp.location}</span>
                        </p>
                        <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {exp.technologies?.map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:self-start">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingExperience(exp);
                            setIsCreatingExperience(false);
                          }}
                          className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteExperience(exp._id || "")}
                          className="p-2 rounded-lg bg-zinc-900 hover:bg-red-950 text-zinc-400 hover:text-red-400 transition cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. MESSAGES / INQUIRIES TAB */}
            {activeTab === "messages" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black">
                    Visitor Inquiries & Contracts
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Messages received through the conversational portfolio
                    contact card.
                  </p>
                </div>

                {messages.length === 0 ? (
                  <div className="p-12 rounded-3xl bg-zinc-950 border border-zinc-800 text-center text-zinc-500">
                    <Mail className="w-10 h-10 mx-auto mb-3 opacity-50" />
                    <p className="text-base font-semibold">
                      No messages received yet
                    </p>
                    <p className="text-xs mt-1">
                      When visitors send an inquiry in the portfolio chat, it
                      will show up here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        className={`p-6 rounded-2xl border transition ${
                          msg.read
                            ? "bg-zinc-950/60 border-zinc-800/80 text-zinc-400"
                            : "bg-zinc-950 border-zinc-700 text-zinc-100 shadow-md"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="font-bold text-base text-white">
                              {msg.name}
                            </span>
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-xs text-zinc-400 hover:text-white underline font-mono"
                            >
                              {msg.email}
                            </a>
                            {!msg.read && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-black font-bold">
                                NEW
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-zinc-500 font-mono">
                            {new Date(msg.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <div className="font-semibold text-sm text-zinc-300 mt-2">
                          {msg.subject}
                        </div>
                        <p className="text-sm mt-1 leading-relaxed text-zinc-300 bg-zinc-900/50 p-3.5 rounded-xl border border-zinc-800/60 mt-2">
                          {msg.message}
                        </p>

                        <div className="pt-3 mt-3 border-t border-zinc-800 flex items-center justify-between">
                          <a
                            href={`mailto:${
                              msg.email
                            }?subject=Re: ${encodeURIComponent(
                              msg.subject || "Portfolio Inquiry",
                            )}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:underline"
                          >
                            <Mail className="w-3.5 h-3.5" /> Reply via Email
                          </a>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleToggleMessageRead(msg._id, !msg.read)
                              }
                              className="text-xs px-2.5 py-1 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-zinc-300 transition cursor-pointer"
                            >
                              Mark as {msg.read ? "Unread" : "Read"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteMessage(msg._id)}
                              className="p-1.5 rounded-lg hover:bg-red-950 text-zinc-400 hover:text-red-400 transition cursor-pointer"
                              title="Delete Message"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. APPEARANCE, TYPOGRAPHY & PROFILE TAB */}
            {activeTab === "settings" && settings && (
              <form onSubmit={handleSaveSettings} className="space-y-8">
                <div>
                  <h3 className="text-2xl font-black">
                    Typography, Font Scale & Profile
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Live control for fonts, sizing scales, and developer
                    biography.
                  </p>
                </div>

                {/* Typography & Scaling Section */}
                <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <Type className="w-5 h-5" />
                    <span>Global Font Settings</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Font Family Selector */}
                    <div>
                      <label
                        htmlFor="font-family"
                        className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        Font Family
                      </label>
                      <select
                        id="font-family"
                        value={settings.fontFamily}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            fontFamily: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:border-white outline-none"
                      >
                        <option value="Space Grotesk">
                          Space Grotesk (Editorial & Modern)
                        </option>
                        <option value="Outfit">
                          Outfit (Clean Geometric Sans)
                        </option>
                        <option value="Plus Jakarta Sans">
                          Plus Jakarta Sans (Tech Clean)
                        </option>
                        <option value="JetBrains Mono">
                          JetBrains Mono (Developer Code)
                        </option>
                        <option value="Inter">
                          Inter (Universal Minimalist)
                        </option>
                      </select>
                      <p className="text-xs text-zinc-500 mt-1.5">
                        Applies instantly across headlines, chat bubbles, and
                        cards.
                      </p>
                    </div>

                    {/* Font Size Scale Selector */}
                    <div>
                      <label
                        htmlFor="font-size-scale"
                        className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        Global Font Size Scale
                      </label>
                      <select
                        id="font-size-scale"
                        value={settings.fontSizeScale}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            fontSizeScale: e.target.value as
                              | "compact"
                              | "standard"
                              | "large",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:border-white outline-none"
                      >
                        <option value="standard">
                          Standard (16px base · Highly Readable)
                        </option>
                        <option value="large">
                          Large (18px base · Spacious & Accessible)
                        </option>
                        <option value="compact">
                          Compact (14px base · Dense Information)
                        </option>
                      </select>
                      <p className="text-xs text-zinc-500 mt-1.5">
                        Controls base font sizing and line heights for the
                        entire application.
                      </p>
                    </div>
                  </div>

                  {/* Live Typography Preview Box */}
                  <div
                    className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800"
                    style={{ fontFamily: settings.fontFamily }}
                  >
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
                      Live Preview ({settings.fontFamily} ·{" "}
                      {settings.fontSizeScale})
                    </span>
                    <h2 className="text-2xl font-bold text-white mt-1">
                      The quick brown fox jumps over the lazy dog
                    </h2>
                    <p className="text-sm text-zinc-300 mt-1.5 leading-relaxed">
                      Engineering high-performance, fluid digital experiences
                      where aesthetic design meets scalable frontend
                      architecture.
                    </p>
                  </div>
                </div>

                {/* Profile Information Section */}
                <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>Profile & Bio Details</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="owner-name"
                        className="block text-xs font-medium text-zinc-400 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        id="owner-name"
                        type="text"
                        value={settings.owner.name}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            owner: { ...settings.owner, name: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="owner-title"
                        className="block text-xs font-medium text-zinc-400 mb-1"
                      >
                        Professional Title
                      </label>
                      <input
                        id="owner-title"
                        type="text"
                        value={settings.owner.title}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            owner: { ...settings.owner, title: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="avatar-url"
                        className="block text-xs font-medium text-zinc-400 mb-1"
                      >
                        Profile Photo Avatar URL
                      </label>
                      <input
                        id="avatar-url"
                        type="text"
                        value={settings.owner.avatarUrl}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            owner: {
                              ...settings.owner,
                              avatarUrl: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="owner-email"
                        className="block text-xs font-medium text-zinc-400 mb-1"
                      >
                        Contact Email
                      </label>
                      <input
                        id="owner-email"
                        type="email"
                        value={settings.owner.email}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            owner: { ...settings.owner, email: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="owner-location"
                        className="block text-xs font-medium text-zinc-400 mb-1"
                      >
                        Location
                      </label>
                      <input
                        id="owner-location"
                        type="text"
                        value={settings.owner.location}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            owner: {
                              ...settings.owner,
                              location: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="owner-status"
                        className="block text-xs font-medium text-zinc-400 mb-1"
                      >
                        Status Badge Text
                      </label>
                      <input
                        id="owner-status"
                        type="text"
                        value={settings.owner.status}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            owner: {
                              ...settings.owner,
                              status: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="owner-bio"
                      className="block text-xs font-medium text-zinc-400 mb-1"
                    >
                      Bio & Philosophy
                    </label>
                    <textarea
                      id="owner-bio"
                      rows={3}
                      value={settings.owner.bio}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          owner: { ...settings.owner, bio: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-white outline-none"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
                  <h4 className="text-lg font-bold">Social Media Profiles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="github-link"
                        className="block text-xs font-medium text-zinc-400 mb-1"
                      >
                        GitHub URL
                      </label>
                      <input
                        id="github-link"
                        type="text"
                        value={settings.owner.social?.github || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            owner: {
                              ...settings.owner,
                              social: {
                                ...settings.owner.social,
                                github: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="linkedin-link"
                        className="block text-xs font-medium text-zinc-400 mb-1"
                      >
                        LinkedIn URL
                      </label>
                      <input
                        id="linkedin-link"
                        type="text"
                        value={settings.owner.social?.linkedin || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            owner: {
                              ...settings.owner,
                              social: {
                                ...settings.owner.social,
                                linkedin: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="twitter-link"
                        className="block text-xs font-medium text-zinc-400 mb-1"
                      >
                        Twitter/X URL
                      </label>
                      <input
                        id="twitter-link"
                        type="text"
                        value={settings.owner.social?.twitter || ""}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            owner: {
                              ...settings.owner,
                              social: {
                                ...settings.owner.social,
                                twitter: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:border-white outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-sm transition shadow-lg cursor-pointer"
                  >
                    Save All Appearance & Profile Settings
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </main>

      {/* CREATE / EDIT PROJECT MODAL */}
      {(isCreatingProject || editingProject) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 my-auto max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setIsCreatingProject(false);
                setEditingProject(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-4">
              {editingProject ? "Edit Project" : "Create New Project"}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                handleSaveProject({
                  _id: editingProject?._id,
                  title: formData.get("title") as string,
                  category: formData.get(
                    "category",
                  ) as AdminProject["category"],
                  shortDesc: formData.get("shortDesc") as string,
                  fullDesc: formData.get("fullDesc") as string,
                  image: formData.get("image") as string,
                  tags: (formData.get("tags") as string)
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                  demoUrl: formData.get("demoUrl") as string,
                  githubUrl: formData.get("githubUrl") as string,
                  featured: formData.get("featured") === "on",
                  order: Number(formData.get("order")) || 0,
                });
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="proj-title"
                    className="block text-xs font-medium text-zinc-400 mb-1"
                  >
                    Project Title
                  </label>
                  <input
                    id="proj-title"
                    name="title"
                    required
                    defaultValue={editingProject?.title}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="proj-category"
                    className="block text-xs font-medium text-zinc-400 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="proj-category"
                    name="category"
                    defaultValue={editingProject?.category || "Full-Stack"}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="proj-image"
                  className="block text-xs font-medium text-zinc-400 mb-1"
                >
                  Banner Image URL
                </label>
                <input
                  id="proj-image"
                  name="image"
                  required
                  defaultValue={
                    editingProject?.image ||
                    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop"
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="proj-shortDesc"
                  className="block text-xs font-medium text-zinc-400 mb-1"
                >
                  Short Summary
                </label>
                <input
                  id="proj-shortDesc"
                  name="shortDesc"
                  required
                  defaultValue={editingProject?.shortDesc}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="proj-fullDesc"
                  className="block text-xs font-medium text-zinc-400 mb-1"
                >
                  Detailed Case Study Description
                </label>
                <textarea
                  id="proj-fullDesc"
                  name="fullDesc"
                  rows={3}
                  defaultValue={editingProject?.fullDesc}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="proj-tags"
                    className="block text-xs font-medium text-zinc-400 mb-1"
                  >
                    Tags (comma separated)
                  </label>
                  <input
                    id="proj-tags"
                    name="tags"
                    defaultValue={editingProject?.tags?.join(", ")}
                    placeholder="Next.js, React 19, TypeScript"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="proj-order"
                    className="block text-xs font-medium text-zinc-400 mb-1"
                  >
                    Display Order
                  </label>
                  <input
                    id="proj-order"
                    name="order"
                    type="number"
                    defaultValue={editingProject?.order || 0}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="proj-liveUrl"
                    className="block text-xs font-medium text-zinc-400 mb-1"
                  >
                    Live Demo URL
                  </label>
                  <input
                    id="proj-liveUrl"
                    name="demoUrl"
                    defaultValue={editingProject?.demoUrl || "#"}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="proj-githubUrl"
                    className="block text-xs font-medium text-zinc-400 mb-1"
                  >
                    GitHub URL
                  </label>
                  <input
                    id="proj-githubUrl"
                    name="githubUrl"
                    defaultValue={editingProject?.githubUrl || "#"}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="featured-check"
                  type="checkbox"
                  name="featured"
                  defaultChecked={editingProject?.featured}
                  className="rounded bg-zinc-900 border-zinc-800"
                />
                <label
                  htmlFor="featured-check"
                  className="text-xs text-zinc-300"
                >
                  Feature this project prominently
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingProject(false);
                    setEditingProject(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold transition cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE / EDIT EXPERIENCE MODAL */}
      {(isCreatingExperience || editingExperience) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 my-auto max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setIsCreatingExperience(false);
                setEditingExperience(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-4">
              {editingExperience ? "Edit Experience" : "Add Experience"}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                handleSaveExperience({
                  _id: editingExperience?._id,
                  role: formData.get("role") as string,
                  company: formData.get("company") as string,
                  period: formData.get("period") as string,
                  location: formData.get("location") as string,
                  description: formData.get("description") as string,
                  achievements: (formData.get("achievements") as string)
                    .split("\n")
                    .map((a) => a.trim())
                    .filter(Boolean),
                  technologies: (formData.get("technologies") as string)
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                  order: Number(formData.get("order")) || 0,
                });
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="exp-role"
                    className="block text-xs font-medium text-zinc-400 mb-1"
                  >
                    Role / Position
                  </label>
                  <input
                    id="exp-role"
                    name="role"
                    required
                    defaultValue={editingExperience?.role}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="exp-company"
                    className="block text-xs font-medium text-zinc-400 mb-1"
                  >
                    Company Name
                  </label>
                  <input
                    id="exp-company"
                    name="company"
                    required
                    defaultValue={editingExperience?.company}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="exp-period"
                    className="block text-xs font-medium text-zinc-400 mb-1"
                  >
                    Time Period
                  </label>
                  <input
                    id="exp-period"
                    name="period"
                    required
                    defaultValue={editingExperience?.period || "2023 — Present"}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="exp-location"
                    className="block text-xs font-medium text-zinc-400 mb-1"
                  >
                    Location
                  </label>
                  <input
                    id="exp-location"
                    name="location"
                    defaultValue={
                      editingExperience?.location || "Remote Worldwide"
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="exp-desc"
                  className="block text-xs font-medium text-zinc-400 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="exp-desc"
                  name="description"
                  rows={2}
                  defaultValue={editingExperience?.description}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="exp-achievements"
                  className="block text-xs font-medium text-zinc-400 mb-1"
                >
                  Key Achievements (one per line)
                </label>
                <textarea
                  id="exp-achievements"
                  name="achievements"
                  rows={3}
                  defaultValue={editingExperience?.achievements?.join("\n")}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="exp-tech"
                  className="block text-xs font-medium text-zinc-400 mb-1"
                >
                  Technologies (comma separated)
                </label>
                <input
                  id="exp-tech"
                  name="technologies"
                  defaultValue={editingExperience?.technologies?.join(", ")}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingExperience(false);
                    setEditingExperience(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold transition cursor-pointer"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
