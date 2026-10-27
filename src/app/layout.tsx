import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Md Sakib — Chatfolio | Interactive Developer Portfolio",
  description:
    "Interactive conversational developer portfolio modeled after Chatfolio Multicolors Dark. Explore skills, projects, client reviews, and background via interactive commands.",
  keywords: [
    "Sakib",
    "Frontend Architect",
    "Creative Developer",
    "Next.js",
    "React 19",
    "Chatfolio",
    "Portfolio",
  ],
  authors: [{ name: "Md Sakib" }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
