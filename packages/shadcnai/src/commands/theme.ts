import { generateObject } from "ai";
import { ThemeGenerationLLMResponseSchema } from "../types/theme";
import { THEME_GENERATION_PROMPT } from "../prompts/theme-generation";
import { getModel, isValidModel, type SupportedModel } from "../lib/models";
import { DEFAULT_MODEL, SUPPORTED_MODELS } from "../constants/models";
import {
  findEnvFiles,
  getEnvFromFiles,
  promptUser,
  setEnvironmentVariables,
  transformToRegistryTheme,
  importThemeWithShadcn,
  PACKAGE_MANAGERS,
  type PackageManager,
} from "../lib/utils";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";

function getRequiredEnvVar(model: SupportedModel): {
  key: string;
  name: string;
} {
  switch (model) {
    case "gpt-4.1":
      return { key: "OPENAI_API_KEY", name: "OpenAI" };
    case "gemini-2.5-flash":
      return { key: "GOOGLE_GENERATIVE_AI_API_KEY", name: "Google AI" };
    case "llama-4-scout":
      return { key: "CEREBRAS_API_KEY", name: "Cerebras" };
    default:
      return { key: "GOOGLE_GENERATIVE_AI_API_KEY", name: "Google AI" };
  }
}

async function validateEnvironment(model: SupportedModel): Promise<boolean> {
  const { key, name } = getRequiredEnvVar(model);

  // First check for .env files and auto-load if available
  const envFiles = findEnvFiles();
  if (envFiles.length > 0) {
    const allEnvVars = getEnvFromFiles(envFiles);
    if (allEnvVars[key] && !process.env[key]) {
      console.log(`🔄 Auto-loading ${key} from .env files...`);
      setEnvironmentVariables(allEnvVars);
    }
  }

  // Now check if the required variable is available
  if (!process.env[key]) {
    const isDefault = model === DEFAULT_MODEL;
    console.error(`❌ Missing required environment variable: ${key}`);
    console.error(
      `${model}${
        isDefault ? " (default model)" : ""
      } uses ${name} provider, you need to set:`
    );
    console.error(`export ${key}=your-api-key-here`);

    if (isDefault) {
      console.error(
        `\n💡 Tip: ${DEFAULT_MODEL} is the default model. You can also use:`
      );
      console.error(`  --model gpt-4.1 (requires OPENAI_API_KEY)`);
      console.error(`  --model llama-4-scout (requires CEREBRAS_API_KEY)`);
    }

    // Only show .env file options if we haven't already tried auto-loading
    if (envFiles.length > 0) {
      const allEnvVars = getEnvFromFiles(envFiles);
      if (!allEnvVars[key]) {
        console.error(`\n🔍 Found .env files: ${envFiles.join(", ")}`);
        console.error(`⚠️  ${key} not found in any .env files`);
      } else {
        console.error(`\n🔍 Found .env files: ${envFiles.join(", ")}`);
        console.error(`📝 Found ${key} in .env files, but auto-loading failed`);

        const shouldLoad = await promptUser(
          `\n🤔 Would you like to retry loading environment variables?`
        );

        if (shouldLoad) {
          console.log(`\n🔄 Retrying environment variable loading...`);
          setEnvironmentVariables(allEnvVars);
          console.log(`✅ Environment variables loaded successfully!`);
          return true; // Indicate success, continue execution
        }
      }
    }

    process.exit(1);
  }

  return true; // Environment variable already set or successfully loaded
}

