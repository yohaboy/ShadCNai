"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { CodeViewer } from "@/components/code-viewer"
import { EditorTabs } from "@/components/editor-tabs"
import { FileExplorer } from "@/components/file-explorer"
import { AIPanel } from "@/components/ai-panel"
import { WorkspaceHeader } from "@/components/workspace-header"
import { StatusBar } from "@/components/status-bar"

interface FileNode {
  [key: string]: string | FileNode
}

export default function ClientPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>("app/page.tsx")
  const [openTabs, setOpenTabs] = useState<Array<{ id: string; name: string }>>([
    { id: "app/page.tsx", name: "page.tsx" },
  ])
  const [unsavedTabs, setUnsavedTabs] = useState<Set<string>>(new Set())
  const [showAIPanel, setShowAIPanel] = useState(true)
  const [generatedFiles, setGeneratedFiles] = useState<Set<string>>(new Set())

  const [fileStructure, setFileStructure] = useState<FileNode>({
    app: {
      "page.tsx": `'use client'\n\nexport default function Home() {\n  return (\n    <div className="flex items-center justify-center min-h-screen">\n      <h1>Welcome to AI Project Builder</h1>\n    </div>\n  )\n}`,
      "layout.tsx": `import type { Metadata } from 'next'\nimport './globals.css'\n\nexport const metadata: Metadata = {\n  title: 'AI Project Builder',\n}\n\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode\n}) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  )\n}`,
      "globals.css": '@import "tailwindcss";\n\nbody {\n  @apply bg-background text-foreground;\n}',
      api: {
        "route.ts": `export async function GET() {\n  return Response.json({ message: 'Hello from API' })\n}`,
      },
    },
    components: {
      "button.tsx": `export function Button({ children, ...props }) {\n  return (\n    <button\n      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"\n      {...props}\n    >\n      {children}\n    </button>\n  )\n}`,
      "card.tsx": `export function Card({ children, title }) {\n  return (\n    <div className="border rounded-lg p-4 shadow">\n      {title && <h3 className="font-bold mb-2">{title}</h3>}\n      {children}\n    </div>\n  )\n}`,
    },
    lib: {
      "utils.ts": `export function cn(...classes: (string | undefined)[]) {\n  return classes.filter(Boolean).join(' ')\n}`,
    },
    "package.json": `{\n  "name": "ai-project",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^19.0.0",\n    "next": "^16.0.0"\n  }\n}`,
  })

  const getFileContent = (path: string): string => {
    const parts = path.split("/")
    let current: any = fileStructure

    for (const part of parts) {
      current = current?.[part]
    }

    return typeof current === "string" ? current : ""
  }

  const handleContentChange = (content: string) => {
    if (!selectedFile) return

    const newUnsavedTabs = new Set(unsavedTabs)
    newUnsavedTabs.add(selectedFile)
    setUnsavedTabs(newUnsavedTabs)

    const parts = selectedFile.split("/")
    const newStructure = JSON.parse(JSON.stringify(fileStructure))
    let newCurrent = newStructure

    for (let i = 0; i < parts.length - 1; i++) {
      if (!newCurrent[parts[i]]) {
        newCurrent[parts[i]] = {}
      }
      newCurrent = newCurrent[parts[i]]
    }

    newCurrent[parts[parts.length - 1]] = content
    setFileStructure(newStructure)
  }

  const handleOpenFile = (path: string) => {
    setSelectedFile(path)

    const tabExists = openTabs.some((tab) => tab.id === path)
    if (!tabExists) {
      const fileName = path.split("/").pop() || path
      setOpenTabs([...openTabs, { id: path, name: fileName }])
    }
  }

  const handleCloseTab = (id: string) => {
    setOpenTabs(openTabs.filter((tab) => tab.id !== id))
    if (selectedFile === id) {
      setSelectedFile(openTabs[0]?.id || null)
    }
  }

  const handleSelectTab = (id: string) => {
    setSelectedFile(id)
  }

  const handleGenerateFile = (filename: string, code: string) => {
    const parts = filename.split("/")
    const newStructure = JSON.parse(JSON.stringify(fileStructure))
    let current = newStructure

    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {}
      }
      current = current[parts[i]]
    }

    current[parts[parts.length - 1]] = code
    setFileStructure(newStructure)

    const newGenerated = new Set(generatedFiles)
    newGenerated.add(filename)
    setGeneratedFiles(newGenerated)

    handleOpenFile(filename)
    setSelectedFile(filename)
  }

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-white">
      <WorkspaceHeader
        projectName="Project1"
        onToggleAI={() => setShowAIPanel(!showAIPanel)}
        aiEnabled={showAIPanel}
        onExport={() => alert("Export feature coming soon!")}
        onNewProject={()=>alert("New Project feature coming soon!")}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar>
          <FileExplorer structure={fileStructure} onSelectFile={handleOpenFile} selectedFile={selectedFile} onCreateFile={()=>handleGenerateFile} />
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <EditorTabs
            tabs={openTabs}
            activeTab={selectedFile || ""}
            onSelectTab={handleSelectTab}
            onCloseTab={handleCloseTab}
            unsavedTabs={unsavedTabs}
          />

          <div className="flex-1 flex overflow-hidden">
            <CodeViewer
              content={getFileContent(selectedFile || "")}
              onContentChange={handleContentChange}
              editable={true}
            />

            {showAIPanel && (
              <AIPanel
                onGenerateFile={handleGenerateFile}
                projectContext={`Current project structure: ${JSON.stringify(Object.keys(fileStructure))}`}
              />
            )}
          </div>
        </div>
      </div>

      <StatusBar unsavedCount={unsavedTabs.size} generatedCount={generatedFiles.size} />
    </div>
  )
}
