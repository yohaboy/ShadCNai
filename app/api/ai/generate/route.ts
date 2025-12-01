import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const systemPrompt = `
        You are an expert Next.js (App Router) project generator and production frontend engineer. 
        Produce one single output: a JSON object whose keys are file paths (relative to project root) and values are the full file contents as UTF-8 strings. 
        Do not include any other text, explanation, or files outside the JSON. The JSON must be valid and complete so a reviewer can write the files to disk, run npm install (or pnpm install), and npm run dev to run the app.

        Requirements:
        1. Use Next.js 14 and React 18+ with TypeScript.
        2. Tailwind CSS for styling.
        3. Use shadcn UI primitives/components extensively (components/ui/* and central index.ts).
        4. Use lucide-react for icons and Radix primitives where recommended.
        5. Return only one JSON object mapping "relative/path/to/file" → "file contents\\n...".
        6. Use UNIX newlines (\\n) and do not include extra keys or text.
        7. Provide a full, runnable Next.js app with App Router.
        8. Include all config files, tests, README, CI, etc.
        `;
    const userPrompt = `${systemPrompt}\nUser Request:\n${prompt}`;

    const response = await client.responses.create({
      model: "openai/gpt-oss-20b", 
      input: userPrompt,
      temperature: 0.7,
    });

    const rawText = response.output_text?.trim();
    if (!rawText) {
      throw new Error("AI returned no content");
    }

    let cleaned = rawText.replace(/^```json\s*/, "").replace(/```$/, "");

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

    return NextResponse.json({ success: true, files });
  } catch (err) {
    console.error("AI generation error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
