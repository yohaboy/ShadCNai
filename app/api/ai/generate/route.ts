import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { prompt, projectContext } = await request.json();
    if (!prompt) return NextResponse.json({ error: "Missing prompt" }, { status: 400 });

    const systemPrompt = `
  You are an expert Next.js 15 App Router project generator and professional frontend engineer.

  Generate a **full, production-ready Next.js 15 project** in TypeScript using:

  - Tailwind CSS 4 (mobile-first, fully responsive)
  - Shadcn UI components extensively for all UI elements (buttons, inputs, forms, modals, etc.)
  - Radix UI primitives where shadcn recommends them
  - lucide-react icons
  - Dark/light mode using shadcn + next-themes
  - Forms implemented using react-hook-form + Zod with proper TypeScript types
  - next/font/google for typography
  - next/image for optimized images
  - App Router pages/components, layouts, and loading/error boundaries
  - Server components by default; use 'use client' only when necessary
  - Proper Metadata API usage
  - Full accessibility (ARIA labels, keyboard navigation)
  - Optimized bundle splitting and production-ready code patterns

  **Return exactly one JSON object**:
  - Keys = relative paths from project root (e.g., "app/page.tsx")
  - Values = full file contents as **escaped UTF-8 strings** (escape quotes \\" and newlines \\n)

  **Folder & file rules:**
  - Root-level config files: package.json, tsconfig.json, next.config.ts, tailwind.config.ts, postcss.config.mjs, .eslintrc.json, components.json
  - app/ → all App Router pages/components, layouts, loading/error boundaries
  - components/ui/ → all shadcn UI wrapped components, with a central components/ui/index.ts export
  - lib/ → utilities/helpers (include cn.ts)
  - hooks/ → custom hooks
  - public/ → static assets
  - README.md → project root

  **Important rules:**
  - Use shadcn UI components **whenever a UI element is present**
  - Always create **both dark and light themes**
  - Ensure all generated code is **production-ready**
  - Do not include extra text, markdown, explanations, or folders
  - The JSON must be fully valid UTF-8 and can be written to disk immediately

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
      return NextResponse.json({ error: "The model is busy try again later" }, { status: 500 });
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
