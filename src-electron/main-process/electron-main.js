import { app, BrowserWindow, nativeTheme, Menu, ipcMain } from 'electron'
import { menuTemplate } from "./electron-main-menu-template"

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = __dirname
}

export let mainWindow
const menu = Menu.buildFromTemplate(menuTemplate)

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 600,
    minHeight: 600,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  Menu.setApplicationMenu(menu)
})

function quitApp() {
  // const fs = require('fs')
  // const username = require('os').userInfo().username
  // const localPath = `C:/Users/${username}/AppData/Roaming/${app.name}`
  // fs.rmSync(localPath, { recursive: true, force: true }, () => {})
  // const { session } = require('electron').remote
  // await session.defaultSession.clearStorageData({
  //   // without set origin options
  //   storages: ['localstorage', 'caches', 'indexdb']
  // }, () => {
  //   // verify if storages got cleared.
  // })
  app.quit()
}

app.on('window-all-closed', () => quitApp())

ipcMain.on('exit-app', () => quitApp())