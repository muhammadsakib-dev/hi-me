import type { ThemeMode } from "@/types/chat";

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  bgCanvas: string;
  blob1: string;
  blob2: string;
  blob3: string;
  primaryGradient: string;
  textGradient: string;
  cardBg: string;
  cardBorder: string;
  badgeBg: string;
  badgeBorder: string;
  accentColor: string;
  chipActive: string;
  dockBg: string;
  isLight: boolean;
}

export const THEME_CONFIGS: Record<ThemeMode, ThemeConfig> = {
  dark: {
    id: "dark",
    name: "Dark Mode (Black & White Standard)",
    bgCanvas: "bg-[#09090b] text-zinc-100",
    blob1: "bg-zinc-800/25",
    blob2: "bg-zinc-700/20",
    blob3: "bg-zinc-900/40",
    primaryGradient: "from-white via-zinc-200 to-zinc-400",
    textGradient: "from-white via-zinc-200 to-zinc-400",
    cardBg: "bg-zinc-950/80 backdrop-blur-xl",
    cardBorder: "border-zinc-800/80 hover:border-zinc-700",
    badgeBg: "bg-zinc-900 text-zinc-200 border-zinc-800",
    badgeBorder: "border-zinc-800",
    accentColor: "text-white",
    chipActive: "bg-white text-black font-semibold border-white",
    dockBg: "bg-zinc-950/95 backdrop-blur-2xl border-zinc-800 shadow-2xl",
    isLight: false,
  },
  light: {
    id: "light",
    name: "Light Mode (Black & White Standard)",
    bgCanvas: "bg-[#ffffff] text-zinc-900",
    blob1: "bg-zinc-200/40",
    blob2: "bg-zinc-100/60",
    blob3: "bg-zinc-200/30",
    primaryGradient: "from-black via-zinc-900 to-zinc-800",
    textGradient: "from-black via-zinc-900 to-zinc-700",
    cardBg: "bg-white/95 backdrop-blur-xl shadow-md",
    cardBorder: "border-zinc-200 hover:border-zinc-300",
    badgeBg: "bg-zinc-100 text-zinc-900 border-zinc-200",
    badgeBorder: "border-zinc-200",
    accentColor: "text-black",
    chipActive: "bg-black text-white font-semibold border-black",
    dockBg: "bg-white/95 backdrop-blur-2xl border-zinc-200/90 shadow-xl",
    isLight: true,
  },
};
