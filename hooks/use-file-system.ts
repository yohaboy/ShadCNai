"use client"

import { useCallback, useState } from "react"

export interface FileSystemNode {
  [key: string]: string | FileSystemNode
}

export function useFileSystem() {
  const [fileSystem, setFileSystem] = useState<FileSystemNode | null>(null)

  const fetchFileSystem = useCallback(async () => {
    try {
      const response = await fetch("/api/files")
      const data = await response.json()
      setFileSystem(data.fileSystem)
      return data.fileSystem
    } catch (error) {
      console.error("Failed to fetch file system:", error)
      return null
    }
  }, [])

  const createFile = useCallback(async (path: string, content: string) => {
    try {
      const response = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", path, content }),
      })
      const data = await response.json()
      setFileSystem(data.fileSystem)
      return data
    } catch (error) {
      console.error("Failed to create file:", error)
    }
  }, [])

  const updateFile = useCallback(async (path: string, content: string) => {
    try {
      const response = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", path, content }),
      })
      const data = await response.json()
      setFileSystem(data.fileSystem)
      return data
    } catch (error) {
      console.error("Failed to update file:", error)
    }
  }, [])

  const deleteFile = useCallback(async (path: string) => {
    try {
      const response = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", path }),
      })
      const data = await response.json()
      setFileSystem(data.fileSystem)
      return data
    } catch (error) {
      console.error("Failed to delete file:", error)
    }
  }, [])

  const readFile = useCallback(async (path: string) => {
    try {
      const response = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "read", path }),
      })
      const data = await response.json()
      return data.content
    } catch (error) {
      console.error("Failed to read file:", error)
    }
  }, [])

  return {
    fileSystem,
    fetchFileSystem,
    createFile,
    updateFile,
    deleteFile,
    readFile,
  }
}
