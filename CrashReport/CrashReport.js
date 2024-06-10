const { app, crashReporter, BrowserWindow } = require("electron");
const express = require("express");
const bodyParser = require("body-parser");

//node app

const expApp = express();
const PORT = process.env.PORT || 3000;

expApp.use(bodyParser.json());

expApp.post("/crash-report", (req, res) => {
  const crashReport = req.body;

  console.log("Received crash report:", crashReport);

  res.status(200).json({ message: "Crash report received successfully." });
});

expApp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




//elctrone app

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true, // Enable the title bar
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");

  crashReporter.start({
    submitURL: "http://localhost:3000/crash-report",
    productName: "YourApp",
    companyName: "YourCompany",
    uploadToServer: true,
  });

  setTimeout(() => {
    process.crash();
  }, 5000); 
}

app.on("ready", createWindow);
