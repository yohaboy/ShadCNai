"use client"

import { X } from "lucide-react"

interface Tab {
  id: string
  name: string
  icon?: string
}

interface EditorTabsProps {
  tabs: Tab[]
  activeTab: string
  onSelectTab: (id: string) => void
  onCloseTab: (id: string) => void
  unsavedTabs?: Set<string>
}

export function EditorTabs({ tabs, activeTab, onSelectTab, onCloseTab, unsavedTabs = new Set() }: EditorTabsProps) {
  return (
    <div className="flex items-center bg-[#1e1e1e] border-b border-[#3e3e42] overflow-x-auto">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => onSelectTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-3 text-sm cursor-pointer border-b-2 transition-colors ${
            activeTab === tab.id
              ? "border-[#0e639c] text-white"
              : "border-transparent text-gray-400 hover:text-gray-200"
          }`}
        >
          <span>{tab.name}</span>
          {unsavedTabs.has(tab.id) && <span className="w-2 h-2 bg-white rounded-full"></span>}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onCloseTab(tab.id)
            }}
            className="hover:bg-[#3e3e42] p-1 rounded"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
