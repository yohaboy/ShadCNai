export interface FileSystemNode {
  [key: string]: string | FileSystemNode
}

export function isFolder(node: any): node is FileSystemNode {
  return typeof node === "object" && node !== null && !Array.isArray(node)
}

export function getFilePath(structure: FileSystemNode, targetName: string, basePath = ""): string | null {
  for (const [name, content] of Object.entries(structure)) {
    const path = basePath ? `${basePath}/${name}` : name

    if (name === targetName) {
      return path
    }

    if (isFolder(content)) {
      const found = getFilePath(content, targetName, path)
      if (found) return found
    }
  }

  return null
}

export function createFile(structure: FileSystemNode, path: string, content: string): FileSystemNode {
  const parts = path.split("/")
  const newStructure = JSON.parse(JSON.stringify(structure))
  let current = newStructure

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    if (!current[part]) {
      current[part] = {}
    }
    current = current[part]
  }

  current[parts[parts.length - 1]] = content
  return newStructure
}

export function updateFile(structure: FileSystemNode, path: string, content: string): FileSystemNode {
  return createFile(structure, path, content)
}

export function deleteFile(structure: FileSystemNode, path: string): FileSystemNode {
  const parts = path.split("/")
  const newStructure = JSON.parse(JSON.stringify(structure))
  let current = newStructure

  for (let i = 0; i < parts.length - 1; i++) {
    current = current[parts[i]]
  }

  delete current[parts[parts.length - 1]]
  return newStructure
}
