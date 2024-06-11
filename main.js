const { app, ipcMain } = require("electron");
const WindowManager = require("./tray/Helper");

win = new WindowManager();

app.on("ready",win.createUI.bind(win))


ipcMain.on("create-tray",()=>{
  win.createTray(win)
})

ipcMain.on("remove-tray",()=>{
  win.tray.destroy()
})

const getTrayCoordinates = ()=>{
  const windowBounds = win.win.getBounds();
  const trayBounds = win.tray.getBounds();

  
  let x = 0;
  let y = 0;

  x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
  );
  y = Math.round(trayBounds.y - windowBounds.height);

  return {
    x: x,
    y: y,
  };

}



ipcMain.on('getTrayCoordinates', (event) => {
  const trayBounds = win.tray.getBounds();
  event.reply('trayCoordinates', trayBounds);
});


ipcMain.on("hideWindow",()=>{
  win.win.hide()
})