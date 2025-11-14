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
  })


  const nestFiles = (flatFiles: FileNode)=> {
    const nested: FileNode = {}
    for (const path in flatFiles) {
      const parts = path.split("/")
      let current = nested

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i]

        if (i === parts.length - 1) {
          current[part] = flatFiles[path]
        } else {
          if (!current[part]) current[part] = {}
          current = current[part] as FileNode
        }
      }
    }

    return nested
  }

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

  const handleGenerateFile = (flatFiles: FileNode) => {
    const nested = nestFiles(flatFiles)
    setFileStructure(nested)
    const firstFile = Object.keys(flatFiles)[0]
    setSelectedFile(firstFile || null)
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
          <FileExplorer structure={fileStructure} onSelectFile={handleOpenFile} selectedFile={selectedFile}/>
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
