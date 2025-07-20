import { z } from "zod";

const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
  GOOGLE_GENERATIVE_AI_API_KEY: z
    .string()
    .min(1, "GOOGLE_GENERATIVE_AI_API_KEY is required"),
  CEREBRAS_API_KEY: z.string().min(1, "CEREBRAS_API_KEY is required"),
  UPSTASH_REDIS_REST_URL: z
    .string()
    .url("UPSTASH_REDIS_REST_URL must be a valid URL"),
  UPSTASH_REDIS_REST_TOKEN: z
    .string()
    .min(1, "UPSTASH_REDIS_REST_TOKEN is required"),
  API_BEARER_TOKEN: z
    .string()
    .min(1, "API_BEARER_TOKEN is required for API authentication"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export function validateEnv() {
  try {
    const env = envSchema.parse(process.env);
    return { success: true, env };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      return {
        success: false,
        error: `Missing or invalid environment variables:\n${missingVars.join(
          "\n"
        )}`,
      };
    }
    return {
      success: false,
      error: "Unknown error validating environment variables",
    };
  }
}

export function getValidatedEnv() {
  const validation = validateEnv();
  if (!validation.success) {
    console.error("❌ Environment validation failed:");
    console.error(validation.error);
    process.exit(1);
  }
  return validation.env;
}

export type ValidatedEnv = z.infer<typeof envSchema>;
