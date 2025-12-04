"use client";

import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconEye,
  IconEyeOff,
  IconRefresh,
  IconCheck,
  IconX,
  IconShieldLock,
} from "@tabler/icons-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/primitives/alert-dialog";
import { Spotlight } from "@/components/ui/backgrounds/spotlight";
import { cn } from "@/lib/utils";
import Link from "next/link";

// --- Schemas ---

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type SignUpFormData = z.infer<typeof signUpSchema>;
type SignInFormData = z.infer<typeof signInSchema>;

// --- Components ---

const PasswordStrengthMeter = ({ password }: { password: string }) => {
  // Derived state - calculated directly during render
  let score = 0;
  let feedback = "";

  if (password) {
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
        feedback = "Weak";
        break;
      case 2:
        feedback = "Fair";
        break;
      case 3:
        feedback = "Good";
        break;
      case 4:
        feedback = "Strong";
        break;
    }
  }

  const strength = score;

  const getColor = (index: number) => {
    if (strength === 0) return "bg-gray-700";
    if (index < strength) {
      if (strength <= 1) return "bg-red-500";
      if (strength === 2) return "bg-yellow-500";
      if (strength === 3) return "bg-blue-500";
      return "bg-green-500";
    }
    return "bg-gray-700";
  };

  return (
    <div className="w-full space-y-2 mt-2">
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-400">Password Strength</span>
        <span
          className={cn(
            "font-medium transition-colors duration-300",
            strength <= 1 && "text-red-500",
            strength === 2 && "text-yellow-500",
            strength === 3 && "text-blue-500",
            strength === 4 && "text-green-500"
          )}
        >
          {feedback}
        </span>
      </div>
      <div className="flex gap-1 h-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-full flex-1 rounded-full transition-all duration-300",
              getColor(i)
            )}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1 text-[10px] text-gray-500 mt-1">
        <div
          className={cn(
            "flex items-center gap-1",
            password.length >= 8 ? "text-green-500" : ""
          )}
        >
          {password.length >= 8 ? <IconCheck size={10} /> : <IconX size={10} />}{" "}
          8+ chars
        </div>
        <div
          className={cn(
            "flex items-center gap-1",
            /[A-Z]/.test(password) ? "text-green-500" : ""
          )}
        >
          {/[A-Z]/.test(password) ? (
            <IconCheck size={10} />
          ) : (
            <IconX size={10} />
          )}{" "}
          Uppercase
        </div>
        <div
          className={cn(
            "flex items-center gap-1",
            /[0-9]/.test(password) ? "text-green-500" : ""
          )}
        >
          {/[0-9]/.test(password) ? (
            <IconCheck size={10} />
          ) : (
            <IconX size={10} />
          )}{" "}
          Number
        </div>
        <div
          className={cn(
            "flex items-center gap-1",
            /[^A-Za-z0-9]/.test(password) ? "text-green-500" : ""
          )}
        >
          {/[^A-Za-z0-9]/.test(password) ? (
            <IconCheck size={10} />
          ) : (
            <IconX size={10} />
          )}{" "}
          Symbol
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, signUp } = authClient;

  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Dialog States
  const [signUpSuccessDialog, setSignUpSuccessDialog] = useState(false);
  const [signInSuccessDialog, setSignInSuccessDialog] = useState(false);
  const [magicLinkDialog, setMagicLinkDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({
    title: "",
    description: "",
  });
  const [magicLinkEmail, setMagicLinkEmail] = useState("");

  // Forms
  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  // Handle Tab Switching from URL
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "signup") setActiveTab("signup");
    else if (tab === "signin") setActiveTab("signin");
  }, [searchParams]);

  // Password Generator
  const generatePassword = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    const length = 16;

    // Ensure at least one of each required type
    password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
    password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
    password += "0123456789"[Math.floor(Math.random() * 10)];
    password += "!@#$%^&*()_+"[Math.floor(Math.random() * 12)];

    // Fill the rest
    for (let i = 4; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }

    // Shuffle
    password = password
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    signUpForm.setValue("password", password, { shouldValidate: true });
    toast.success("Strong password generated!");
  };

  // Handlers
  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        setDialogMessage({
          title: "Account Creation Failed",
          description:
            result.error.message ||
            "Failed to create account. Please try again.",
        });
        setErrorDialog(true);
        setIsLoading(false);
        return;
      }

      setDialogMessage({
        title: "Account Created Successfully! 🎉",
        description:
          "Welcome aboard! Please check your email to verify your account before signing in.",
      });
      setSignUpSuccessDialog(true);
      signUpForm.reset();
      setIsLoading(false);
    } catch (error) {
      console.error("Sign up error:", error);
      setDialogMessage({
        title: "Unexpected Error",
        description: "An unexpected error occurred. Please try again later.",
      });
      setErrorDialog(true);
      setIsLoading(false);
    }
  };

  const handleSignIn = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      if (result.error) {
        setDialogMessage({
          title: "Sign In Failed",
          description:
            result.error.message ||
            "Invalid email or password. Please try again.",
        });
        setErrorDialog(true);
        setIsLoading(false);
        return;
      }

      setDialogMessage({
        title: "Welcome Back! 👋",
        description:
          "You have successfully signed in. Redirecting you to the homepage...",
      });
      setSignInSuccessDialog(true);
      // Redirect handled in dialog action or timeout
    } catch (error) {
      console.error("Sign in error:", error);
      setDialogMessage({
        title: "Unexpected Error",
        description: "An unexpected error occurred. Please try again later.",
      });
      setErrorDialog(true);
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (email: string) => {
    if (!email) {
      toast.error("Please enter your email address first");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn.magicLink({
        email,
        callbackURL: "/",
      });

      if (result.error) {
        setDialogMessage({
          title: "Magic Link Failed",
          description: result.error.message || "Failed to send magic link.",
        });
        setErrorDialog(true);
      } else {
        setMagicLinkEmail(email);
        setMagicLinkDialog(true);
        toast.success("Magic link sent successfully! Check your email.");
      }
    } catch (error) {
      console.error("Magic link error:", error);
      toast.error("Failed to send magic link");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "github" | "google") => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast.error(`Failed to sign in with ${provider}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Spotlight Effect */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="cyan" />

      <div className="w-full max-w-md p-4 relative z-10">
        {/* Card Container */}
        <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Header / Tabs */}
          <div className="flex border-b border-[#2a2a2a]">
            <button
              onClick={() => setActiveTab("signin")}
              className={cn(
                "flex-1 py-4 text-sm font-medium transition-all duration-300 relative",
                activeTab === "signin"
                  ? "text-cyan-400 bg-[#1a1a1a]"
                  : "text-gray-500 hover:text-gray-300 hover:bg-[#151515]"
              )}
            >
              Sign In
              {activeTab === "signin" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={cn(
                "flex-1 py-4 text-sm font-medium transition-all duration-300 relative",
                activeTab === "signup"
                  ? "text-cyan-400 bg-[#1a1a1a]"
                  : "text-gray-500 hover:text-gray-300 hover:bg-[#151515]"
              )}
            >
              Sign Up
              {activeTab === "signup" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              )}
            </button>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#333] mb-4 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <IconShieldLock className="w-6 h-6 text-cyan-500" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {activeTab === "signin" ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                {activeTab === "signin"
                  ? "Enter your credentials to access your account"
                  : "Join us and start building your portfolio"}
              </p>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => handleSocialLogin("github")}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-cyan-900/50 rounded-lg text-white transition-all duration-200 group"
              >
                <IconBrandGithub className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                <span className="text-sm font-medium">GitHub</span>
              </button>
              <button
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-cyan-900/50 rounded-lg text-white transition-all duration-200 group"
              >
                <IconBrandGoogle className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                <span className="text-sm font-medium">Google</span>
              </button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2a2a2a]"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#121212] px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Sign In Form */}
            {activeTab === "signin" && (
              <form
                onSubmit={signInForm.handleSubmit(handleSignIn)}
                className="space-y-5"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-300 ml-1">
                    Email
                  </label>
                  <input
                    {...signInForm.register("email")}
                    type="email"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    placeholder="name@example.com"
                  />
                  {signInForm.formState.errors.email && (
                    <p className="text-red-400 text-xs ml-1">
                      {signInForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-gray-300 ml-1">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-cyan-500 hover:text-cyan-400 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      {...signInForm.register("password")}
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <IconEyeOff size={18} />
                      ) : (
                        <IconEye size={18} />
                      )}
                    </button>
                  </div>
                  {signInForm.formState.errors.password && (
                    <p className="text-red-400 text-xs ml-1">
                      {signInForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-white hover:bg-gray-100 text-black font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#2a2a2a]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#121212] px-2 text-gray-500">
                      Or sign in with
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleMagicLink(signInForm.getValues("email"))}
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-cyan-900/50 rounded-lg text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Magic Link 🪄
                </button>
              </form>
            )}

            {/* Sign Up Form */}
            {activeTab === "signup" && (
              <form
                onSubmit={signUpForm.handleSubmit(handleSignUp)}
                className="space-y-5"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-300 ml-1">
                    Full Name
                  </label>
                  <input
                    {...signUpForm.register("name")}
                    type="text"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    placeholder="John Doe"
                  />
                  {signUpForm.formState.errors.name && (
                    <p className="text-red-400 text-xs ml-1">
                      {signUpForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-300 ml-1">
                    Email
                  </label>
                  <input
                    {...signUpForm.register("email")}
                    type="email"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                    placeholder="name@example.com"
                  />
                  {signUpForm.formState.errors.email && (
                    <p className="text-red-400 text-xs ml-1">
                      {signUpForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-gray-300 ml-1">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="text-xs text-cyan-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
                    >
                      <IconRefresh size={12} /> Generate Strong
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      {...signUpForm.register("password")}
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all pr-10"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <IconEyeOff size={18} />
                      ) : (
                        <IconEye size={18} />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  <PasswordStrengthMeter
                    password={signUpForm.watch("password") || ""}
                  />

                  {signUpForm.formState.errors.password && (
                    <p className="text-red-400 text-xs ml-1 mt-1">
                      {signUpForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-8">
          Secured by{" "}
          <span className="text-cyan-900 font-medium">better-auth</span> &{" "}
          <span className="text-cyan-900 font-medium">Prisma</span>
        </p>
      </div>

      {/* Enhanced Success Dialog - Sign Up with Full Auth System Showcase */}
      <AlertDialog
        open={signUpSuccessDialog}
        onOpenChange={setSignUpSuccessDialog}
      >
        <AlertDialogContent className="bg-[#121212] border border-[#2a2a2a] max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-2xl flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 border border-green-500/50">
                <IconCheck className="text-green-500 w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="text-xl sm:text-2xl">{dialogMessage.title}</div>
                <div className="text-sm text-gray-400 font-normal mt-1">
                  Full-Stack Authentication System
                </div>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300 mt-4">
              {dialogMessage.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogAction
              onClick={() => {
                setSignUpSuccessDialog(false);
                setActiveTab("signin");
              }}
              className="w-full bg-linear-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 py-3 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              Continue to Sign In →
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog - Sign In */}
      <AlertDialog
        open={signInSuccessDialog}
        onOpenChange={setSignInSuccessDialog}
      >
        <AlertDialogContent className="bg-[#121212] border border-[#2a2a2a]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl flex items-center gap-2">
              <IconCheck className="text-green-500" /> {dialogMessage.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {dialogMessage.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setSignInSuccessDialog(false);
                router.push("/");
                router.refresh();
              }}
              className="bg-white text-black hover:bg-gray-200"
            >
              Go to Homepage
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Magic Link Dialog */}
      <AlertDialog open={magicLinkDialog} onOpenChange={setMagicLinkDialog}>
        <AlertDialogContent className="bg-[#121212] border border-[#2a2a2a] max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-2xl flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/50">
                <span className="text-3xl">🪄</span>
              </div>
              <div className="flex-1">
                <div className="text-xl">Magic Link Sent!</div>
                <div className="text-sm text-gray-400 font-normal mt-1">
                  Passwordless Authentication
                </div>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300 mt-4">
              We&apos;ve sent a magic link to{" "}
              <span className="font-semibold text-cyan-300">
                {magicLinkEmail}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4">
            {/* Instructions */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <IconCheck className="text-cyan-400 w-5 h-5" />
                How to Sign In
              </h4>
              <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
                <li>Check your email inbox (and spam folder)</li>
                <li>Click the magic link in the email</li>
                <li>You&apos;ll be automatically signed in!</li>
              </ol>
            </div>

            {/* Security Info */}
            <div className="p-3 bg-[#1a1a1a] border border-neutral-800 rounded-lg">
              <div className="flex items-start gap-2">
                <IconShieldLock className="text-cyan-400 w-5 h-5 mt-0.5 shrink-0" />
                <div className="text-xs text-gray-400">
                  <p className="font-semibold text-gray-300 mb-1">
                    Security Notice
                  </p>
                  <p>
                    The magic link expires in 5 minutes. If you didn&apos;t
                    request this, you can safely ignore the email.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="pt-2 border-t border-neutral-800">
              <p className="text-xs text-gray-500">
                Didn&apos;t receive the email?{" "}
                <button
                  onClick={() => {
                    setMagicLinkDialog(false);
                    handleMagicLink(magicLinkEmail);
                  }}
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  Resend magic link
                </button>
              </p>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setMagicLinkDialog(false)}
              className="w-full bg-linear-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500"
            >
              Got it! 👍
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Dialog */}
      <AlertDialog open={errorDialog} onOpenChange={setErrorDialog}>
        <AlertDialogContent className="bg-[#121212] border border-[#2a2a2a]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl flex items-center gap-2">
              <IconX className="text-red-500" /> {dialogMessage.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {dialogMessage.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setErrorDialog(false)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Try Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a]">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <AuthPage />
    </Suspense>
  );
}
