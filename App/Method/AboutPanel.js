const { app, BrowserWindow, Menu } = require('electron');
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

  app.setAboutPanelOptions({
    applicationName: 'My Electron App',
    applicationVersion: '1.0.0',
    copyright: '© 2024 My Company',
    credits: 'Developed by My Team',
    iconPath: path.join(__dirname, 'icon.png') // Ensure you have an icon.png file in the root directory
  });

  const menuTemplate = [
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click() {
            app.showAboutPanel();
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
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
