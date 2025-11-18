"use client"

import { useState, useEffect } from "react"
import { Highlight ,Language } from "prism-react-renderer"
import { themes } from "prism-react-renderer"

interface CodeViewerProps {
  content: string
  language?: Language
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

  useEffect(() => {
    setDisplayContent(content)
  }, [content])

  const handleChange = (newContent: string) => {
    setDisplayContent(newContent)
    onContentChange?.(newContent)
  }

  const HighlightAny = Highlight as any

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
          spellCheck={false}
        />
      ) : (
          <div className="flex-1 bg-[#1e1e1e] text-gray-300 p-6 font-mono text-sm leading-relaxed">
            <HighlightAny code={displayContent} language={language} theme={themes.vsDark}>
              {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
                <div
                  className={`flex overflow-auto ${className}`}
                  style={{ ...style, background: "transparent", padding: 0, whiteSpace: "pre" }}
                >
                  {/* numbers column */}
                  <div className="flex flex-col select-none text-gray-500 pr-2">
                    {tokens.map((line: any[], i: number) => (
                      <div key={i} className="w-10 text-right">
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  {/* Code column */}
                  <div className="flex-1 min-w-0">
                    {tokens.map((line: any[], i: number) => (
                      <div key={i} {...getLineProps({ line, key: i })}>
                        {line.map((token: any, key: number) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </HighlightAny>
          </div>
      )}
    </div>
  )
}
