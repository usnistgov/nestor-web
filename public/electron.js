const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const ipcMain = electron.ipcMain;

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + "/preload.js"
    },
    icon: path.join(__dirname, "icon.ico")
  });
  mainWindow.loadURL(`file://${path.join(__dirname, "splashScreen.html")}`);
  mainWindow.on("closed", () => (mainWindow = null));
  //mainWindow.webContents.openDevTools();
  if (isDev)
    mainWindow.webContents.openDevTools();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

let pyProc = null;
let pyPort = null;

const selectPort = () => {
  pyPort = 4242;
  return pyPort;
};

const guessOs = () => {
  const win = path.join(__dirname, "../pythondist/api/api.exe");
  const linux = path.join(__dirname, "../pythondist/api/api");
  return require("fs").existsSync(win) ? win : linux;
};

const createPyProc = () => {
  let port = "" + selectPort();
  let script = isDev ? path.join(__dirname, "/../python/api.py") : guessOs();
  pyProc = isDev
    ? require("child_process").spawn("python", [script, port])
    : require("child_process").execFile(script, [port], function (
      error,
      stdout,
      stderr
    ) {
      console.log(error, stdout, stderr);
      ipcMain.on("asynchronous-message", (event, arg) => {
        event.reply("asynchronous-reply", error + stdout + stderr);
      });
    });

  pyProc.stdout.on("data", function (data) {
    console.log("data from api.py: ", data.toString("utf8"));
    if (data.toString("utf8").includes("server")) {
      mainWindow.loadURL(
        isDev
          ? "http://localhost:3000"
          : `file://${path.join(__dirname, "../build/index.html")}`
      );
    }
  });

  if (pyProc != null) {
    console.log("child process success");
  }
};

const exitPyProc = () => {
  pyProc.kill();
  pyProc = null;
  pyPort = null;
};

app.on("ready", createPyProc);
app.on("will-quit", exitPyProc);