async function generateTheme(
  description: string,
  model: SupportedModel = DEFAULT_MODEL,
  options: {
    outputDir?: string;
    autoSave?: boolean;
    autoImport?: boolean;
    packageManager?: string;
  } = {}
) {
  try {
    console.log(`🎨 Generating theme for: "${description}"`);
    console.log(
      `🤖 Using model: ${model}${model === DEFAULT_MODEL ? " (default)" : ""}`
    );
    console.log("⏳ This may take a few moments...\n");

    const selectedModel = getModel(model);

    const result = await generateObject({
      model: selectedModel,
      schema: ThemeGenerationLLMResponseSchema,
      prompt: THEME_GENERATION_PROMPT(description),
      temperature: 0.7,
    });

    console.log("✅ Theme generated successfully!\n");

    console.log("💭 Design Description:");
    console.log(result.object.description);
    console.log();

    // Transform to registry format
    const registryTheme = transformToRegistryTheme(result.object);

    // Handle auto-import scenario
    if (options.autoImport) {
      const outputDir = options.outputDir || process.cwd();
      const themeName = result.object.theme.name;
      const registryPath = join(outputDir, `${themeName}-registry.json`);

      try {
        // Create temporary registry file
        writeFileSync(registryPath, JSON.stringify(registryTheme, null, 2));

        // Import theme using shadcn CLI
        const selectedPackageManager = options.packageManager
          ? PACKAGE_MANAGERS.find((pm) => pm.name === options.packageManager)
          : PACKAGE_MANAGERS[0]; // Default to npm (first in array)

        await importThemeWithShadcn(registryPath, selectedPackageManager);

        console.log(
          "\n🎉 Theme has been successfully imported into your project!"
        );
        console.log(
          "💡 You can now use your custom theme in your shadcn/ui components."
        );
      } catch (error) {
        console.error(
          "❌ Error during theme import:",
          error instanceof Error ? error.message : "Unknown error"
        );

        // Clean up the file if it still exists and import failed
        try {
          unlinkSync(registryPath);
        } catch (cleanupError) {
          // File might already be cleaned up or not exist
        }

        // Don't exit, fall through to manual instructions
        console.log("\n📋 Manual import instructions:");
        console.log("• Save the registry JSON below to a file");
        console.log("• Run: npx shadcn@latest add ./your-theme.json");
        console.log("\n📄 Registry JSON:");
        console.log(JSON.stringify(registryTheme, null, 2));
      }
    }
    // Handle traditional save scenario
    else if (options.autoSave) {
      const outputDir = options.outputDir || process.cwd();
      const themeName = result.object.theme.name;
      const registryPath = join(outputDir, `${themeName}-registry.json`);

      try {
        writeFileSync(registryPath, JSON.stringify(registryTheme, null, 2));

        console.log("💾 Files saved:");
        console.log(`• Registry JSON: ${registryPath}`);
        console.log();

        console.log("💡 Next steps:");
        console.log(`• Run: npx shadcn@latest add ${registryPath}`);
        console.log("• Or remove --no-import flag for automatic import");
      } catch (error) {
        console.error(
          "❌ Error saving files:",
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    }
    // No save, just display
    else {
      console.log("💡 Next steps:");
      console.log("• Save the registry JSON below to a file");
      console.log("• Run: npx shadcn@latest add ./your-theme.json");
      console.log(
        "• Or remove --no-save --no-import flags for automatic import"
      );

      console.log("\n📄 Registry JSON:");
      console.log(JSON.stringify(registryTheme, null, 2));
    }
  } catch (error) {
    console.error(
      "❌ Error generating theme:",
      error instanceof Error ? error.message : "Unknown error"
    );
    process.exit(1);
  }
}

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
      describe: `AI model to use for generation (default: ${DEFAULT_MODEL})`,
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
  },
  handler: async (argv: any) => {
    const {
      description,
      model = DEFAULT_MODEL,
      save,
      import: autoImport,
      packageManager,
      output,
    } = argv;

    if (!description.trim()) {
      console.error("❌ Error: Description cannot be empty");
      process.exit(1);
    }

    if (model && !isValidModel(model)) {
      console.error(`❌ Error: Invalid model "${model}"`);
      console.error(`Supported models: ${SUPPORTED_MODELS.join(", ")}`);
      process.exit(1);
    }

    // Auto-import requires saving (at least temporarily), so force save if import is enabled
    const effectiveSave = save || autoImport;

    const envValidated = await validateEnvironment(model);
    if (envValidated) {
      await generateTheme(description, model, {
        autoSave: effectiveSave,
        autoImport: autoImport,
        packageManager: packageManager,
        outputDir: output,
      });
    }
  },
};
