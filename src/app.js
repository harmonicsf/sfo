import http from 'http';
import express from 'express';

let app = express();
app.server = http.createServer(app);

let port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";


app.get('/', function (req, res) {
  res.sendfile('index.html');
});
app.server.listen(port, ip, function () {
  console.log('Example app listening on port '+port);
});
