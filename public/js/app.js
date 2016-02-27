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
    
    jQuery('.messages').append('<p>' + message.text + '</p>');
});

// Handles submitting of new message
// the $ means this variable stores a jQuery instance of the element
var $form = jQuery('#message-form');

// Built-in browser event 'submit'.
// Anon callback is passed an arg that stores an event.
// The event stores some useful info; we'll only use it for one thing.
$form.on('submit', function (event) {
    
    // call the one method we need on the event object.
    // preventDefault is used when we don't want to submit a form the old
    //   fashioned way (refreshing the page). When using sockets or ajax
    //   requests (like our todo api) you want to use event.preventDefault
    //   so we can handle form submission on our own.
    event.preventDefault();
    
    var $message = $form.find('input[name=message]');
    
    // send the message to the server
    socket.emit('message', {
        //set 'text' = to any input tag who's name attribute is 'message'.
        // then method .val pulls value out and returns it as a string.
        text: $message.val()
    });
    
    // finally, clear input form
    $message.val('');
});