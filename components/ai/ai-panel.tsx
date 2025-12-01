"use client"

import { useEffect, useState } from "react"
import { Zap, Send, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAIGeneration } from "@/hooks/use-ai-generation"
import { deductTokens } from "@/lib/actions/user"
import { auth } from "@/lib/auth"

type Session = typeof auth.$Infer.Session;

interface AIPanelProps {
  onGenerateFile: (file:FileNode) => void
  projectContext?: string
  isOpen?: boolean,
  session: Session | null
}

interface FileNode {
  [key: string]: string | FileNode
}

export function AIPanel({ onGenerateFile, projectContext, isOpen = true , session}: AIPanelProps) {
  const [prompt, setPrompt] = useState("")
  const [generatedFiles, setGeneratedFiles] = useState<FileNode>({})
  const { generateCode, loading, error } = useAIGeneration()

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    if(session?.user.tokens! <= 0){
      alert("You have no tokens left. Please purchase more tokens to continue using the AI assistant.")
      return;
    }

    try {
      const files = await generateCode(prompt)
      if(files){
        deductTokens(session?.user.id || "")
      }
      setGeneratedFiles(files)
      onGenerateFile(files);
      setPrompt("")
    } catch (err) {
      console.error("Generation failed:", err)
    }
  }

  const handleSaveAll = () => {

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
        {Object.keys(generatedFiles).length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Generated Files</label>
            <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded p-3 max-h-60 overflow-auto text-xs text-gray-300 font-mono">
            {Object.entries(generatedFiles).map(([path, code]) => {
              const content = typeof code === "string" ? code : JSON.stringify(code, null, 2);
              return (
                <div key={path} className="mb-2">
                  <div className="font-bold">{path}</div>
                  <pre className="whitespace-pre-wrap break-words">
                    {content.substring(0, 200)}
                    {content.length > 200 && "..."}
                  </pre>
                </div>
              );
            })}
            </div>

            <Button
              onClick={handleSaveAll}
              className="w-full bg-green-600 hover:bg-green-700 text-sm"
            >
              Succesfull
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
