const { ipcRenderer } = require('electron');

ipcRenderer.on('load-views', () => {
  const container = document.getElementById('webview-container');
  const views = [
    { id: 'view1', url: 'https://www.github.com' },
    { id: 'view2', url: 'https://www.google.org' }
  ];

  views.forEach(view => {
    const webview = document.createElement('iframe');
    webview.setAttribute('id', view.id);
    webview.setAttribute('src', view.url);
    webview.style.width = '50%';
    webview.style.height = '100%';
    container.appendChild(webview);
  });
});
