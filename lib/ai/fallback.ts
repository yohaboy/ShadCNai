import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

// Initialize AI providers
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY!,
  baseURL: "https://api.deepseek.com/v1",
});

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

// Fallback template (minimal Next.js 14 + Tailwind starter)
const FALLBACK_TEMPLATE: Record<string, string> = {
  "app/page.tsx": `export default function Page() { return <h1>Hello World</h1>; }`,
  "app/layout.tsx": `export default function RootLayout({ children }: { children: React.ReactNode }) { return <html><body>{children}</body></html>; }`,
  "package.json": `{"name":"fallback-nextjs","version":"0.1.0","private":true,"dependencies":{"next":"14.2.5","react":"18","react-dom":"18"}}`,
};

/**
 * Parse AI text response safely into JSON
 */
function parseJSON(text: string): Record<string, string> | null {
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/```$/, "");
  }
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse AI response JSON:", cleaned);
    return null;
  }
}

/**
 * Tries multiple AI providers in order and falls back to template
 */
export async function generateWithFallback(userPrompt: string) {
  const SYSTEM_PROMPT = `
You are an elite senior frontend engineer and full-stack architect.
Generate a complete, production-ready Next.js 14 project using App Router and TypeScript.

STRICT OUTPUT RULES:
- Output ONLY a single JSON object.
- Keys = file paths (e.g. "app/page.tsx")
- Values = exact file contents.
- NO explanations, NO markdown, NO commentary.
- JSON must be valid and complete.

PROJECT REQUIREMENTS:
1. Next.js 14 + TypeScript
2. Tailwind CSS
3. shadcn UI components
4. lucide-react icons
5. Fully compatible package.json, tsconfig.json, next.config.js, Tailwind/PostCSS configs
6. A working home page
7. Use UNIX newlines (\\n)
`.trim();

  const USER_REQ = `USER REQUEST:\n${userPrompt}`;

  try {
    const model = gemini.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${SYSTEM_PROMPT}\n${USER_REQ}` }] }],
    });

    const text = result.response.text();
    const files = parseJSON(text);
    if (files) return { provider: "gemini", files };
  } catch (err) {
    console.error("Gemini failed:", err);
  }

  try {
    const result = await deepseek.chat.completions.create({
      model: "deepseek-chat",
      temperature: 0,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: USER_REQ },
      ],
    });

    const text = result.choices?.[0]?.message?.content;
    const files = text ? parseJSON(text) : null;
    if (files) return { provider: "deepseek", files };
  } catch (err) {
    console.error("DeepSeek failed:", err);
  }

  try {
    const result = await groq.chat.completions.create({
      model: "llama3-13b",
      messages: [{ role: "user", content: `${SYSTEM_PROMPT}\n${USER_REQ}` }],
      temperature: 0,
    });

    const text = result.choices?.[0]?.message?.content;
    const files = text ? parseJSON(text) : null;
    if (files) return { provider: "groq", files };
  } catch (err) {
    console.error("Groq failed:", err);
  }

  // Fallback if all providers failed
  console.warn("All AI providers failed. Returning fallback template.");
  return { provider: "fallback", files: FALLBACK_TEMPLATE };
}
