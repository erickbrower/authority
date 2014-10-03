var AccessToken = require('../models').models.AccessToken;

exports.accessTokenId = function tokenId(req, res, next, id) {
  AccessToken.find(id, function(err, accessToken) {
    if (err) {
      return next(404);
    }
    req.accessToken = accessToken;
    next();
  });
};

exports.index = function index(req, res) {
  AccessToken.all(function(err, accessTokens) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render('access_tokens/index', {
        accessTokens: accessTokens
      });
    }
  });
};

exports.new = function nu(req, res) {
  res.render('access_tokens/new', {
    accessToken: new AccessToken()
  });
};

exports.edit = function edit(req, res) {
  res.render('access_tokens/edit', {
    accessToken: req.accessToken
  });
};
