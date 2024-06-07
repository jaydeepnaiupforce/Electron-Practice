const { app, BrowserWindow } = require('electron')

// Create a new BrowserWindow instance
app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Load a web page that requires basic authentication
  mainWindow.loadURL('https://httpbin.org/basic-auth/user/passwd')

  // Listen for the 'login' event
  app.on('login', (event, webContents, details, authInfo, callback) => {
    event.preventDefault()

    // Provide hardcoded credentials
    callback('user', 'passwd')
  })
})