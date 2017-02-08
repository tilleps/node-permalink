


process.on('uncaughtException!!', function (err) {
  
  var stack = err.stack;
  
  //  Skip node_modules errors
  var filtered = stack.split("\n").filter(function (line) {
    return !/node_modules/.test(line);
  });
  
  console.error('uncaughtException', err, filtered.join("\n"));
  
  
  //
  //  Keep from crashing
  //
  
});


///////////////////////////////////////////////////////////////////////////////
//
//  Start App Server
//
var app = require('./lib/app');
var server = require('./lib/server')(app);