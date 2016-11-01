var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

http.listen(port, ip, function () {
  console.log('Example app listening on port 3000!');
});
io.on('connection', function(socket){
  socket.broadcast.emit('hi');
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});
