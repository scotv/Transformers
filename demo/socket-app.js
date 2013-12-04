var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(80);

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { message: 'hello socket.io', error: '', time: (new Date()).toISOString() });
  socket.on('my other event', function (data) {
    console.log('my other event', data);
  });
});