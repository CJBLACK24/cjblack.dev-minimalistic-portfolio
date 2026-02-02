/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import { authSchema, AuthFormData } from "@/validators/auth";

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
    <div className="bg-dot-white relative flex min-h-screen w-full items-center justify-center bg-black">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="shadow-input relative z-10 mx-auto w-full max-w-md rounded-none border border-neutral-800 bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-center text-xl font-bold text-neutral-800 dark:text-neutral-200">
          {isLogin ? "Log in to your account" : "Create a new account"}
        </h2>

        <form className="my-8" onSubmit={handleSubmit(handleAuth)}>
          {!isLogin && (
            <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <div className="flex w-full flex-col space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  placeholder="Tyler Durden"
                  type="text"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>
            </div>
          )}

          <div className="mb-4 flex flex-col space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <button
            className="block h-10 w-full rounded-md bg-linear-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <IconLoader2 className="h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : isLogin ? (
              "Log in \u2192"
            ) : (
              "Register \u2192"
            )}
          </button>

          <div className="my-8 h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="flex flex-col space-y-4">
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md border border-neutral-200 bg-gray-50 px-4 font-medium text-black transition-colors hover:bg-gray-100 dark:border-neutral-800 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] dark:hover:bg-zinc-800"
              type="button"
              onClick={() => handleSocialLogin("github")}
              disabled={isLoading}
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {isLogin ? "Log in with GitHub" : "Sign up with GitHub"}
              </span>
              <BottomGradient />
            </button>
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md border border-neutral-200 bg-gray-50 px-4 font-medium text-black transition-colors hover:bg-gray-100 dark:border-neutral-800 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] dark:hover:bg-zinc-800"
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {isLogin ? "Log in with Google" : "Sign up with Google"}
              </span>
              <BottomGradient />
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
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
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
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
