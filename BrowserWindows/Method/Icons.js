const { app, BrowserWindow, nativeImage } = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('./index.html');

    // Set the window icon using a path to an image file
    const iconPath = './icon.jpg';
    mainWindow.setIcon(iconPath);

});
