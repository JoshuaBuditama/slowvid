import express from 'express';
import { Database } from './model/Database'
import { UserModel} from './model/User'

// Create a new express application instance
const app: express.Application = express();

let db = new Database()
db.connect("mongodb://localhost:27017/slowvid");
UserModel.create({userId: "HASH_ID_TEST"});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

process.on('exit', function () {
  db.disconnect();
});
