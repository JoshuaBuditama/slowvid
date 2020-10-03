import express from 'express';
import { Database } from '../../back-end/src/Model/Database';
import bodyParser from 'body-parser';
import { router, iorouter } from './routes/Router';
import ioserver from 'socket.io';
import * as http from 'http';
import {BluetoothMsgModel } from './model/BluetoothMsgModel';
import cors from 'cors';

let db = new Database()
db.connect("mongodb://localhost:27017/bts");
BluetoothMsgModel.create({ deviceId: "TEST ID"});

const app: express.Application = express();

let httpserver = http.createServer(app);
let io = ioserver(httpserver);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // cors is needed to allow http (axios) connection

app.get('/', (req, res) => {
	res.send('Hello World!!');
});
app.use('/api', router);

io.on('connection', iorouter);

const apiPort = 3002;
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

process.on('exit', function () {
	db.disconnect();
});
