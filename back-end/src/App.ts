import express from 'express';
import https from 'https';
import tls from 'tls';
import { Database } from './Model/Database'
import { UserModel} from './Model/User'
import * as Conf from './Conf';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';

// Create a new express application instance
const app: express.Application = express();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // cors is needed to allow http (axios) connection

let db = new Database()
db.connect("mongodb://localhost:27017/slowvid");
UserModel.create({userId: "HASH_ID_TEST"});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/authenticate', (req, res) => {
	const cert = (req.socket as tls.TLSSocket).getPeerCertificate();

	if (Object.keys(cert).length > 0 && (req.socket as tls.TLSSocket).authorized) {
		res.send(`Hello ${cert.subject.CN}, your certificate was issued by ${cert.issuer.CN}!`);

	} else if (cert.subject) {
		res.status(403)
			 .send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`);

	} else {
		res.status(401)
		   .send(`Sorry, but you need to provide a client certificate to continue.`);
	}
});

// listens on https
https.createServer(Conf.httpsOptions, app).listen(4433, () => {
  console.log("Listening at https://localhost:4433");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

process.on('exit', function () {
  db.disconnect();
});
