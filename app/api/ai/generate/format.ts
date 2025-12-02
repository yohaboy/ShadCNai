
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt, projectContext } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Missing prompt" },
        { status: 400 }
      );
    }

    const systemPrompt =
      "You are an expert Next.js (App Router) project generator and production frontend engineer. Produce one single output: a JSON object whose keys are file paths (relative to project root) and values are the full file contents as UTF-8 strings. Do not include any other text, explanation, or files outside the JSON. The JSON must be valid and complete so a reviewer can write the files to disk, run npm install (or pnpm install), and npm run dev to run the app.\n\nRequirements — follow exactly:\n\n1. Platform & versions\nUse Next.js 15 and React 18+ with TypeScript. Ensure the generated package.json and dependencies are fully compatible with Next.js 15 release candidate.\nTailwind CSS for styling.\nUse shadcn UI primitives/components extensively for all UI elements. Prefer shadcn wrapped components in components/ui/* and export a central components/ui/index.ts.\nUse lucide-react for icons and Radix primitives where shadcn recommends them.\n\n2. Output format\nReturn only one JSON object mapping \"relative/path/to/file\" → \"file contents\\n...\".\nUse UNIX newlines (\\n).\nDo not include extra keys or text.\n\n3. Project scope & structure\nProvide a full, runnable Next.js app using the App Router (app/) with TypeScript.\nInclude all config files, tests, README, CI, etc.\n\n4–10. (full requirements remain identical)…\n\nNow generate the project JSON accordingly.";

    const userPrompt = projectContext
      ? `${systemPrompt}\nProject Context:\n${projectContext}\nUser Request:\n${prompt}`
      : `${systemPrompt}\nUser Request:\n${prompt}`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: userPrompt,
    });

    const rawText =
      result?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p?.text || "")
        .join("")
        .trim() || "";

    if (!rawText) {
      throw new Error("AI returned no content");
    }
    let cleaned = rawText;
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.replace(/^```json\s*/, "").replace(/```$/, "");
    }

    let files: Record<string, string>;

    try {
      files = JSON.parse(cleaned);
    } catch (err) {
      console.error("Failed to parse AI response:", cleaned);
      return NextResponse.json(
        { error: "AI did not return valid JSON" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      files,
    });
  } catch (err) {
    console.error("AI generation error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
