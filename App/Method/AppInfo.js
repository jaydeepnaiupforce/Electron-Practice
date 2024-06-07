const { app } = require('electron')
const path = require('path')

console.log('App path:', app.getAppPath())

console.log('Home directory:', app.getPath('home'))

async function getFileIconExample() {
  try {
    const icon = await app.getFileIcon(__filename)
    // console.log('File icon:', icon.toDataURL())
  } catch (error) {
    console.error('Error getting file icon:', error)
  }
}
getFileIconExample()

app.setPath('music', 'C:/Users/UpforceTech/Desktop/Electron/music')
console.log('Music directory set to:', app.getPath('music'))
console.log('App version:', app.getVersion())

console.log('App name:', app.getName())

app.setName('NewApp')
console.log('Updated app name:', app.getName())

console.log('App locale:', app.getLocale())
