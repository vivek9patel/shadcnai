# shadcnai

A CLI tool for generating beautiful shadcn/ui themes using AI.

## Installation

```bash
npm install -g shadcnai
```

## Setup

**Quick Start (Default Model):**

```bash
export GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-key
```

**For Other Models (Optional):**

```bash
# Only set the keys for models you want to use
export OPENAI_API_KEY=your-openai-key           # For --model gpt-4.1
export CEREBRAS_API_KEY=your-cerebras-key       # For --model llama-4-scout
```

## Usage

Generate a theme (uses Gemini 2.5 Flash by default):

```bash
npx shadcnai generate "dark theme with purple accents"
```

With specific model:

```bash
npx shadcnai generate "ocean sunset colors" --model gpt-4.1
```

Show help:

```bash
npx shadcnai --help
```

## Models

- `gemini-2.5-flash` (Google AI, **default** - requires `GOOGLE_GENERATIVE_AI_API_KEY`)
- `gpt-4.1` (OpenAI - requires `OPENAI_API_KEY`)
- `llama-4-scout` (Cerebras - requires `CEREBRAS_API_KEY`)

## Output

Returns complete shadcn/ui theme configuration with colors, fonts, shadows, and spacing.

## Development

```bash
# Install dependencies
npm install

# Build the CLI
npm run build

# Run in development mode
npm run dev

# Lint code
npm run lint

# Type check
npm run typecheck
```

## Structure

```
src/
├── cli.ts              # Main CLI entry point
├── commands/           # CLI commands
│   ├── generate.ts     # Theme generation command
│   └── index.ts        # Command exports
├── lib/                # Shared utilities
│   ├── models.ts       # AI model configuration
│   └── utils.ts        # Helper functions
├── types/              # TypeScript types
│   └── theme.ts        # Theme-related types
├── constants/          # Constants
│   └── models.ts       # Model definitions
└── prompts/            # AI prompts
    └── theme-generation.ts
```
