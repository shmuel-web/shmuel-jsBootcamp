var net = require('net');

var server = net.createServer(function(socket){
   socket.write('welcome!');

    socket.on('data', function (chunk) {
        socket.write(chunk);
    });

    socket.on('end',socket.end);
});

server.listen(1337,'0.0.0.0');

console.log("server running");