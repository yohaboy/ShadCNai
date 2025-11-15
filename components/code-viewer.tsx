"use client"

import { useState, useEffect } from "react"
import { createHighlighter } from "shiki"

interface CodeViewerProps {
  content: string
  language?: string
  onContentChange?: (content: string) => void
  editable?: boolean
}

export function CodeViewer({
  content,
  language = "typescript",
  onContentChange,
  editable = false,
}: CodeViewerProps) {
  const [displayContent, setDisplayContent] = useState(content)
  const [isEditing, setIsEditing] = useState(false)
  const [highlightedHTML, setHighlightedHTML] = useState("")

  useEffect(() => {
    setDisplayContent(content)
  }, [content])

  const handleChange = (newContent: string) => {
    setDisplayContent(newContent)
    onContentChange?.(newContent)
  }

  useEffect(() => {
    async function highlight() {
      const highlighter = await createHighlighter({
        themes: ["one-dark-pro"],
        langs: [language],
      })

      const lines = displayContent.split("\n")
      const html = lines
        .map((line, idx) => {
          let highlightedLine = highlighter.codeToHtml(line || " ", {
            lang: language,
            theme: "one-dark-pro",
          })

          highlightedLine = highlightedLine
            .replace(/background:[^;"]+;?/g, "")
            .replace(/<pre[^>]*>/, '<pre class="bg-transparent">')

          return `<div class="flex">
                    <span class="text-gray-500 select-none w-10 text-right pr-2">${idx + 1}</span>
                    <div class="flex-1">${highlightedLine}</div>
                  </div>`
        })
        .join("")

      setHighlightedHTML(html)
    }

    if (!isEditing) highlight()
  }, [displayContent, language, isEditing])

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Header */}
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
        <div
          className="flex-1 bg-[#1e1e1e] text-gray-300 p-6 font-mono text-sm leading-relaxed overflow-auto"
          dangerouslySetInnerHTML={{ __html: highlightedHTML }}
        />
      )}
    </div>
  )
}
