import { createRequire } from "module";
import { app, BrowserWindow } from "electron";
import path from "path";
import url from "url";

const require = createRequire(import.meta.url);

// Replace __dirname with a similar concept in ES Modules
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
    frame: false, // Remove the top bar
    transparent: true, // Make the window transparent
    frame: false, // Remove the window frame
    resizable: true, // Prevent resizing
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration
      enableRemoteModule: true, // Enable remote module
    },
  });  
  mainWindow.loadFile(path.join(__dirname, "public", "index.html"));
  // mainWindow.webContents.openDevTools(); // Commented out to prevent the inspector from opening each time the program launches
});
