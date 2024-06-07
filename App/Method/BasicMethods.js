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

// Event: 'ready'
app.on('ready', () => {
  console.log('The app is ready.')
})

// Event: 'will-quit'
app.on('will-quit', () => {
  console.log('The app will quit.')
})

// Event: 'before-quit'
app.on('before-quit', () => {
  console.log('The app is about to quit.')
})

// Function: app.exit([exitCode])
// setTimeout(() => {
//   console.log('Exiting the app with exit code 0.')
//   app.exit(0)
// }, 5000) // Exit after 5 seconds

// // Function: app.relaunch()
// setTimeout(() => {
//   console.log('Relaunching the app.')
//   app.relaunch()
// }, 10000) // Relaunch after 10 seconds

// // Function: app.isReady()
// console.log('Is the app ready?', app.isReady())

// Function: app.whenReady().then()
app.whenReady().then(() => {
    createWindow()
  console.log('The app is ready now.')
})

// Function: app.focus()
setTimeout(() => {
  console.log('Focusing the app window.')
  app.focus()
}, 15000) // Focus after 15 seconds

// Function: app.hide()
setTimeout(() => {
  console.log('Hiding the app window.')
  app.hide()
}, 20000) // Hide after 20 seconds

// Function: app.isHidden()
setTimeout(() => {
  console.log('Is the app window hidden?', app.isHidden())
}, 25000) // Check if hidden after 25 seconds

// Function: app.show()
setTimeout(() => {
  console.log('Showing the app window.')
  app.show()
}, 30000) // Show after 30 seconds
