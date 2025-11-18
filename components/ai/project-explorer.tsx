"use client"

import { useState } from "react"
import { FolderOpen } from "lucide-react"

interface ProjectExplorerProps {
  onSelectProject?: (projectId: string) => void
}

export function ProjectExplorer({ onSelectProject }: ProjectExplorerProps) {
  const [projects] = useState([
    {
      id: "1",
      name: "AI Project Builder",
      files: 8,
      lastModified: "Just now",
    },
    {
      id: "2",
      name: "E-Commerce App",
      files: 24,
      lastModified: "2 hours ago",
    },
    {
      id: "3",
      name: "Chat Application",
      files: 16,
      lastModified: "Yesterday",
    },
  ])

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-2 py-2">
        <FolderOpen size={16} className="text-yellow-500" />
        <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Recent Projects</h3>
      </div>

      <div className="space-y-1">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelectProject?.(project.id)}
            className="w-full text-left px-3 py-2 text-sm rounded hover:bg-[#3e3e42] transition-colors group"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-300 group-hover:text-white">{project.name}</span>
              <span className="text-xs text-gray-600">{project.files} files</span>
            </div>
            <p className="text-xs text-gray-600 mt-0.5">{project.lastModified}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
