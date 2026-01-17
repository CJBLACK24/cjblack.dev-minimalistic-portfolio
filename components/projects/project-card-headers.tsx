import Image from "next/image";

// Shared badge component
const InProgressBadge = () => (
  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-neutral-950/70 backdrop-blur-md border border-cyan-500/30 px-2.5 py-1 rounded-full shadow-lg">
    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
    <span className="text-[10px] font-bold tracking-wide uppercase text-cyan-400">
      In Progress
    </span>
  </div>
);

export const BookWiseHeader = () => (
  <div className="flex flex-1 w-full h-full min-h-60 rounded-xl bg-neutral-900 relative overflow-hidden group cursor-pointer">
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
  <div className="flex flex-1 w-full h-full min-h-60 rounded-xl bg-linear-to-br from-purple-900 via-blue-900 to-cyan-900 relative overflow-hidden group">
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-4xl md:text-5xl font-bold text-white/30">?</span>
    </div>
    <div className="absolute inset-0 bg-black/20" />
  </div>
);

export const PatchUpHeader = () => (
  <div className="flex flex-1 w-full h-full min-h-60 rounded-xl bg-neutral-900 relative overflow-hidden group cursor-pointer">
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
  <div className="flex flex-1 w-full h-full min-h-60 rounded-xl bg-neutral-900 relative overflow-hidden group cursor-pointer">
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
  <div className="flex flex-1 w-full h-full min-h-60 rounded-xl bg-neutral-900 relative overflow-hidden group cursor-pointer">
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
  <div className="flex flex-1 w-full h-full min-h-60 rounded-xl bg-neutral-900 relative overflow-hidden group cursor-pointer">
    <Image
      src="/assets/NUIMS/NUIMS.png"
      alt="Modern University Management Dashboard"
      fill
      className="object-cover object-top opacity-90 transition-opacity duration-500"
    />
    <InProgressBadge />
    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
  </div>
);

export const DevEventHeader = () => (
  <div className="flex flex-1 w-full h-full min-h-60 rounded-xl bg-neutral-900 relative overflow-hidden group cursor-pointer">
    <Image
      src="/assets/DevEventPlatform/DevEventPlatform.png"
      alt="DevEvent Platform"
      fill
      className="object-cover object-top opacity-90 transition-opacity duration-500"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
  </div>
);
