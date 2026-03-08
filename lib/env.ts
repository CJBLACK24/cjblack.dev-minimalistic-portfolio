import * as z from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),

  // Auth
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, "BETTER_AUTH_SECRET must be at least 32 characters"),

  // Redis (Upstash)
  UPSTASH_REDIS_REST_URL: z
    .string()
    .url("UPSTASH_REDIS_REST_URL must be a valid URL"),
  UPSTASH_REDIS_REST_TOKEN: z
    .string()
    .min(1, "UPSTASH_REDIS_REST_TOKEN is required"),

  // App URL
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url("NEXT_PUBLIC_APP_URL must be a valid URL")
    .default("http://localhost:3000"),

  // Optional: Email (Nodemailer)
  EMAIL_USER: z.string().email().optional(),
  EMAIL_PASS: z.string().optional(),

  // NODE_ENV
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const formatted = result.error.format();
    console.error("❌ Invalid environment variables:\n");

    for (const [key, value] of Object.entries(formatted)) {
      if (key === "_errors") continue;
      const errors = (value as { _errors: string[] })._errors;
      if (errors?.length) {
        console.error(`  ${key}: ${errors.join(", ")}`);
      }
    }

    throw new Error(
      "Invalid environment variables. Check the logs above for details.",
    );
  }

  return result.data;
}

// Only validate on the server side (not in Edge/browser contexts)
export const env =
  typeof window === "undefined"
    ? validateEnv()
    : (process.env as unknown as Env);
