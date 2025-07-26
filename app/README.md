# shadcnai Demo App

A comprehensive Next.js demo application showcasing shadcn/ui components and themes. This app demonstrates the full capabilities of shadcn/ui components with a complete startup website example.

## Features

- **Complete shadcn/ui Component Showcase** - Interactive examples of all shadcn/ui components
- **Sample Startup Website** - A fully-featured example website built with shadcn/ui
- **Theme Demonstration** - See how themes work across different components
- **Modern UI/UX** - Best practices for shadcn/ui implementation

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the demo.

## What's Included

- **Component Gallery** - Interactive showcase of all shadcn/ui components
- **Sample Pages** - Landing page, about, features, pricing, contact, and dashboard
- **Theme Support** - Dark/light mode toggle
- **Responsive Design** - Mobile-first responsive components

## Project Structure

```
app/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page with component links
│   ├── shadcn-demo/       # Component demonstration pages
│   │   ├── page.tsx       # Complete component gallery
│   │   └── my-fancy-startup/ # Sample startup website
│   ├── layout.tsx         # Root layout with theme provider
│   └── globals.css        # Global styles
├── components/            # shadcn/ui components
│   ├── ui/               # All shadcn/ui components
│   ├── theme-provider.tsx # Theme context provider
│   └── theme-toggle.tsx  # Dark/light mode toggle
└── lib/                  # Utilities
    └── utils.ts          # Tailwind utility functions
```

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

- [shadcn/ui Documentation](https://ui.shadcn.com/) - Learn about shadcn/ui components
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features
- [Tailwind CSS](https://tailwindcss.com/) - Learn about the CSS framework
