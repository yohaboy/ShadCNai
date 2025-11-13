import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { prompt, projectContext, fileType } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const systemPrompt = `You are an expert code generator for a Next.js project builder. 
Generate clean, production-ready code based on the user's request.
- Use React hooks for state management
- Write TypeScript when appropriate
- Include proper error handling
- Add comments for complex logic
- Use Tailwind CSS for styling
${fileType ? `- Generate ${fileType} code` : ""}
${projectContext ? `- Consider this project context: ${projectContext}` : ""}

Return ONLY the code, no explanations.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt + "\n\n" + prompt,
    });

    return NextResponse.json({ success: true, code: response.text });
  } catch (error) {
    console.error("AI generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate code" },
      { status: 500 }
    );
  }
}
