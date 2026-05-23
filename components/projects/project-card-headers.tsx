import Image from "next/image";

// Shared badge component
const InProgressBadge = () => (
  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-neutral-950/70 px-2.5 py-1 shadow-lg backdrop-blur-md">
    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
    <span className="text-[10px] font-bold tracking-wide text-cyan-400 uppercase">
      In Progress
    </span>
  </div>
);

export const BookWiseHeader = () => (
  <div className="group relative flex h-full min-h-60 w-full flex-1 cursor-pointer overflow-hidden rounded-xl bg-neutral-900">
    <Image
      src="/bookwise.png"
      alt="BookWise Library System"
      fill
      className="object-cover opacity-90 transition-opacity duration-500"
    />
    <InProgressBadge />
    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
  </div>
);

export const ComingSoonHeader = () => (
  <div className="group relative flex h-full min-h-60 w-full flex-1 overflow-hidden rounded-xl bg-linear-to-br from-purple-900 via-blue-900 to-cyan-900">
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-4xl font-bold text-white/30 md:text-5xl">?</span>
    </div>
    <div className="absolute inset-0 bg-black/20" />
  </div>
);

export const PatchUpHeader = () => (
  <div className="group relative flex h-full min-h-60 w-full flex-1 cursor-pointer overflow-hidden rounded-xl bg-neutral-900">
    <Image
      src="/assets/patch-up/logo.png"
      alt="Patch Up Project"
      fill
      className="object-cover opacity-90 transition-opacity duration-500"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
  </div>
);

export const AuthSystemHeader = () => (
  <div className="group relative flex h-full min-h-60 w-full flex-1 cursor-pointer overflow-hidden rounded-xl bg-neutral-900">
    <Image
      src="/auth-system.png"
      alt="Authentication System"
      fill
      className="object-cover object-top opacity-90 transition-opacity duration-500"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
  </div>
);

export const NUManagementHeader = () => (
  <div className="group relative flex h-full min-h-60 w-full flex-1 cursor-pointer overflow-hidden rounded-xl bg-neutral-900">
    <Image
      src="/assets/NUIMS/NUIMS.png"
      alt="NU Iloilo Management System"
      fill
      className="object-cover object-top opacity-90 transition-opacity duration-500"
    />
    <InProgressBadge />
    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
  </div>
);

export const ModernUniversityHeader = () => (
  <div className="group relative flex h-full min-h-60 w-full flex-1 cursor-pointer overflow-hidden rounded-xl bg-neutral-900">
    <Image
      src="/assets/Management-Dashboard/management-dashboard.png"
      alt="Modern University Management Dashboard"
      fill
      className="object-cover object-top opacity-90 transition-opacity duration-500"
    />
    <InProgressBadge />
    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
  </div>
);

export const DevEventHeader = () => (
  <div className="group relative flex h-full min-h-60 w-full flex-1 cursor-pointer overflow-hidden rounded-xl bg-neutral-900">
    <Image
      src="/assets/DevEventPlatform/DevEventPlatform.png"
      alt="DevEvent Platform"
      fill
      className="object-cover object-top opacity-90 transition-opacity duration-500"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
  </div>
);

export const NextLMSHeader = () => (
  <div className="group relative flex h-full min-h-60 w-full flex-1 cursor-pointer overflow-hidden rounded-xl bg-neutral-900">
    <Image
      src="/assets/NextLMS/NextLMS.png"
      alt="Next LMS"
      fill
      className="object-cover object-top opacity-90 transition-opacity duration-500"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
  </div>
);

