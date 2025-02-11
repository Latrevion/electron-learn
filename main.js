const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

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
async function handleWriteFile(event, content) {
  console.log("the content", content);
  await fs.promises.writeFile("test.txt", content);
  const stats = await fs.promises.stat("test.txt");
  return stats.size;
}

app.on("ready", () => {
  ipcMain.on("set-title", handleSetTitle);
  ipcMain.handle("write-file", handleWriteFile);
  let count = 1;
  const win = createWindow();
  win.webContents.send("update-count", count);
  setInterval(() => {
    count += 3;
    win.webContents.send("update-count", count);
  }, 3000);
});
