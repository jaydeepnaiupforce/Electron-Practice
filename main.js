
const { app, BrowserWindow, ipcMain } = require('electron');

// Keep a reference to the window object to prevent it from being garbage collected
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor:"red",
        webPreferences: {
          nodeIntegration: true,
          contextIsolation:false
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.webContents.on('dom-ready', () => {
        const rect = { x: 0, y: 0, width: 800, height: 600 }; // Example rectangle capturing the entire window

        mainWindow.capturePage(rect)
            .then((image) => {
                console.log('Page captured successfully:', image);
                mainWindow.webContents.send('captured-image', { type: 'capturedImage', src: image.toDataURL() });
            })
            .catch((error) => {
                console.error('Error capturing page:', error);
            });
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
