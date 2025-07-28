/**
 * AI Provider configurations with their supported models
 */
export const AI_PROVIDERS = {
  google: {
    name: "Google AI",
    envKey: "GOOGLE_GENERATIVE_AI_API_KEY",
    models: [
      "gemini-2.0-flash-exp",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
    ] as const,
  },
  openai: {
    name: "OpenAI",
    envKey: "OPENAI_API_KEY",
    models: ["gpt-4.1", "gpt-4.1-mini", "gpt-4o", "gpt-4o-mini"] as const,
  },
  anthropic: {
    name: "Anthropic",
    envKey: "ANTHROPIC_API_KEY",
    models: [
      "claude-3-5-sonnet-20241022",
      "claude-3-5-sonnet-20240620",
      "claude-3-5-haiku-20241022",
      "claude-3-sonnet-20240229",
      "claude-3-haiku-20240307",
    ] as const,
  },
  xai: {
    name: "xAI",
    envKey: "XAI_API_KEY",
    models: ["grok-beta", "grok-2-1212", "grok-2-vision-1212"] as const,
  },
  deepseek: {
    name: "DeepSeek",
    envKey: "DEEPSEEK_API_KEY",
    models: ["deepseek-chat", "deepseek-reasoner"] as const,
  },
  mistral: {
    name: "Mistral",
    envKey: "MISTRAL_API_KEY",
    models: [
      "mistral-large-latest",
      "mistral-small-latest",
      "pixtral-large-latest",
    ] as const,
  },
  cerebras: {
    name: "Cerebras",
    envKey: "CEREBRAS_API_KEY",
    models: [
      "llama3.1-8b",
      "llama3.1-70b",
      "llama3.3-70b",
      "llama-4-scout-17b-16e-instruct",
      "llama-4-maverick-17b-128e-instruct",
      "deepseek-r1-distill-llama-70b",
      "qwen-3-32b",
      "qwen-3-235b-a22b",
    ] as const,
  },
} as const;

/**
 * Get all supported models as a flat array
 */
export const SUPPORTED_MODELS = Object.values(AI_PROVIDERS).flatMap(
  (provider) => provider.models
);

/**
 * Default model for theme generation
 */
export const DEFAULT_MODEL = "gemini-1.5-flash" as const;

/**
 * Type for supported models
 */
export type SupportedModel = (typeof SUPPORTED_MODELS)[number];

/**
 * Type for provider keys
 */
export type ProviderKey = keyof typeof AI_PROVIDERS;

/**
 * Get provider information for a given model
 */
export function getProviderForModel(model: SupportedModel): {
  key: ProviderKey;
  name: string;
  envKey: string;
} | null {
  for (const [key, provider] of Object.entries(AI_PROVIDERS)) {
    if ((provider.models as readonly string[]).includes(model)) {
      return {
        key: key as ProviderKey,
        name: provider.name,
        envKey: provider.envKey,
      };
    }
  }
  return null;
}

/**
 * Check if a model is valid
 */
export function isValidModel(model: string): model is SupportedModel {
  return SUPPORTED_MODELS.includes(model as SupportedModel);
} 