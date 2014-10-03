var AccessToken = require('../../models').models.AccessToken;

exports.index = function index(req, res) {
  //TODO: paginate
  AccessToken.all(function(err, accessTokens) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(accessTokens);
    }
  });
};

exports.show = function show(req, res) {
  res.json(req.accessToken);
}

exports.create = function create(req, res) {
  AccessToken.create(req.body, function(err, accessToken) {
    if (err) {
      res.status(400).json(accessToken.errors);
    } else {
      res.status(201).json(accessToken);
    }
  });
};

exports.destroy = function destroy(req, res) {
  req.accessToken.destroy(function(err) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(req.accessToken);
    }
  });
};

exports.update = function update(req, res) {
  req.accessToken.updateAttributes(req.body, function(err, accessToken) {
    if (err) {
      res.status(400).json(accessToken.errors);
    } else {
      res.json(accessToken);
    }
  });
};
