import Image from "next/image";

export const BookWiseHeader = () => (
  <div className="flex flex-1 w-full h-full min-h-60 rounded-xl bg-linear-to-br from-neutral-900 to-neutral-800 relative overflow-hidden group cursor-pointer">
    <Image
      src="/bookwise.png"
      alt="BookWise Library System"
      fill
      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
    />
    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
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
  <div className="flex flex-1 w-full h-full min-h-60 rounded-xl bg-linear-to-br from-neutral-900 to-neutral-800 relative overflow-hidden group cursor-pointer">
    <Image
      src="/assets/patch-up/logo.png"
      alt="Patch Up Project"
      fill
      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
    />
    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
  </div>
);

export const AuthSystemHeader = () => (
  <div className="flex flex-1 w-full h-full min-h-60 rounded-xl bg-linear-to-br from-neutral-900 to-neutral-800 relative overflow-hidden group cursor-pointer">
    <Image
      src="/auth-system.png"
      alt="Authentication System"
      fill
      className="object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
    />
    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
  </div>
);
