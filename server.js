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
io.on('connection', function () {
    console.log('User connected via socket.io');
})



http.listen(port, function () {
    console.log('Server listening on port: ' + port);
});