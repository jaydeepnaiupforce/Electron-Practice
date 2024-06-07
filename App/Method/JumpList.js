const { app, BrowserWindow } = require('electron');
const path = require('path');

const appDirectory = app.getAppPath();


const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
  
    win.loadFile("index.html");
    win.webContents.openDevTools();
  
    win.on('blur', (event) => {
      //console.log('BrowserWindow has lost focus');
    });
  
    win.on('focus', (event) => {
      //console.log('BrowserWindow has focus');
    });
  
  };

// Event: 'ready'
app.on('ready', () => {
  console.log('The app is ready.')
  createWindow()
})

try {
  // Define an array of Task objects
  const tasks = [
    {
      title: 'Open File Explorer', // Title of the task
      program: 'explorer.exe', // Path of the program to execute (File Explorer)
      arguments: 'C:\\', // Optional command line arguments (opens File Explorer with C drive)
      description: 'Open File Explorer to the C drive', // Optional description of the task
      iconPath: path.join(appDirectory, 'icon.jpg') , // Path to an icon file (using shell32.dll for system icons)
      iconIndex: 0, // Index of the icon in the icon file
      workingDirectory: 'C:\\' // Optional working directory for the task
    },
    {
      title: 'Open Notepad', // Title of the task
      program: 'notepad.exe', // Path of the program to execute (Notepad)
      // No arguments specified for Notepad
      description: 'Open Notepad for text editing', // Optional description of the task
      iconPath: path.join(appDirectory, 'icon.jpg') , // Path to an icon file (using the icon of the Electron application)
      iconIndex: 0 // Index of the icon in the icon file (using the default icon)
      // No working directory specified for Notepad
    }
  ];

  // Add tasks to the Tasks category of the Jump List
  const success = app.setUserTasks(tasks);

  // Check if the call succeeded
  console.log('Tasks added successfully:', success);
} catch (error) {
  // Handle errors
  console.error('Error adding tasks:', error);
}
