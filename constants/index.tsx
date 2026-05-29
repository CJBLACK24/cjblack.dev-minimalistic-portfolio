import {
  IconBrandFigma,
  IconTerminal2,
  IconComponents,
  IconBrandGithub,
  IconHome,
  IconCode,
  IconCpu,
  IconTableColumn,
  IconSchool,
  IconCalendarEvent,
  IconUser,
  IconMessage2,
  IconBriefcase,
} from "@tabler/icons-react";
import {
  BookWiseHeader,
  NUManagementHeader,
  DevEventHeader,
  ModernUniversityHeader,
  NextLMSHeader,
} from "../components/projects/project-card-headers";

// Floating Navigation Items
export const navItems = [
  {
    name: "Wall",
    link: "/wall",
    icon: <IconMessage2 className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Home",
    link: "/#home",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "/about",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Projects",
    link: "/#projects",
    icon: <IconCode className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Technologies",
    link: "/#technologies",
    icon: <IconCpu className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Work exp.",
    link: "/#work-experience",
    icon: (
      <IconBriefcase className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
];

// Technology Items
// Technology Items
export const backendItems = [
  {
    id: 1,
    name: "Node.js",
    designation: "JS Runtime",
    image: "/nodejs-logo.svg",
  },
  {
    id: 2,
    name: "MongoDB",
    designation: "NoSQL Database",
    image: "/mongodb-logo.svg",
  },
  {
    id: 3,
    name: "PostgreSQL",
    designation: "Relational Database",
    image: "/postgresql-logo.svg",
  },
  {
    id: 4,
    name: "Express",
    designation: "Backend Framework",
    image: "/ExpressJS.png",
  },
  {
    id: 5,
    name: "GraphQL",
    designation: "Query Language",
    image:
      "https://camo.githubusercontent.com/3680d7839e81609a1618a06fa7d943dc6f8949169284adb3be6ce161e22d9570/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6772617068716c2d69636f6e2e737667",
  },
  {
    id: 6,
    name: "NeonDB",
    designation: "Serverless Postgres",
    image: "/neon.jpeg",
  },
  {
    id: 7,
    name: "Redis",
    designation: "In-Memory Store",
    image: "https://cdn.worldvectorlogo.com/logos/redis.svg",
  },
  {
    id: 8,
    name: "REST API",
    designation: "API Architecture",
    image:
      "https://camo.githubusercontent.com/ab09de79f0629e01d86942513abff902dc6948e1d6194b4d4dc3724d82e52831/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f726573746170692d69636f6e2e737667",
  },
  {
    id: 9,
    name: "MySQL",
    designation: "Relational Database",
    image:
      "https://camo.githubusercontent.com/166d7510eddc438981693781e5252ddcf99f0445f80b91b7986f2f7f122f9892/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6d7973716c2d69636f6e2e737667",
  },
  {
    id: 10,
    name: "PHP",
    designation: "Server Language",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg",
  },
  { id: 11, name: "gRPC", designation: "RPC Protocol", image: "/gRPC.svg" },
  {
    id: 12,
    name: "Prisma ORM",
    designation: "Type-Safe ORM",
    image:
      "https://raw.githubusercontent.com/devicons/devicon/master/icons/prisma/prisma-original.svg",
  },
  {
    id: 13,
    name: "Drizzle ORM",
    designation: "Lightweight ORM",
    image: "https://images.opencollective.com/drizzle-orm/867cf76/logo/256.png",
  },
  {
    id: 14,
    name: "Supabase",
    designation: "Backend Platform",
    image: "/supabase.svg",
  },
];

export const webMobileItems = [
  {
    id: 1,
    name: "React",
    designation: "UI Library",
    image:
      "https://camo.githubusercontent.com/afdf5a3b933086604f6acf89a8fa2a321aaa6d912919c573f87545587a59333f/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f72656163742d69636f6e2e737667",
  },
  {
    id: 2,
    name: "Next.js",
    designation: "Fullstack Framework",
    image: "/nextjs-logo.svg",
  },
  {
    id: 3,
    name: "React Native",
    designation: "Mobile Framework",
    image: "/react-native-logo.svg",
  },
  { id: 4, name: "Expo", designation: "Mobile Platform", image: "/expo.png" },
  {
    id: 5,
    name: "Zustand",
    designation: "State Manager",
    image:
      "https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg",
  },
  {
    id: 6,
    name: "Tailwind CSS",
    designation: "Utility CSS",
    image: "/tailwind-logo.svg",
  },
  {
    id: 7,
    name: "Framer Motion",
    designation: "Motion Library",
    image: "/framer-motion-logo.svg",
  },
  { id: 8, name: "Three.js", designation: "3D Engine", image: "/Threejs.png" },
  {
    id: 9,
    name: "GSAP",
    designation: "Animation Engine",
    image: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg",
  },
  {
    id: 10,
    name: "HTML",
    designation: "Markup Language",
    image: "/html-logo.svg",
  },
  { id: 11, name: "CSS3", designation: "Styling Language", image: "/CSS3.svg" },
  {
    id: 12,
    name: "Webpack",
    designation: "Module Bundler",
    image:
      "https://camo.githubusercontent.com/971dc0f889a81abf890b811ea97765459c01e50470aa92927fc63109867dc35e/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f7765627061636b2d69636f6e2e737667",
  },
];

export const programmingLanguageItems = [
  {
    id: 1,
    name: "JavaScript",
    designation: "Core Language",
    image:
      "https://camo.githubusercontent.com/739ff4cc642d6d72a274d75aa0a16d85782c91011453641c1bcc47d872faf42d/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6a732d69636f6e2e737667",
  },
  {
    id: 2,
    name: "TypeScript",
    designation: "Typed JavaScript",
    image:
      "https://camo.githubusercontent.com/5c3873b6812ecfb1d2bc6ece8c2c548d53d151c2edbf6b0281207672ca3ab0a8/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f74732d69636f6e2e737667",
  },
  {
    id: 3,
    name: "Python",
    designation: "General Language",
    image:
      "https://camo.githubusercontent.com/d7f81f6d4cfa55056568314a53cac1cfd12f690bccf1e2c1d315ca6a17d39747/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f707974686f6e2d69636f6e2e737667",
  },
  {
    id: 4,
    name: "Java",
    designation: "Enterprise Language",
    image:
      "https://camo.githubusercontent.com/4accd2f20a00fd4364e3456b3525b9af98b827afb9d4ec9f62cce6732552fa06/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6a6176612d69636f6e2e737667",
  },
  {
    id: 5,
    name: "R",
    designation: "Statistical Language",
    image: "/R_logo.svg",
  },
  {
    id: 6,
    name: "C#",
    designation: "Dotnet Language",
    image:
      "https://camo.githubusercontent.com/dd75d21504d085f26ff74430df94f208f23beb055880df2bd5faa1219e87d6d8/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6373686172702d69636f6e2e737667",
  },
  {
    id: 7,
    name: "C++",
    designation: "Systems Language",
    image:
      "https://camo.githubusercontent.com/c57992ccd8e44fbfa43178e6de1ec1d0974559148afeb3044100e6fc9142311c/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6370702d69636f6e2e737667",
  },
];

export const toolsItems = [
  {
    id: 1,
    name: "Git",
    designation: "Version Control",
    image: "/git-logo.svg",
  },
  { id: 2, name: "GitHub", designation: "Code Platform", image: "/github.svg" },
  {
    id: 3,
    name: "Vercel",
    designation: "Hosting Platform",
    image: "/vercel.png",
  },
  {
    id: 4,
    name: "npm",
    designation: "Package Manager",
    image: "https://www.vectorlogo.zone/logos/npmjs/npmjs-icon.svg",
  },
  {
    id: 5,
    name: "CI-CD Pipeline",
    designation: "DevOps Pipeline",
    image: "https://www.vectorlogo.zone/logos/github/github-icon.svg",
  },
  { id: 6, name: "XAMPP", designation: "Local Stack", image: "/xampp.svg" },
  {
    id: 7,
    name: "Hostinger",
    designation: "Web Hosting",
    image: "/hostinger-logo.svg",
  },
  {
    id: 8,
    name: "WebSocket",
    designation: "Realtime Protocol",
    image: "https://cdn.worldvectorlogo.com/logos/websocket.svg",
  },
  {
    id: 9,
    name: "Socket.IO",
    designation: "Realtime Engine",
    image: "/socket.png",
  },
  {
    id: 10,
    name: "MongoDB Compass",
    designation: "Database GUI",
    image: "/mongodb-logo.svg",
  },
  {
    id: 11,
    name: "Google Antigravity",
    designation: "Code Editor",
    image: "/anti gravity.png",
  },
  {
    id: 12,
    name: "Terminal",
    designation: "Command Line",
    image: "/terminal-logo.svg",
  },
  { id: 13, name: "Figma", designation: "UI Design", image: "/figma-logo.svg" },
  {
    id: 14,
    name: "Better Auth",
    designation: "Auth Platform",
    image: "/better-auth.png",
  },
  {
    id: 15,
    name: "Aceternity",
    designation: "UI Components",
    image: "/acertinity.png",
  },
  {
    id: 16,
    name: "Upstash",
    designation: "Serverless Redis",
    image: "/Upstash.png",
  },
  { id: 17, name: "RStudio", designation: "Data IDE", image: "/RStudio.png" },
  { id: 18, name: "Resend", designation: "Email API", image: "/resend.png" },
  {
    id: 19,
    name: "Shadcn UI",
    designation: "Component Library",
    image: "/shadcn.png",
  },
  {
    id: 20,
    name: "Cloudinary",
    designation: "Media Platform",
    image: "https://cdn.worldvectorlogo.com/logos/cloudinary-2.svg",
  },
  {
    id: 21,
    name: "Prettier",
    designation: "Code Formatter",
    image:
      "https://camo.githubusercontent.com/db583023070de5c6f93dcb742c28dde5f5c164e16543e39c1136df08b1436d03/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f70726574746965722d69636f6e2e737667",
  },
  {
    id: 22,
    name: "JWT",
    designation: "Auth Token",
    image:
      "https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/jwt/icon.svg",
  },
  {
    id: 23,
    name: "Netlify",
    designation: "Hosting Platform",
    image:
      "https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/netlify/icon.svg",
  },
  {
    id: 24,
    name: "Render",
    designation: "Cloud Hosting",
    image: "/render.svg",
  },
  { id: 25, name: "Zod", designation: "Schema Validation", image: "/zod.png" },
  {
    id: 26,
    name: "Xendit",
    designation: "Payment Gateway",
    image: "/Xendit.png",
  },
];

export const currentlyLearningItems = [
  {
    id: 1,
    name: "AWS",
    designation: "Cloud Platform",
    image:
      "https://camo.githubusercontent.com/7575696d9955b68522293ed8409d041e78dc26dd51add99b5a5d9aad0747e11e/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6177732d69636f6e2e737667",
  },
  {
    id: 2,
    name: "Laravel",
    designation: "Fullstack Framework",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
  },
  {
    id: 3,
    name: "TanStack",
    designation: "Data Toolkit",
    image: "/Tanstack.png",
  },
  {
    id: 4,
    name: ".NET ASP",
    designation: "Backend Framework",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/.NET_Core_Logo.svg",
  },
  {
    id: 5,
    name: "Docker",
    designation: "Container Platform",
    image:
      "https://camo.githubusercontent.com/67bf0811ad0811af2ea7ac7b43e8c16f5fb89fa45e2dcc0a7035e8b053215794/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f646f636b65722d69636f6e2e737667",
  },
  {
    id: 6,
    name: "PostHog",
    designation: "Product Analytics",
    image:
      "https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/posthog/icon.svg",
  },
  {
    id: 7,
    name: "Sanity",
    designation: "Headless CMS",
    image: "/sanity.io.png",
  },
  {
    id: 8,
    name: "Cloudflare",
    designation: "Edge Security",
    image: "https://www.vectorlogo.zone/logos/cloudflare/cloudflare-icon.svg",
  },
];

const Skeleton = () => (
  <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-24 w-full flex-1 rounded-xl border border-transparent bg-neutral-100 mask-[radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/20 dark:bg-black"></div>
);

export const gridItems = [
  {
    title: "Full-Stack Expertise",
    description:
      "Proficient in modern web technologies including React, Next.js, Node.js, and databases. Building scalable, performant applications from concept to deployment.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconComponents className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Problem Solver",
    description:
      "Passionate about tackling complex challenges with clean, efficient code and innovative solutions.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconTerminal2 className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Design-Focused Developer",
    description:
      "Strong eye for UI/UX design, creating beautiful and intuitive user experiences with attention to detail.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconBrandFigma className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Collaborative Team Player",
    description:
      "Experienced in agile environments, code reviews, and cross-functional collaboration. Committed to writing maintainable code and continuous learning.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconBrandGithub className="h-4 w-4 text-neutral-500" />,
  },
];

export const words = ["Hello 👋"];

export const projectsData = [
  {
    id: "next-lms",
    title: "Next LMS",
    description:
      "A modern, interactive learning management system (LMS) built with Next.js. It features a sleek course catalog, real-time progress tracking, interactive learning modules, and a premium dashboard.",
    subtitle: "Next.js 16 - Neon Postgres - Prisma ORM - Arcjet WAF - Better-Auth",
    longDescription:
      "NextLMS is an enterprise-grade, multi-tenant B2B/B2C Learning Management SaaS platform built for scale, lightning-fast edge delivery, and secure logical tenant isolation. It enables organizations, corporate universities, and independent creators to spin up custom-branded academies instantly. Tenant isolation is enforced programmatically at both routing and data layers using Next.js middleware and active tenant context database query filters.",
    features: [
      "Logical isolation with Single Database, Shared Schema model",
      "High-performance tech stack: Next.js 16 (App Router) and Tailwind CSS v4",
      "Arcjet WAF protection with bot detection, rate limits, and shield protection",
      "Better-Auth integration supporting credentials, OAuth, and OTP passwordless Email",
      "Regionalized Southeast Asian billing with Xendit SDK",
      "Media uploads directly to Cloudinary under marshal-lms/ namespace"
    ],
    header: <NextLMSHeader />,
    icon: <IconSchool className="h-4 w-4 text-neutral-500" />,
    link: "https://next-lms-omega.vercel.app",
    liveDemo: "https://next-lms-omega.vercel.app",
    className: "",
    techStack: [
      {
        id: 1,
        name: "Next.js",
        designation: "Framework",
        image: "/nextjs-logo.svg",
      },
      {
        id: 2,
        name: "Tailwind CSS",
        designation: "Styling",
        image: "/tailwind-logo.svg",
      },
      {
        id: 3,
        name: "PostgreSQL",
        designation: "Database",
        image: "/postgresql-logo.svg",
      },
      {
        id: 4,
        name: "Prisma",
        designation: "ORM",
        image: "/prisma.png",
      },
    ],
  },
  {
    id: "devevent",
    title: "DevEvent Platform",
    description:
      "The hub for every developer event! A modern platform for discovering, hosting, and attending tech events with advanced search, booking wizard, and PDF ticket generation.",
    subtitle: "Next.js 16 - React 19 - Tailwind CSS v4 - Supabase - Arcjet",
    longDescription:
      "DevEvent is a modern, full-stack web application designed for developers to discover, host, and attend tech events. Built with the latest technologies including Next.js 16, React 19, and Turbopack for blazing-fast performance, it features a highly premium dark mode aesthetic with glassmorphism effects, smooth Framer Motion animations, and WebGL spotlight effects powered by OGL.",
    features: [
      "Advanced event discovery with real-time filtering (Virtual / Hybrid / In-Person)",
      "Smart booking system with ticket PDF generation using jsPDF & html2canvas",
      "Role-based access control (Admin, Organizer, Attendee) via middleware",
      "Arcjet-powered protection with rate limiting, bot detection, and shield defense",
      "Nodemailer integration for automated booking and confirmation HTML emails"
    ],
    github: "https://github.com/CJBLACK24/Developer-Events-Platform",
    header: <DevEventHeader />,
    icon: <IconCalendarEvent className="h-4 w-4 text-neutral-500" />,
    link: "https://developer-events-platform.vercel.app",
    liveDemo: "https://developer-events-platform.vercel.app",
    className: "",
    techStack: [
      {
        id: 1,
        name: "Next.js",
        designation: "Framework",
        image: "/nextjs-logo.svg",
      },
      {
        id: 2,
        name: "Tailwind CSS",
        designation: "Styling",
        image: "/tailwind-logo.svg",
      },
      {
        id: 3,
        name: "Prisma",
        designation: "ORM",
        image: "/prisma.png",
      },
      {
        id: 4,
        name: "PostgreSQL",
        designation: "Database",
        image: "/postgresql-logo.svg",
      },
    ],
  },
  {
    id: "nu-management",
    title: "NU Iloilo Management System",
    description:
      "A comprehensive university management system with role-based dashboards for administrators, teachers, students, and parents. Features real-time messaging via Socket.io and interactive calendars.",
    subtitle: "",
    longDescription:
      "The NU Iloilo Management System is a full-featured, production-ready university management platform. It offers role-based dashboards with live statistics, real-time messaging capabilities, parent-student linking, and full academic management (classes, subjects, lessons, grades, and exams) backed by a robust PostgreSQL database schema.",
    features: [
      "Comprehensive multi-role RBAC (Admin, Teacher, Student, Parent)",
      "Real-time messaging & chat system powered by Socket.io and Cloudinary uploads",
      "Interactive calendar tracking lessons, exams, and events using React Big Calendar",
      "Visual academic analytics, attendance, and finance dashboards via Recharts",
      "Better Auth integration supporting credentials & Google OAuth"
    ],
    github: "https://github.com/CJBLACK24/National-University-Iloilo-Management-System",
    header: <NUManagementHeader />,
    icon: <IconSchool className="h-4 w-4 text-neutral-500" />,
    link: "https://national-university-iloilo-manageme.vercel.app/",
    liveDemo: "https://national-university-iloilo-manageme.vercel.app/",
    className: "",
    techStack: [
      {
        id: 1,
        name: "Next.js",
        designation: "Framework",
        image: "/nextjs-logo.svg",
      },
      {
        id: 2,
        name: "Socket.io",
        designation: "Real-time",
        image: "/socket.png",
      },
      {
        id: 3,
        name: "Prisma",
        designation: "ORM",
        image: "/prisma.png",
      },
      {
        id: 4,
        name: "PostgreSQL",
        designation: "Database",
        image: "/postgresql-logo.svg",
      },
      {
        id: 5,
        name: "Tailwind CSS",
        designation: "Styling",
        image: "/tailwind-logo.svg",
      },
    ],
  },
  {
    id: "modern-university",
    title: "Modern University Management Dashboard",
    description:
      "A comprehensive education management system featuring role-based portals, academic analytics, Student Information System (SIS), and automated scheduling capabilities.",
    subtitle: "Next.js - TypeScript - PostgreSQL - Tailwind CSS - Prisma",
    longDescription:
      "A comprehensive education management dashboard system featuring role-based portals, academic analytics, Student Information System (SIS), and automated scheduling capabilities.",
    features: [
      "Role-based administrative portals for education tracking",
      "Academic analytics and count charts for users",
      "Student Information System (SIS) for records & grading",
      "Automated scheduling for lessons & classrooms"
    ],
    header: <ModernUniversityHeader />,
    icon: <IconSchool className="h-4 w-4 text-neutral-500" />,
    link: "https://modern-university-management-dashbo.vercel.app/",
    liveDemo: "https://modern-university-management-dashbo.vercel.app/",
    className: "",
    techStack: [
      {
        id: 1,
        name: "Next.js",
        designation: "Framework",
        image: "/nextjs-logo.svg",
      },
      {
        id: 2,
        name: "TypeScript",
        designation: "Language",
        image:
          "https://camo.githubusercontent.com/5c3873b6812ecfb1d2bc6ece8c2c548d53d151c2edbf6b0281207672ca3ab0a8/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f74732d69636f6e2e737667",
      },
      {
        id: 3,
        name: "PostgreSQL",
        designation: "Database",
        image: "/postgresql-logo.svg",
      },
      {
        id: 4,
        name: "Tailwind CSS",
        designation: "Styling",
        image: "/tailwind-logo.svg",
      },
      {
        id: 5,
        name: "Prisma",
        designation: "ORM",
        image: "/prisma.png",
      },
    ],
  },
  {
    id: "bookwise",
    title: "BookWise: Library System",
    description:
      "A comprehensive university library management system for accessing resources, managing inventory, and tracking borrowing history.",
    subtitle: "Next.js - Tailwind CSS - PostgreSQL - Prisma ORM",
    longDescription:
      "BookWise is a comprehensive university library management system designed to make resources easily accessible. It allows students and administrators to browse, check out books, track borrowing history, and manage the campus library inventory with an intuitive interface.",
    features: [
      "University library catalog browsing and search",
      "Resource check-outs and borrowing history tracking",
      "Real-time inventory management and availability updates",
      "Elegant, responsive glassmorphic design system"
    ],
    header: <BookWiseHeader />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    link: "https://university-library-management-syste-jet.vercel.app/",
    liveDemo: "https://university-library-management-syste-jet.vercel.app/",
    className: "", // Normal grid cell
    techStack: [
      {
        id: 1,
        name: "Next.js",
        designation: "Framework",
        image: "/nextjs-logo.svg",
      },
      {
        id: 2,
        name: "Tailwind CSS",
        designation: "Styling",
        image: "/tailwind-logo.svg",
      },
      {
        id: 3,
        name: "PostgreSQL",
        designation: "Database",
        image: "/postgresql-logo.svg",
      },
      { id: 4, name: "Prisma", designation: "ORM", image: "/prisma.png" },
    ],
  },
];
