// Running on your computer.

var express = require('express');
var http = require('http');
var fs = require('fs');
var server = http.createServer();
var app = express();
var request = require('request');

server.on('request', app);

server.listen(3001, function () {
 console.log('Server on.');
});

app.get('/test', function (req, res, next) {
  console.log("hello");
  res.send("hi")
});

app.get('/picture', function(req,res) {

  console.log("picture route")

  var imageData = new Buffer(0);

  request
    .get('http://10.9.108.157:1337')

    .on('data', function(data) {
        imageData = Buffer.concat([imageData, data]);
        console.log("chunking")
      })
    .on('response', function(response) {
      console.log("receiving data")
    })
    .on('end', function() {
      console.log("*** ending")
      fs.writeFile('./images/'+ Date.now().toString() + '.jpg', imageData);
      res.send(imageData)
    })
})