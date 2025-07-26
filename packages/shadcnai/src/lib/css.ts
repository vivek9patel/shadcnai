import type { Theme, ColorVariables } from '../types/theme';

/**
 * Convert camelCase to kebab-case for CSS variables
 */
function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Generate CSS variables for color variables
 */
function generateColorVariables(colors: ColorVariables, indent = '  '): string {
  const vars: string[] = [];
  
  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = `--${toKebabCase(key)}: ${value};`;
    vars.push(`${indent}${cssVar}`);
  });
  
  return vars.join('\n');
}

/**
 * Generate CSS variables for fonts
 */
function generateFontVariables(fonts: { sans: string; serif: string; mono: string }, indent = '  '): string {
  const vars = [
    `${indent}--font-sans: ${fonts.sans};`,
    `${indent}--font-serif: ${fonts.serif};`,
    `${indent}--font-mono: ${fonts.mono};`,
  ];
  
  return vars.join('\n');
}

/**
 * Generate CSS variables for shadows
 */
function generateShadowVariables(shadows: Record<string, string>, indent = '  '): string {
  const vars: string[] = [];
  
  Object.entries(shadows).forEach(([key, value]) => {
    const cssVar = `--${toKebabCase(key)}: ${value};`;
    vars.push(`${indent}${cssVar}`);
  });
  
  return vars.join('\n');
}

/**
 * Generate :root CSS section
 */
function generateRootSection(theme: Theme): string {
  const lines = [
    ':root {',
    generateColorVariables(theme.colors.light),
    generateFontVariables(theme.fonts),
    `  --radius: ${theme.radius};`,
    generateShadowVariables(theme.shadows),
    `  --tracking-normal: ${theme.trackingNormal};`,
    `  --spacing: ${theme.spacing};`,
    '}'
  ];
  
  return lines.join('\n');
}

/**
 * Generate .dark CSS section
 */
function generateDarkSection(theme: Theme): string {
  const lines = [
    '',
    '.dark {',
    generateColorVariables(theme.colors.dark),
    generateFontVariables(theme.fonts),
    `  --radius: ${theme.radius};`,
    generateShadowVariables(theme.shadows),
    '}'
  ];
  
  return lines.join('\n');
}

/**
 * Generate @theme inline section
 */
function generateThemeInlineSection(): string {
  const colorMappings = [
    'background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground',
    'primary', 'primary-foreground', 'secondary', 'secondary-foreground',
    'muted', 'muted-foreground', 'accent', 'accent-foreground',
    'destructive', 'destructive-foreground', 'border', 'input', 'ring',
    'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5',
    'sidebar', 'sidebar-foreground', 'sidebar-primary', 'sidebar-primary-foreground',
    'sidebar-accent', 'sidebar-accent-foreground', 'sidebar-border', 'sidebar-ring'
  ];

  const fontMappings = ['sans', 'serif', 'mono'];

  const shadowMappings = ['2xs', 'xs', 'sm', '', 'md', 'lg', 'xl', '2xl'];

  const lines = [
    '',
    '@theme inline {',
    // Color variables
    ...colorMappings.map(color => `  --color-${color}: var(--${color});`),
    '',
    // Font variables
    ...fontMappings.map(font => `  --font-${font}: var(--font-${font});`),
    '',
    // Radius variables
    '  --radius-sm: calc(var(--radius) - 4px);',
    '  --radius-md: calc(var(--radius) - 2px);',
    '  --radius-lg: var(--radius);',
    '  --radius-xl: calc(var(--radius) + 4px);',
    '',
    // Shadow variables
    ...shadowMappings.map(shadow => {
      const shadowName = shadow ? `-${shadow}` : '';
      return `  --shadow${shadowName}: var(--shadow${shadowName});`;
    }),
    '}'
  ];
  
  return lines.join('\n');
}

/**
 * Convert theme JSON to complete CSS
 */
export function themeToCSS(theme: Theme): string {
  const sections = [
    generateRootSection(theme),
    generateDarkSection(theme),
    generateThemeInlineSection()
  ];
  
  return sections.join('\n');
}

/**
 * Convert theme JSON to just CSS variables (without @theme inline)
 */
export function themeToCSSVariables(theme: Theme): string {
  const sections = [
    generateRootSection(theme),
    generateDarkSection(theme)
  ];
  
  return sections.join('\n');
} 