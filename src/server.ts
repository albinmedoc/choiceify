import sirv from 'sirv';
import polka from 'polka';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import compression from 'compression';
import * as sapper from '@sapper/server';

import Games from './utils/games';

const games = new Games();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const server = http.createServer();
const io = new SocketIOServer(server);

polka({ server })
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, (err: Error) => {
		if (err){
			console.log('error', err);
			process.exit();
		}
	});

io.on('connection', (socket: Socket) => {
	socket.on('createGame', (gameInfo) => {
		// Create game, and save the game pin
		const pin = games.addGame(gameInfo);

		socket.join(pin); // Join room based on the pin

		console.log('Game created with pin: ' + pin);

		socket.emit('gameCreated', pin);
	});

	socket.on('playerJoined', (pin) => {
		if(!games.getGame(pin)){
			socket.emit('noGameFound');
			return;
		}
		socket.join(pin); // Join room based on the pin
	});

	socket.on('startGame', (pin) => {
		const gameInfo = games.getGame(pin);
		io.to(pin).emit('gameStarted', gameInfo);
	});
});