import {
  IconClipboardCopy,
  IconTableColumn,
  IconSchool,
  IconCalendarEvent,
} from "@tabler/icons-react";
import {
  BookWiseHeader,
  PatchUpHeader,
  NUManagementHeader,
  DevEventHeader,
} from "../components/projects/project-card-headers";

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
        name: "Prisma",
        designation: "ORM",
        image: "/prisma.png",
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
        name: "MongoDB",
        designation: "Database",
        image: "/mongodb-logo.svg",
      },
      {
        id: 2,
        name: "Arduino",
        designation: "Hardware",
        image: "/ardiuno.png",
      },
      { id: 3, name: "C++", designation: "Language", image: "/C++.png" },
      { id: 4, name: "Expo", designation: "Platform", image: "/expo.png" },
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
