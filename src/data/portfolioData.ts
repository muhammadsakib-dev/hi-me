import type {
  AwardItem,
  EducationItem,
  ExperienceItem,
  FollowUpChip,
  HobbyItem,
  Project,
  SkillCategory,
  Testimonial,
} from "@/types/chat";

export const PORTFOLIO_OWNER = {
  name: "Md Sakib",
  shortName: "Sakib",
  title: "Senior Frontend Architect & Creative Web Developer",
  roleTagline: "Web Developer",
  status: "Available for Projects & Full-Time",
  location: "Dhaka, Bangladesh · Remote Worldwide",
  email: "sakib@example.com",
  phone: "+880 1700 000000",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://x.com",
  experienceYears: "5+",
  projectsCompleted: "40+",
  clientsSatisfied: "99%",
  avatarUrl: "https://ik.imagekit.io/muhammadsakib/dd.JPG",
  quote:
    "Engineering high-performance, fluid digital experiences where aesthetic design meets scalable frontend architecture.",
};

export const QUICK_COMMANDS = [
  { command: "about", label: "About Me", icon: "User" },
  { command: "skills", label: "Tech Stack", icon: "Code2" },
  { command: "projects", label: "Projects", icon: "Briefcase" },
  { command: "experience", label: "Experience", icon: "Clock" },
  { command: "contact", label: "Contact", icon: "Mail" },
  { command: "cv", label: "Download CV", icon: "FileText" },
  { command: "education", label: "Education", icon: "GraduationCap" },
  { command: "awards", label: "Awards", icon: "Trophy" },
  { command: "clients", label: "Testimonials", icon: "Sparkles" },
  { command: "hobbies", label: "Hobbies", icon: "Heart" },
  { command: "age", label: "Age & Journey", icon: "Calendar" },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Frontend Engineering",
    description:
      "Building responsive, accessible, and high-fps web interfaces.",
    skills: [
      { name: "Next.js 15/16 (App Router)", level: 96, years: "4 yrs" },
      { name: "React 19 & TypeScript", level: 98, years: "5 yrs" },
      { name: "Tailwind CSS v4 & PostCSS", level: 95, years: "5 yrs" },
      { name: "Framer Motion & Web Animations", level: 92, years: "4 yrs" },
      {
        name: "State Management (Zustand, TanStack Query)",
        level: 90,
        years: "4 yrs",
      },
      { name: "HTML5/CSS3 / A11y Standards", level: 95, years: "6 yrs" },
    ],
  },
  {
    category: "Backend & Cloud Architecture",
    description: "Scalable APIs, real-time engines, and database systems.",
    skills: [
      { name: "Node.js & Express / NestJS", level: 88, years: "4 yrs" },
      { name: "PostgreSQL & Prisma ORM", level: 86, years: "3 yrs" },
      { name: "REST & GraphQL APIs", level: 90, years: "4 yrs" },
      { name: "Supabase & Firebase", level: 89, years: "3 yrs" },
      { name: "Redis Caching & WebSockets", level: 82, years: "2 yrs" },
      { name: "Docker & Vercel Edge Runtime", level: 85, years: "3 yrs" },
    ],
  },
  {
    category: "Design & Dev Environment",
    description: "Design systems, tooling, and workflow optimization.",
    skills: [
      { name: "Figma UI/UX & Design Systems", level: 92, years: "5 yrs" },
      { name: "Glassmorphism & Micro-Interactions", level: 96, years: "4 yrs" },
      { name: "Turbopack, Vite & Biome", level: 88, years: "2 yrs" },
      { name: "Git, GitHub Actions & CI/CD", level: 90, years: "5 yrs" },
      {
        name: "Performance Optimization (Lighthouse 100)",
        level: 94,
        years: "4 yrs",
      },
    ],
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "omnichat-ai",
    title: "OmniChat AI — Enterprise Conversational Hub",
    tagline: "Next-gen streaming AI workspace with multi-model orchestrator",
    category: "AI & ML",
    description:
      "Enterprise generative AI platform with real-time token streaming, multi-agent orchestration, interactive code execution sandboxes, and vector memory retrieval.",
    longDescription:
      "OmniChat AI is a high-throughput conversational platform built for enterprises needing unified access to Claude, GPT-4, and custom fine-tuned LLMs. It features zero-latency token streaming over HTTP/2, client-side artifact canvas rendering, collaborative threads, and fine-grained privacy controls. Architected using Next.js App Router with Edge execution.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "OpenAI API",
      "PostgreSQL",
    ],
    featured: true,
    liveUrl: "https://example.com/omnichat",
    githubUrl: "https://github.com/example/omnichat",
    metrics: [
      { label: "Active Users", value: "85,000+" },
      { label: "Token Latency", value: "< 110ms" },
      { label: "System Uptime", value: "99.98%" },
    ],
  },
  {
    id: "novapulse-terminal",
    title: "NovaPulse — Real-Time Financial Terminal",
    tagline: "High-frequency crypto & equity visualizer with 60 FPS charts",
    category: "Full Stack",
    description:
      "Sub-second market data analytics platform streaming 50k+ market ticks/sec with virtualized orderbooks, candlestick charts, and custom indicator scripts.",
    longDescription:
      "Engineered an institutional-grade trading terminal capable of ingesting high-volume WebSockets without UI thread stutter. Features GPU-accelerated canvas renderers, customizable glassmorphic widget workspaces, depth chart heatmaps, and customizable alerts.",
    image:
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1200&auto=format&fit=crop",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "WebSockets",
      "Canvas/WebGL",
      "Zustand",
    ],
    featured: true,
    liveUrl: "https://example.com/novapulse",
    githubUrl: "https://github.com/example/novapulse",
    metrics: [
      { label: "Throughput", value: "50K msgs/sec" },
      { label: "Frame Rate", value: "60 FPS Locked" },
      { label: "Volume Tracked", value: "$1.8B/day" },
    ],
  },
  {
    id: "aetheria-ui",
    title: "Aetheria UI — Open-Source Glassmorphic Design System",
    tagline:
      "Headless, accessible component library built for futuristic web applications",
    category: "Design Engineering",
    description:
      "Comprehensive React component suite featuring 60+ accessible primitives, dark glassmorphic styling, fluid springs, and customizable CSS variable themes.",
    longDescription:
      "Aetheria UI was created to bridge high-end editorial aesthetics with strict WCAG AAA accessibility. Packed with fully keyboard-navigable dialogs, animated command palettes, fluid tabs, and responsive layout docks. Downloaded over 120,000 times by engineers worldwide.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    tags: [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Storybook",
      "TypeScript",
      "NPM",
    ],
    featured: true,
    liveUrl: "https://example.com/aetheria",
    githubUrl: "https://github.com/example/aetheria-ui",
    metrics: [
      { label: "NPM Downloads", value: "120K+" },
      { label: "Components", value: "64 Primitives" },
      { label: "GitHub Stars", value: "2,850" },
    ],
  },
  {
    id: "spherepay-global",
    title: "SpherePay — Borderless Global Checkout Engine",
    tagline: "One-tap international payment checkout SDK and merchant portal",
    category: "Full Stack",
    description:
      "Cross-border payment infrastructure supporting 140+ currencies, crypto settlements, automatic sales tax, and fraud protection algorithms.",
    longDescription:
      "Designed and deployed the checkout widget SDK embedded into hundreds of e-commerce storefronts. Optimized checkout bundle size to under 24KB gzipped while achieving a 23% reduction in cart abandonment rates.",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop",
    tags: ["Next.js", "Node.js", "Tailwind CSS", "Stripe API", "Redis", "Jest"],
    featured: false,
    liveUrl: "https://example.com/spherepay",
    githubUrl: "https://github.com/example/spherepay",
    metrics: [
      { label: "GMV Processed", value: "$4.5M+" },
      { label: "Cart Conversion", value: "+23%" },
      { label: "Bundle Size", value: "23.4 KB" },
    ],
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Jenkins",
    role: "VP of Product",
    company: "Horizon Labs (San Francisco)",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    quote:
      "Sakib delivered our core SaaS UI weeks ahead of schedule. His eye for micro-interactions, smooth spring animations, and rock-solid Next.js architecture made our app feel 10x more premium.",
    rating: 5,
  },
  {
    id: "t2",
    name: "David Chen",
    role: "CTO & Co-Founder",
    company: "NexusFlow (London)",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    quote:
      "One of the most talented frontend architects I've ever collaborated with. Sakib solves hard performance challenges effortlessly and builds design systems our whole team loves using.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Elena Rostova",
    role: "Design Director",
    company: "Studio Lumina (Berlin)",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    quote:
      "Sakib understands the bridge between Figma designs and real-world code like few others. He respects every pixel, animation curve, and responsive breakpoint.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Marcus Aurel",
    role: "Head of Engineering",
    company: "Apex Systems (Austin)",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    quote:
      "Exceptional work ethic, transparent communication, and deep mastery of React 19 and Tailwind. An invaluable asset to any high-velocity product team.",
    rating: 5,
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2023 — Present",
    role: "Senior Frontend Architect",
    company: "CloudNova Technologies",
    location: "Remote · San Francisco / Worldwide",
    description:
      "Spearheaded the redesign and performance modernization of CloudNova's flagship web application, migrating legacy codebases to Next.js App Router and Tailwind CSS.",
    achievements: [
      "Cut initial page load time by 52% and brought Core Web Vitals to green 99+ scores.",
      "Architected the unified design system used across 6 cross-functional engineering squads.",
      "Mentored 8 mid-level engineers in modern TypeScript, accessibility patterns, and state architecture.",
    ],
    technologies: [
      "Next.js 15/16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
    ],
  },
  {
    id: "exp-2",
    period: "2021 — 2023",
    role: "Lead UI/UX & Creative Frontend Engineer",
    company: "Hyperion Digital",
    location: "Dhaka, Bangladesh & Remote",
    description:
      "Engineered high-impact web applications, client portals, and interactive digital products for global tech startups and enterprise clients.",
    achievements: [
      "Delivered 18+ web applications from Figma prototypes to production within deadline.",
      "Implemented automated CI/CD testing pipelines ensuring 0% regression in UI components.",
      "Introduced micro-interaction animations that improved user onboarding completion by 34%.",
    ],
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Supabase",
      "Figma",
    ],
  },
  {
    id: "exp-3",
    period: "2019 — 2021",
    role: "Full Stack Web Developer",
    company: "ByteWave Studios",
    location: "Dhaka, Bangladesh",
    description:
      "Built full-stack web platforms, REST APIs, and e-commerce solutions with a heavy emphasis on responsive layouts, clean code, and database schema design.",
    achievements: [
      "Constructed secure customer authentication and payment processing gateways.",
      "Optimized relational database queries, reducing query response times by 38%.",
    ],
    technologies: [
      "JavaScript (ES6+)",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "CSS3",
    ],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Science in Computer Science & Engineering (B.Sc CSE)",
    institution: "American International University - Bangladesh (AIUB)",
    period: "2015 — 2019",
    grade: "CGPA 3.86 / 4.00 (Dean's Honor List)",
    highlights: [
      "Specialized in Software Architecture, Distributed Systems, and Human-Computer Interaction (HCI).",
      "Led the University Web Innovation Club and organized annual inter-university hackathons.",
      "Published undergraduate research paper on responsive UI rendering heuristics.",
    ],
  },
];

