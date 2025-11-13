import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const { code, instruction } = await request.json()

    if (!code || !instruction) {
      return NextResponse.json({ error: "Missing code or instruction" }, { status: 400 })
    }

    const { text } = await generateText({
      model: "openai/gpt-4-mini",
      system: `You are a code refinement expert. The user will provide existing code and ask you to modify it according to their instructions.
Always return ONLY the complete refactored code, preserving the original functionality while applying the requested changes.
No explanations, just the code.`,
      prompt: `Original code:\n\`\`\`\n${code}\n\`\`\`\n\nInstruction: ${instruction}`,
      temperature: 0.7,
    })

    return NextResponse.json({
      success: true,
      code: text,
    })
  } catch (error) {
    console.error("Code refinement error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to refine code",
      },
      { status: 500 },
    )
  }
}
