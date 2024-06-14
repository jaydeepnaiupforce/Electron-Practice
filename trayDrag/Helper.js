const { nativeImage, Tray, BrowserWindow, Menu, shell, screen, ipcMain } = require("electron");

class WindowManger {
  constructor() {
    let image = "./icon.png";
    this.icon = nativeImage.createFromPath(image);
  }

  createUI() {
    this.createWindow();
    this.createTray();
  }

  createTray() {
    this.tray = Tray(this.icon);
    
    // this.tray.on("click", ()=>{
    //   this.toggleWindow(this);
    // });
    this.tray.setToolTip("this is example");

    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Open Gestimer ",
        click: () => {
          this.toggleWindow(this);
        },
      },
      {
        label: "Open Some Apps",
        submenu: [
          {
            label: "Open file explorer",
            click: () => {
              shell.openPath("c:\\");
              console.log("submenu 1 cliked");
            },
          },
          {
            label: "Open NotePad",
            click: () => {
              const notepadPath = "C:\\Windows\\System32\\notepad.exe";
              shell.openExternal(notepadPath);
            },
          },
        ],
      },
      {
        type: "separator",
      },
      {
        label: "quit app",
        click: () => {
          this.tray.destroy();
        },
      },
    ]);

    this.tray.setContextMenu(contextMenu);
    ipcMain.on('getTrayCoordinates', (event) => {
      const trayBounds = this.tray.getBounds();
      event.reply('trayCoordinates', trayBounds);
    });

  }

  createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    this.win = new BrowserWindow({
      width,
      height,
      frame: false,
      show: false,
      fullscreen:false,
      movable: true,
      resizable: true,
      transparent: true,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        plugins: true,
      },
      skipTaskbar: true,
    });


    this.win.loadFile("./index.html");
    // this.win.webContents.openDevTools({mode : "detach"})

  }

  getWindowPosition() {
    const trayBounds = this.tray.getBounds()
    return trayBounds
  }
  

  showMainWindow() {
    const position = this.getWindowPosition();
    this.win.setPosition(position.x, position.y, false);
    this.win.show();
    this.win.focus();

    if (process.platform == "win32") {
      this.win.moveTop();
    }
  }

  toggleWindow() {
    console.log("clicked");
    if (this.win.isVisible()) {
      this.win.focus();
    } else {
      this.showMainWindow();
    }
  }
}

module.exports = WindowManger;