export const AWARDS_DATA: AwardItem[] = [
  {
    id: "award-1",
    title: "Awwwards Site of the Day / Developer Award",
    organization: "Awwwards International",
    year: "2024",
    description:
      "Honored for technical excellence, fluid web physics, and glassmorphic micro-interactions.",
    badge: "Site of the Day",
  },
  {
    id: "award-2",
    title: "1st Place Winner — Global Web3 & FinTech Hackathon",
    organization: "ETHGlobal / Devfolio",
    year: "2023",
    description:
      "Engineered a decentralized real-time liquidity visualization terminal with zero latency.",
    badge: "1st Prize ($10,000)",
  },
  {
    id: "award-3",
    title: "Best Open-Source UI Library Contributor",
    organization: "React Community Awards",
    year: "2022",
    description:
      "Recognized for contributions toward accessible web component standards and animations.",
    badge: "Top Contributor",
  },
];

export const HOBBIES_DATA: HobbyItem[] = [
  {
    id: "hobby-1",
    name: "Generative Art & GLSL Shaders",
    category: "Creative Coding",
    icon: "Palette",
    description:
      "Crafting hypnotic math-driven algorithmic visuals, raymarching shaders, and canvas particle simulations.",
    stats: "30+ shader experiments on Shadertoy",
  },
  {
    id: "hobby-2",
    name: "Specialty Pour-Over Coffee",
    category: "Culinary Craft",
    icon: "Coffee",
    description:
      "Dialing in Ethiopian light roasts using V60, Fellow Ode grinder, and strict brew ratios (1:16 at 93°C).",
    stats: "Tasting notes: Bergamot & Jasmine",
  },
  {
    id: "hobby-3",
    name: "Custom Mechanical Keyboards",
    category: "Hardware",
    icon: "Keyboard",
    description:
      "Hand-soldering boards, lubing Krytox 205g0 switches, and tuning acoustic foam for the deepest 'thock'.",
    stats: "Current daily: Alice layout 65%",
  },
  {
    id: "hobby-4",
    name: "Astrophotography & Sci-Fi",
    category: "Exploration",
    icon: "Moon",
    description:
      "Deep-sky exposure photography of nebulae and reading Asimov, Liu Cixin, and Ted Chiang novellas.",
    stats: "Tracked over 15 celestial targets",
  },
];

