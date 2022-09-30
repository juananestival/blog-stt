/**
 * @license
 * Copyright 2022  
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */


/**
 * Import section
 * =============================================================================
 */

import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import bodyParser from "body-parser";
import sampleRoutes from './routes/sampleRoutes.js'
import { createServer } from "http";
import { Server } from "socket.io";
import { dirname } from 'path';
import * as path from 'path'
import { fileURLToPath } from 'url';
import * as http from 'http';

/**
 * App Globals section
 * =============================================================================*/
dotenv.config();
const PORT = process.env.PORTNODE || 3000;
const PROJECT_ID = process.env.PROJECT_ID;
const app = express();
var server;


/**
 * Funtion Definitions
 * =============================================================================*/
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

/**
 * Function calls
 * =============================================================================
 */
startServer();