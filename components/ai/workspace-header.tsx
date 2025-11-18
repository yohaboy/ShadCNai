"use client"

import { Download, Plus, MoreVertical, Zap, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface WorkspaceHeaderProps {
  projectName?: string
  onNewProject?: () => void
  onExport?: () => void
  onToggleAI?: () => void
  aiEnabled?: boolean
}

export function WorkspaceHeader({
  projectName = "Untitled Project",
  onNewProject,
  onExport,
  onToggleAI,
  aiEnabled = true,
}: WorkspaceHeaderProps) {
  return (
    <header className="bg-[#252526] border-b border-[#3e3e42] px-10 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div>
          <a href="/" className="text-xl font-extrabold text-blue-500/80">{projectName}</a>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onToggleAI && (
          <Button
            onClick={onToggleAI}
            variant="outline"
            className={`flex items-center gap-2 ${
              aiEnabled ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-[#3e3e42] text-gray-300 hover:bg-[#4a4a50]"
            }`}
          >
            <Zap size={16} />
          </Button>
        )}

        {onNewProject && (
          <Button
            onClick={onNewProject}
            variant="outline"
            className="flex items-center gap-2 bg-[#3e3e42] text-gray-300 hover:bg-[#4a4a50]"
          >
            <Plus size={16} />
            New Project
          </Button>
        )}

        {onExport && (
          <Button
            onClick={onExport}
            variant="outline"
            className="flex items-center gap-2 bg-[#3e3e42] text-gray-300 hover:bg-[#4a4a50]"
          >
            <Download size={16} />
            Export
          </Button>
        )}

        <button className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10} className="w-48 rounded-xl shadow-lg">
              <DropdownMenuLabel className="font-semibold text-sm">My Account</DropdownMenuLabel>
              
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 text-red-600 focus:text-red-700">
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </button>
      </div>
    </header>
  )
}
