import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const { prompt, projectContext, fileType } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 })
    }

    const systemPrompt = `You are an expert code generator for a Next.js project builder. 
Generate clean, production-ready code based on the user's request.
When generating code, follow these guidelines:
- Use React hooks for state management
- Write TypeScript when appropriate
- Include proper error handling
- Add comments for complex logic
- Use Tailwind CSS for styling
${fileType ? `- Generate ${fileType} code` : ""}
${projectContext ? `- Consider this project context: ${projectContext}` : ""}

Return ONLY the code, no explanations.`

    const { text } = await generateText({
      model: "openai/gpt-4-mini",
      system: systemPrompt,
      prompt: prompt,
      temperature: 0.7,
    })

    return NextResponse.json({
      success: true,
      code: text,
    })
  } catch (error) {
    console.error("AI generation error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate code",
      },
      { status: 500 },
    )
  }
}
