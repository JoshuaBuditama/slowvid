import express from 'express';
import https from 'https';
import { Database } from './model/Database'
import { router, httpRouter } from './routes/Router';
import * as PassportConfig from './controllers/PassportConfig';
import * as Conf from './Conf';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';



// Create a new express application instance
const app: express.Application = express();

app.use('/http', httpRouter);

app.use(passport.initialize());
PassportConfig.setupPassport(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // cors is needed to allow http (axios) connection

let db = new Database()
db.connect("mongodb://localhost:27017/slowvid");

app.use('/api', router);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// listens on https
https.createServer(Conf.httpsOptions, app).listen(4000, () => {
  console.log("Listening at https://localhost:4000");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

process.on('exit', function () {
  db.disconnect();
});
