var express = require("express"),
    path = require('path'),
    routes = require('./server/routers').router,
    init = require('./server/routers').init,
    app = express();

var server = require('http').createServer(app).listen(5000);
var io = require('socket.io').listen(server);


// Configuration
app.configure(function () {
    app.set('views', path.join(__dirname, '/app'));
    app.use(express.bodyParser());
    app.use(express.logger());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/app'));
    app.use(app.router);
    app.engine('html', require('ejs').renderFile);
});

routes(app);
init(true);

io.sockets.on('connection', function(socket){

    socket.on('deal-edited', function(deal){
        socket.emit('deal-edited',deal);
    });
    socket.on('deal-created', function(deal){
        socket.broadcast.emit('created',deal);
    });
});

/*var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on " + port);
});*/
