import { app, contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("init", {
  time: () => app.getLocale(),
  // nous pouvons aussi exposer des variables en plus des fonctions
});
