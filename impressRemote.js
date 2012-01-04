var fs = require('fs');
var static = require('node-static');
var file = new(static.Server)('./static');

var app = require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      file.serve(request, response);
    });
}).listen(80);

var io = require('socket.io').listen(8080);
io.sockets.on('connection', function (socket) {
    socket.on('slideUpdate', function (data) {
	  socket.broadcast.emit('hashChange', { hash: data });	
	});
});