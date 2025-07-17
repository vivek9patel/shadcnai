import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import {
  ThemeGenerationLLMResponseSchema,
  type ThemeGenerationRequest,
  type ThemeGenerationResponse,
} from "@/types/theme";
import { checkThemeGenerationRateLimit, getClientIP } from "@/lib/rate-limit";
import { THEME_GENERATION_PROMPT } from "@/prompts/theme-generation";

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);

    const rateLimitResult = await checkThemeGenerationRateLimit(clientIP);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please try again later.",
          rateLimitInfo: {
            remaining: rateLimitResult.remaining,
            reset: rateLimitResult.reset,
            limit: rateLimitResult.limit,
          },
        } as ThemeGenerationResponse,
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": rateLimitResult.reset.toString(),
          },
        }
      );
    }

    const body: ThemeGenerationRequest = await request.json();
    const { user_description } = body;

    if (!user_description) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a description of the theme you want to generate.",
        } as ThemeGenerationResponse,
        { status: 400 }
      );
    }

    const result = await generateObject({
      model: openai("gpt-4.1"),
      schema: ThemeGenerationLLMResponseSchema,
      prompt: THEME_GENERATION_PROMPT(user_description),
      temperature: 0.7,
    });

    return NextResponse.json(
      {
        success: true,
        theme: result.object.theme,
        description: result.object.description,
        rateLimitInfo: {
          remaining: rateLimitResult.remaining,
          reset: rateLimitResult.reset,
          limit: rateLimitResult.limit,
        },
      } as ThemeGenerationResponse,
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": rateLimitResult.limit.toString(),
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.reset.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Theme generation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again later.",
      } as ThemeGenerationResponse,
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: "Method not allowed.",
    },
    { status: 405 }
  );
}
