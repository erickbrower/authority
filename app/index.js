var express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  //favicon = require('serve-favicon'),
  oauthserver = require('oauth2-server'),
  cookieParser = require('cookie-parser'),
  Handlebars = require('handlebars'),
  router = require('../config/routes'),
  path = require('path'),
  fs = require('fs'),
  app = express();

app.use(logger('short'));

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use(methodOverride());
app.use(cookieParser());

router.route(app);

app.engine('html', require('consolidate').handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

var partials = path.join(__dirname, 'views', 'partials');
fs.readdirSync(partials).forEach(function(file) {
  var source = fs.readFileSync(partials + '/' + file, "utf8"),
    partial = /(.+)\.html/.exec(file).pop();
  Handlebars.registerPartial(partial, source);
});


app.use(express.static(path.join(__dirname, '..', 'public')));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
  app.use(function(err, req, res) {
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
