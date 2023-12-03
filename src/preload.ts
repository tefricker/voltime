import { app, contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  handleSingleSettingModification: ({
    type,
    value,
  }: {
    type: string;
    value: string;
  }) => ipcRenderer.invoke("handleSingleSettingModification", { type, value }),
  fetchSettings: () => ipcRenderer.invoke("fetchSettings"),
  addAlarm: ({ name, time }: { name: string | null; time: string }) =>
    ipcRenderer.invoke("alarm:add", { name, time }),
  fetchAlarms: () => ipcRenderer.invoke("alarm:fetch"),
  deleteAlarm: (id: string) => ipcRenderer.invoke("alarm:delete", id),
  addClock: ({ name, timezone }: { name: string | null; timezone: string }) =>
    ipcRenderer.invoke("clock:add", { name, timezone }),
  fetchClocks: () => ipcRenderer.invoke("clock:fetch"),
  deleteClock: (id: string) => ipcRenderer.invoke("clock:delete", id),
});
