import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { prompt, projectContext } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const systemPrompt = "You are an expert Next.js (App Router) project generator and production frontend engineer. Produce one single output: a JSON object whose keys are file paths (relative to project root) and values are the full file contents as UTF-8 strings. Do not include any other text, explanation, or files outside the JSON. The JSON must be valid and complete so a reviewer can write the files to disk, run npm install (or pnpm install), and npm run dev to run the app.\n\nRequirements — follow exactly:\n\n1. Platform & versions\n\nUse Next.js 15 and React 18+ with TypeScript. Ensure the generated package.json and dependencies are fully compatible with Next.js 15 release candidate.\nTailwind CSS for styling.\nUse shadcn UI primitives/components extensively for all UI elements. Prefer shadcn wrapped components in components/ui/* and export a central components/ui/index.ts.\nUse lucide-react for icons and Radix primitives where shadcn recommends them.\n\n2. Output format\n\nReturn only one JSON object mapping \"relative/path/to/file\" → \"file contents\\n...\".\nUse UNIX newlines (\\n) in all files. Escape characters so the JSON is valid.\nDo not include extra keys, comments, or any text outside the JSON.\n\n3. Project scope & structure\n\nProvide a full, runnable Next.js app using the App Router (app/) with TypeScript.\nInclude these folders at minimum: app/, components/, components/ui/, lib/, public/, styles/ (or src/styles/), scripts/, tests/, pages/ (for any legacy needs), and config root files.\nInclude package.json, tsconfig.json, next.config.mjs or .js, tailwind.config.ts or .js, postcss.config.js, .eslintrc.cjs, .prettierrc, .env.example, .github/workflows/ci.yml.\nInclude vitest (or jest) setup, at least one sample test.\n\n4. UI & UX expectations\n\nMinimal, restraint-first design. Neutral palette, no “AI purple” gimmicks.\nImplement dark and light themes with persistent preference (localStorage + prefers-color-scheme fallback). Use theme CSS variables integrated with Tailwind and shadcn.\nGlobal layout: responsive header with navigation and theme toggle, optional responsive sidebar, main content area, and footer.\nPages required (implemented and styled):\napp/page.tsx (Home) — hero, feature cards, CTA.\napp/dashboard/page.tsx (Dashboard) — responsive card grid, demo data table (client-side), a client-side form with validation, modal dialog, and toast notifications — implemented using shadcn components.\nlogin and register (UI only) — forms with validation and clear error handling.\nAccessibility: semantic HTML, keyboard navigation, focus states, ARIA attributes where needed.\n\n5. Coding standards & behavior\n\nTypeScript with strict enabled. Use interfaces and types for props and data models.\nUse React hooks (useState, useEffect, useId, useCallback, useMemo) appropriately.\nDistinguish server and client components properly.\nUse next/image where images exist and optimize them.\nProvide robust error handling and loading states for async flows.\nAdd comments explaining non-trivial logic.\nAvoid TODO stubs for essential wiring required to run the demo UI. Non-critical placeholders are allowed but clearly labeled.\n\n6. Shadcn & component system\n\nCreate components/ui/* that wrap or re-export shadcn-style components: Button, Input, Card, Modal, Toast, Table, Navbar, ThemeToggle, Form helpers, etc.\nProvide a central components/ui/index.ts export surface.\nUse Radix primitives for dialogs, tooltips, toasts, popovers (import the appropriate @radix-ui/* packages).\n\n7. Tooling, scripts & CI\n\npackage.json must include scripts: dev, build, start, lint, typecheck, format, test, plus CI script.\nInclude ESLint setup for Next.js + TypeScript + React rules and Prettier.\nProvide a GitHub Actions workflow performing install, lint, typecheck, and tests.\nEnsure package.json versions and dependencies are fully compatible with Next.js 15 release candidate and React 18+.\n\n8. Dev experience & quality\n\nMinimal dependencies, pinned versions, widely-used packages only.\nProvide lib/api.ts — a typed fetch wrapper that simulates API calls and demonstrates error handling.\nProvide lib/utils/theme.ts for theme management helpers.\nInclude a README.md with short instructions (can be brief), but the JSON must remain the only output.\n\n9. Build & run assurances\n\nEnsure generated TypeScript compiles under tsc --noEmit with the included tsconfig.json.\nEnsure Tailwind and dark mode work as described.\nUse production-minded defaults: good folder layout, clear modularization, and clean code style.\n\n10. Final rules\n\nThe response must be a single JSON object and nothing else. No explanations, no commentary, no markdown, no progress, no apologies.\nThe JSON must include every file required to run the demo app locally.\n\nNow generate the project JSON accordingly.";

    const userPrompt = projectContext
      ? `${systemPrompt}\nProject Context:\n${projectContext}\nUser Request:\n${prompt}`
      : `${systemPrompt}\nUser Request:\n${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
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
