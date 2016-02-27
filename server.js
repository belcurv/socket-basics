// server.js //

var port    = process.env.PORT || 3000,
    express = require('express'),
    app     = express();

// creating a server using Node instead of express
// Tells Node to create a new server and use our Express app as the boilerplate.
// So anything our Express app listens to, the server should also listen to.
var http    = require('http').Server(app);

app.use(express.static(__dirname + '/public'));

http.listen(port, function () {
    console.log('Server listening on port: ' + port);
});