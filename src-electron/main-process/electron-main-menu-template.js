const { app } = require('electron')
import { mainWindow } from "./electron-main";

export const menuTemplate = [
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      {
        label: 'Settings',
        accelerator: 'Ctrl+Shift+S',
        click() {
          mainWindow.webContents.send('show-settings')
        }
      },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Go to help',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]
