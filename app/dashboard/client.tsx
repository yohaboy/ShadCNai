"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/ai/sidebar"
import { CodeViewer } from "@/components/ai/code-viewer"
import { EditorTabs } from "@/components/ai/editor-tabs"
import { FileExplorer } from "@/components/ai/file-explorer"
import { AIPanel } from "@/components/ai/ai-panel"
import { WorkspaceHeader } from "@/components/ai/workspace-header"
import { StatusBar } from "@/components/ai/status-bar"
import { exportAsZip, fileNodeToZipBuffer } from "@/hooks/export-zip"
import { auth } from "@/lib/auth"
import { createProject, getUserProjects } from "@/lib/actions/project"

interface FileNode {
  [key: string]: string | FileNode
}
type Session = typeof auth.$Infer.Session;

export default function DashboardPage({ session }:{session:Session | null}) {
  const [selectedFile, setSelectedFile] = useState<string | null>("app/page.tsx")
  const [openTabs, setOpenTabs] = useState<Array<{ id: string; name: string }>>([
    { id: "app/page.tsx", name: "page.tsx" },
  ])
  const [unsavedTabs, setUnsavedTabs] = useState<Set<string>>(new Set())
  const [showAIPanel, setShowAIPanel] = useState(true)
  const [generatedFiles, setGeneratedFiles] = useState<Set<string>>(new Set())

  const [fileStructure, setFileStructure] = useState<FileNode>({
  })

  const flatten = (node: FileNode, prefix = ""): Record<string, string> => {
    const out: Record<string, string> = {}
    for (const key in node) {
      const value = node[key]
      const full = prefix ? `${prefix}/${key}` : key
      if (typeof value === "string") {
        out[full] = value
      } else {
        Object.assign(out, flatten(value, full))
      }
    }
    return out
  }


  useEffect(() => {
    const saved = localStorage.getItem("projectFiles")
    if (saved) {
      const structure = JSON.parse(saved)
      setFileStructure(structure)

      const flat = flatten(structure)
      const filePaths = Object.keys(flat)
      if (flat["app/page.tsx"]) {
        setSelectedFile("app/page.tsx")
      } else if (filePaths.length > 0) {
        setSelectedFile(filePaths[0])
      }
    }
  }, [])


  useEffect(() => {
    if (Object.keys(fileStructure).length > 0) {
      localStorage.setItem("projectFiles", JSON.stringify(fileStructure))
    }
  }, [fileStructure])


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
    localStorage.setItem("projectFiles", JSON.stringify(newStructure))
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

  const handleGenerateFile = async (flatFiles: FileNode) => {
    if (!session?.user.id) {
      console.error("No user logged in.");
      return;
    }
    const nested = nestFiles(flatFiles)
    setFileStructure(nested)
    const firstFile = Object.keys(flatFiles)[0]
    setSelectedFile(firstFile || null)

    const userProjects = await getUserProjects(session?.user.id);
    const generatedName = `Project #${userProjects.length + 1}`;

    const zipBuffer = await fileNodeToZipBuffer(flatFiles);
     await createProject(session?.user.id , generatedName, zipBuffer, "...");
  }


  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-white">
      <WorkspaceHeader
        projectName="VibeCN"
        onToggleAI={() => setShowAIPanel(!showAIPanel)}
        aiEnabled={showAIPanel}
        onExport={() => exportAsZip(fileStructure)}
        onNewProject={()=>{localStorage.removeItem("projectFiles"); window.location.reload()}}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar>
          <FileExplorer structure={fileStructure} onSelectFile={handleOpenFile} selectedFile={selectedFile}/>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0">
          <EditorTabs
            tabs={openTabs}
            activeTab={selectedFile || ""}
            onSelectTab={handleSelectTab}
            onCloseTab={handleCloseTab}
            unsavedTabs={unsavedTabs}
          />

          <div className="flex-1 flex overflow-y-hidden overflow-x-auto">
            <CodeViewer
              content={getFileContent(selectedFile || "")}
              onContentChange={handleContentChange}
              editable={true}
            />

            {showAIPanel && (
              <AIPanel
                session={session}
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
