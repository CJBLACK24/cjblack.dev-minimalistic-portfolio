export const projectsData = [
  {
    category: "Capstone Project",
    title: "Patch Up: Modern Tire Repair",
    src: "/assets/patch-up/logo.png",
    description:
      "A comprehensive solution for modernizing roadside tire repair. It bridges the gap between stranded motorists and vulcanizing operators through smart technology.",
    features: [
      "On-demand service requests",
      "Eco-friendly solar-powered hardware",
      "Real-time tracking and communication",
      "Secure authentication and payments",
    ],
    techStack: [
      "React Native",
      "Expo",
      "Node.js",
      "MongoDB",
      "Socket.IO",
      "IoT",
    ],
  },
  {
    category: "Mobile App",
    title: "Customer Application",
    src: "/assets/patch-up/customer-app.png",
    description:
      "Empowers users to request tire repair services with just a few taps. It provides real-time updates and a seamless user experience.",
    features: [
      "Real-time GPS tracking via HeiGit & OpenRouteService",
      "In-app chat using Socket.IO",
      "Secure JWT Authentication",
      "Service history and rating system",
    ],
    techStack: ["React Native", "Expo", "Google Maps API", "Socket.IO"],
    designLink:
      "https://www.figma.com/design/1PoJ6cj2uOoGcSaqnZ3QC8/TITLE-1-MOBILE-UI",
  },
  {
    category: "Mobile App",
    title: "Operator Control App",
    src: "/assets/patch-up/operator-app.png",
    description:
      "Gives operators full control over the vulcanizing process and job management. It communicates directly with the hardware via Bluetooth.",
    features: [
      "Bluetooth (ESP32) device control",
      "Job acceptance and navigation",
      "Automated temperature monitoring",
      "Earnings and performance tracking",
    ],
    techStack: [
      "React Native",
      "Bluetooth Low Energy (BLE)",
      "ESP32 Integration",
    ],
    designLink:
      "https://www.figma.com/design/1PoJ6cj2uOoGcSaqnZ3QC8/TITLE-1-MOBILE-UI",
  },
  {
    category: "Hardware",
    title: "Smart Vulcanizer Device",
    src: "/assets/patch-up/device.png",
    description:
      "A portable, solar-battery powered unit that automates the heating process for precise and safe tire repairs.",
    features: [
      "Solar-battery powered for portability",
      "Automated temperature control",
      "Bluetooth connectivity",
      "Compact and durable design",
    ],
    techStack: [
      "ESP32 Microcontroller",
      "C++",
      "IoT Sensors",
      "Solar Power Management",
    ],
  },
];

export const projectSelectionData = [
  {
    title: "Patch Up: Mobile-Controlled Vulcanizer",
    description:
      "A revolutionary mobile-controlled electric vulcanizer system for roadside tire repair.",
    header: "/assets/patch-up/logo.png",
    icon: "/assets/patch-up/logo.png",
    link: "/projects",
  },
  {
    title: "BookWise: Library System",
    description:
      "A comprehensive university library management system for accessing resources.",
    header: "/assets/library-system.png",
    icon: "/assets/library-icon.png",
    link: "https://university-library-management-syste-jet.vercel.app/",
  },
];
