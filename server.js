// server.js //

var port    = process.env.PORT || 3000,
    express = require('express'),
    app     = express(),
    moment  = require('moment');

// creating a server using Node instead of express
// Tells Node to create a new server and use our Express app as the boilerplate.
// So anything our Express app listens to, the server should also listen to.
var http    = require('http').Server(app);

// Socket.io is required like this.  We call it directly with the http server.
// This is the format Socket.io expects.
// The io variable is used like Express' app variable.
var io      = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

// need to keep track of users and rooms so we know where to route their messages
var clientInfo = {};   // key = unique socket id, value = the user details

// on method lets us listen for events.  Takes 2 arguments, the event we're
// listening for and a callback when it happens.
// We get access to individual connected sockets.
io.on('connection', function (socket) {
    console.log('User connected via socket.io');
    
    // handle disconnects
    // Socket.io has a built in disconnect method
    socket.on('disconnect', function () {
        // Since Ww use it often, store clientInfo[] in a var.
        var userData = clientInfo[socket.id];
        
        // check if user is actually part of a chat room.
        // if clientInfo is not undefined, run code.
        if (typeof userData !== 'undefined') {
                        
            // then disconnect user from room
            // .leave takes the room name, which clientInfo has
            socket.leave(userData.room);
            
            // then emit message to room that user has left room
            io.to(userData.room).emit('message', {
                name: 'System',
                text: userData.name + ' has left the room.',
                timestamp: moment().valueOf()
            });
            
            // finally, delete user from clientInfo object
            // 'delete' lets us delete an attribute from an object
            delete clientInfo[socket.id];
        }
    });
    
    // handle users requesting to join a room
    socket.on('joinRoom', function (req) {     // joinRoom object from app.js
        
        // socket.id is where Socket.io stores the UID.
        clientInfo[socket.id] = req;   // set UID = to the request object
        
        // .join is a built-in method tells socket to join a specific room
        socket.join(req.room);  
        
        // tell the users in the room that a new person joined.
        // .to method lets us spec which room to send the message to.
        // Then emit the event
        socket.broadcast.to(req.room).emit('message', {
            name: 'System',
            text: req.name + ' has joined.',
            timestamp: moment().valueOf()
        });
    });

    // allow 2 browsers to talk to each ohter
    // emit every message that comes in
    socket.on('message', function (message) {
        console.log('Message received: ' + message.text);
        
        // add javascript timestamp property to message object
        message.timestamp = moment().valueOf();
        
        // two broadcast options:
        //   io.emit = sends message to everyone including the sender.
        //   socket.broadcast.emit = sends it to everone EXCEPT the sender.
        // the .to method + clientInfo, etc routes messages to correct rooms.
        io.to(clientInfo[socket.id].room).emit('message', message );
        
    });
    
    // emit initial system message.
    // emit method takes 2 args: event name and data to send
    socket.emit('message', {
        name: 'System',
        text: 'Welcome to the chat application',
        timestamp: moment().valueOf()  // add js timestamp to system emit
    });
});


http.listen(port, function () {
    console.log('Server listening on port: ' + port);
});