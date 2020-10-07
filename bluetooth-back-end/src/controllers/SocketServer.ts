import ioserver from 'socket.io';
import * as http from 'http';

export function init(http: http.Server) {
	io = ioserver(http);
}

export function get(): ioserver.Server {
	if (!io) {
		throw new Error("Socket Server not intialiased. Call SocketServer() first.");
	}
	return io;
}

let io: ioserver.Server;
