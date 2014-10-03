var Client = require('../models').models.Client;

exports.clientId = function clientId(req, res, next, id) {
  Client.find(id, function(err, client) {
    if (err) {
      return next(404);
    }
    req.client = client;
    next();
  });
};

exports.index = function index(req, res) {
  Client.all(function(err, clients) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render('clients/index', {
        clients: clients
      });
    }
  });
};

exports.new = function nu(req, res) {
  res.render('clients/new', {
    client: new Client()
  });
};

exports.edit = function edit(req, res) {
  res.render('clients/edit', {
    client: req.client
  });
};
