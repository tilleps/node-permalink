var express = require('express');
var router = express.Router({ "strict": true });


var shorten = require('./utils/shorten')();

//var config = require('../config/dbs/postgres/knexfile');
var db = require('./db');


router.use(express.static(__dirname + '/../static'));

//console.log('!!!!', __dirname + '/../static');


router.get('/admin', function (req, res, next) {
  res.send('admin');
});


//
//  CREATE
//
router.post('/api/', function (req, res, next) {
  
  var values = {
    url: "https://trello.com/c/4dc0XXPa/33-url-service",
    description: "Trello thing"
  };
  
  db.insert(values)
    .then(function(err, row) {
      console.log('ROW', err, row);
    });
  
  res.send('POST /');  
});


//
//  READ
//
router.get('/api/:id', function (req, res, next) {
  res.send('GET /:id ' + req.params.id);
});


//
//  UPDATE
//
router.patch('/api/:id', function (req, res, next) {
  res.send('PATCH /:id ' + req.params.id);
});


//
//  DELETE
//
router.delete('/api/:id', function (req, res, next) {
  res.send('DELETE /:id ' + req.params.id);
});


//
//  Redirect
//
router.get('/link/:id', function (req, res, next) {
  //res.send('GET /:id ' + shorten.decode(req.params.id));
  
  var id = shorten.decode(req.params.id);
  //console.log('id', id);
  
  /*
  //  Promise
  db.findById(id)
    .then(function (row) {
      
      if (!row) {
        //  Send missing/invalid message
        res.status(404).send('Invalid link');
        return;
      }
      
      //  Redirect
      res.redirect(row.url);
      return;      
    })
    .catch(next);
  //*/
  
  //*
  //  Callback
  db.findById(id, function (err, row) {
    
    if (err) { return next(err); }
    
    if (!row) {
      //  Send missing/invalid message
      res.status(404).send('Invalid link');
      return;
    }
    
    //  Redirect
    res.redirect(row.url);
    return;
  });
  //*/
  
});


//
//  Link Information
//
router.get('/link/:id/info', function (req, res, next) {
  //res.send('GET /:id/info ' + req.params.id);
  
  var id = shorten.decode(req.params.id);

  db.findById(id, function (err, row) {
    if (err) { return err; }
    
    if (!row) {
      //  Send missing/invalid message
      res.status(404).send('Invalid link');
      return;
    }
    
    res.send(row);
    return;
  });
  
});


//
//  QRCode
//
router.get('/link/:id/qrcode', function (req, res, next) {
  
  var id = shorten.decode(req.params.id);
  
  db.findById(id, function (err, row) {
    if (err) { return err; }
    
    if (!row) {
      //  Send missing/invalid message
      res.status(404).send('Invalid link');
      return;
    }
    
    res.render(__dirname + '/views/qrcode.ejs', row);
    
    return;
  });
  
    
  
  
  //res.send('GET /:id/qrcode ' + shorten.decode(req.params.id));
});


module.exports = router;
