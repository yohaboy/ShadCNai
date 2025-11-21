import JSZip from "jszip";

interface FileNode {
  [key: string]: string | FileNode;
}

export async function zipToFileNode(file: Blob | ArrayBuffer | Uint8Array | Buffer): Promise<FileNode> {
  const zip = await JSZip.loadAsync(file);
  const root: FileNode = {};

  function setNested(obj: FileNode, pathParts: string[], content: string | FileNode) {
    const key = pathParts[0];

    if (pathParts.length === 1) {
      obj[key] = content as string;
      return;
    }
    if (!obj[key]) {
      obj[key] = {};
    }

    setNested(obj[key] as FileNode, pathParts.slice(1), content);
  }

  const files = Object.keys(zip.files);
  for (const fileName of files) {
    const entry = zip.files[fileName];
    if (entry.dir) continue; 
    const content = await entry.async("string");
    const parts = fileName.split("/").filter(Boolean);

    setNested(root, parts, content);
  }

  return root;
}
