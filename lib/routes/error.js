
module.exports = function (err, req, res, next) {
  
  res.status(500);
  

  //
  //
  //
  if (typeof err == 'string') {
    console.error('Error supplied is string, expecting Error()');
    err = new Error(err);
  }
  
  console.log('err.name', err.name);
  console.log('err.message', err.message);
  console.log('err.status', err.status);
  console.log('err.code', err.code);
  
  console.log('err.fileName', err.fileName);
  console.log('err.lineNumber', err.lineNumber);
  console.log('err.columnNumber', err.columnNumber);
  console.log('err.stack', err.stack);
  


  
  var msg = 'Internal Error';
  
  if (~['development'].indexOf(process.env.NODE_ENV)) {
    msg += ": " + err.message;
  }
  
  
  /*
  //
  //  Convert Error Object to JSON
  //
  if (req.accepts('json')) {
    msg = JSON.stringify(err, null, 2);    
  }
  */
  
  

 
  if (req.accepts('html')) {
    //res.send('Internal Error!');
    
    var options = {
      root: 'static/',
      dotfiles: 'deny'
    };
    res.sendFile('500.html', options, function (err) {
      if (err) {
        console.error(err);
        
        if (err.status) {
          res.status(err.status);
        }
        res.end();
      }
    });
    return;
  }


  if (req.accepts('json')) {
    res.send({ error: "404: NOT FOUND" });
    return;
  }
    

  

  
  
  res.status(500).send(msg);
};
