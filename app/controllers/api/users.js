var User = require('../../models').models.User;

exports.index = function index(req, res) {
  //TODO: paginate
  User.all(function(err, users) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(users);
    }
  });
};

exports.show = function show(req, res) {
  res.json(req.user);
}

exports.create = function create(req, res) {
  User.create(req.body, function(err, user) {
    if (err) {
      res.status(400).json(user.errors);
    } else {
      res.status(201).json(user);
    }
  });
};

exports.destroy = function destroy(req, res) {
  req.user.destroy(function(err) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(req.user);
    }
  });
};

exports.update = function update(req, res) {
  req.user.updateAttributes(req.body, function(err, user) {
    if (err) {
      res.status(400).json(user.errors);
    } else {
      res.json(user);
    }
  });
};
