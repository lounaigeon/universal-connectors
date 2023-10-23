import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { ConnectorState } from "../renderer/src/slices/connectorSlice";
import fs from "fs";
import { dialog } from "electron";
import { powerPlatformTranslator } from "../translators/translators";
import { connect } from "react-redux";
// import Converter from "../translators/openapi3_to_swagger2.js"

// console.log(Converter())



let mainWindow: BrowserWindow | null = null;


function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "..", "preload", "preload.js"),
    },
  });
  mainWindow.maximize();

  mainWindow.loadURL("http://localhost:5173");
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.show();
}

ipcMain.handle("ping", () => "pong");

let directory = "";

ipcMain.handle("save", (event, connector: ConnectorState) => {
  const openapi = connector.api;
  const readMeText = connector.readMe;

  fs.writeFileSync(
    path.join(directory, "openapi.json"),
    JSON.stringify(openapi)
  );
  fs.writeFileSync(path.join(directory, "README.md"), readMeText);

  const { api, readMe, ...meta } = connector;
  fs.writeFileSync(path.join(directory, "meta.json"), JSON.stringify(meta));
  return "saved";
});

ipcMain.handle("load", async (event) => {
  const pathObject = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
  });
  if (pathObject) {
    directory = pathObject.filePaths[0];
    return loadConnector(pathObject.filePaths[0]);
  }
});

ipcMain.handle("translate", async (event) => {
  console.log("translate")
  const connector = JSON.parse(loadConnector(directory));
  powerPlatformTranslator(connector, directory);
}
)

function loadConnector(pathToFolder: string) {
  let meta = {};
  let readMe = "";

  if (
    fs.existsSync(pathToFolder + "/meta.json") &&
    fs.existsSync(pathToFolder + "/README.md")
  ) {
    meta = JSON.parse(
      fs.readFileSync(path.join(pathToFolder, "meta.json"), "utf-8")
    );
    readMe = fs.readFileSync(path.join(pathToFolder, "README.md"), "utf-8");
    console.log(meta.json);
  }
  if (fs.existsSync(pathToFolder + "/openapi.json")) {
    const openapi = JSON.parse(
      fs.readFileSync(path.join(pathToFolder, "openapi.json"), "utf-8")
    );
    return JSON.stringify({ ...meta, api: openapi, readMe });
  }
}

app.whenReady().then(() => {
  createWindow();
});
