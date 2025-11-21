"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Folder, FileText, Plus } from "lucide-react"
import {Reactjs ,FolderApp, TypeScript, Node, Tailwind, Next, Js, Markdown, YummaCSS} from "@react-symbols/icons";

interface FileExplorerProps {
  structure: any
  onSelectFile: (path: string) => void
  selectedFile: string | null
  basePath?: string
  onCreateFile?: (path: string) => void
}

export function FileExplorer({
  structure,
  onSelectFile,
  selectedFile,
  basePath = "",
  onCreateFile,
}: FileExplorerProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["app"]))
  const [showCreateInput, setShowCreateInput] = useState(false)
  const [newFileName, setNewFileName] = useState("")

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expanded)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpanded(newExpanded)
  }

  const handleCreateFile = () => {
    if (onCreateFile && newFileName.trim() !== "") {
      onCreateFile(`${basePath}/${newFileName}`)
      setNewFileName("")
      setShowCreateInput(false)
    }
  }

  const entries = Object.entries(structure).sort(([aName, aContent], [bName, bContent]) => {
    const aIsFolder = typeof aContent === "object" && aContent !== null
    const bIsFolder = typeof bContent === "object" && bContent !== null

    if (aIsFolder && !bIsFolder) return -1
    if (!aIsFolder && bIsFolder) return 1

    return aName.localeCompare(bName)
  })

  return (
    <div className="space-y-0.5">
      {entries.map(([name, content]) => {
        const path = basePath ? `${basePath}/${name}` : name
        const isFolder = typeof content === "object" && content !== null
        const isExpanded = expanded.has(path)
        const isSelected = selectedFile === path

        return (
          <div key={path}>
            {isFolder ? (
              <div>
                <button
                  onClick={() => toggleFolder(path)}
                  className="w-full flex items-center gap-1 px-2 py-1.5 text-sm text-gray-300 hover:bg-[#3e3e42] rounded transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown size={16} className="flex-shrink-0 text-yellow-500" />
                  ) : (
                    <ChevronRight size={16} className="flex-shrink-0 text-gray-500" />
                  )}
                  <Folder size={20} fill="#FDBA12" className="flex-shrink-0 text-black/40" />
                  <span className="truncate">{name}</span>
                </button>

                {isExpanded && (
                  <div className="pl-6">
                    <FileExplorer
                      structure={content}
                      onSelectFile={onSelectFile}
                      selectedFile={selectedFile}
                      basePath={path}
                      onCreateFile={onCreateFile}
                    />
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onSelectFile(path)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors ${
                  isSelected ? "bg-[#0e639c] text-white" : "text-gray-300 hover:bg-[#3e3e42]"
                }`}
              >
                {(() => {
                  const ext = name.split(".").pop()?.toLowerCase();
                  switch (ext) {
                    case "tsx":
                      return <Reactjs width={20} height={20} className="flex-shrink-0" />;
                    case "ts":
                      return <TypeScript width={20} height={20} className="flex-shrink-0" />;
                    case "css":
                      return <Tailwind width={20} height={20} className="flex-shrink-0" />;
                    case "mjs":
                      return <Next width={20} height={20} className="flex-shrink-0" />;
                    case "js":
                      return <Js width={20} height={20} className="flex-shrink-0" />;
                    case "css":
                      return <YummaCSS width={20} height={20} className="flex-shrink-0" />;
                    case "md":
                      return <Markdown width={20} height={20} className="flex-shrink-0" />;
                    case "json":
                      return <Node width={20} height={20} className="flex-shrink-0" />;
                    default:
                      return <FileText width={20} className="flex-shrink-0 text-gray-500/80" />;
                  }
                })()}
                <span className="truncate">{name}</span>
              </button>
            )}
          </div>
        )
      })}
      {onCreateFile && (
        <div className="flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors">
          {showCreateInput ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                className="w-full px-2 py-1.5 text-sm rounded bg-[#2e2e34] text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0e639c]"
              />
              <button
                onClick={handleCreateFile}
                className="px-2 py-1.5 text-sm rounded bg-[#0e639c] text-white hover:bg-[#0c4b77] transition-colors"
              >
                Create
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowCreateInput(true)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors text-gray-300 hover:bg-[#3e3e42]"
            >
              <Plus size={16} className="flex-shrink-0" />
              <span>Create File</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
