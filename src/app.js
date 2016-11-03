import http from 'http';
import express from 'express';

let app = express();
let app = express();
app.server = http.createServer(app);
app.get('/', function (req, res) {
  res.sendfile('index.html');
});
http.listen(port, ip, function () {
  console.log('Example app listening on port '+port);
});
