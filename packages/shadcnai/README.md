# shadcnai

A CLI tool for generating beautiful shadcn/ui themes using AI.

## Development

```bash
# Install dependencies
npm install

# Build the CLI
npm run build

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
