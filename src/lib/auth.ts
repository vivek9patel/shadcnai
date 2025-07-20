import { NextRequest, NextResponse } from "next/server";
import { getValidatedEnv } from "./env";

/**
 * Validates the Bearer token from the Authorization header
 * @param request - The Next.js request object
 * @returns Object with success status and optional error response
 */
export function validateBearerToken(request: NextRequest): {
  isValid: boolean;
  errorResponse?: NextResponse;
} {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return {
        isValid: false,
        errorResponse: NextResponse.json(
          {
            success: false,
            error: "Authorization header is required",
          },
          { status: 401 }
        ),
      };
    }

    if (!authHeader.startsWith("Bearer ")) {
      return {
        isValid: false,
        errorResponse: NextResponse.json(
          {
            success: false,
            error: "Authorization header must use Bearer token format",
          },
          { status: 401 }
        ),
      };
    }

    const token = authHeader.slice(7); // Remove "Bearer " prefix

    if (!token) {
      return {
        isValid: false,
        errorResponse: NextResponse.json(
          {
            success: false,
            error: "Bearer token is required",
          },
          { status: 401 }
        ),
      };
    }

    const env = getValidatedEnv();

    if (!env || token !== env.API_BEARER_TOKEN) {
      return {
        isValid: false,
        errorResponse: NextResponse.json(
          {
            success: false,
            error: "Invalid bearer token",
          },
          { status: 403 }
        ),
      };
    }

    return { isValid: true };
  } catch (error) {
    console.error("Bearer token validation error:", error);
    return {
      isValid: false,
      errorResponse: NextResponse.json(
        {
          success: false,
          error: "Internal server error during authentication",
        },
        { status: 500 }
      ),
    };
  }
}

/**
 * Higher-order function to wrap API route handlers with Bearer token authentication
 * @param handler - The API route handler function
 * @returns Wrapped handler with authentication
 */
export function withAuth<T extends any[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    const authResult = validateBearerToken(request);

    if (!authResult.isValid) {
      return authResult.errorResponse!;
    }

    return handler(request, ...args);
  };
}
