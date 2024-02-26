import { createRequire } from "module";
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";
import url from "url";
import fs from "fs";

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
    height: 470, // Set the initial height
    frame: false, // Remove the window frame
    transparent: true, // Make the window transparent
    resizable: true, // Allow resizing
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

  // Function to select folder and check if it's empty
  function selectFolderAndCheckEmpty() {
    dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    }).then(result => {
      if (!result.canceled && result.filePaths.length > 0) {
        const folderPath = result.filePaths[0];
        fs.readdir(folderPath, (err, files) => {
          if (err) {
            console.error('Error reading directory', err);
            return;
          }
          // Check if the folder contains only image files
          let hasImageFiles = false;
          let hasNonImageFiles = false;
          for (let file of files) {
            const extension = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff', '.svg'].includes(extension)) {
              hasImageFiles = true;
            } else {
              hasNonImageFiles = true;
            }
            if (hasImageFiles && hasNonImageFiles) break; // Both types of files found, no need to continue checking
          }
          // Send the response back to the renderer process
          if (!hasImageFiles && !hasNonImageFiles) {
            mainWindow.webContents.send('select-folder-response', folderPath, true); // Folder is empty
          } else if (hasImageFiles && !hasNonImageFiles) {
            mainWindow.webContents.send('select-folder-response', folderPath, false); // Valid folder with only image files
          } else {
            mainWindow.webContents.send('select-folder-response', folderPath, false, true); // Folder contains non-image files or is mixed
          }
        });
      }
    }).catch(err => {
      console.error('Error selecting folder', err);
    });
  }
  

  // IPC listener for folder selection
  ipcMain.on('select-folder', selectFolderAndCheckEmpty);
});