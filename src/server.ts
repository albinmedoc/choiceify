import sirv from 'sirv';
import express from 'express';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import compression from 'compression';
import * as sapper from '@sapper/server';

import Games from './utils/games';
import Game from './utils/game';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';


const app = express();
const server = new http.Server(app);
const io = new SocketIOServer(server);

app.use(
	compression({ threshold: 0 }),
	sirv('static', { dev }),
	sapper.middleware()
)
	.listen(PORT);

io.on('connection', (socket: Socket) => {
});