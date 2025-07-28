import { generateObject } from "ai";
import { getModel } from "../lib/models";
import { DEFAULT_MODEL, type SupportedModel } from "../constants/models";
import { ThemeGenerationLLMResponseSchema } from "../types/theme";
import { THEME_GENERATION_PROMPT } from "../prompts/theme-generation";
import { transformToRegistryTheme } from "../lib/utils";
import { CLIAnimations } from "../lib/animations";

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

    CLIAnimations.showHeader(
      `Generating theme for: "${description}"`,
      "🎨",
      "magenta"
    );
    CLIAnimations.showInfo(
      `Using model: ${model}${model === DEFAULT_MODEL ? " (default)" : ""}`,
      "🤖"
    );

    try {
      const selectedModel = getModel(model);

      CLIAnimations.showInfo("Generating theme colors and styles...", "⚡");

      const result = await generateObject({
        model: selectedModel,
        schema: ThemeGenerationLLMResponseSchema,
        prompt: THEME_GENERATION_PROMPT(description),
        temperature,
      });

      CLIAnimations.showSuccess("Theme generated successfully!", "✅");

      CLIAnimations.showHeader("Design Description:", "💭", "blue");
      CLIAnimations.showInfo(result.object.description, "💭");

      const registryTheme = transformToRegistryTheme(result.object);

      return {
        description: result.object.description,
        registryTheme,
        themeName: result.object.theme.name,
      };
    } catch (error) {
      throw error;
    }
  }
}
