import { z } from "zod";
import type { SupportedModel } from "@/lib/models";

const ColorVariablesSchema = z.object({
  background: z.string().describe("Main page background"),
  foreground: z.string().describe("Primary text color"),
  card: z.string().describe("Card/container background"),
  cardForeground: z.string().describe("Card text color"),
  popover: z.string().describe("Popup/dropdown background"),
  popoverForeground: z.string().describe("Popup text color"),
  primary: z.string().describe("Main brand/action color"),
  primaryForeground: z.string().describe("Primary button text"),
  secondary: z.string().describe("Secondary action color"),
  secondaryForeground: z.string().describe("Secondary button text"),
  muted: z.string().describe("Subdued background for less important content"),
  mutedForeground: z.string().describe("Subtle text color"),
  accent: z.string().describe("Highlight/emphasis color"),
  accentForeground: z.string().describe("Accent text color"),
  destructive: z.string().describe("Error/danger color"),
  destructiveForeground: z.string().describe("Error text color"),
  border: z.string().describe("Element borders"),
  input: z.string().describe("Input field backgrounds"),
  ring: z.string().describe("Focus ring color"),
  chart1: z.string().describe("Chart color 1"),
  chart2: z.string().describe("Chart color 2"),
  chart3: z.string().describe("Chart color 3"),
  chart4: z.string().describe("Chart color 4"),
  chart5: z.string().describe("Chart color 5"),
  sidebar: z.string().describe("Sidebar background"),
  sidebarForeground: z.string().describe("Sidebar text"),
  sidebarPrimary: z.string().describe("Sidebar primary elements"),
  sidebarPrimaryForeground: z.string().describe("Sidebar primary text"),
  sidebarAccent: z.string().describe("Sidebar accent elements"),
  sidebarAccentForeground: z.string().describe("Sidebar accent text"),
  sidebarBorder: z.string().describe("Sidebar borders"),
  sidebarRing: z.string().describe("Sidebar focus rings"),
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
  name: z.string().describe("Theme identifier"),
  displayName: z.string().describe("Human-readable theme name"),
  colors: ThemeColorsSchema,
  fonts: FontsSchema,
  radius: z.string().describe("Border radius (e.g., '0.5rem')"),
  shadows: ShadowsSchema,
  trackingNormal: z.string().describe("Normal letter spacing"),
  spacing: z.string().describe("Base spacing unit"),
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

export interface ThemeGenerationRequest {
  user_description: string;
  model?: SupportedModel;
}

export interface ThemeGenerationResponse {
  success: boolean;
  theme?: Theme;
  description?: string;
  error?: string;
  rateLimitInfo?: {
    remaining: number;
    reset: number;
    limit: number;
  };
}
