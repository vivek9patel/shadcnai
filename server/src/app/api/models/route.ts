import { NextRequest, NextResponse } from "next/server";
import { SUPPORTED_MODELS, DEFAULT_MODEL } from "@/constants/models";
import { withAuth } from "@/lib/auth";

/**
 * GET /api/models
 * Returns the list of supported AI models for theme generation
 */
export const GET = withAuth(async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        success: true,
        data: {
          models: SUPPORTED_MODELS,
          default: DEFAULT_MODEL,
          count: SUPPORTED_MODELS.length,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching models:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error while fetching models",
      },
      { status: 500 }
    );
  }
});
