
module.exports = function (req, res, next) {
  res.status(404);
  
  if (req.accepts('html')) {
    //res.redirect('404.html');
    //res.send('<b>404:</b> NOT FOUND (HTML)');
    var options = {
      //root: __dirname + '/../../static/',
      root: 'static/',
      dotfiles: 'deny'
    };
    res.sendFile('404.html', options, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
    });
    return;
  }
  
  if (req.accepts('json')) {
    res.send({ error: "404: NOT FOUND" });
    return;
  }
  
  res.type('txt').send('404: NOT FOUND');  
};