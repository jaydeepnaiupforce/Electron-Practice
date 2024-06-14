const { app, ipcMain } = require("electron");
const WindowManager = require("./trayDrag/Helper");

win = new WindowManager();

app.on("ready",()=>{
  win.createUI(win)
})


ipcMain.on("create-tray",()=>{
  win.createTray(win)
})

ipcMain.on("remove-tray",()=>{
  win.tray.destroy()
})



ipcMain.on('getTrayCoordinates', (event) => {
  const trayBounds = win.getWindowPosition();
  event.reply('trayCoordinates', trayBounds);
});


ipcMain.on("hideWindow",()=>{
  win.win.hide()
})