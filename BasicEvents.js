const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();

  win.on('blur', (event) => {
    //console.log('BrowserWindow has lost focus');
  });

  win.on('focus', (event) => {
    //console.log('BrowserWindow has focus');
  });

};

app.whenReady().then(()=>{
  app.on('browser-window-created', (event, window) => {
    // console.log('A new BrowserWindow was created');
    window.webContents.openDevTools();
  });

  app.on('web-contents-created', (event, webContents) => {
    // console.log('A new WebContents was created');
    // Perform actions on the new webContents here
    webContents.on('did-finish-load', () => {
      //console.log('WebContents finished loading');
    });
  });

  createWindow()
});

app.on("before-quit", (event) => {
  //console.log("App is about to quit");
});

app.on("will-quit", (event) => {
  //console.log("App will quit now");
});

app.on("window-all-closed", () => {
  //console.log("window-all-closed");
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('quit', (event, exitCode) => {
  //console.log(`Application is quitting with exit code: ${exitCode}`);
  // Perform final cleanup tasks here
});


app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
