import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";
import {
  importThemeWithShadcn,
  PACKAGE_MANAGERS,
  type PackageManager,
} from "./utils";

export interface SaveThemeOptions {
  outputDir?: string;
  autoImport?: boolean;
  packageManager?: string;
}

export interface SaveThemeResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

/**
 * File operations service for theme management
 */
export class FileService {
  /**
   * Save theme to file and optionally import it
   */
  static async saveAndImportTheme(
    registryTheme: any,
    themeName: string,
    options: SaveThemeOptions = {}
  ): Promise<SaveThemeResult> {
    const {
      outputDir = process.cwd(),
      autoImport = false,
      packageManager,
    } = options;
    const registryPath = join(outputDir, `${themeName}-registry.json`);

    try {
      // Save the registry file
      writeFileSync(registryPath, JSON.stringify(registryTheme, null, 2));

      if (autoImport) {
        return await this.importTheme(registryPath, packageManager);
      } else {
        console.log("💾 Files saved:");
        console.log(`• Registry JSON: ${registryPath}`);
        console.log();

        console.log("💡 Next steps:");
        console.log(`• Run: npx shadcn@latest add ${registryPath}`);
        console.log("• Or remove --no-import flag for automatic import");

        return { success: true, filePath: registryPath };
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("❌ Error saving files:", errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Import theme using shadcn CLI
   */
  static async importTheme(
    registryPath: string,
    packageManager?: string
  ): Promise<SaveThemeResult> {
    try {
      const selectedPackageManager = packageManager
        ? PACKAGE_MANAGERS.find((pm) => pm.name === packageManager)
        : PACKAGE_MANAGERS[0]; // Default to npm (first in array)

      await importThemeWithShadcn(registryPath, selectedPackageManager);

      console.log(
        "\n🎉 Theme has been successfully imported into your project!"
      );
      console.log(
        "💡 You can now use your custom theme in your shadcn/ui components."
      );

      return { success: true, filePath: registryPath };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("❌ Error during theme import:", errorMessage);

      // Clean up the file if it still exists and import failed
      try {
        unlinkSync(registryPath);
      } catch (cleanupError) {
        // File might already be cleaned up or not exist
      }

      return { success: false, error: errorMessage };
    }
  }

  /**
   * Display theme without saving
   */
  static displayTheme(registryTheme: any): void {
    console.log("💡 Next steps:");
    console.log("• Save the registry JSON below to a file");
    console.log("• Run: npx shadcn@latest add ./your-theme.json");
    console.log("• Or remove --no-save --no-import flags for automatic import");

    console.log("\n📄 Registry JSON:");
    console.log(JSON.stringify(registryTheme, null, 2));
  }

  /**
   * Display manual import instructions
   */
  static displayManualImportInstructions(registryTheme: any): void {
    console.log("\n📋 Manual import instructions:");
    console.log("• Save the registry JSON below to a file");
    console.log("• Run: npx shadcn@latest add ./your-theme.json");
    console.log("\n📄 Registry JSON:");
    console.log(JSON.stringify(registryTheme, null, 2));
  }
}
