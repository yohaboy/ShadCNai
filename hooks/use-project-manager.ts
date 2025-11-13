"use client"

import { useState, useCallback } from "react"

interface Project {
  id: string
  name: string
  template: string
  files: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export function useProjectManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)

  const createProject = useCallback(
    (name: string, template: string, files: Record<string, any> = {}) => {
      const newProject: Project = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        template,
        files,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      setProjects([...projects, newProject])
      setCurrentProject(newProject)

      // Save to localStorage
      try {
        const saved = localStorage.getItem("projects") || "[]"
        const existing = JSON.parse(saved)
        localStorage.setItem("projects", JSON.stringify([...existing, newProject]))
      } catch (error) {
        console.error("Failed to save project:", error)
      }

      return newProject
    },
    [projects],
  )

  const updateProject = useCallback(
    (projectId: string, files: Record<string, any>) => {
      setProjects(projects.map((p) => (p.id === projectId ? { ...p, files, updatedAt: new Date() } : p)))

      if (currentProject?.id === projectId) {
        setCurrentProject({
          ...currentProject,
          files,
          updatedAt: new Date(),
        })
      }
    },
    [projects, currentProject],
  )

  const loadProject = useCallback(
    (projectId: string) => {
      const project = projects.find((p) => p.id === projectId)
      if (project) {
        setCurrentProject(project)
      }
    },
    [projects],
  )

  const deleteProject = useCallback(
    (projectId: string) => {
      setProjects(projects.filter((p) => p.id !== projectId))
      if (currentProject?.id === projectId) {
        setCurrentProject(null)
      }
    },
    [projects, currentProject],
  )

  const exportProject = useCallback(
    (projectId: string) => {
      const project = projects.find((p) => p.id === projectId)
      if (!project) return null

      const json = JSON.stringify(project, null, 2)
      const blob = new Blob([json], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${project.name}.json`
      a.click()
      URL.revokeObjectURL(url)
    },
    [projects],
  )

  const importProject = useCallback((file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const project = JSON.parse(e.target?.result as string) as Project
          project.id = Math.random().toString(36).substr(2, 9)
          project.createdAt = new Date()
          project.updatedAt = new Date()

          setProjects((prev) => [...prev, project])
          setCurrentProject(project)
          resolve(project)
        } catch (error) {
          reject(error)
        }
      }
      reader.readAsText(file)
    })
  }, [])

  return {
    projects,
    currentProject,
    createProject,
    updateProject,
    loadProject,
    deleteProject,
    exportProject,
    importProject,
  }
}
