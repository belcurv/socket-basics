/* js/app.js */

// io is a function within the socket.io library
var socket = io();

socket.on('connect', function () {
    console.log('Connected to Socket.io server!');
});