var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var browserify = require('browserify');
var React = require('react');
var jsx = require('node-jsx');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

jsx.install();
var Books = require('./views/index.jsx');

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

app.use('/', function(req, res) {
  var books = [{
    title: 'Professional Node.js',
    read: false
  }, {
    title: 'Node.js Patterns',
    read: false
  }];

  res.setHeader('Content-Type', 'text/html');
  res.end(React.renderToStaticMarkup(
    React.DOM.body(
      null,
      React.DOM.div({
        id: 'app',
        dangerouslySetInnerHTML: {
          __html: React.renderToString(React.createElement(TodoBox, {
            data: data
          }))
        }
      }),
      React.DOM.script({
        'id': 'initial-data',
        'type': 'text/plain',
        'data-json': JSON.stringify(data)
      }),
      React.DOM.script({
        src: '/bundle.js'
      })
    )
  ));
});

app.use('/bundle.js', function(req, res) {
  res.setHeader('content-type', 'application/javascript');
  browserify('./app.js', {
    debug: true
  })
  .transform('reactify')
  .bundle()
  .pipe(res);
});

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
