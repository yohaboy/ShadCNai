import { NextRequest, NextResponse } from "next/server";
import Cerebras from "@cerebras/cerebras_cloud_sdk";

// Initialize Cerebras client
const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

interface CerebrasChoice {
  message: { content: string };
}

interface CerebrasCompletion {
  choices: CerebrasChoice[];
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

const systemPrompt = `
You are an expert Next.js (App Router) project generator and production frontend engineer. Produce one single output: a JSON object whose keys are file paths (relative to project root) and values are the full file contents as UTF-8 strings. Do not include any other text, explanation, or extra files outside the JSON. The JSON must be valid and complete so a reviewer can write the files to disk, run npm install (or pnpm install), and npm run dev to run the app.

Requirements — follow exactly:

1. Platform & versions
- Next.js 15.x (App Router) with React 18+
- TypeScript (.ts and .tsx only)
- Tailwind CSS v4 for styling
- shadcn UI primitives/components used extensively for all UI elements, organized under components/ui/* and exported via components/ui/index.ts
- lucide-react for icons, Radix UI primitives where shadcn recommends them
- Dark and Light mode fully supported and managed via shadcn UI

2. Output format
- Return only a single JSON object mapping "relative/path/to/file" → "file contents\n..."
- Use UNIX newlines (\n)
- Do not include explanations, extra text, or files outside the JSON

3. Project scope & structure
- Full runnable Next.js 15 project using the App Router (app/)
- TypeScript for all code
- Include all config files: package.json, tsconfig.json, next.config.ts, tailwind.config.js, postcss.config.js
- Include a global stylesheet (globals.css) with Tailwind directives
- Include a README.md
- Include a basic CI setup (GitHub Actions workflow)
- Proper folder structure for components, lib/utils, and pages/app routes

4. UI/UX requirements
- Unique monochromatic design (no typical purple)
- Modern, clean, minimal UI
- Components use shadcn UI wherever possible
- Include a sample homepage with at least: header/nav, hero section, card/grid section, footer
- Use light/dark mode toggling via shadcn UI theming
- Include sample buttons, inputs, and cards from shadcn components

5. TypeScript & code quality
- Type-safe props and hooks
- Centralized component exports
- No JavaScript files
- Modern React patterns: functional components, hooks, proper folder imports

6. Dependencies
- All dependencies must be compatible with Next.js 15
- Include Tailwind, shadcn UI, lucide-react, class-variance-authority, clsx, tailwind-merge, @radix-ui/* as required

7. Optional
- Include a utils folder with cn.ts (className helper)
- Include global error.tsx and not-found.tsx pages
- Include proper dark/light mode support in layout.tsx

Now generate the project JSON accordingly. Only output the JSON object.
`;

      const userPrompt = systemPrompt + "\nUser Request:\n" + prompt;

    // Cerebras API call
    const completionRaw = await cerebras.chat.completions.create({
      messages: [{ role: "user", content: userPrompt }],
      model: "llama-3.3-70b",
      max_completion_tokens: 8192,
      temperature: 0.2,
      top_p: 1,
      stream: false,
    });

    // Type cast to access choices safely
    const completion = completionRaw as unknown as CerebrasCompletion;

    const rawText = completion.choices?.[0]?.message?.content?.trim();
    if (!rawText) {
      throw new Error("AI returned no content");
    }

    // Clean code block wrappers if present
    let cleaned = rawText;
    if (cleaned.startsWith("```json")) {
      cleaned = cleaned.replace(/^```json\s*/, "").replace(/```$/, "");
    }

    let files: Record<string, string>;
    try {
      files = JSON.parse(cleaned);
    } catch (err) {
      console.error("Failed to parse AI response:", cleaned.substring(0, 1000));
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