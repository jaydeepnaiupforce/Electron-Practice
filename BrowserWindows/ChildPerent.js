const { app, BaseWindow, BrowserView, BrowserWindow } = require('electron')

// Wait for Electron app to be ready
app.on('ready', () => {
  // Create a parent window
  const parent = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Parent Window'
  })
  parent.loadURL('https://github.com')

  // Create a child window
  const child = new BrowserWindow({
    width: 400,
    height: 300,
    parent: parent, // Set the parent window
    title: 'Child Window'
  })
  child.loadURL('https://github.com')

  // Show the windows
  parent.show()
  child.show()
})
