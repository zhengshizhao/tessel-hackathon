// https://gist.github.com/hectorcorrea/2573391

var port = 8000;
var serverUrl = "127.0.0.1";
var http = require("http");
var path = require("path"); 
var fs = require("fs"); 		
// var server = http.createServer();

console.log("Starting web server at " + serverUrl + ":" + port);

var server = http.createServer(function(req,res) {

}).listen(port, serverUrl);

// http.createServer( function(req, res) {

// 	var now = new Date();

// 	var filename = req.url || "index.html";
// 	var ext = path.extname(filename);
// 	var localPath = __dirname;
// 	var validExtensions = {
// 		".html" : "text/html",			
// 		".js": "application/javascript", 
// 		".css": "text/css",
// 		".txt": "text/plain",
// 		".jpg": "image/jpeg",
// 		".gif": "image/gif",
// 		".png": "image/png"
// 	};
// 	var isValidExt = validExtensions[ext];

// 	if (isValidExt) {
		
// 		localPath += filename;
// 		fs.exists(localPath, function(exists) {
// 			if(exists) {
// 				console.log("Serving file: " + localPath);
// 				getFile(localPath, res, ext);
// 			} else {
// 				//getFile(localPath, res, isValidExt);
// 				console.log("File not found: " + localPath);
// 				res.writeHead(404);
// 				res.end();
// 			}
// 		});

// 	} else {
// 		console.log("Invalid file extension detected: " + ext)
// 	}

// }).listen(port, serverUrl);

function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			res.setHeader("Content-Type", mimeType);
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}

/* http request test */

var options2 = {
  hostname: 'www.google.com',
  port: 80,
  path: '/',
  method: 'GET'
  }
}

server.on('request', function (req, res) {
    if (req.url === '/test') {
	var req = http.request(options2, (res) => {
	  console.log(`STATUS: ${res.statusCode}`);
	  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
	  res.setEncoding('utf8');
	  res.on('data', (chunk) => {
	    console.log(`BODY: ${chunk}`);
	  });
	  res.on('end', () => {
	    console.log('No more data in response.')
	  })
	});
        }
    }
});


var postData = querystring.stringify({
  'msg' : 'Hello World!'
});

var options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};



var req = http.request(options2, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.')
  })
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();