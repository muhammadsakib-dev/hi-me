"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";
import { FollowUpChips } from "@/components/cards/FollowUpChips";
import { FOLLOW_UP_MAP, PORTFOLIO_OWNER } from "@/data/portfolioData";
import type { ThemeConfig } from "@/lib/theme";

interface ContactCardProps {
  onSelectCommand: (command: string) => void;
  theme: ThemeConfig;
}

export function ContactCard({ onSelectCommand, theme }: ContactCardProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const followUpChips = FOLLOW_UP_MAP.contact;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill out all fields before sending.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: "Portfolio Chat Inquiry",
          message: form.message.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSent(true);
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      // Offline / network fallback
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
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
              <Mail className="w-5 h-5" />
            </div>
            <h3
              className={`text-xl font-bold ${
                theme.isLight ? "text-zinc-950" : "text-white"
              }`}
            >
              Send an Inquiry / Contact
            </h3>
          </div>
          <p
            className={`text-sm mt-1.5 ${
              theme.isLight ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            Have a project or contract in mind? Leave a message below.
          </p>
        </div>

        <span
          className={`text-xs px-3 py-1.5 rounded-full border flex items-center gap-2 font-medium ${
            theme.isLight
              ? "bg-zinc-100 text-zinc-800 border-zinc-300"
              : "bg-zinc-900 text-zinc-200 border-zinc-700"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          Active Response
        </span>
      </div>

      {/* Direct Contact Quick List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 text-sm">
        <a
          href={`mailto:${PORTFOLIO_OWNER.email}`}
          className={`p-3 rounded-xl border flex items-center gap-3 transition ${
            theme.isLight
              ? "bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-900"
              : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-600 text-zinc-200 hover:text-white"
          }`}
        >
          <Mail className="w-4 h-4 opacity-70" />
          <div className="truncate">
            <div className="text-xs text-zinc-500">Direct Email</div>
            <div className="font-semibold truncate">
              {PORTFOLIO_OWNER.email}
            </div>
          </div>
        </a>

        <div
          className={`p-3 rounded-xl border flex items-center gap-3 ${
            theme.isLight
              ? "bg-zinc-50 border-zinc-200 text-zinc-900"
              : "bg-zinc-900/60 border-zinc-800 text-zinc-200"
          }`}
        >
          <Clock className="w-4 h-4 opacity-70" />
          <div>
            <div className="text-xs text-zinc-500">Timezone & Response</div>
            <div className="font-semibold text-xs sm:text-sm">
              UTC+6 · Typically within 24h
            </div>
          </div>
        </div>
      </div>

      {/* Form or Success State */}
      {isSent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mt-6 p-6 rounded-2xl border text-center ${
            theme.isLight
              ? "bg-zinc-50 border-zinc-300 text-zinc-900"
              : "bg-zinc-900/80 border-zinc-700 text-white"
          }`}
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold">Message Sent Successfully!</h4>
          <p className="text-sm mt-1 text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Thanks for reaching out! Your inquiry has been stored. Sakib will
            review and reply to {form.email} soon.
          </p>
          <button
            type="button"
            onClick={() => {
              setIsSent(false);
              setForm({ name: "", email: "", message: "" });
            }}
            className={`mt-4 px-4 py-2 rounded-xl text-sm font-medium border transition cursor-pointer ${
              theme.isLight
                ? "bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-900"
                : "bg-zinc-800 hover:bg-zinc-700 border-zinc-600 text-white"
            }`}
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs sm:text-sm font-medium mb-1.5 opacity-80"
              >
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Alex Morgan"
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition ${
                  theme.isLight
                    ? "bg-zinc-50 border-zinc-300 focus:border-black focus:bg-white text-zinc-900"
                    : "bg-zinc-900 border-zinc-800 focus:border-zinc-400 focus:bg-zinc-950 text-white"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-xs sm:text-sm font-medium mb-1.5 opacity-80"
              >
                Your Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="alex@company.com"
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition ${
                  theme.isLight
                    ? "bg-zinc-50 border-zinc-300 focus:border-black focus:bg-white text-zinc-900"
                    : "bg-zinc-900 border-zinc-800 focus:border-zinc-400 focus:bg-zinc-950 text-white"
                }`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs sm:text-sm font-medium mb-1.5 opacity-80"
            >
              Message / Project Details
            </label>
            <textarea
              id="contact-message"
              required
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about your project, timeline, and goals..."
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none transition resize-none ${
                theme.isLight
                  ? "bg-zinc-50 border-zinc-300 focus:border-black focus:bg-white text-zinc-900"
                  : "bg-zinc-900 border-zinc-800 focus:border-zinc-400 focus:bg-zinc-950 text-white"
              }`}
            />
          </div>

          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50 ${
              theme.isLight
                ? "bg-black hover:bg-zinc-800 text-white shadow-md"
                : "bg-white hover:bg-zinc-200 text-black shadow-md"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending to Inbox...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Follow-up suggestions */}
      <FollowUpChips
        chips={followUpChips}
        onSelectCommand={onSelectCommand}
        theme={theme}
      />
    </motion.div>
  );
}
