"use client"

import type React from "react"

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="w-64 bg-[#252526] border-r border-[#3e3e42] overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Project Explorer</h2>
        {children}
      </div>
    </aside>
  )
}
