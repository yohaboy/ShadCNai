import JSZip from "jszip";

interface FileNode {
  [key: string]: string | FileNode;
}

export function exportAsZip(root: FileNode) {
  const zip = new JSZip();

  function addToZip(obj: FileNode, basePath: string = "") {
    for (const key in obj) {
      const value = obj[key];
      const fullPath = basePath ? `${basePath}/${key}` : key;

      if (typeof value === "string") {
        zip.file(fullPath, value);
      } else {
        const folder = zip.folder(fullPath);
        if (folder) addToZip(value, fullPath);
      }
    }
  }

  addToZip(root);

  zip.generateAsync({ type: "blob" }).then((content) => {
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project.zip";
    a.click();
    URL.revokeObjectURL(url);
    });

}
