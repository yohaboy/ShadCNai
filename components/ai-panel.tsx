"use client"

import { useState } from "react"
import { Zap, Send, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAIGeneration } from "@/hooks/use-ai-generation"

interface AIPanelProps {
  onGenerateFile: (filename: string, code: string) => void
  projectContext?: string
  isOpen?: boolean
}

export function AIPanel({ onGenerateFile, projectContext, isOpen = true }: AIPanelProps) {
  const [prompt, setPrompt] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [filename, setFilename] = useState("")
  const { generateCode, loading, error } = useAIGeneration()

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    try {
      const code = await generateCode(prompt, projectContext)
      setGeneratedCode(code)
      setPrompt("")
    } catch (err) {
      console.error("Generation failed:", err)
    }
  }

  const handleSaveGenerated = () => {
    if (!generatedCode || !filename) {
      alert("Please enter a filename")
      return
    }

    onGenerateFile(filename, generatedCode)
    setGeneratedCode("")
    setFilename("")
  }

  return (
    <div className="w-96 bg-[#252526] border-l border-[#3e3e42] flex flex-col">
      <div className="border-b border-[#3e3e42] px-4 py-3 flex items-center gap-2 bg-[#1e1e1e]">
        <Zap size={16} className="text-yellow-500" />
        <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col p-4 space-y-4">
        {/* Input section */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Generate Code</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Create a React button component with hover effects..."
            className="w-full h-24 bg-[#3e3e42] border-[#3e3e42] text-white text-sm resize-none focus:border-[#0e639c]"
            disabled={loading}
          />
        </div>

        {/* Error display */}
        {error && (
          <div className="flex gap-2 p-3 bg-red-900/20 border border-red-700 rounded text-red-300 text-xs">
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Generated code preview */}
        {generatedCode && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Generated Code</label>
            <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded p-3 max-h-40 overflow-auto">
              <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap break-words">
                {generatedCode.substring(0, 500)}
                {generatedCode.length > 500 && "..."}
              </pre>
            </div>

            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="e.g., components/my-button.tsx"
              className="w-full px-3 py-2 bg-[#3e3e42] border border-[#3e3e42] text-white text-sm rounded focus:border-[#0e639c] outline-none"
            />

            <Button onClick={handleSaveGenerated} className="w-full bg-green-600 hover:bg-green-700 text-sm">
              Save File
            </Button>
          </div>
        )}
      </div>

      {/* Action button */}
      <div className="border-t border-[#3e3e42] p-4 space-y-2">
        <Button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Send size={16} />
              Generate
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
