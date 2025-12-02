import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { prompt, projectContext } = await request.json();
    if (!prompt) return NextResponse.json({ error: "Missing prompt" }, { status: 400 });

    const systemPrompt = `
You are an expert Next.js 15 App Router project generator.

Generate a full runnable Next.js project in TypeScript with Tailwind 4, shadcn UI, Radix UI, and lucide-react.

Return exactly one JSON object where:
- Keys = relative file paths from project root (e.g., "app/page.tsx")
- Values = full file contents as escaped UTF-8 strings (escape all quotes " as \\" and all newlines as \\n)

Do NOT return raw JSX, markdown, explanations, or any extra text.
All root-level config files (package.json, tsconfig.json, next.config.ts, tailwind.config.ts, postcss.config.mjs, .eslintrc.json, components.json) must stay at root.
All file contents must be properly escaped so that JSON.parse() works directly.

User prompt: ${prompt}
${projectContext ? `Project context: ${projectContext}` : ""}
`;

    // Streaming request
    const streamResponse = await ai.models.generateContentStream({
      model: "gemini-2.5-flash-lite",
      contents: systemPrompt,
    });

    let collectedText = "";
    const decoder = new TextDecoder();

    // Gemini stream is an async iterator
    for await (const chunk of streamResponse) {
      if (chunk?.candidates?.[0]?.content?.parts) {
        for (const part of chunk.candidates[0].content.parts) {
          collectedText += part?.text || "";
        }
      }
    }

    // Clean optional ```json fences
    if (collectedText.startsWith("```json")) {
      collectedText = collectedText.replace(/^```json\s*/, "").replace(/```$/, "");
    }

    // Parse final escaped JSON
    let files: Record<string, string>;
    try {
      files = JSON.parse(collectedText);
    } catch (err) {
      console.error("Failed to parse AI response:", collectedText.substring(0, 1000));
      return NextResponse.json({ error: "AI did not return valid JSON" }, { status: 500 });
    }

    return NextResponse.json({ success: true, files });
  } catch (err) {
    console.error("AI generation error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
