const { app, BaseWindow, BrowserWindow } = require('electron')

app.on('ready', () => {
  const parent = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Parent Window'
  })
  parent.loadURL('https://github.com')

  const modalChild = new BrowserWindow({
    width: 400,
    height: 300,
    parent: parent, 
    modal: true, 
    title: 'Modal Child Window'
  })
  modalChild.loadURL('https://github.com')

  parent.show()
})
