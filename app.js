var express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  favicon = require('serve-favicon'),
  oauthserver = require('oauth2-server'),
  cookieParser = require('cookie-parser'),
  lessMiddleware = require('less-middleware'),
  router = require('./config/routes'),
  fs = require('fs'),
  path = require('path'),
  Handlebars = require('handlebars'),
  app = express();

app.use(logger('short'));

app.use(bodyParser());
app.use(methodOverride());
app.use(favicon());
app.use(cookieParser());

router.route(app);

app.engine('html', require('consolidate').handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Register partials
var partials = "./views/partials/";
fs.readdirSync(partials).forEach(function(file) {
  var source = fs.readFileSync(partials + file, "utf8"),
    partial = /(.+)\.html/.exec(file).pop();

  Handlebars.registerPartial(partial, source);
});

var publicPath = path.join(__dirname, 'public');

app.use(lessMiddleware(publicPath));

app.use(express.static(publicPath));

app.use(function(req, res) {
  res.status(404);
});

module.exports = app;
