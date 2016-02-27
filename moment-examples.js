/*
 * moment-examples.js
 *
 * Just playing around with moment. Moment makes working with and formatting
 * time in javascript a LOT easier.
 *
 * UNIX timestamps: a way to pass dates between different computers.
 * The number of seconds since midnight on Jan 1 1970.
 * Why use timestamps:
 *   Timestamps are time zone independent.
 *   Comparing times is trivial.
 * 
 * Javascript timestamps are the same, but use miliseconds.
*/

var moment = require('moment'),
    now    = moment();

// get current unformatted  timestamp
// year-month-date T hour:min:sec : GMT offset
console.log(now.format());
console.log(now.format('X'));  // 'X' = seconds since Jan 1 1970 (a STRING!)
console.log(now.format('x'));  // 'x' = miliseconds since Jan 1 1970 (a STRING!)

// need to use valueOf to make it a number ...
console.log(now.valueOf());
console.log(typeof(now.valueOf()));  // = a NUMBER, so we can do comparrisons

// so how do we print a date from a given timestamp?
var timestamp = 1456616987699,
    timestampMoment = moment.utc(timestamp);

// include the .local() method to correct for UTC offset
console.log(timestampMoment.local().format('h:mm a'));  // format like 11:06 am


//    // we can add & subtract time
//    now.subtract(1, 'year');
//    console.log(now.format());
//
//    /* pass it formatting strings! Examples:
//    http://momentjs.com/docs/#/displaying/
//
//    moment().format();                                // "2014-09-08T08:02:17-05:00" (ISO 8601)
//    moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
//    moment().format("ddd, hA");                       // "Sun, 3PM"
//    moment('gibberish').format('YYYY MM DD');         // "Invalid date"
//
//    
//
//    // we want time like this: 6:45 pm
//    console.log(now.format('h:mm a'));
//
//    // now format like Oct 5th 2015, 6:45 pm
//    console.log(now.format('MMM Do YYYY, h:mm a'));*/