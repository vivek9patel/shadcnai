/**
 * Utility functions for the shadcnai CLI
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { createInterface } from "readline";
import { spawn } from "child_process";
import { ThemeGenerationLLMResponse } from "../types/theme";
import { CLIAnimations } from "./animations";

/**
 * Check if a string is empty or contains only whitespace
 */
export function isEmpty(str: string): boolean {
  return !str || str.trim().length === 0;
}

/**
 * Format error messages consistently
 */
export function formatError(message: string): string {
  return `❌ Error: ${message}`;
}

/**
 * Format success messages consistently
 */
export function formatSuccess(message: string): string {
  return `✅ ${message}`;
}

/**
 * Find all .env.* files in the current directory
 */
export function findEnvFiles(directory: string = process.cwd()): string[] {
  try {
    if (!existsSync(directory)) {
      return [];
    }

    const files = readdirSync(directory);
    return files.filter((file) => file.startsWith(".env"));
  } catch (error) {
    return [];
  }
}

/**
 * Parse a .env file and return key-value pairs
 */
export function parseEnvFile(filePath: string): Record<string, string> {
  try {
    const content = readFileSync(filePath, "utf-8");
    const envVars: Record<string, string> = {};

    content.split("\n").forEach((line) => {
      const trimmedLine = line.trim();

      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith("#")) {
        return;
      }

      const equalIndex = trimmedLine.indexOf("=");
      if (equalIndex === -1) {
        return;
      }

      const key = trimmedLine.substring(0, equalIndex).trim();
      let value = trimmedLine.substring(equalIndex + 1).trim();

      // Remove quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      envVars[key] = value;
    });

    return envVars;
  } catch (error) {
    return {};
  }
}

/**
 * Get all environment variables from .env files
 */
export function getEnvFromFiles(envFiles: string[]): Record<string, string> {
  const allEnvVars: Record<string, string> = {};

  envFiles.forEach((file) => {
    const envVars = parseEnvFile(file);
    Object.assign(allEnvVars, envVars);
  });

  return allEnvVars;
}

/**
 * Prompt user for yes/no confirmation
 */
export function promptUser(question: string): Promise<boolean> {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`${question} (y/N): `, (answer) => {
      rl.close();
      const normalizedAnswer = answer.trim().toLowerCase();
      resolve(normalizedAnswer === "y" || normalizedAnswer === "yes");
    });
  });
}

/**
 * Set environment variables from a record
 */
export function setEnvironmentVariables(envVars: Record<string, string>): void {
  Object.entries(envVars).forEach(([key, value]) => {
    process.env[key] = value;
  });
}

/**
 * Supported package managers for running shadcn CLI
 */
export const PACKAGE_MANAGERS = [
  { name: "npm", command: "npx" },
  { name: "yarn", command: "yarn dlx" },
  { name: "pnpm", command: "pnpm dlx" },
  { name: "bun", command: "bunx" },
] as const;

export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

/**
 * Prompt user to select a package manager
 */
export function promptPackageManager(): Promise<PackageManager> {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("\n📦 Select your package manager:");
    PACKAGE_MANAGERS.forEach((pm, index) => {
      console.log(`  ${index + 1}. ${pm.name} (${pm.command})`);
    });

    rl.question("\nEnter your choice (1-4) [default: 1]: ", (answer) => {
      rl.close();
      const choice = parseInt(answer.trim()) || 1;
      const selectedIndex =
        Math.max(1, Math.min(choice, PACKAGE_MANAGERS.length)) - 1;
      resolve(PACKAGE_MANAGERS[selectedIndex]);
    });
  });
}

/**
 * Execute a shell command with proper error handling
 */
export function executeCommand(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, {
      stdio: "inherit",
      shell: true,
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    process.on("error", (error) => {
      reject(error);
    });
  });
}

/**
 * Import theme using shadcn CLI and cleanup temporary file
 */
export async function importThemeWithShadcn(
  registryPath: string,
  packageManager?: PackageManager
): Promise<void> {
  try {
    const pm = packageManager || PACKAGE_MANAGERS[0];

    const spinner = CLIAnimations.startSpinner(
      `Importing theme using ${pm.name}...`,
      "green"
    );

    const [baseCommand, ...baseArgs] = pm.command.split(" ");
    const args = [...baseArgs, "shadcn@latest", "add", registryPath, "-y"];

    CLIAnimations.updateSpinner(
      `Running: ${pm.command} shadcn@latest add ${registryPath}`
    );

    await executeCommand(baseCommand, args);

    CLIAnimations.succeedSpinner("Theme imported successfully!");

    await CLIAnimations.delay(300);

    try {
      const fs = await import("fs");
      fs.unlinkSync(registryPath);
    } catch (cleanupError) {
      CLIAnimations.showWarning(
        `Could not clean up temporary file: ${registryPath}`
      );
    }
  } catch (error) {
    CLIAnimations.failSpinner("Import failed");
    CLIAnimations.showError(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
    CLIAnimations.showHeader("Manual import options:", "💡", "yellow");
    console.log(`• Run: npx shadcn@latest add ${registryPath}`);
    console.log(`• Or: yarn dlx shadcn@latest add ${registryPath}`);
    console.log(`• Or: pnpm dlx shadcn@latest add ${registryPath}`);
    throw error;
  }
}

/**
 * Transform our theme generation response to shadcn/ui registry format
 */
export function transformToRegistryTheme(
  response: ThemeGenerationLLMResponse
): any {
  const { theme, description } = response;

  const transformShadows = (shadows: Record<string, string>) => {
    const transformed: Record<string, string> = {};
    Object.entries(shadows).forEach(([key, value]) => {
      const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      transformed[kebabKey] = value;
    });
    return transformed;
  };

  const shadowsKebab = transformShadows(theme.shadows);

  const lightSection = {
    ...theme.colors.light,
    radius: theme.radius,
    ...shadowsKebab,
  };

  const darkSection = {
    ...theme.colors.dark,
  };
  const registryTheme = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: theme.name,
    type: "registry:theme" as const,
    title: theme.displayName,
    description: description,
    cssVars: {
      light: lightSection,
      dark: darkSection,
    },
  };

  return registryTheme;
}
