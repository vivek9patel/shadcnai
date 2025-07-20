import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";

export const GET = withAuth(async function GET(request: NextRequest) {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    service: "shadcnai-theme-generator",
  });
});
