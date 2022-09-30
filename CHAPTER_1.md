# Creating the socket server.

## Intro
We are going to create an node express server for backend request. This server will have several funcions like serve websocket requests. 

1. Folder Structure

The root directory will contain:
* main node project that will be used for backend
* backend folder
* frontend folder (can contain their own node_modules folder for example if using react)

2. Install express package. 
```sh
npm i express
```

3. Install dotenv
Instead of reading the variables from the OS operating system we will read them from a hidden file called .env. The way to read them is the same through **process.env**
Example of reading 
```js
const projectId = process.env.npm_config_PROJECT_ID;
const example = process.env.npm_config_EXAMPLE;
const port = ( process.env.npm_config_PORT || 3000 );
```

Install the package and creat a .env file
```sh
npm i dotenv
touch .env
```
Edit the .env as follows
```
PPROJECT_ID = 'my project';
PORT = 8080
```

4. I will use ES syntax. With this sintax I will use import statatemvs vs require. To enable this sintax edit the package.json file with

```json
  "type": "module",
```

5. Some tools

```sh
npm i nodemon, colors, body-parser
```


6. routes folder
Will contain routes other than root for call the api. 

7. Prepare socket.io to serve the websockets connections
Socket info [here](https://socket.io/docs/v3/server-initialization/)

```sh
npm install socket.io
```

Import the libraries needed
```js
import { createServer } from "http";
import { Server } from "socket.io";
import { dirname } from 'path';
import * as path from 'path'
import { fileURLToPath } from 'url';
import * as http from 'http';
```

As global vars define
```js
const app = express();
var server;
```
Create a function to start the server and call it from the code. 

```js
function startServer () {
    
    const httpServer = createServer(app);
    server = http.createServer(app);
    const io = new Server(httpServer, {})

    io.on("connection", (socket) => {
        console.log(`Client connected [id=${socket.id}]`.blue.bold);
        socket.emit('server_setup', `Server connected [id=${socket.id}]`);
      });

    httpServer.listen(PORT);

    //routes
    app.get('/', function(req, res) {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        res.sendFile(path.join(__dirname + '/../index.html'));
      });
      console.log(
        `server runing in ${process.env.NODE_ENV}mode on port ${PORT}.`.yellow.bold
      )

    
}

```

8. Create an index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Socokets Testing Page</title>
    <script src="https://cdn.socket.io/4.5.0/socket.io.min.js" integrity="sha384-7EyYLQZgWBi67fBtVxw60/OWl1kjsfrPFcaU0pp0nAh+i8FD068QogUvg85Ewy1k" crossorigin="anonymous"></script>
</head>
<body>
   
    <p> Open the developer console of the browser to check the logs</p>

    <script type="text/javascript">
        const socketio = io();
        const socket = socketio.on('connection', function() {      
        });
        socketio.on('server_setup', function (data) {
            console.log(data);     
        });   
    </script>
    
</body>
</html>
```

9. Explanation
-> The node server will serve an index.html file when the root is called
http://localhost:3000

-> Then the js script of the index.html file will try to open a socket with the server through
```js
const socket = socketio.on('connection', function() {});
```
Note that the connection string can be whatever 

-> The server will react to that string with 
```js
io.on("connection", (socket) => {
    console.log(`Client connected [id=${socket.id}]`.blue.bold);
    socket.emit('server_setup', `Server connected [id=${socket.id}]`);
});
```
Note that emit is the response that the server will send to the browser. 

-> the browser will react to that messeage through
```js
socketio.on('server_setup', function (data) {
    console.log(data);     
});   
```


## Commit ID
Chapter 1