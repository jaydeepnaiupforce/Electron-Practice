// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Captured Page</title>
//   <style>
//     body {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       height: 100vh;
//       margin: 0;
//     }
//     img {
//       max-width: 100%;
//       max-height: 100%;
//     }
//   </style>
// </head>
// <body>
//   <img id="capturedImage" src="#" alt="Captured Page">
//   Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis facere fuga dignissimos qui suscipit omnis aut, laborum minus, iste voluptas quasi cupiditate veniam distinctio et doloremque illo voluptatem ullam quis debitis perspiciatis, maiores sequi corporis. Delectus id voluptas beatae fuga odit modi officiis, ex sequi autem nulla, magni suscipit ducimus neque veniam cumque iusto cum praesentium? Vitae rem dolores amet dolor delectus distinctio, aspernatur tempora nisi, qui ut sapiente totam. Asperiores maxime ratione commodi dolores voluptas dolorum reprehenderit perspiciatis facilis sed sequi earum placeat officia neque, nulla recusandae repellendus. Suscipit fugit nulla maxime quae dignissimos nemo tempora est ratione sit rem beatae ea ipsum placeat voluptas laudantium, accusantium quaerat ad. Nam itaque et praesentium quod accusantium, iste doloremque! Omnis eos ipsa recusandae magnam eveniet ipsam architecto culpa enim nesciunt excepturi accusamus incidunt quis illum facere, officia ullam molestiae ad perspiciatis sed magni voluptas harum expedita exercitationem qui? Consequatur et perferendis perspiciatis dicta! At atque magni expedita ratione sequi ipsum labore eaque sed facere magnam quod, consectetur et exercitationem voluptatibus placeat, nihil nobis omnis assumenda, dolor quisquam obcaecati corporis enim dolores? Voluptate reprehenderit molestiae amet numquam aliquid fugiat fugit dolorum eveniet sit. Enim, tempora maxime obcaecati ad saepe tempore magni odit, nostrum quas et temporibus, aliquam officiis quae vero quis sed voluptatum? A vero eum voluptatibus ipsum minima, molestiae cum ab provident quae illo similique, iusto, ut quod temporibus illum enim placeat laudantium. Nemo velit, sed veritatis, corporis exercitationem ullam saepe quam qui asperiores cum rem inventore explicabo? Quo enim voluptas suscipit porro ratione molestias voluptate minima optio fuga iure incidunt rem assumenda illum provident accusamus exercitationem, sapiente ab quos reprehenderit laboriosam? Labore est distinctio, atque voluptas iste deleniti ab maiores nesciunt unde rem ad ducimus ex quidem minima autem, nostrum corrupti omnis fugit! Eos totam illo assumenda qui voluptate dolores eum quis quidem? Ducimus similique, harum sapiente, amet cum, saepe veritatis quisquam quaerat facere voluptate itaque! Maxime quas animi tempore nisi cumque corporis laudantium, saepe dignissimos voluptas ex harum voluptatem consectetur et amet voluptatum! Quae minus nihil qui sed delectus, quaerat vitae labore corrupti similique excepturi sapiente voluptatibus omnis maiores, provident laborum facilis non quidem cumque deserunt ullam ex? Quaerat aspernatur recusandae expedita nulla delectus autem. Nam nulla alias dolorum nostrum, aperiam, perferendis explicabo neque provident impedit exercitationem libero eum sed, iste a delectus? Fugit, incidunt. Aspernatur iure omnis similique, provident porro perspiciatis a doloremque ducimus, aperiam veritatis corrupti ullam.
//   <script>
//     const { ipcRenderer } = require('electron');

//     // Function to update the image source with the captured image data
//     function updateImage(src) {
//       const img = document.getElementById('capturedImage');
//       img.src = src;
//     }

//     // Listen for messages from Electron and update the image source
//     ipcRenderer.on('captured-image', (event, data) => {
//       console.log(data.src)
//       if (data.type === 'capturedImage') {
//         updateImage(data.src);
//       }
//     });
//   </script>
// </body>
// </html>




const { app, BrowserWindow, ipcMain } = require('electron');

// Keep a reference to the window object to prevent it from being garbage collected
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor:"red",
        webPreferences: {
          nodeIntegration: true,
          contextIsolation:false
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.webContents.on('dom-ready', () => {
        const rect = { x: 0, y: 0, width: 800, height: 600 }; // Example rectangle capturing the entire window

        mainWindow.capturePage(rect)
            .then((image) => {
                console.log('Page captured successfully:', image);
                mainWindow.webContents.send('captured-image', { type: 'capturedImage', src: image.toDataURL() });
            })
            .catch((error) => {
                console.error('Error capturing page:', error);
            });
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
