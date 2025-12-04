import {
  IconBrandFigma,
  IconTerminal2,
  IconComponents,
  IconBrandGithub,
} from "@tabler/icons-react";

//Floating Navigation Items
export const navItems = [
  { name: "Home", link: "#home" },
  { name: "Projects", link: "#projects" },
  { name: "Technologies", link: "#technologies" },
];

// Technology Items
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
];

export const webMobileItems = [
  {
    id: 1,
    name: "React",
    designation: "Library",
    image: "/react-logo.svg",
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
    id: 10,
    name: "Shadcn UI",
    designation: "Component Lib",
    image: "/shadcn.png",
  },
];

export const programmingLanguageItems = [
  {
    id: 1,
    name: "JavaScript",
    designation: "Language",
    image: "/javascript-logo.svg",
  },
  {
    id: 2,
    name: "TypeScript",
    designation: "Language",
    image: "/typescript-logo.svg",
  },
  {
    id: 3,
    name: "Python",
    designation: "Language",
    image: "/python-logo.svg",
  },
  {
    id: 4,
    name: "Java",
    designation: "Language",
    image: "/java-logo.svg",
  },
  {
    id: 5,
    name: "R",
    designation: "Language",
    image: "/R_logo.svg",
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
    image: "/github-logo.svg",
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
