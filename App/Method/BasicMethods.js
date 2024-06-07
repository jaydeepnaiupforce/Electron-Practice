const { app, BrowserWindow } = require('electron')

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

app.on('ready', () => {
  console.log('The app is ready.')
})

app.on('will-quit', () => {
  console.log('The app will quit.')
})

app.on('before-quit', () => {
  console.log('The app is about to quit.')
})

// setTimeout(() => {
//   console.log('Exiting the app with exit code 0.')
//   app.exit(0)
// }, 5000) // Exit after 5 seconds

// setTimeout(() => {
//   console.log('Relaunching the app.')
//   app.relaunch()
// }, 10000) // Relaunch after 10 seconds

// console.log('Is the app ready?', app.isReady())

app.whenReady().then(() => {
    createWindow()
  console.log('The app is ready now.')
})

setTimeout(() => {
  console.log('Focusing the app window.')
  app.focus()
}, 15000) 

setTimeout(() => {
  console.log('Hiding the app window.')
  app.hide()
}, 20000) 

setTimeout(() => {
  console.log('Is the app window hidden?', app.isHidden())
}, 25000) 

setTimeout(() => {
  console.log('Showing the app window.')
  app.show()
}, 30000) 
