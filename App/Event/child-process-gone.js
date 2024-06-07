const { app } = require('electron')

// Listen for the 'child-process-gone' event
app.on('child-process-gone', (event, details) => {
  console.log('Child process gone:', details)

  // Check if the process crashed
  if (details.reason === 'crashed') {
    console.log('Process crashed. Restarting...')
    // Example: Restart the process
    restartProcess(details.type, details.serviceName)
  }
})

// Function to restart the process (example)
function restartProcess(type, serviceName) {
  // Perform actions to restart the specified process
  console.log(`Restarting ${type} process: ${serviceName}`)
  // Example: You need to implement the logic to restart the process here
  // For demonstration purposes, we'll just log a message
  console.log(`Restarting ${type} process: ${serviceName}`)
}

// Simulating a crash (for demonstration purposes)
setTimeout(() => {
  // Emitting the 'child-process-gone' event with details of a crashed process
  const details = {
    type: 'Utility',
    reason: 'crashed',
    serviceName: 'ExampleService'
  }
  app.emit('child-process-gone', null, details)
}, 5000) // Simulating a crash after 5 seconds
