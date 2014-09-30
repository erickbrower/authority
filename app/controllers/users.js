var User = require('../models').models.User;

exports.userId = function userId(req, res, next, id) {
  User.find(id, function(err, user) {
    if (err) {
      return next(404);
    }
    req.user = user;
    next();
  });
};

exports.index = function index(req, res) {
  User.all(function(err, users) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render('users/index', { users: users });
    }
  });
};

exports.new = function nu(req, res) {
  res.render('users/new', { user: new User() });
};

exports.edit = function edit(req, res) {
  res.render('users/edit', { user: req.user });
};
