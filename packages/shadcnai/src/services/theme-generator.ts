import { generateObject } from "ai";
import { getModel } from "../lib/models";
import { DEFAULT_MODEL, type SupportedModel } from "../constants/models";
import { ThemeGenerationLLMResponseSchema } from "../types/theme";
import { THEME_GENERATION_PROMPT } from "../prompts/theme-generation";
import { transformToRegistryTheme } from "../lib/utils";

export interface ThemeGenerationOptions {
  model?: SupportedModel;
  temperature?: number;
}

export interface ThemeGenerationResult {
  description: string;
  registryTheme: any;
  themeName: string;
}

/**
 * Core theme generation service
 */
export class ThemeGeneratorService {
  /**
   * Generate a theme based on a description
   */
  static async generateTheme(
    description: string,
    options: ThemeGenerationOptions = {}
  ): Promise<ThemeGenerationResult> {
    const { model = DEFAULT_MODEL, temperature = 0.7 } = options;

    console.log(`🎨 Generating theme for: "${description}"`);
    console.log(
      `🤖 Using model: ${model}${model === DEFAULT_MODEL ? " (default)" : ""}`
    );
    console.log("⏳ This may take a few moments...\n");

    try {
      const selectedModel = getModel(model);

      const result = await generateObject({
        model: selectedModel,
        schema: ThemeGenerationLLMResponseSchema,
        prompt: THEME_GENERATION_PROMPT(description),
        temperature,
      });

      console.log("✅ Theme generated successfully!\n");

      console.log("💭 Design Description:");
      console.log(result.object.description);
      console.log();

      // Transform to registry format
      const registryTheme = transformToRegistryTheme(result.object);

      return {
        description: result.object.description,
        registryTheme,
        themeName: result.object.theme.name,
      };
    } catch (error) {
      console.error(
        "❌ Error generating theme:",
        error instanceof Error ? error.message : "Unknown error"
      );
      throw error;
    }
  }
}
