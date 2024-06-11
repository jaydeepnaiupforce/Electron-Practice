const { nativeImage, Tray, BrowserWindow, Menu, shell, screen, ipcMain } = require("electron");

class WindowManger {
  constructor() {
    let image = "./icon.jpg";
    this.icon = nativeImage.createFromPath(image);
  }

  createUI() {
    this.createTray();
    this.createWindow();
  }

  createTray() {
    this.tray = Tray(this.icon);
    this.tray.on("click", this.toggleWindow.bind(this));
    this.tray.setToolTip("this is example");

    // setTimeout(() => {
    //   this.tray.setImage("./icon.png");
    //   this.tray.displayBalloon({
    //     iconType: "info",
    //     title: "Notification Title",
    //     content: "This is a notification message.",
    //     largeIcon: true,
    //     noSound: false,
    //     respectQuietTime: false,
    //   });
    // }, 5000);

    const contextMenu = Menu.buildFromTemplate([
      {
        label: "menu 1",
        click: () => {
          console.log("menu 1 cliked");
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
    // this.tray.show()
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
      fullscreenable: false,
      fullscreen:true,
      movable: false,
      resizable: false,
      transparent: true,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        plugins: true,
      },
      skipTaskbar: true,
    });


    this.win.on('blur', () => {
      this.win.hide();
    });

    this.win.loadFile("./index.html");
    // this.win.webContents.openDevTools({mode : "detach"})
    // this.win.webContents.on('before-input-event', (event, input) => {
    //     if ((input.control || input.meta) && input.key.toLowerCase() === 'i') {
    //         console.log("hi ")
    //       event.preventDefault();
    //     }
    //   });

  }

  // getWindowPosition() {
  //   const windowBounds = this.win.getBounds();
  //   const trayBounds = this.tray.getBounds();

  //   let x = 0;
  //   let y = 0;

  //   if (process.platform != "win32") {
  //     // Center window horizontally below the tray icon
  //     x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  //     // Position window 4 pixels vertically below the tray icon
  //     y = Math.round(trayBounds.y + trayBounds.height)

  //     return {
  //       x: x,
  //       y: y
  //     }
  //   }
  //   //On Windows the Task bar is sadly very flexible
  //   else {
  //     if (trayBounds.y < 250) {
  //       x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  //       y = Math.round(trayBounds.y + trayBounds.height + 4)
  //     } else if (trayBounds.x < 250) {
  //       x = Math.round(trayBounds.x + trayBounds.height * 2);
  //       y = Math.round(trayBounds.y - windowBounds.height + trayBounds.height)
  //     } else if (trayBounds.height >= 40) {
  //       x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  //       y = Math.round(trayBounds.y - windowBounds.height+40)
  //     } else {
  //       x = Math.round(trayBounds.x - windowBounds.width);
  //       y = Math.round(trayBounds.y - windowBounds.height + trayBounds.height)
  //     }
  //     return {
  //       x: x,
  //       y: y
  //     }
  //   }
  // }

  getWindowPosition() {
    const windowBounds = this.win.getBounds();
    const trayBounds = this.tray.getBounds();
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    let x = 0;
    let y = 0;

    if (process.platform != "win32") {
      // Center window horizontally below the tray icon
      x = Math.round((width - windowBounds.width) / 2);
      // Position window vertically above the tray icon
      y = Math.round(height - windowBounds.height);

      return {
        x: x,
        y: y
      };
    }
    // On Windows, position the window to the right bottom of the screen
    else {
      x = Math.round(width - windowBounds.width);
      y = Math.round(height - windowBounds.height+35);

      return {
        x: x,
        y: y
      };
    }
  }


  

  showMainWindow() {
    const position = this.getWindowPosition();
    this.win.setPosition(position.x, position.y);
    this.win.show();
    this.win.focus();

    //This is necessary for the window to appear on windows
    if (process.platform == "win32") {
      this.win.moveTop();
    }
  }

  toggleWindow() {
    console.log("clikced");
    if (this.win.isVisible()) this.win.hide();
    else this.showMainWindow();
  }
}

module.exports = WindowManger;
