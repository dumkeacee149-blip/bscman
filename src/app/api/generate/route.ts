import { NextRequest, NextResponse } from "next/server";
import { generateComic } from "@/lib/ai";
import type { ActionStyle } from "@/lib/prompts";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { theme, panels, action, dialogue } = body as {
      theme: string;
      panels: number;
      action: ActionStyle;
      dialogue?: string;
    };

    if (!theme || !action) {
      return NextResponse.json(
        { error: "Missing required fields: theme, action" },
        { status: 400 }
      );
    }

    const urls = await generateComic({
      theme,
      panels: panels || 4,
      action,
      dialogue,
    });

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 }
    );
  }
}
