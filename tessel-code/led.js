var tessel = require('tessel');

var gpiopin = tessel.port['GPIO'].digital[0];

setInterval(function () {
    console.log("I'm blinking! (Press CTRL + C to stop)");
    // Toggle the led states
    gpiopin.toggle()
}, 100);