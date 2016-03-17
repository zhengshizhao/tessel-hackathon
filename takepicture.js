// takepicture.js

var port = 8000;
var serverUrl = "127.0.0.1";
var http = require("http");
var path = require("path"); 
var fs = require("fs"); 		
// var server = http.createServer();
var request = require('request');

console.log("Starting web server at " + serverUrl + ":" + port);

function takeAPicture () {
	request('10.9.108.157', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log("contacting tessel") 
	  }
	})
}

function testing2() {
	console.log("testing")
}