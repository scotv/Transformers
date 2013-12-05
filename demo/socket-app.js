var app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(80);

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
	socket.emit('news', {
		message: 'hello socket.io',
		error: '',
		time: (new Date()).toISOString()
	});
	
	socket.on('container-change', function (data) {
		console.log('container-change');
		console.log('args', arguments.length)
		console.log(data);
		socket.broadcast.emit('push-change', data);
	});
});