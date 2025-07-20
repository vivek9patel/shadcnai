import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { cerebras } from "@ai-sdk/cerebras";
import { SUPPORTED_MODELS, DEFAULT_MODEL } from "@/constants/models";

export type SupportedModel = (typeof SUPPORTED_MODELS)[number];

/**
 * Gets the appropriate AI SDK model instance based on the model name
 * @param model - The model identifier
 * @returns The configured model instance
 */
export function getModel(model: SupportedModel = DEFAULT_MODEL) {
  switch (model) {
    case "gpt-4.1":
      return openai("gpt-4.1");
    case "gemini-2.5-flash":
      return google("gemini-2.5-flash");
    case "llama-4-scout":
      return cerebras("llama-4-scout-17b-16e-instruct");
    default:
      // Fallback to default model
      return google(DEFAULT_MODEL);
  }
}

/**
 * Validates if the provided model is supported
 * @param model - The model identifier to validate
 * @returns True if the model is supported, false otherwise
 */
export function isValidModel(model: string): model is SupportedModel {
  return SUPPORTED_MODELS.includes(model as SupportedModel);
}
