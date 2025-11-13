"use client"

import { useState, useEffect } from "react"

interface CodeViewerProps {
  content: string
  language?: string
  onContentChange?: (content: string) => void
  editable?: boolean
}

export function CodeViewer({ content, language = "typescript", onContentChange, editable = false }: CodeViewerProps) {
  const [displayContent, setDisplayContent] = useState(content)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setDisplayContent(content)
  }, [content])

  const handleChange = (newContent: string) => {
    setDisplayContent(newContent)
    onContentChange?.(newContent)
  }

  const lines = displayContent.split("\n")

  return (
    <div className="flex-1 overflow-auto flex flex-col">
      {/* Editor header */}
      <div className="flex items-center justify-between border-b border-[#3e3e42] px-6 py-2 bg-[#252526]">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 bg-[#3e3e42] px-2 py-1 rounded">{language}</span>
        </div>
        {editable && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs px-3 py-1 bg-[#0e639c] hover:bg-[#1177bb] text-white rounded transition-colors"
          >
            {isEditing ? "Done" : "Edit"}
          </button>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={displayContent}
          onChange={(e) => handleChange(e.target.value)}
          className="flex-1 p-6 font-mono text-sm text-gray-300 bg-[#1e1e1e] border-none outline-none resize-none"
          spellCheck="false"
        />
      ) : (
        <pre className="flex-1 bg-[#1e1e1e] text-gray-300 p-6 font-mono text-sm leading-relaxed overflow-auto">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex hover:bg-[#2d2d30] transition-colors">
                <span className="w-12 text-right pr-4 text-gray-600 select-none flex-shrink-0">{i + 1}</span>
                <span className="flex-1 break-all">{line || "\n"}</span>
              </div>
            ))}
          </code>
        </pre>
      )}
    </div>
  )
}
