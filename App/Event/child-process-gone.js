const { app } = require('electron')

app.on('child-process-gone', (event, details) => {
  console.log('Child process gone:', details)

  if (details.reason === 'crashed') {
    console.log('Process crashed. Restarting...')
    restartProcess(details.type, details.serviceName)
  }
})

function restartProcess(type, serviceName) {
  console.log(`Restarting ${type} process: ${serviceName}`)
  console.log(`Restarting ${type} process: ${serviceName}`)
}

setTimeout(() => {
  const details = {
    type: 'Utility',
    reason: 'crashed',
    serviceName: 'ExampleService'
  }
  app.emit('child-process-gone', null, details)
}, 5000) // Simulating a crash after 5 seconds
