/**
 * @file 主进程
 */

const electron = require('electron');
const { app, BrowserWindow, dialog } = electron;

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 600,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: true
    }
  });

  loadDevServer(win);
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
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
  }

  deep();
}

/**
 * 加载本地文件 -- prod
 */
function loadFile(win) {
  win.loadURL(`file://${__dirname}/dist/index.html`);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，否则绝大部分应用及其菜单栏会保持激活
  // 需要给菜单增加 open 功能
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
