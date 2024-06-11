const { app, ipcMain, BrowserWindow } = require("electron");
const { dialog } = require('electron');
const { AbortController } = require('abort-controller');
const controller = new AbortController();
const signal = controller.signal;


var win ; 

app.on("ready",()=>{
  win = new BrowserWindow({
    width: 250,
    height: 435,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      plugins: true,
    },
  });

  win.loadFile("./index.html");

     dialog.showMessageBox({
      type: 'info',
      title: 'Information',
      message: 'This is an informational message.',
      buttons: ['Yes', 'No'],
      defaultId:2,
      signal: signal // Pass the signal to the message box
    })
    
})
