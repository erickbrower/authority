var RefreshToken = require('../models').models.RefreshToken;

exports.refreshTokenId = function userId(req, res, next, id) {
  RefreshToken.find(id, function(err, refreshToken) {
    if (err) {
      return next(404);
    }
    req.refreshToken = refreshToken;
    next();
  });
};

exports.index = function index(req, res) {
  RefreshToken.all(function(err, refreshTokens) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render('refresh_tokens/index', {
        refreshTokens: refreshTokens
      });
    }
  });
};

exports.new = function nu(req, res) {
  res.render('refresh_tokens/new', {
    refreshToken: new RefreshToken()
  });
};

exports.edit = function edit(req, res) {
  res.render('refresh_tokens/edit', {
    refreshToken: req.refreshToken
  });
};
