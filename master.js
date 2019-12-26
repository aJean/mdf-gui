/**
 * @file 主进程
 */

const electron = require('electron');
const { app, BrowserWindow, dialog, Tray, nativeImage, Menu, globalShortcut } = electron;

// cache project opts
global.info = { author: 'qiaoyue3' };

let win, tray;

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#f0f2f5',
    webPreferences: {
      nodeIntegration: true
    }
  });

  loadDevServer(win);
  // mac usually hide when click close
  win.on('close', e => {
    e.preventDefault();
    win.hide();
  });
}

/**
 * tray 菜单
 */
function createTrayMenu() {
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/assets/logos/tray.png`);

  tray = new Tray(icon);
  tray.on('click', () => win && win.show());
}

/**
 * dock 菜单
 */
function createDockMenu() {
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/assets/logos/dock.png`);
  let docWin;

  const dockTempalte = [
    {
      label: 'Readme',
      click() {
        docWin = new BrowserWindow({
          width: 800,
          height: 800,
          backgroundColor: '#f0f2f5',
          type: 'textured',
          webPreferences: {
            nodeIntegration: true
          }
        });
        docWin.loadURL(`file://${app.getAppPath()}/config/readme.html`);

        docWin.on('closed', e => {
          docWin = null
        });
      }
    }
  ];

  const dockMenu = Menu.buildFromTemplate(dockTempalte);
  app.dock.setMenu(dockMenu);
  app.dock.setIcon(icon);
}

function registerCmd() {
  globalShortcut.register('CommandOrControl+Alt+J', function() {
    win && win.webContents.openDevTools();
  });
}

/**
 * 加载 webpack-dev-server
 */
function loadDevServer(win, limit = 5) {
  const deep = () => {
    win.loadURL(`http://localhost:3000/`).catch(e => {
      if (--limit == 0) {
        dialog.showErrorBox('dev server', e.message);
        win.destroy();
      } else {
        setTimeout(deep, 2000);
      }
    });
  };

  deep();
}

/**
 * 加载本地文件 -- prod
 */
function loadFile(win) {
  win.loadURL(`file://${app.getAppPath()}/dist/index.html`);
}

app.on('ready', function() {
  createTrayMenu();
  createDockMenu();
  createWindow();
  registerCmd();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => win && win.show());
