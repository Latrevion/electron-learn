const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 880,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("index.html");
  win.webContents.openDevTools();
  return win;
}
function createSecondWindow(parent) {
  const win = new BrowserWindow({
    width: 600,
    height: 300,
    parent,
  });
  win.loadFile("second.html");
}
function handleSetTitle(event, title) {
  console.log("the event from ipcRenderer", event);
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}

app.on("ready", () => {
  ipcMain.on("set-title", handleSetTitle);
  createWindow();
});
