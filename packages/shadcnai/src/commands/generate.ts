import { generateObject } from "ai";
import { ThemeGenerationLLMResponseSchema } from "../types/theme";
import { THEME_GENERATION_PROMPT } from "../prompts/theme-generation";
import { getModel, isValidModel, type SupportedModel } from "../lib/models";
import { DEFAULT_MODEL, SUPPORTED_MODELS } from "../constants/models";
import { themeToCSS } from "../lib/css";
import {
  findEnvFiles,
  getEnvFromFiles,
  promptUser,
  setEnvironmentVariables,
} from "../lib/utils";

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

    // Check for .env files
    const envFiles = findEnvFiles();
    if (envFiles.length > 0) {
      console.error(
        `\n🔍 Found .env files in current directory: ${envFiles.join(", ")}`
      );

      const allEnvVars = getEnvFromFiles(envFiles);
      if (allEnvVars[key]) {
        console.error(`📝 Found ${key} in .env files`);

        const shouldLoad = await promptUser(
          `\n🤔 Would you like to load environment variables from .env files and retry?`
        );

        if (shouldLoad) {
          console.log(`\n🔄 Loading environment variables from .env files...`);
          setEnvironmentVariables(allEnvVars);
          console.log(`✅ Environment variables loaded successfully!`);
          return true; // Indicate success, continue execution
        }
      } else {
        console.error(`⚠️  ${key} not found in any .env files`);
      }
    }

    process.exit(1);
  }

  return true; // Environment variable already set
}

async function generateTheme(
  description: string,
  model: SupportedModel = DEFAULT_MODEL
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

    console.log("\n🎨 CSS Variables:");
    console.log("=================");
    console.log(themeToCSS(result.object.theme));
  } catch (error) {
    console.error(
      "❌ Error generating theme:",
      error instanceof Error ? error.message : "Unknown error"
    );
    process.exit(1);
  }
}

export const generateCommand = {
  command: "generate <description>",
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
  },
  handler: async (argv: any) => {
    const { description, model = DEFAULT_MODEL } = argv;

    if (!description.trim()) {
      console.error("❌ Error: Description cannot be empty");
      process.exit(1);
    }

    if (model && !isValidModel(model)) {
      console.error(`❌ Error: Invalid model "${model}"`);
      console.error(`Supported models: ${SUPPORTED_MODELS.join(", ")}`);
      process.exit(1);
    }

    const envValidated = await validateEnvironment(model);
    if (envValidated) {
      await generateTheme(description, model);
    }
  },
};
