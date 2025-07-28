import ora, { Ora } from "ora";
import chalk from "chalk";

/**
 * Lightweight CLI animation utilities
 */
export class CLIAnimations {
  private static activeSpinner: Ora | null = null;

  /**
   * Start a beautiful spinner with custom text
   */
  static startSpinner(
    text: string,
    color: "blue" | "green" | "yellow" | "magenta" = "blue"
  ): Ora {
    // Clean up any existing spinner
    this.stopSpinner();

    this.activeSpinner = ora({
      text: chalk.gray(text),
      color,
      spinner: "dots12", // Beautiful spinner animation
    }).start();

    return this.activeSpinner;
  }

  /**
   * Update spinner text while keeping animation
   */
  static updateSpinner(text: string): void {
    if (this.activeSpinner) {
      this.activeSpinner.text = chalk.gray(text);
    }
  }

  /**
   * Stop spinner with success message
   */
  static succeedSpinner(message: string): void {
    if (this.activeSpinner) {
      this.activeSpinner.succeed(chalk.green(message));
      this.activeSpinner = null;
    }
  }

  /**
   * Stop spinner with error message
   */
  static failSpinner(message: string): void {
    if (this.activeSpinner) {
      this.activeSpinner.fail(chalk.red(message));
      this.activeSpinner = null;
    }
  }

  /**
   * Stop spinner without message
   */
  static stopSpinner(): void {
    if (this.activeSpinner) {
      this.activeSpinner.stop();
      this.activeSpinner = null;
    }
  }

  /**
   * Display typewriter effect for longer text
   */
  static async typeWriter(text: string, delay: number = 25): Promise<void> {
    return new Promise((resolve) => {
      let i = 0;
      process.stdout.write("\n");

      const interval = setInterval(() => {
        if (i < text.length) {
          process.stdout.write(text[i]);
          i++;
        } else {
          clearInterval(interval);
          process.stdout.write("\n\n");
          resolve();
        }
      }, delay);
    });
  }

  /**
   * Display colorful header with emoji
   */
  static showHeader(
    title: string,
    emoji: string,
    color: "blue" | "green" | "yellow" | "magenta" = "blue"
  ): void {
    const coloredTitle = chalk[color].bold(title);
    console.log(`\n${emoji} ${coloredTitle}`);
  }

  /**
   * Display info message with icon
   */
  static showInfo(message: string, emoji: string = "💡"): void {
    console.log(`${emoji} ${chalk.cyan(message)}\n`);
  }

  /**
   * Display success message with animation
   */
  static showSuccess(message: string, emoji: string = "🎉"): void {
    console.log(`\n${emoji} ${chalk.green.bold(message)}\n`);
  }

  /**
   * Display error message
   */
  static showError(message: string): void {
    console.log(`\n❌ ${chalk.red.bold("Error:")} ${chalk.red(message)}`);
  }

  /**
   * Display warning message
   */
  static showWarning(message: string): void {
    console.log(
      `\n⚠️  ${chalk.yellow.bold("Warning:")} ${chalk.yellow(message)}`
    );
  }

  /**
   * Progress indicator for multi-step operations
   */
  static showProgress(current: number, total: number, step: string): void {
    const percentage = Math.round((current / total) * 100);
    const progressBar = this.createProgressBar(percentage);
    const stepText = chalk.gray(`(${current}/${total}) ${step}`);

    console.log(`\n${progressBar} ${stepText}`);
  }

  /**
   * Create a simple progress bar
   */
  private static createProgressBar(
    percentage: number,
    width: number = 20
  ): string {
    const filled = Math.round((percentage / 100) * width);
    const empty = width - filled;

    const filledBar = chalk.green("█".repeat(filled));
    const emptyBar = chalk.gray("░".repeat(empty));
    const percentText = chalk.bold(`${percentage}%`);

    return `[${filledBar}${emptyBar}] ${percentText}`;
  }

  /**
   * Simple delay utility
   */
  static delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Cleanup all animations on exit
   */
  static cleanup(): void {
    this.stopSpinner();
  }
}

// Cleanup on process exit
process.on("exit", () => CLIAnimations.cleanup());
process.on("SIGINT", () => {
  CLIAnimations.cleanup();
  process.exit(130);
});
process.on("SIGTERM", () => {
  CLIAnimations.cleanup();
  process.exit(143);
});
