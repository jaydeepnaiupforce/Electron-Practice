const { app, ipcMain } = require("electron");
const WindowManager = require("./Helper");

win = new WindowManager();

app.on("ready",win.createUI.bind(win))


ipcMain.on("create-tray",()=>{
  win.createTray(win)
})

ipcMain.on("remove-tray",()=>{
  win.tray.destroy()
})