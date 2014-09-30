var User = require('../../models').models.User;

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
  //render index
};

exports.new = function index(req, res) {
  //render new
};

exports.edit = function edit(req, res) {
  //render edit
};
