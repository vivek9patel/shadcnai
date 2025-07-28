import {
  getProviderForModel,
  DEFAULT_MODEL,
  type SupportedModel,
} from "../constants/models";
import {
  findEnvFiles,
  getEnvFromFiles,
  setEnvironmentVariables,
  promptUser,
} from "./utils";

/**
 * Get required environment variable information for a model
 */
export function getRequiredEnvVar(model: SupportedModel): {
  key: string;
  name: string;
} {
  const providerInfo = getProviderForModel(model);
  if (providerInfo) {
    return { key: providerInfo.envKey, name: providerInfo.name };
  }

  // Fallback to default model provider
  const defaultProviderInfo = getProviderForModel(DEFAULT_MODEL);
  return { key: defaultProviderInfo!.envKey, name: defaultProviderInfo!.name };
}

/**
 * Validate that the required environment variable is set for the given model
 */
export async function validateEnvironment(
  model: SupportedModel
): Promise<boolean> {
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
      console.error(
        `  --model claude-3-5-sonnet-20241022 (requires ANTHROPIC_API_KEY)`
      );
      console.error(`  --model grok-beta (requires XAI_API_KEY)`);
      console.error(`  --model deepseek-chat (requires DEEPSEEK_API_KEY)`);
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
