var Client = require('../../models').models.Client;

exports.index = function index(req, res) {
  //TODO: paginate
  Client.all(function(err, clients) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(clients);
    }
  });
};

exports.show = function show(req, res) {
  res.json(req.client);
}

exports.create = function create(req, res) {
  Client.create(req.body, function(err, client) {
    if (err) {
      res.status(400).json(client.errors);
    } else {
      res.status(201).json(client);
    }
  });
};

exports.destroy = function destroy(req, res) {
  req.client.destroy(function(err) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(req.client);
    }
  });
};

exports.update = function update(req, res) {
  req.client.updateAttributes(req.body, function(err, client) {
    if (err) {
      res.status(400).json(client.errors);
    } else {
      res.json(client);
    }
  });
};
