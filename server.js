// server.js //

var port    = process.env.PORT || 3000,
    express = require('express'),
    app     = express();

// creating a server using Node instead of express
// Tells Node to create a new server and use our Express app as the boilerplate.
// So anything our Express app listens to, the server should also listen to.
var http    = require('http').Server(app);

// Socket.io is required like this.  We call it directly with the http server.
// This is the format Socket.io expects.
// The io variable is used like Express' app variable.
var io      = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

// on method lets us listen for events.  Takes 2 arguments, the event we're
// listening for and a callback when it happens.
// We get access to individual connected sockets.
io.on('connection', function (socket) {
    console.log('User connected via socket.io');
    
    // allow 2 browsers to talk to each ohter
    // emit every message that comes in
    socket.on('message', function (message) {
        console.log('Message received: ' + message.text);
        
        // to broadcast options:
        //   io.emit = sends message to everyone including the sender
        //   socket.broadcast.emit = sends it to everone EXCEPT the sender
        io.emit('message', message);
        
    });
    
    
    // emit method takes 2 args: event name and data to send
    socket.emit('message', {
        text: 'Welcome to the chat application'
    });
});


http.listen(port, function () {
    console.log('Server listening on port: ' + port);
});