export const AGE_DATA = {
  ageYears: 26,
  birthYear: 1999,
  journeyStartedYear: 2017,
  totalYearsCoding: "9+ Years",
  totalCommits: "3,200+ this year",
  cupsOfCoffee: "4,800+ and counting",
  favoriteQuote:
    "Simplicity is prerequisite for reliability. — Edsger W. Dijkstra",
};

export const FOLLOW_UP_MAP: Record<string, FollowUpChip[]> = {
  welcome: [
    { label: "🚀 View Projects", command: "projects" },
    { label: "🛠 Tech Stack", command: "skills" },
    { label: "👨‍💻 About Sakib", command: "about" },
    { label: "📬 Contact Me", command: "contact" },
  ],
  about: [
    { label: "🛠 Inspect Skills", command: "skills" },
    { label: "💼 Career Experience", command: "experience" },
    { label: "📄 Download CV", command: "cv" },
    { label: "📬 Send Message", command: "contact" },
  ],
  skills: [
    { label: "💻 See Built Projects", command: "projects" },
    { label: "🏆 Honors & Awards", command: "awards" },
    { label: "💼 Work Experience", command: "experience" },
    { label: "📬 Hire Sakib", command: "contact" },
  ],
  projects: [
    { label: "⭐ Client Reviews", command: "clients" },
    { label: "🛠 Skills & Tech", command: "skills" },
    { label: "📬 Discuss a Project", command: "contact" },
    { label: "📄 Get Resume / CV", command: "cv" },
  ],
  experience: [
    { label: "🎓 Education", command: "education" },
    { label: "🏆 Awards", command: "awards" },
    { label: "💻 Projects", command: "projects" },
    { label: "📬 Let's Talk", command: "contact" },
  ],
  clients: [
    { label: "💻 View My Work", command: "projects" },
    { label: "📬 Start a Project", command: "contact" },
    { label: "📄 View Resume", command: "cv" },
  ],
  contact: [
    { label: "🚀 Browse Projects", command: "projects" },
    { label: "🛠 View Skills", command: "skills" },
    { label: "👨‍💻 Learn About Sakib", command: "about" },
  ],
  hobbies: [
    { label: "👨‍💻 About Me", command: "about" },
    { label: "🎂 Age & Story", command: "age" },
    { label: "🚀 See Projects", command: "projects" },
  ],
  age: [
    { label: "💼 Career Timeline", command: "experience" },
    { label: "🎨 Personal Hobbies", command: "hobbies" },
    { label: "🛠 Technical Skills", command: "skills" },
  ],
  cv: [
    { label: "📬 Hire Sakib", command: "contact" },
    { label: "💻 View Live Projects", command: "projects" },
    { label: "🎓 View Education", command: "education" },
  ],
  education: [
    { label: "🏆 View Awards", command: "awards" },
    { label: "💼 Work Experience", command: "experience" },
    { label: "🛠 Skills List", command: "skills" },
  ],
  awards: [
    { label: "💻 Featured Projects", command: "projects" },
    { label: "⭐ Client Testimonials", command: "clients" },
    { label: "📬 Contact Sakib", command: "contact" },
  ],
  help: [
    { label: "👨‍💻 About", command: "about" },
    { label: "🛠 Skills", command: "skills" },
    { label: "🚀 Projects", command: "projects" },
    { label: "💼 Experience", command: "experience" },
    { label: "📬 Contact", command: "contact" },
  ],
  fallback: [
    { label: "👨‍💻 About", command: "about" },
    { label: "🛠 Skills", command: "skills" },
    { label: "🚀 Projects", command: "projects" },
    { label: "📬 Contact", command: "contact" },
  ],
};

