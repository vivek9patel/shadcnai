# ShadcnAI Theme Generator

A modern theme generator API powered by Vercel AI SDK and OpenAI GPT-4o that creates beautiful color schemes and design tokens for shadcn/ui components.

## Features

- 🎨 **AI-Powered Theme Generation**: Uses OpenAI GPT-4o to generate coherent color schemes
- 🛡️ **Rate Limiting**: Built-in DDOS protection with Upstash Redis
- 🔒 **TypeScript**: Fully typed with Zod schema validation
- ⚡ **Next.js 15**: Modern App Router with API routes
- 🚀 **Vercel Ready**: Optimized for Vercel deployment
- 📊 **Structured Output**: Returns JSON with primary/secondary colors and radius

## Quick Start

### Prerequisites

- Node.js 18+
- OpenAI API account
- Upstash Redis account (free tier available)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd shadcnai-theme-generator
npm install
```

### 2. Environment Setup

Create a `.env.local` file:

```bash
# OpenAI API Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here

# Upstash Redis Configuration (for rate limiting)
UPSTASH_REDIS_REST_URL=https://your-redis-endpoint.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token

# Application Configuration
NODE_ENV=development
```

### 3. Get Your API Keys

#### OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up/login and go to API keys
3. Create a new secret key
4. Copy the key to your `.env.local`

#### Upstash Redis Setup

1. Go to [Upstash Console](https://console.upstash.com/)
2. Sign up/login and create a new Redis database
3. Choose the free plan (25K requests/month)
4. Copy the REST URL and Token to your `.env.local`

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see the API documentation.

## API Reference

### POST /api/generate-theme

Generate a new theme based on a text prompt.

#### Request

```typescript
{
  "prompt": string,     // Required: Description of the desired theme
  "style": string       // Optional: Style preference (default: "modern")
}
```

#### Response

```typescript
{
  "success": boolean,
  "theme": {
    "name": string,
    "description": string,
    "colors": {
      "primary": string,    // Hex color (e.g., "#3b82f6")
      "secondary": string   // Hex color (e.g., "#64748b")
    },
    "radius": {
      "radius": number      // Border radius in pixels (0-50)
    }
  },
  "rateLimitInfo": {
    "remaining": number,
    "reset": number,
    "limit": number
  }
}
```

#### Examples

**Request:**

```bash
curl -X POST http://localhost:3000/api/generate-theme \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Ocean sunset with warm oranges and cool blues",
    "style": "modern"
  }'
```

**Response:**

```json
{
  "success": true,
  "theme": {
    "name": "Ocean Sunset",
    "description": "A warm and inviting theme inspired by ocean sunsets",
    "colors": {
      "primary": "#ff6b35",
      "secondary": "#2c5aa0"
    },
    "radius": {
      "radius": 8
    }
  },
  "rateLimitInfo": {
    "remaining": 9,
    "reset": 1641234567890,
    "limit": 10
  }
}
```

### GET /api/health

Health check endpoint.

#### Response

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T12:34:56.789Z",
  "version": "1.0.0",
  "service": "shadcnai-theme-generator"
}
```

## Rate Limits

- **Theme Generation**: 10 requests per 10 minutes per IP
- **General API**: 60 requests per minute per IP

Rate limit headers are included in responses:

- `X-RateLimit-Limit`: Request limit per window
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: Timestamp when the limit resets

## Usage Examples

### JavaScript/TypeScript

```typescript
// Generate a theme
async function generateTheme(prompt: string, style?: string) {
  const response = await fetch("/api/generate-theme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, style }),
  });

  const data = await response.json();

  if (data.success) {
    return data.theme;
  } else {
    throw new Error(data.error);
  }
}

// Usage
const theme = await generateTheme("Dark theme with purple accents");
console.log(theme.colors.primary); // e.g., "#8b5cf6"
```

### Python

```python
import requests

def generate_theme(prompt, style="modern"):
    response = requests.post('http://localhost:3000/api/generate-theme',
                           json={"prompt": prompt, "style": style})

    if response.status_code == 200:
        data = response.json()
        if data["success"]:
            return data["theme"]
        else:
            raise Exception(data["error"])
    else:
        response.raise_for_status()

# Usage
theme = generate_theme("Cozy coffee shop with browns and creams")
print(theme["colors"]["primary"])
```

### cURL

```bash
# Generate a theme
curl -X POST http://localhost:3000/api/generate-theme \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Professional dashboard with blue and gray tones"}'

# Check API health
curl http://localhost:3000/api/health
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate-theme/route.ts    # Main theme generation endpoint
│   │   └── health/route.ts            # Health check endpoint
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Homepage with documentation
├── lib/
│   ├── rate-limit.ts                  # Rate limiting utilities
│   └── env.ts                         # Environment validation
└── types/
    └── theme.ts                       # TypeScript types and schemas
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Environment variables needed in Vercel:

- `OPENAI_API_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### Other Platforms

This project works on any platform that supports Next.js:

- Netlify
- Railway
- AWS
- Digital Ocean

## Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Adding New Features

1. **New Theme Properties**: Update `src/types/theme.ts`
2. **Rate Limiting Changes**: Modify `src/lib/rate-limit.ts`
3. **API Enhancements**: Edit `src/app/api/generate-theme/route.ts`

## Configuration

### Rate Limiting

Customize rate limits in `src/lib/rate-limit.ts`:

```typescript
export const rateLimiters = {
  themeGeneration: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "10 m"), // 10 requests per 10 minutes
    analytics: true,
    prefix: "theme-generator:theme-generation",
  }),
};
```

### AI Model Settings

Modify the AI model in `src/app/api/generate-theme/route.ts`:

```typescript
const result = await generateObject({
  model: openai("gpt-4o"), // Change model here
  schema: ThemeSchema,
  temperature: 0.7, // Adjust creativity (0-1)
  // ... other settings
});
```

## Troubleshooting

### Common Issues

1. **Rate Limit Errors**: Check your Upstash Redis configuration
2. **OpenAI Errors**: Verify your API key and billing status
3. **Environment Issues**: Run environment validation with the built-in validator

### Environment Validation

The app includes automatic environment validation. Check the console for detailed error messages if environment variables are missing or invalid.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

- 📧 Create an issue for bug reports
- 💡 Feature requests welcome
- 🤝 PRs appreciated

---

Built with ❤️ using [Vercel AI SDK](https://sdk.vercel.ai/), [Next.js](https://nextjs.org/), and [OpenAI](https://openai.com/).
