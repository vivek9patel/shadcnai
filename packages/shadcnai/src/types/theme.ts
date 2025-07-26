import { z } from "zod";

const ColorVariablesSchema = z.object({
  background: z.string().describe("Main page background (RGB format)"),
  foreground: z.string().describe("Primary text color (RGB format)"),
  card: z.string().describe("Card/container background (RGB format)"),
  "card-foreground": z.string().describe("Card text color (RGB format)"),
  popover: z.string().describe("Popup/dropdown background (RGB format)"),
  "popover-foreground": z.string().describe("Popup text color (RGB format)"),
  primary: z.string().describe("Main brand/action color (RGB format)"),
  "primary-foreground": z.string().describe("Primary button text (RGB format)"),
  secondary: z.string().describe("Secondary action color (RGB format)"),
  "secondary-foreground": z
    .string()
    .describe("Secondary button text (RGB format)"),
  muted: z
    .string()
    .describe("Subdued background for less important content (RGB format)"),
  "muted-foreground": z.string().describe("Subtle text color (RGB format)"),
  accent: z.string().describe("Highlight/emphasis color (RGB format)"),
  "accent-foreground": z.string().describe("Accent text color (RGB format)"),
  destructive: z.string().describe("Error/danger color (RGB format)"),
  "destructive-foreground": z
    .string()
    .describe("Error text color (RGB format)"),
  border: z.string().describe("Element borders (RGB format)"),
  input: z.string().describe("Input field backgrounds (RGB format)"),
  ring: z.string().describe("Focus ring color (RGB format)"),
  "chart-1": z.string().describe("Chart color 1 (RGB format)"),
  "chart-2": z.string().describe("Chart color 2 (RGB format)"),
  "chart-3": z.string().describe("Chart color 3 (RGB format)"),
  "chart-4": z.string().describe("Chart color 4 (RGB format)"),
  "chart-5": z.string().describe("Chart color 5 (RGB format)"),
  sidebar: z.string().describe("Sidebar background (RGB format)"),
  "sidebar-foreground": z.string().describe("Sidebar text (RGB format)"),
  "sidebar-primary": z
    .string()
    .describe("Sidebar primary elements (RGB format)"),
  "sidebar-primary-foreground": z
    .string()
    .describe("Sidebar primary text (RGB format)"),
  "sidebar-accent": z.string().describe("Sidebar accent elements (RGB format)"),
  "sidebar-accent-foreground": z
    .string()
    .describe("Sidebar accent text (RGB format)"),
  "sidebar-border": z.string().describe("Sidebar borders (RGB format)"),
  "sidebar-ring": z.string().describe("Sidebar focus rings (RGB format)"),
});

const ThemeColorsSchema = z.object({
  light: ColorVariablesSchema,
  dark: ColorVariablesSchema,
});

const FontsSchema = z.object({
  sans: z.string().describe("Sans-serif font stack"),
  serif: z.string().describe("Serif font stack"),
  mono: z.string().describe("Monospace font stack"),
});

const ShadowsSchema = z.object({
  shadow2xs: z.string().describe("Extra extra small shadow"),
  shadowXs: z.string().describe("Extra small shadow"),
  shadowSm: z.string().describe("Small shadow"),
  shadow: z.string().describe("Default shadow"),
  shadowMd: z.string().describe("Medium shadow"),
  shadowLg: z.string().describe("Large shadow"),
  shadowXl: z.string().describe("Extra large shadow"),
  shadow2xl: z.string().describe("Extra extra large shadow"),
});

export const ThemeSchema = z.object({
  name: z.string().describe("Theme identifier (kebab-case)"),
  displayName: z.string().describe("Human-readable theme name"),
  colors: ThemeColorsSchema,
  // fonts: FontsSchema,
  radius: z.string().describe("Border radius (e.g., '0.5rem')"),
  shadows: ShadowsSchema,
});

// Schema for the complete LLM response
export const ThemeGenerationLLMResponseSchema = z.object({
  theme: ThemeSchema,
  description: z
    .string()
    .describe(
      "Brief explanation of design choices and how the theme reflects the user's request"
    ),
});

export type ColorVariables = z.infer<typeof ColorVariablesSchema>;
export type ThemeColors = z.infer<typeof ThemeColorsSchema>;
export type Fonts = z.infer<typeof FontsSchema>;
export type Shadows = z.infer<typeof ShadowsSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
export type ThemeGenerationLLMResponse = z.infer<
  typeof ThemeGenerationLLMResponseSchema
>;
