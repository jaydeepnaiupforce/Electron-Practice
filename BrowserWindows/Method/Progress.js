const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });

    // Load your HTML file
    mainWindow.loadFile('index.html');
}

// This method will be called when Electron has finished initialization
// app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS
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

// Function to set the progress bar
function setProgress(progress, mode = 'normal') {
    if (mainWindow) {
        if (progress < 0) {
            mainWindow.setProgressBar(-1); // Remove progress bar
        } else if (progress > 1) {
            mainWindow.setProgressBar(2, { mode: 'indeterminate' }); // Indeterminate mode
        } else {
            mainWindow.setProgressBar(progress, { mode: mode }); // Set progress with mode
        }
    }
}

// Example usage
app.on('ready', () => {
    createWindow();

    // Simulate progress updates
    let progress = 0;
    const interval = setInterval(() => {
        if (progress > 1) {
            setProgress(-1); // Remove progress bar when done
            clearInterval(interval);
        } else {
            setProgress(progress); // Update progress bar
            progress += 0.1;
        }
    }, 1000);
});
