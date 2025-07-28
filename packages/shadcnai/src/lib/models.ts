import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { cerebras } from "@ai-sdk/cerebras";
import { anthropic } from "@ai-sdk/anthropic";
import { xai } from "@ai-sdk/xai";
import { deepseek } from "@ai-sdk/deepseek";
import { mistral } from "@ai-sdk/mistral";
import {
  DEFAULT_MODEL,
  getProviderForModel,
  type SupportedModel,
} from "../constants/models";

/**
 * Gets the appropriate AI SDK model instance based on the model name
 * @param model - The model identifier
 * @returns The configured model instance
 */
export function getModel(model: SupportedModel = DEFAULT_MODEL) {
  const providerInfo = getProviderForModel(model);

  if (!providerInfo) {
    throw new Error(`Unsupported model: ${model}`);
  }

  switch (providerInfo.key) {
    case "google":
      return google(model);

    case "openai":
      return openai(model);

    case "anthropic":
      return anthropic(model);

    case "xai":
      return xai(model);

    case "deepseek":
      return deepseek(model);

    case "mistral":
      return mistral(model);

    case "cerebras":
      // Map new cerebras model names to their full identifiers
      switch (model) {
        case "llama3.1-8b":
          return cerebras("llama3.1-8b");
        case "llama3.1-70b":
          return cerebras("llama3.1-70b");
        case "llama3.3-70b":
          return cerebras("llama3.3-70b");
        default:
          return cerebras(model);
      }

    default:
      // Fallback to default model
      return google(DEFAULT_MODEL);
  }
}

