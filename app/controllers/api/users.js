var User = require('../../models').models.User,
  async = require('async'),
  qs = require('querystring');

exports.index = function index(req, res) {
  User.paginate(
    req.query.page,
    req.query.page_size,
    function(err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        //TODO: Generate link headers
        //res.links({});
        res.set({
          'X-Total-Count': result.count
        });
        res.json(result.resources);
      }
    });
};

exports.show = function show(req, res) {
  res.json(req.user);
};

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
