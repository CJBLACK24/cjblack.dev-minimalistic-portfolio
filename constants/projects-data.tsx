import { IconClipboardCopy, IconTableColumn } from "@tabler/icons-react";
import {
  BookWiseHeader,
  PatchUpHeader,
  AuthSystemHeader,
} from "../components/projects/project-card-headers";

export const projectsData = [
  {
    id: "patch-up",
    title: "Patch Up: Modern Tire Repair",
    description:
      "A revolutionary dual-app mobile-controlled electric vulcanizer system. Features two connected mobile apps and one hardware device with real-time chat via Socket.io, routing map for location tracking, and seamless backend integration.",
    header: <PatchUpHeader />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    link: "/projects",
    className: "md:row-span-2", // Spans 2 rows on left
    viewButton: "/projects", // Add view button for mobile project
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
    title: (
      <span className="flex items-center gap-2 flex-wrap">
        BookWise: Library System
        <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
          In Development
        </span>
      </span>
    ),
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
  {
    id: "auth-system",
    title: "Fullstack Authentication System",
    description:
      "A complete authentication solution featuring email/password login, Google and GitHub OAuth integration, email verification, password reset, and secure session management.",
    header: <AuthSystemHeader />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    link: "/sign-up",
    liveDemo: "/sign-up",
    className: "", // Normal grid cell
    techStack: [
      {
        id: 2,
        name: "Better Auth",
        designation: "Auth Library",
        image: "/better-auth.png",
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
      {
        id: 5,
        name: "Tailwind CSS",
        designation: "Styling",
        image: "/tailwind-logo.svg",
      },
      {
        id: 7,
        name: "Neon",
        designation: "Database",
        image: "/neon.png",
      },
    ],
  },
];
