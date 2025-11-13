import { type NextRequest, NextResponse } from "next/server"

// In-memory file system storage
const fileSystem: Record<string, any> = {
  app: {
    "page.tsx": "export default function Home() { return <div>Hello</div> }",
    "layout.tsx": "export default function Layout({ children }) { return <html><body>{children}</body></html> }",
  },
  components: {
    "button.tsx": "export function Button({ children }) { return <button>{children}</button> }",
  },
}

export async function GET() {
  return NextResponse.json({ fileSystem })
}

export async function POST(request: NextRequest) {
  const { action, path, content } = await request.json()

  if (!action || !path) {
    return NextResponse.json({ error: "Missing action or path" }, { status: 400 })
  }

  try {
    switch (action) {
      case "create":
        createFile(path, content || "")
        break

      case "update":
        updateFile(path, content || "")
        break

      case "delete":
        deleteFile(path)
        break

      case "read":
        const fileContent = readFile(path)
        return NextResponse.json({ content: fileContent })

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      fileSystem,
    })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

function createFile(path: string, content: string) {
  const parts = path.split("/").filter(Boolean)
  let current = fileSystem

  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) {
      current[parts[i]] = {}
    }
    current = current[parts[i]]
  }

  const filename = parts[parts.length - 1]
  current[filename] = content
}

function updateFile(path: string, content: string) {
  createFile(path, content)
}

function deleteFile(path: string) {
  const parts = path.split("/").filter(Boolean)
  let current = fileSystem

  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) return
    current = current[parts[i]]
  }

  const filename = parts[parts.length - 1]
  delete current[filename]
}

function readFile(path: string): string {
  const parts = path.split("/").filter(Boolean)
  let current = fileSystem

  for (const part of parts) {
    if (typeof current[part] === "string") {
      return current[part]
    }
    current = current[part]
  }

  return ""
}
