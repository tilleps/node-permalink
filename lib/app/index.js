var express = require('express');
var app = express();


app.set('strict routing', true);
app.set('json spaces', 2);


///////////////////////////////////////////////////////////////////////////////
//
//  Middleware
//
require('./middleware')(app);


///////////////////////////////////////////////////////////////////////////////
//
//  Routes
//
app.use('/', require('../router'));


app.use('/', function (req, res, next) {
  res.send('!');
});


//
//  Module Routes
//
//  If modules are included here (versus router level), app settings will be
//  carried over into the submodules.  Otherwise, template engines / etc will
//  need to be redefined for each submodule.
//
//app.use('/auth', require('./modules/auth/lib/app'));


//
//  404: NOT FOUND
//
app.use(require('../routes/notfound'));


//
//  500: INTERNAL ERROR
//
app.use(require('../routes/error'));


module.exports = app;