import { validateEnvironment } from "../lib/env";
import { ThemeGeneratorService } from "../services/theme-generator";
import { FileService } from "../lib/files";
import {
  DEFAULT_MODEL,
  SUPPORTED_MODELS,
  AI_PROVIDERS,
  isValidModel,
  type SupportedModel,
} from "../constants/models";
import { CLIAnimations } from "../lib/animations";

export const themeCommand = {
  command: "theme <description>",
  describe: "Generate a shadcn/ui theme based on description",
  builder: {
    description: {
      describe: "Description of the theme you want to generate",
      type: "string" as const,
      demandOption: true,
    },
    model: {
      alias: "m",
      describe:
        `AI model to use for generation (default: ${DEFAULT_MODEL}). Available models:\n` +
        `  Google AI: ${AI_PROVIDERS.google.models.join(", ")}\n` +
        `  OpenAI: ${AI_PROVIDERS.openai.models.join(", ")}\n` +
        `  Anthropic: ${AI_PROVIDERS.anthropic.models.join(", ")}\n` +
        `  xAI: ${AI_PROVIDERS.xai.models.join(", ")}\n` +
        `  DeepSeek: ${AI_PROVIDERS.deepseek.models.join(", ")}\n` +
        `  Mistral: ${AI_PROVIDERS.mistral.models.join(", ")}\n` +
        `  Cerebras: ${AI_PROVIDERS.cerebras.models.join(", ")}`,
      type: "string" as const,
      choices: SUPPORTED_MODELS,
      default: DEFAULT_MODEL,
    },
    save: {
      alias: "s",
      describe:
        "Save generated files to disk (default: true, use --no-save to disable)",
      type: "boolean" as const,
      default: true,
    },
    import: {
      alias: "i",
      describe:
        "Automatically import theme using shadcn CLI after generation (default: true, use --no-import to disable)",
      type: "boolean" as const,
      default: true,
    },
    packageManager: {
      alias: "pm",
      describe: "Package manager to use for importing (default: npm)",
      type: "string" as const,
      choices: ["npm", "yarn", "pnpm", "bun"],
      default: "npm",
    },
    output: {
      alias: "o",
      describe: "Output directory for saved files (default: current directory)",
      type: "string" as const,
    },
    temperature: {
      alias: "t",
      describe:
        "Temperature for AI generation (0.0-2.0). Lower values = more focused, higher values = more creative (default: 0.7)",
      type: "number" as const,
      default: 0.7,
    },
  },
  handler: async (argv: any) => {
    const {
      description,
      model = DEFAULT_MODEL,
      save,
      import: autoImport,
      packageManager,
      output,
      temperature = 0.7,
    } = argv;

    // Validate inputs
    if (!description.trim()) {
      CLIAnimations.showError("Description cannot be empty");
      process.exit(1);
    }

    if (model && !isValidModel(model)) {
      CLIAnimations.showError(`Invalid model "${model}"`);
      console.log(`Supported models: ${SUPPORTED_MODELS.join(", ")}`);
      process.exit(1);
    }

    if (temperature < 0 || temperature > 2) {
      CLIAnimations.showError("Temperature must be between 0.0 and 2.0");
      process.exit(1);
    }

    try {
      // Validate environment
      await validateEnvironment(model);

      // Generate theme
      const result = await ThemeGeneratorService.generateTheme(description, {
        model,
        temperature,
      });

      // Handle output based on user preferences
      if (autoImport) {
        // Auto-import requires saving (at least temporarily)
        const saveResult = await FileService.saveAndImportTheme(
          result.registryTheme,
          result.themeName,
          {
            outputDir: output,
            autoImport: true,
            packageManager,
          }
        );

        if (!saveResult.success) {
          // If auto-import fails, show manual instructions
          FileService.displayManualImportInstructions(result.registryTheme);
        }
      } else if (save) {
        // Save without importing
        await FileService.saveAndImportTheme(
          result.registryTheme,
          result.themeName,
          {
            outputDir: output,
            autoImport: false,
          }
        );
      } else {
        // No save, just display
        FileService.displayTheme(result.registryTheme);
      }
    } catch (error) {
      CLIAnimations.showError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      process.exit(1);
    }
  },
};
