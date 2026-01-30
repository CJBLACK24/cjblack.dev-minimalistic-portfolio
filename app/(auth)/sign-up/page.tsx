"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconLoader2,
} from "@tabler/icons-react";
import { Label } from "@/components/ui/aceternity/label";
import { Input } from "@/components/ui/aceternity/input";

// --- Schemas ---

const authSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
});

type AuthFormData = z.infer<typeof authSchema>;

// --- Main Component ---

function AuthContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const tab = searchParams.get("tab");
  // Default to login, but check if user wants to register
  const [isLogin, setIsLogin] = useState(tab === "signup" ? false : true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const handleAuth = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      // better-auth magic link plugin uses signIn.magicLink for both login and signup.
      // Signup name isn't directly supported by the simplified magic link flow in most plugins,
      // but we use signIn.magicLink to avoid 404 on signUp.magicLink.
      await signIn.magicLink({
        email: data.email,
        callbackURL: callbackUrl,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Please check your email!", {
              description: "Login link sent",
            });
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to send magic link.");
          },
        },
      });
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "github" | "google") => {
    setIsLoading(true);
    await signIn.social({
      provider,
      callbackURL: callbackUrl,
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message || `Failed to login with ${provider}`);
          setIsLoading(false);
        },
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-black bg-dot-white relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border border-neutral-800 relative z-10">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
          {isLogin ? "Log in to your account" : "Create a new account"}
        </h2>

        <form className="my-8" onSubmit={handleSubmit(handleAuth)}>
          {!isLogin && (
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <div className="flex flex-col space-y-2 w-full">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  placeholder="Tyler Durden"
                  type="text"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-2 mb-4">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <button
            className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <IconLoader2 className="animate-spin w-4 h-4" />
                Processing...
              </span>
            ) : isLogin ? (
              "Log in \u2192"
            ) : (
              "Register \u2192"
            )}
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <button
              className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] border border-neutral-200 dark:border-neutral-800 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              type="button"
              onClick={() => handleSocialLogin("github")}
              disabled={isLoading}
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                {isLogin ? "Log in with GitHub" : "Sign up with GitHub"}
              </span>
              <BottomGradient />
            </button>
            <button
              className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] border border-neutral-200 dark:border-neutral-800 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                {isLogin ? "Log in with Google" : "Sign up with Google"}
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
          >
            {isLogin ? (
              <>
                Are you new here?{" "}
                <span className="text-blue-500 hover:underline">
                  Create an account
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span className="text-blue-500 hover:underline">Log in</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default function AuthPage() {
  return (
    <Suspense>
      <AuthContent />
    </Suspense>
  );
}
