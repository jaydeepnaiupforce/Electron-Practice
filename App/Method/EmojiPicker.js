const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadFile('index.html');

  if (app.isEmojiPanelSupported()) {
    const menu = Menu.getApplicationMenu();
    menu.append(new MenuItem({
      label: 'Emoji Picker',
      click() {
        app.showEmojiPanel();
      }
    }));
    Menu.setApplicationMenu(menu);
  }
}

app.on('ready', createWindow);

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
