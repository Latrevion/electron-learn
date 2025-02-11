const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: process.versions.node,
  chrome: process.versions.chrome,
});

contextBridge.exposeInMainWorld("electron", {
  setTitle: (title) => ipcRenderer.send("set-title", title),
  writeFile: (content) => ipcRenderer.invoke("write-file", content),
  onUpdateCount:(callback)=>ipcRenderer.on('update-count',(_event,value)=>callback(value))
});
