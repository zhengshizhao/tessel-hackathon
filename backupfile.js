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

app.get('/takepicture', function (req, res, next) {

  console.log("taking a picture...")

  request('10.9.108.157', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("contacting tessel") 
      res.send(body);



    }
    if(error) {
      console.error("error:",error)
      res.send("error:",error)
    }
  });

});

app.get('/getpic', function (req, res, next) {

  var theResponse; 

  console.log("taking a picture...")

  request('http://10.9.108.157:1337', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("contacting tessel") 
      console.log("response", response)
      theResponse = response.body;
      }
      else {
        console.error(error);
        theResponse = error.message;
      }
    })

  res.send(theResponse);

});

 

app.get('/buffer', function (req, res, next) {

  var theResponse; 

  console.log("starting /buffer route")

  request('http://10.9.108.157:1337', function (error, response, body) {
    if (!error && response.statusCode == 200) {

      console.log("inside IF")
      // var imageData = new Buffer(0);
      fs.writeFile('./test4.jpg', response.body)
      res.send(response.body)
      // request.on('response', function(response) {
        // console.log("response is", response.body)
        // fs.writeFile('./test4.jpg', response.body)
      // })

      // request.on('response', function (chunk) {
      //   console.log("receiving response!")
      //   imageData = Buffer.concat([imageData, chunk]);
      // });

      // request.on('data', function (chunk) {
      //   console.log("receiving data!")
      //   imageData = Buffer.concat([imageData, chunk]);
      // });

      // request.on('end', function () {
      //   //   console.log("done receiving data")
      //   //   // Full image ready.
      //   // fs.writeFile('./test1.jpg', response.body);
      //   fs.writeFile('./test3.jpg', response.body);
      //     // res.send(imageData);
      //     // res.send(response.body)
      //   // })
      //   // res.send("done");
      // });
    }
    else {
      console.error('error',error.message)
    }
  });

});


app.get('/simpletest', function (req, res, next) {

  var theResponse; 

  console.log("starting /simpletest route")

  request('http://10.9.108.157:1337', function (error, response, body) {
    if (!error && response.statusCode == 200) {

      console.log("inside IF")
      fs.writeFile('./test4.jpg', response.body)
      res.send(response.body)
    }
    else {
      console.error('error',error.message)
    }
  });

});

app.get('/chunktest', function(req,res) {

  console.log("chunk test")

  var imageData = new Buffer(0);

  request
    .get('http://10.9.108.157:1337')

    .on('data', function(data) {
        // decompressed data as it is received 
        //       //   imageData = Buffer.concat([imageData, chunk]);
        console.log('decoded chunk: ' + data)
      })
    .on('response', function(response) {
      // unmodified http.IncomingMessage object 
      response.on('data', function(data) {
        // compressed data as it is received 
        console.log('received ' + data.length + ' bytes of compressed data')
      })
    });
});


app.get('/buffertest2', function(req,res) {

  console.log("buffertest2 test")

  var imageData = new Buffer(0);

  request
    .get('http://10.9.108.157:1337')

    .on('data', function(data) {
        // decompressed data as it is received 
        imageData = Buffer.concat([imageData, data]);
        // console.log('decoded chunk: ' + data)
        console.log("chunking")
      })
    .on('response', function(response) {
      // unmodified http.IncomingMessage object 
        response.on('data', function(data) {
          // compressed data as it is received 
          // console.log('received ' + data.length + ' bytes of compressed data')
          console.log("receiving data")
        })

        // req.on('end', function () {
        //    // Full image ready.
        //     fs.writeFile('./'+ Date.now().toString() + '.jpg', imageData);
        // });

    })
    .on('end', function(finaldata) {
      console.log("*** ending")
      fs.writeFile('./test7.jpg', imageData);
      res.send(imageData)
    })
});


app.get('/buffertest3', function(req,res) {

  console.log("buffertest3 test")

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
      fs.writeFile('./buffertest4.jpg', imageData);
      res.send(imageData)
    })
})