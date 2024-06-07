const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  loadViews: () => ipcRenderer.send('load-views')
});
