"use client"

import { Download, Plus, MoreVertical, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WorkspaceHeaderProps {
  projectName?: string
  onNewProject?: () => void
  onExport?: () => void
  onToggleAI?: () => void
  aiEnabled?: boolean
}

export function WorkspaceHeader({
  projectName = "Untitled Project",
  onNewProject,
  onExport,
  onToggleAI,
  aiEnabled = true,
}: WorkspaceHeaderProps) {
  return (
    <header className="bg-[#252526] border-b border-[#3e3e42] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-semibold text-white">{projectName}</h1>
          <p className="text-xs text-gray-500">Next.js Project</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onToggleAI && (
          <Button
            onClick={onToggleAI}
            variant="outline"
            className={`flex items-center gap-2 ${
              aiEnabled ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-[#3e3e42] text-gray-300 hover:bg-[#4a4a50]"
            }`}
          >
            <Zap size={16} />
            AI Assistant
          </Button>
        )}

        {onNewProject && (
          <Button
            onClick={onNewProject}
            variant="outline"
            className="flex items-center gap-2 bg-[#3e3e42] text-gray-300 hover:bg-[#4a4a50]"
          >
            <Plus size={16} />
            New Project
          </Button>
        )}

        {onExport && (
          <Button
            onClick={onExport}
            variant="outline"
            className="flex items-center gap-2 bg-[#3e3e42] text-gray-300 hover:bg-[#4a4a50]"
          >
            <Download size={16} />
            Export
          </Button>
        )}

        <button className="p-2 text-gray-400 hover:bg-[#3e3e42] rounded transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>
    </header>
  )
}
