const { app, BaseWindow, BrowserView, BrowserWindow } = require('electron')

app.on('ready', () => {
  const parent = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Parent Window'
  })
  parent.loadURL('https://github.com')

  const child = new BrowserWindow({
    width: 400,
    height: 300,
    parent: parent,
    title: 'Child Window'
  })
  child.loadURL('https://github.com')

  parent.show()
  child.show()
})
