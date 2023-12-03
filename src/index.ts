import { app, BrowserWindow, ipcMain } from "electron";
import sqlite3 from "sqlite3";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const BasicSettings = [
  { type: "theme", value: "light" },
  { type: "timeType", value: "24" },
];

const db = new sqlite3.Database("./db.db");
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS Settings (id INTEGER PRIMARY KEY , type VARCHAR(50) UNIQUE NOT NULL,value VARCHAR(50));"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS Alarms (id INTEGER PRIMARY KEY , name VARCHAR(50),time TEXT);"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS Clocks (id INTEGER PRIMARY KEY , name VARCHAR(50),timezone TEXT);"
  );
  BasicSettings.forEach((setting) => {
    db.run("INSERT OR IGNORE INTO Settings (type, value) VALUES (?, ?)", [
      setting.type,
      setting.value,
    ]);
  });
});

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.openDevTools();
};

async function handleSingleSettingModification(
  e: Electron.IpcMainInvokeEvent,
  {
    type,
    value,
  }: {
    type: string;
    value: string;
  }
) {
  const result = await db.run("UPDATE Settings SET value = ? WHERE type = ?;", [
    value,
    type,
  ]);
  return result;
}

async function fetchSettings() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Settings", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          Object.fromEntries(
            rows.map((item: { value: string; type: string }) => [
              item.type,
              item.value,
            ])
          )
        );
      }
    });
  });
}

async function addAlarm(
  e: Electron.IpcMainInvokeEvent,
  {
    name,
    time,
  }: {
    time: string;
    name: string;
  }
) {
  const result = await db.run("INSERT INTO Alarms (name, time) VALUES (?, ?)", [
    name,
    time,
  ]);
  return result;
}

async function deleteAlarm(e: Electron.IpcMainInvokeEvent, id: string) {
  const result = await db.run("DELETE FROM Alarms WHERE id = ?", id);
  return result;
}

async function fetchAlarms() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Alarms", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function addClock(
  e: Electron.IpcMainInvokeEvent,
  {
    name,
    timezone,
  }: {
    timezone: string;
    name: string | null;
  }
) {
  const result = await db.run(
    "INSERT INTO Clocks (name, timezone) VALUES (?, ?)",
    [name, timezone]
  );
  return result;
}

async function deleteClock(e: Electron.IpcMainInvokeEvent, id: string) {
  const result = await db.run("DELETE FROM Clocks WHERE id = ?", id);
  return result;
}

async function fetchClocks() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Clocks", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

app.whenReady().then(() => {
  ipcMain.handle(
    "handleSingleSettingModification",
    handleSingleSettingModification
  );
  ipcMain.handle("fetchSettings", fetchSettings);
  ipcMain.handle("alarm:add", addAlarm);
  ipcMain.handle("alarm:fetch", fetchAlarms);
  ipcMain.handle("alarm:delete", deleteAlarm);
  ipcMain.handle("clock:add", addClock);
  ipcMain.handle("clock:fetch", fetchClocks);
  ipcMain.handle("clock:delete", deleteClock);

  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
