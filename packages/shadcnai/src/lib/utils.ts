/**
 * Utility functions for the shadcnai CLI
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { createInterface } from "readline";

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
