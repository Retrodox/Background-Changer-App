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
    height: 420, // Set the initial height
    transparent: true, // Make the window transparent
    frame: false, // Remove the window frame
    resizable: false, // Allow resizing
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration
      contextIsolation: true,
      devTools: true,
      preload: path.join(__dirname, 'preload.cjs')
      // Removed enableRemoteModule as it's not recommended for security reasons
    },
  });  
  mainWindow.loadFile(path.join(__dirname, "public", "index.html"));
  // mainWindow.webContents.openDevTools(); // Commented out to prevent the inspector from opening each time the program launches

  // IPC listener for minimizing the app
  ipcMain.on('minimize-window', () => {
    mainWindow.minimize();  // This should minimize the window, not hide
  });

  // Restore window when clicked on taskbar icon
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow.show();  // Show the window again
    }
  });
});
