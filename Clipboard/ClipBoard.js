const { BrowserWindow, app, nativeImage } = require('electron');
const { clipboard } = require('electron')

clipboard.writeText('Example string', 'selection')
console.log(clipboard.readText('selection'))

clipboard.write({
  text: 'test',
  html: '<b>Hi</b>',
  rtf: '{\\rtf1\\utf8 text}',
  bookmark: 'a title'
})

console.log(clipboard.readText())

console.log(clipboard.readHTML())

console.log(clipboard.readRTF())

console.log(clipboard.readBookmark())

const imagePath = './icon.jpg';

const image = nativeImage.createFromPath(imagePath);

clipboard.writeImage(image);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true, // Enable the title bar
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');

}

// Create window when app is ready
app.on('ready', createWindow);
