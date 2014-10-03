var RefreshToken = require('../../models').models.RefreshToken;

exports.index = function index(req, res) {
  //TODO: paginate
  RefreshToken.all(function(err, refreshTokens) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(refreshTokens);
    }
  });
};

exports.show = function show(req, res) {
  res.json(req.refreshToken);
}

exports.create = function create(req, res) {
  RefreshToken.create(req.body, function(err, refreshToken) {
    if (err) {
      res.status(400).json(refreshToken.errors);
    } else {
      res.status(201).json(refreshToken);
    }
  });
};

exports.destroy = function destroy(req, res) {
  req.refreshToken.destroy(function(err) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(req.refreshToken);
    }
  });
};

exports.update = function update(req, res) {
  req.refreshToken.updateAttributes(req.body, function(err, refreshToken) {
    if (err) {
      res.status(400).json(refreshToken.errors);
    } else {
      res.json(refreshToken);
    }
  });
};
