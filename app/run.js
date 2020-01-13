/**
 * @file 主进程
 */

const electron = require('electron');
const argv = require('yargs').argv;
const { app, BrowserWindow, dialog, Tray, nativeImage, Menu, globalShortcut } = electron;

// cache project opts
global.info = { author: 'aJean', appPath: app.getAppPath() };

let win, tray;

function createWindow(cb) {
  win = new BrowserWindow({
    width: 1600,
    height: 1000,
    title: 'mf-gui',
    backgroundColor: '#263238',
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  argv.dev ? loadDevServer(win) : loadFile(win);
  // mac usually hide when click close
  win.on('close', (e) => {
    e.preventDefault();
    win.hide();
  });

  win.once('ready-to-show', () => {
    win.show();
    cb && cb();
  });
}

function createAnimation() {
  const anim = new BrowserWindow({
    width: 300,
    height: 100,
    title: 'mf-gui',
    hasShadow: true,
    vibrancy: 'selection',
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    show: false
  });

  anim.once('ready-to-show', () => anim.show());
  anim.loadURL(`file://${app.getAppPath()}/dist/animate.html`);
  createWindow(() => anim.close());
}

/**
 * tray 菜单
 */
function createTrayMenu() {
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/assets/img/tray.png`);

  tray = new Tray(icon);
  tray.on('click', () => win && win.show());
}

/**
 * dock 菜单
 */
function createDockMenu() {
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/assets/img/dock.png`);
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

        docWin.on('closed', (e) => {
          docWin = null;
        });
      }
    }
  ];

  const dockMenu = Menu.buildFromTemplate(dockTempalte);
  app.dock.setMenu(dockMenu);
  app.dock.setIcon(icon);
}

function registerCmd() {
  // argv.dev &&
  globalShortcut.register('CommandOrControl+Alt+J', function() {
    win && win.webContents.openDevTools();
  });
}

/**
 * 加载 webpack-dev-server
 */
function loadDevServer(win, limit = 5) {
  const deep = () => {
    win.loadURL(`http://localhost:3000/`).catch((e) => {
      if (--limit == 0) {
        dialog.showErrorBox('dev server', e.message);
        win.destroy();
      } else {
        setTimeout(deep, 1000);
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
  createAnimation();
  registerCmd();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => setTimeout(() => app.exit(0), 500));

app.on('activate', () => win && win.show());

app.on('renderer-process-crashed', (e) => console.log(e));
