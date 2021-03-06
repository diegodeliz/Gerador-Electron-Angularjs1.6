const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
const url = require('url')
const fs = require('fs');

let mainWindow = null;
let modalWindow = null;
let ModalCnpj = null;
let ModalEmployees = null;


function createWindow () {
  mainWindow = new BrowserWindow({
    width: 980,
    height: 680,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'img/logo.png')
  });

  mainWindow.loadURL('http://localhost:8080/');

  mainWindow.on('closed', () => {
    let dir = './data/arquivo.tmp';
    mainWindow = null;
    if(fs.existsSync(dir)){
      fs.unlinkSync(dir);
    }
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('ModalArquivo', () => {
  if(modalWindow == null){
    modalWindow = new BrowserWindow({
      width: 700,
      height: 500,
      resizable:  true,
      movable: false,
      minimizable: false,
      modal: true,
      autoHideMenuBar: true,
      parent: mainWindow,
      icon: path.join(__dirname, 'img/logo.png')
    });
    modalWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'views/ArquivoBaseModal.html'),
      protocol: 'file:',
      slashes: true
    }));   
  }
  modalWindow.on('closed', () => { modalWindow = null });  
});

ipcMain.on('ModalCnpj', () => {
  if(ModalCnpj == null){
    ModalCnpj = new BrowserWindow({
      width: 700,
      height: 600,
      resizable:  true,
      movable: false,
      minimizable: false,
      modal: true,
      autoHideMenuBar: true,
      parent: mainWindow,
      icon: path.join(__dirname, 'img/logo.png')
    });
    ModalCnpj.loadURL(url.format({
      pathname: path.join(__dirname, 'views/CnpjModal.html'),
      protocol: 'file:',
      slashes: true
    }));   
  }
  ModalCnpj.on('closed', () => { ModalCnpj = null; });  
});

ipcMain.on('ModalEmployees', () => {
  if(ModalEmployees == null){
    ModalEmployees = new BrowserWindow({
      width: 770,
      height: 500,
      resizable:  true,
      movable: false,
      minimizable: false,
      modal: true,
      autoHideMenuBar: true,
      parent: mainWindow,
      icon: path.join(__dirname, 'img/logo.png')
    });
    ModalEmployees.loadURL(url.format({
      pathname: path.join(__dirname, 'views/EmployeesModal.html'),
      protocol: 'file:',
      slashes: true
    }));   
  }
  ModalEmployees.on('closed', () => { ModalEmployees = null });  
});