

var basePath = process.cwd();
var toobusy = require('toobusy-js');
var express = require('express');

var cors = require('cors');




module.exports = function (app) {
  
  app.set('trust proxy', true);
  
  
  //
  //  Disable x-powered-by header
  //
  app.disable('x-powered-by');
  
  
  //
  //  Service throttle / too busy
  //
  toobusy.maxLag(70);     // default: 70
  toobusy.interval(500);  // default: 500
  
  
  app.use(function (req, res, next) {
    
    if (~['production'].indexOf(app.get('env')) && toobusy()) {
      
      var requestType = req.get('Content-Type');
      var accepts = req.accepts('json');
      
      //  Set status to 503
      res.status(503);
      
      switch (requestType) {
        case 'application/json':
          res.json({
            "status": "error",
            "message": "Server is busy"
          });
          break;
          
        default:
          //  @todo
          res.send('Server is busy');
          break;
      }
      
    }
    else {
      next();
    }
  });
  
  
  //
  //  CORS
  //
  app.use(cors());
  
  
  /*
  process.on('SIGINT', function () {
    toobusy.shutdown();
    process.exit();
  });
  //*/
  
  
  //
  //  Compression
  //
  //app.use(require('compression')());
  
  
  //
  //  User Agent
  //
  //app.use(require('./middlewares/useragent'));


  //
  //  Favicon
  //
  app.use(require('serve-favicon')(basePath + '/static/favicon.ico'));
  
  
  //
  //  Static
  //
  //  Note: Should be BEFORE session, otherwise a session is created for
  //        for every requested static item
  //
  //app.use('/_', express.static(path.join(__dirname, '..', 'static')));
  //app.use(express.static(basePath + '/public'));
  app.use(express.static(basePath + '/build/app'));
  app.use(express.static(basePath + '/static'));
  app.use(express.static(basePath + '/modules/permalink/static'));
  
  if (~['development'].indexOf(app.get('env'))) {
    app.use(express.static(basePath + '/node_modules/devstack/static'));
  }

  
  /*
  //
  //  Session
  //
  //  NOTE: This MUST be before Passport
  //
  //  express-session deprecated undefined resave option; provide resave option
  //  express-session deprecated undefined saveUninitialized option; provide saveUninitialized option
  //
  //  @deprecated Moved to ./middlewares/session
  if (~['production'].indexOf(app.get('env'))) {
  
    // trust first proxy
    app.set('trust proxy', 1);

    app.use(function (req, res, next) {
      var store = registry.instance('sessionStore');
    
      middlewares.session({
        store: store,
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: true,
          httpOnly: true,
          maxAge: 2419200000
        }
      })(req, res, next);    
    
    }); 
  
  }
  else {
  
    app.use(function (req, res, next) {
      var store = registry.instance('sessionStore');
    
      middlewares.session({
        store: store,
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          maxAge: 2419200000
        }
      })(req, res, next);    
    
    });

  
  }
  */
  
  
  //
  //  Passport
  //
  //  Problem: req.user undefined
  //  Solution: Place session middleware before passportjs middleware
  //
  //  @deprecated Moved to ./middlewares/session
  //var passport = require('passport');
  //var passport = require('./modules/auth/lib/middlewares/passport');

  //app.use(passport.initialize());
  //app.use(passport.session());

  
  //
  //  Body Parser
  //
  //app.use(middlewares.bodyparser.urlencoded({ limit: '50mb', extended: false }));
  //app.use(middlewares.bodyparser.json({ limit: '50mb' }));

  
  //
  //  CSRF
  //  https://github.com/expressjs/csurf
  //  req.csrfToken()
  //
  //app.use(require('csurf')());


  //  Moved to ./middlewares/session
  //app.use(require('express-flash')());


  //  Apply as needed
  //app.use(require('./middlewares/session'));
  
  
  //
  //  Development Environment only Middleware
  //
  if (~['development'].indexOf(app.get('env'))) {
  
  }

  //
  //  Assets directory
  //
  app.use(function (req, res, next) {
  
    res.locals.assets = '_' + '/';
    res.locals.cdn = '';
    res.locals.cdnAssets = res.locals.assets + res.locals.cdn;
  
    next();
  });
  
  
  /*
  ///////////////////////////////////////////////////////////////////////////////
  //
  //  View Engines
  //
  var templateEngines = require('devstack/lib/engines')();

  //  Register engines
  //app.engine('hbr', templateEngines.handlebars);
  //app.engine('htm', templateEngines.html);
  //app.engine('html', templateEngines.htmling);
  app.engine('md', templateEngines.markdown);
  app.engine('ejs', templateEngines.lodash);
  //*/

  //  Set default engine
  app.set('view engine', 'ejs');

  //  Set view directories
  app.set('views', __dirname + '/../views');

  //app.set('view cache', true);


  //
  //  View/Template Normalization
  //
  //  Set BaseURL - should be called at app level
  //
  app.use(function (req, res, next) {
  
    res.locals.baseUrl = req.baseUrl + '/'; 
  
    next();
  });
  
  
  //require('./apply-swagger')(app);
  
}
