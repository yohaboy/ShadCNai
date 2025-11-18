"use client"

import { Wand2, BookOpen, Settings } from "lucide-react"

interface QuickActionsProps {
  onGenerateFromPrompt?: () => void
  onViewDocs?: () => void
  onOpenSettings?: () => void
}

export function QuickActions({ onGenerateFromPrompt, onViewDocs, onOpenSettings }: QuickActionsProps) {
  const actions = [
    {
      icon: Wand2,
      label: "Generate from Prompt",
      description: "Create full project from AI prompt",
      onClick: onGenerateFromPrompt,
    },
    {
      icon: BookOpen,
      label: "Documentation",
      description: "View project builder guide",
      onClick: onViewDocs,
    },
    {
      icon: Settings,
      label: "Settings",
      description: "Configure project settings",
      onClick: onOpenSettings,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-2 mt-6 pt-6 border-t border-[#3e3e42]">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <button
            key={action.label}
            onClick={action.onClick}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[#3e3e42] transition-colors text-left"
          >
            <Icon size={16} className="text-gray-400 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-gray-300">{action.label}</div>
              <div className="text-xs text-gray-600">{action.description}</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
