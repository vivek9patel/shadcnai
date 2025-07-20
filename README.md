# shadcn/ui Theme Generator Monorepo

This monorepo contains the shadcn/ui theme generator project with the following packages:

## Packages

- **`server/`** - Next.js web application for theme generation
- **`packages/`** - Directory for future CLI packages and utilities

## Getting Started

### Environment Setup

1. Copy the environment example file:
```bash
cp .env.example .env.local
```

2. Fill in your API keys and configuration in `.env.local`

### Development

To start the development server:

```bash
npm run server
```

This will start the Next.js server in development mode.

### Building

To build the server:

```bash
npm run build:server
```

### Running in Production

To start the production server:

```bash
npm run start:server
```

### Linting

To lint the server code:

```bash
npm run lint:server
```

## Project Structure

```
.
├── server/                 # Next.js application
│   ├── src/               # Source code
│   ├── package.json       # Server dependencies
│   └── ...               # Other server files
├── packages/              # Future CLI packages
├── package.json           # Root package.json (monorepo config)
└── README.md             # This file
```

## Contributing

Each package has its own README with specific instructions. See the individual package directories for more details. 