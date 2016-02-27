/* js/app.js */

// io is a function within the socket.io library
var socket = io();

socket.on('connect', function () {
    console.log('Connected to Socket.io server!');
});

// frontend listens for an event called message, and when it gets that event
// it prints it to the screen
socket.on('message', function (message) {
    console.log('New message: ');
    console.log(message.text);
})