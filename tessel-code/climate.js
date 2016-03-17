var http = require('http');
var server = http.createServer();
var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['A']);
var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['B']);

var notificationLED = tessel.led[3];

server.on('request', function (req, res) {
    console.log('request', req);
    if (req.url === '/') {
        console.log('taking picture!!!')
        camera.takePicture(function (err, image) {
            if (err) return console.error(err);
            notificationLED.low();
            var name = 'picture-' + Math.floor(Date.now()*1000) + '.jpg';
            process.sendfile(name, image);
            climate.on('ready', function () {
                climate.readTemperature('f', function (err, temp) {
                    climate.readHumidity(function (err, humid) {
                         res.setHeader('Content-Type', 'image/jpg');
                         var surveillanceData = {
                            image: image,
                            humidity: humid.toFixed(4),
                            temperature: temp.toFixed(4)
                         }
                         console.log(surveillanceData);
                         res.end(surveillanceData, 'binary');
                         // res.end(image, 'binary');
                    }
                }
            }
            camera.disable();
        });
    }
    // if (req.url === '/climate') {

    // }
});

camera.on('error', function(err) {
    console.error(err);
})

camera.on('ready', function () {
    notificationLED.high();
    server.listen(1337, function () {
        console.log('Server listening!');
    });
});


// var http = require('http');
// var server = http.createServer();
// var tessel = require('tessel');
// var climatelib = require('climate-si7020');
// var climate = climatelib.use(tessel.port['B']);

// server.on('request', function(req, res) {
//   if (req.url === '/') {

//   }
// })

// climate.on('ready', function () {
//   console.log('Connected to si7020');

//   // Loop forever
//   setImmediate(function loop () {
//     climate.readTemperature('f', function (err, temp) {
//       climate.readHumidity(function (err, humid) {
//         console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');
//         // res.json(temp.toFixed(4) + 'F');
//         setTimeout(loop, 300);
//       });
//     });
//   });
// });

// climate.on('error', function(err) {
//   console.log('error connecting module', err);
// });