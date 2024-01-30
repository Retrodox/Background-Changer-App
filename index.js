import { createRequire } from "module";
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import url from "url";

// You don't need to import ipcMain again with require, it's already imported above
// const { ipcMain } = require('electron'); <-- Remove this line

const require = createRequire(import.meta.url);
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Import and configure electron-reload
const electronReload = require('electron-reload');
electronReload(path.join(__dirname, 'public'), {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 300, // Set the initial width
    height: 430, // Set the initial height
    frame: false, // Remove the window frame
    transparent: true, // Make the window transparent
    resizable: false, // Allow resizing
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    },
  });

  mainWindow.loadFile(path.join(__dirname, "public", "index.html"));
  
  // IPC listener for minimizing the app
  ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
  });

  // Restore window when clicked on taskbar icon
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow.show();
    }
  });
});
