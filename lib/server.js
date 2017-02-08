

// Load the http module to create an http server.
var http = require('http');

var config = require('../config');
var port = config.port;


module.exports = function (app) {
  
  var server = http.createServer(app).listen(port, function (err) {
    //  Server started
    console.log('Server started on port: ' + port);
  });
  
  return server;
};