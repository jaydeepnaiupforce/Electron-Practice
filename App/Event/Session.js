const { app, BrowserWindow, session } = require("electron");

function createWindow() {
  var ses = session.defaultSession;

  let getCookie = () => {
    ses.cookies.get({}).then((cookies) => {
      console.log(cookies);
    });
  };

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // win.loadURL("https://github.com");
  win.loadFile("index.html");

  // let cookies = {
  //   url : "https://mydomain.com",
  //   name : "c2",
  //   value : "v2",
  //   expirationDate: 1749276290.918653,
  // }

  // ses.cookies.set(cookies).then(()=>{
  //   console.log("cookies set")
  //   getCookie()
  // })

  win.webContents.on("did-finish-load", () => {
    getCookie()
  });

  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


app.on('quit', (event, exitCode) => {
  console.log(`Application is quitting with exit code: ${exitCode}`);
  // Perform final cleanup tasks here
});

app.on('session-created', (session) => {
    console.log("session-created")
  })