// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// function createWindow() {
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js') // if you have a preload script
//     }
//   });

//   mainWindow.loadFile('index.html');

//   // Open the DevTools (optional)
//   // mainWindow.webContents.openDevTools();
// }

// app.on('ready', () => {
//   // Path to File Explorer
//   const explorerPath = 'C:\\Windows\\explorer.exe';

//   // Set the app to open File Explorer at login
//   app.setLoginItemSettings({
//     openAtLogin: true,
//     path: explorerPath,
//     args: []
//   });

//   console.log('Login item set to open File Explorer.');

//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });



const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadFile('index.html');
}

app.on('ready', () => {
  createWindow();

  const exeName = path.basename(process.execPath);

  // Set the app to open itself at login
  app.setLoginItemSettings({
    openAtLogin: true,
    path: process.execPath,
    args: [
      '--processStart', exeName,
      '--process-start-args', '--hidden'
    ]
  });

  console.log('Login item set to open the app.');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