export const COMMAND_SYNONYMS: Record<string, string> = {
  about: "about",
  who: "about",
  bio: "about",
  profile: "about",
  intro: "about",
  introduction: "about",
  author: "about",

  skills: "skills",
  skill: "skills",
  tech: "skills",
  stack: "skills",
  technologies: "skills",
  languages: "skills",
  tools: "skills",

  projects: "projects",
  project: "projects",
  work: "projects",
  portfolio: "projects",
  showcase: "projects",
  apps: "projects",

  clients: "clients",
  client: "clients",
  reviews: "clients",
  testimonials: "clients",
  testimonial: "clients",
  feedback: "clients",

  contact: "contact",
  hire: "contact",
  email: "contact",
  message: "contact",
  reach: "contact",
  chat: "contact",

  hobbies: "hobbies",
  hobby: "hobbies",
  interests: "hobbies",
  fun: "hobbies",
  music: "hobbies",
  coffee: "hobbies",

  age: "age",
  birthday: "age",
  years: "age",
  journey: "age",
  story: "age",

  cv: "cv",
  resume: "cv",
  download: "cv",
  pdf: "cv",

  education: "education",
  degree: "education",
  university: "education",
  college: "education",
  study: "education",

  experience: "experience",
  career: "experience",
  jobs: "experience",
  history: "experience",
  background: "experience",

  awards: "awards",
  award: "awards",
  achievements: "awards",
  honors: "awards",
  trophy: "awards",

  help: "help",
  commands: "help",
  menu: "help",
  list: "help",
  info: "help",

  clear: "clear",
  reset: "clear",
};
