"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreateProject: (name: string, template: string) => void
}

export function ProjectDialog({ isOpen, onClose, onCreateProject }: ProjectDialogProps) {
  const [projectName, setProjectName] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("nextjs")

  const templates = [
    { id: "nextjs", name: "Next.js", description: "Full-stack React framework" },
    { id: "react", name: "React", description: "React library with TypeScript" },
    { id: "api", name: "API Server", description: "Node.js API backend" },
    { id: "blank", name: "Blank", description: "Empty project" },
  ]

  const handleCreate = () => {
    if (projectName.trim()) {
      onCreateProject(projectName, selectedTemplate)
      setProjectName("")
      setSelectedTemplate("nextjs")
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#252526] border border-[#3e3e42] rounded-lg w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Create New Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="My AI Project"
            className="w-full px-3 py-2 bg-[#3e3e42] border border-[#3e3e42] text-white rounded focus:border-[#0e639c] outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Template</label>
          <div className="grid grid-cols-2 gap-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-3 rounded border-2 transition-colors text-left ${
                  selectedTemplate === template.id
                    ? "border-[#0e639c] bg-[#0e639c]/10"
                    : "border-[#3e3e42] hover:border-[#4a4a50]"
                }`}
              >
                <div className="font-medium text-sm text-white">{template.name}</div>
                <div className="text-xs text-gray-400 mt-1">{template.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={onClose} variant="outline" className="flex-1 bg-[#3e3e42] text-gray-300 hover:bg-[#4a4a50]">
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!projectName.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Project
          </Button>
        </div>
      </div>
    </div>
  )
}
