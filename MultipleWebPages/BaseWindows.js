const { app, BrowserWindow, webContents, WebContentsView, BaseWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BaseWindow({ width: 800, height: 600 })

  const leftView = new WebContentsView()
  leftView.webContents.loadURL('https://electronjs.org')
  win.contentView.addChildView(leftView)
  
  const rightView = new WebContentsView()
  rightView.webContents.loadURL('https://github.com/electron/electron')
  win.contentView.addChildView(rightView)
  
  leftView.setBounds({ x: 0, y: 0, width: 400, height: 600 })
  rightView.setBounds({ x: 400, y: 0, width: 400, height: 600 })

  // Open the DevTools (optional)
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
