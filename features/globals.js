process.env.NODE_ENV = 'test';

var app = require('../app'),
  debug = require('debug')('test-service'),
  port = process.env.TEST_PORT || 8081,
  db = require('../models').db,
  server;

module.exports = {
  before: function before(done) {
    server = app.listen(port, function() {
      debug('target test service started on port ' +
        server.address().port);
      done();
    });
  },

  after: function after(done) {
    debug('stopping test service');
    server.close();
  }
};
