# shadcnai

A CLI tool for generating beautiful shadcn/ui themes using using natural language descriptions.

## Quick Start

```bash
# Set your API key
export GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-key

# Generate a theme
npx shadcnai theme "neo brutalism theme with pink sunset vibes"
```

## More Usage Examples

```bash
# Generate a dark purple theme
npx shadcnai theme "dark theme with purple accents"

# Use specific AI model
npx shadcnai theme "ocean sunset colors" --model gpt-4.1

# Generate and save without auto-import
npx shadcnai theme "clean matrix movie style theme" --no-import

# Specify package manager
npx shadcnai theme "minimalist design" --package-manager pnpm
```

## Supported Models

- `gemini-2.5-flash` (Google AI, **default**)
- `gpt-4.1` (OpenAI)
- `llama-4-scout` (Cerebras)

## Package

- **[`packages/shadcnai/`](./packages/shadcnai/)** - The main CLI package with full documentation

## Special Mentions

Built with:
- **[AI SDK](https://sdk.vercel.ai/)** - For AI model integrations
- **[shadcn/ui](https://ui.shadcn.com/)** - For the component system 