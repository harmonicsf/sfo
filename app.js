var express = require('express');
var app = express();

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, ip, function () {
  console.log('Example app listening on port 3000!');
});
