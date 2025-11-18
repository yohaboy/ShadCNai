"use client"

import { AlertCircle, CheckCircle } from "lucide-react"

interface StatusBarProps {
  unsavedCount?: number
  generatedCount?: number
}

export function StatusBar({ unsavedCount = 0, generatedCount = 0 }: StatusBarProps) {
  return (
    <footer className="bg-[#1e1e1e] border-t border-[#3e3e42] px-6 py-2 flex items-center justify-between text-xs text-gray-400">
      <div className="flex items-center gap-4">
        {unsavedCount > 0 && (
          <div className="flex items-center gap-2">
            <AlertCircle size={14} className="text-yellow-500" />
            <span>{unsavedCount} unsaved changes</span>
          </div>
        )}

        {generatedCount > 0 && (
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-green-500" />
            <span>{generatedCount} AI-generated files</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span>Ready</span>
      </div>
    </footer>
  )
}
