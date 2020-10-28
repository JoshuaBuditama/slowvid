import express from 'express';
import { Database } from './Model/Database'
import { UserModel} from './Model/User'

// Create a new express application instance
const app: express.Application = express();

let db = new Database()
let dbUrl = process.env.DB_URL || "mongodb://localhost:27017/slowvid"
let port = process.env.PORT || 3000
console.log("Starting on port: " +port)
console.log("Connected to db: " +dbUrl)
db.connect(dbUrl);
UserModel.create({userId: "HASH_ID_TEST"});

// Required by App Engine for liveness check
app.get('/', function (req, res) {
  res.send('Liveness check OK');
});


// API routes prefixed so we can serve both from the same host (no CORS required)
app.get('/api/hello', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});

process.on('exit', function () {
  db.disconnect();
});
