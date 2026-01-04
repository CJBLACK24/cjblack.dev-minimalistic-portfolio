import {
  IconBrandFigma,
  IconTerminal2,
  IconComponents,
  IconBrandGithub,
  IconHome,
  IconCode,
  IconCpu,
  IconClipboardCopy,
  IconTableColumn,
  IconSchool,
  IconCalendarEvent,
  IconUser,
} from "@tabler/icons-react";
import {
  BookWiseHeader,
  PatchUpHeader,
  NUManagementHeader,
  DevEventHeader,
} from "../components/projects/project-card-headers";

// Floating Navigation Items
export const navItems = [
  {
    name: "About",
    link: "/about",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Home",
    link: "#home",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Projects",
    link: "#projects",
    icon: <IconCode className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Technologies",
    link: "#technologies",
    icon: <IconCpu className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

// Technology Items
export const backendItems = [
  {
    id: 1,
    name: "Node.js",
    designation: "Runtime",
    image: "/nodejs-logo.svg",
  },
  {
    id: 2,
    name: "MongoDB",
    designation: "Database",
    image: "/mongodb-logo.svg",
  },
  {
    id: 3,
    name: "PostgreSQL",
    designation: "Database",
    image: "/postgresql-logo.svg",
  },
  {
    id: 4,
    name: "Express",
    designation: "Framework",
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
    name: "Redis",
    designation: "Database",
    image: "https://cdn.worldvectorlogo.com/logos/redis.svg",
  },
  {
    id: 7,
    name: "REST API",
    designation: "Architecture",
    image:
      "https://camo.githubusercontent.com/ab09de79f0629e01d86942513abff902dc6948e1d6194b4d4dc3724d82e52831/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f726573746170692d69636f6e2e737667",
  },
  {
    id: 8,
    name: "WebSocket",
    designation: "Protocol",
    image: "https://cdn.worldvectorlogo.com/logos/websocket.svg",
  },
  {
    id: 9,
    name: "Supabase",
    designation: "Backend as a Service",
    image: "/supabase.svg",
  },
];

export const webMobileItems = [
  {
    id: 1,
    name: "React",
    designation: "Library",
    image:
      "https://camo.githubusercontent.com/afdf5a3b933086604f6acf89a8fa2a321aaa6d912919c573f87545587a59333f/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f72656163742d69636f6e2e737667",
  },
  {
    id: 2,
    name: "Next.js",
    designation: "Framework",
    image: "/nextjs-logo.svg",
  },
  {
    id: 3,
    name: "React Native",
    designation: "Framework",
    image: "/react-native-logo.svg",
  },
  {
    id: 4,
    name: "Expo",
    designation: "Platform",
    image: "/expo.png",
  },
  {
    id: 5,
    name: "Tailwind CSS",
    designation: "Framework",
    image: "/tailwind-logo.svg",
  },
  {
    id: 6,
    name: "Framer Motion",
    designation: "Animation",
    image: "/framer-motion-logo.svg",
  },
  {
    id: 7,
    name: "HTML",
    designation: "Markup",
    image: "/html-logo.svg",
  },
  {
    id: 9,
    name: "CSS3",
    designation: "Styling",
    image: "/CSS3.svg",
  },
  {
    id: 11,
    name: "Webpack",
    designation: "Bundler",
    image:
      "https://camo.githubusercontent.com/971dc0f889a81abf890b811ea97765459c01e50470aa92927fc63109867dc35e/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f7765627061636b2d69636f6e2e737667",
  },
];

export const programmingLanguageItems = [
  {
    id: 1,
    name: "JavaScript",
    designation: "Language",
    image:
      "https://camo.githubusercontent.com/739ff4cc642d6d72a274d75aa0a16d85782c91011453641c1bcc47d872faf42d/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6a732d69636f6e2e737667",
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
    name: "Python",
    designation: "Language",
    image:
      "https://camo.githubusercontent.com/d7f81f6d4cfa55056568314a53cac1cfd12f690bccf1e2c1d315ca6a17d39747/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f707974686f6e2d69636f6e2e737667",
  },
  {
    id: 4,
    name: "Java",
    designation: "Language",
    image:
      "https://camo.githubusercontent.com/4accd2f20a00fd4364e3456b3525b9af98b827afb9d4ec9f62cce6732552fa06/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6a6176612d69636f6e2e737667",
  },
  {
    id: 5,
    name: "R",
    designation: "Language",
    image: "/R_logo.svg",
  },
  {
    id: 6,
    name: "C#",
    designation: "Language",
    image:
      "https://camo.githubusercontent.com/dd75d21504d085f26ff74430df94f208f23beb055880df2bd5faa1219e87d6d8/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6373686172702d69636f6e2e737667",
  },
  {
    id: 7,
    name: "C++",
    designation: "Language",
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
  {
    id: 2,
    name: "GitHub",
    designation: "Platform",
    image: "/github.svg",
  },
  {
    id: 3,
    name: "Vercel",
    designation: "Deployment",
    image: "/vercel.png",
  },
  {
    id: 4,
    name: "Hostinger",
    designation: "Hosting",
    image: "/hostinger-logo.svg",
  },
  {
    id: 5,
    name: "MongoDB Compass",
    designation: "Tool",
    image: "/mongodb-logo.svg",
  },
  {
    id: 6,
    name: "Google Antigravity",
    designation: "Code Editor",
    image: "/anti gravity.png",
  },
  {
    id: 7,
    name: "Terminal",
    designation: "CLI",
    image: "/terminal-logo.svg",
  },
  {
    id: 8,
    name: "Figma",
    designation: "Design",
    image: "/figma-logo.svg",
  },
  {
    id: 9,
    name: "Socket.IO",
    designation: "Real-time",
    image: "/socket.png",
  },
  {
    id: 10,
    name: "Better Auth",
    designation: "Authentication",
    image: "/better-auth.png",
  },
  {
    id: 11,
    name: "Aceternity",
    designation: "UI Components",
    image: "/acertinity.png",
  },
  {
    id: 12,
    name: "Upstash",
    designation: "Database",
    image: "/Upstash.png",
  },
  {
    id: 13,
    name: "RStudio",
    designation: "IDE",
    image: "/RStudio.png",
  },
  {
    id: 14,
    name: "Resend",
    designation: "Email API",
    image: "/resend.png",
  },
  {
    id: 15,
    name: "Shadcn UI",
    designation: "Component Lib",
    image: "/shadcn.png",
  },
  {
    id: 16,
    name: "Cloudinary",
    designation: "Media Management",
    image: "https://cdn.worldvectorlogo.com/logos/cloudinary-2.svg",
  },
  {
    id: 17,
    name: "Prettier",
    designation: "Code Formatter",
    image:
      "https://camo.githubusercontent.com/db583023070de5c6f93dcb742c28dde5f5c164e16543e39c1136df08b1436d03/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f70726574746965722d69636f6e2e737667",
  },
];

export const currentlyLearningItems = [
  {
    id: 1,
    name: "AWS",
    designation: "Cloud",
    image:
      "https://camo.githubusercontent.com/7575696d9955b68522293ed8409d041e78dc26dd51add99b5a5d9aad0747e11e/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6177732d69636f6e2e737667",
  },
  {
    id: 2,
    name: "Kubernetes",
    designation: "Orchestration",
    image:
      "https://camo.githubusercontent.com/a6a8821f41607abeea51e83b36464bfee4628ad6f4fd1aea4e7415b925a46fc3/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6b756265726e657465732d69636f6e2e737667",
  },
  {
    id: 3,
    name: "Docker",
    designation: "Containerization",
    image:
      "https://camo.githubusercontent.com/67bf0811ad0811af2ea7ac7b43e8c16f5fb89fa45e2dcc0a7035e8b053215794/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f646f636b65722d69636f6e2e737667",
  },
  {
    id: 6,
    name: "Electron",
    designation: "Framework",
    image:
      "https://camo.githubusercontent.com/d4cdfe4caa793b7fe511a00e04f52a4b63918764633fe6772db58c4aab288762/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f72656475782d69636f6e2e737667",
  },
  {
    id: 7,
    name: "MySQL",
    designation: "An open source RDBMS",
    image:
      "https://camo.githubusercontent.com/166d7510eddc438981693781e5252ddcf99f0445f80b91b7986f2f7f122f9892/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6d7973716c2d69636f6e2e737667",
  },
  {
    id: 8,
    name: "gRPC",
    designation: "Protocol",
    image: "/gRPC.svg",
  },
];

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-24 rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] mask-[radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/20 bg-neutral-100 dark:bg-black"></div>
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
    id: "devevent",
    title: "DevEvent Platform",
    description:
      "The hub for every developer event! A modern platform for discovering, hosting, and attending tech events with advanced search, booking wizard, and PDF ticket generation.",
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
    id: "patch-up",
    title: "Patch Up: Modern Tire Repair",
    description:
      "A revolutionary dual-app mobile-controlled electric vulcanizer system with real-time chat via Socket.io, routing map for location tracking, and seamless backend integration.",
    header: <PatchUpHeader />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    link: "/projects",
    className: "",
    viewButton: "/projects",
    techStack: [
      {
        id: 1,
        name: "React Native",
        designation: "Framework",
        image: "/react-native-logo.svg",
      },
      {
        id: 2,
        name: "MongoDB",
        designation: "Database",
        image: "/mongodb-logo.svg",
      },
      {
        id: 3,
        name: "Arduino",
        designation: "Hardware",
        image: "/ardiuno.png",
      },
      { id: 4, name: "C++", designation: "Language", image: "/C++.png" },
      { id: 5, name: "Expo", designation: "Platform", image: "/expo.png" },
      {
        id: 6,
        name: "Socket.io",
        designation: "Real-time",
        image: "/socket.png",
      },
    ],
  },
  {
    id: "bookwise",
    title: "BookWise: Library System",
    description:
      "A comprehensive university library management system for accessing resources, managing inventory, and tracking borrowing history.",
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
