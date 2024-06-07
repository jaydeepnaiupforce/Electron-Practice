const { app, BrowserWindow } = require('electron')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL('https://httpbin.org/basic-auth/user/passwd')

  app.on('login', (event, webContents, details, authInfo, callback) => {
    event.preventDefault()

    callback('user', 'passwd')
  })
})