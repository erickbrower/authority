var oauthserver = require('oauth2-server');

exports.route = function(app) {
  app.oauth = oauthserver({
    model: require('./model'),
    grants: ['auth_code', 'password'],
    debug: true
  });

  // Handle token grant requests
  app.all('/oauth/token', app.oauth.grant());

  // Show them the "do you authorise xyz app to access your content?" page
  app.get('/oauth/authorize', function(req, res, next) {
    if (!req.session.user) {
      // If they aren't logged in, send them to your own login implementation
      return res.redirect('/login?redirect=' + req.path + '&client_id=' +
        req.query.client_id + '&redirect_uri=' + req.query.redirect_uri);
    }

    res.render('authorise', { //SIC
      client_id: req.query.client_id,
      redirect_uri: req.query.redirect_uri
    });
  });

  // Handle authorize
  app.post('/oauth/authorize', function(req, res, next) {
    if (!req.session.user) {
      return res.redirect('/login?client_id=' + req.query.client_id +
        '&redirect_uri=' + req.query.redirect_uri);
    }

    next();
  }, app.oauth.authCodeGrant(function(req, next) {
    // The first param should indicate an error
    // The second param should be a bool to indicate if the user did authorize the app
    // The third param should be the user/uid (only used for passing to saveAuthToken)
    next(null, req.body.allow === 'yes', req.session.user.id, req.session.user);
  }));

  // Show login
  app.get('/login', function(req, res, next) {
    res.render('login', {
      redirect: req.query.redirect,
      client_id: req.query.client_id,
      redirect_uri: req.query.redirect_uri
    });
  });

  // Handle login
  app.post('/login', function(req, res, next) {
    // Insert your own login mechanism
    if (req.body.email !== 'thom@nightworld.com') {
      res.render('login', {
        redirect: req.body.redirect,
        client_id: req.body.client_id,
        redirect_uri: req.body.redirect_uri
      });
    } else {
      // Successful logins should send the user back to the /oauth/authorise
      // with the client_id and redirect_uri (you could store these in the session)
      return res.redirect((req.body.redirect || '/home') + '?client_id=' +
        req.body.client_id + '&redirect_uri=' + req.body.redirect_uri);
    }
  });
};
