/**
 * @file 主进程
 */

const electron = require('electron');
const { app, BrowserWindow } = electron;

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(`file://${__dirname}/home/index.html`);
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
