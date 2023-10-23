import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  save: (connector: object) => ipcRenderer.invoke("save", connector),
  load: () => ipcRenderer.invoke("load"),
  translate: () => ipcRenderer.invoke("translate"),
});
