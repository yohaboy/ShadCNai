import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { prompt, projectContext } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const systemPrompt = `You are an expert Next.js code generator.

Task:
- Generate an entire Next.js project including all essential folders and files (app, components, pages, lib, etc.).
- Include package.json, tsconfig.json, and any necessary config files.
- Use TypeScript where appropriate.
- Use TailwindCSS for styling.
- Use React hooks for state management.
- Include proper error handling and comments for complex logic.
- Return all files as a JSON object with keys as file paths (relative to project root) and values as file content.
- **Return only JSON. Do NOT include explanations, markdown formatting, or extra text.**
`;

    const userPrompt = projectContext
      ? `${systemPrompt}\nProject Context:\n${projectContext}\nUser Request:\n${prompt}`
      : `${systemPrompt}\nUser Request:\n${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
    });

    if (!response.text) {
      throw new Error("AI returned no content");
    }

    let rawText = response.text.trim();
    if (rawText.startsWith("```json")) {
      rawText = rawText.replace(/^```json\s*/, "").replace(/```$/, "");
    }

    let files: Record<string, string>;
    try {
      files = JSON.parse(rawText);
    } catch (err) {
      console.error("Failed to parse AI response:", rawText);
      return NextResponse.json(
        { error: "AI did not return valid JSON" },
        { status: 500 }
      );
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
