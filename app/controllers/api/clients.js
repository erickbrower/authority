var Client = require('../../models').models.Client;

exports.index = function index(req, res) {
  Client.paginate(
    req.query.page,
    req.query.page_size,
    function(err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.set({
          'X-Total-Count': result.count
        });
        res.json(result.resources);
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
