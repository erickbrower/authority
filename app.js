var express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  oauthserver = require('oauth2-server'),
  router = require('./config/routes'),
  app = express();

app.use(logger('short'));

app.use(bodyParser());

router.route(app);

app.use(function(req, res) {
  res.status(404);
});

module.exports = app;
