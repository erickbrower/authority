var helper = require('../test_helper'),
  assert = require('assert'),
  app = require('../../app'),
  Client = require('../../app/models').models.Client,
  request = require('supertest');

describe('GET /api/clients', function() {
  it('should return all existing Clients', function(next) {
    Client.create(helper.factories.Client(3), function(err) {
      assert(!err);
    });
    request(app)
      .get('/api/clients')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        assert(!err || err === {});
        assert.equal(res.body.length, 3);
        next();
      })
  });
});

describe('POST /api/clients', function() {
  describe('with valid attributes', function() {
    it('should create a new Client resource', function(next) {
      var attrs = helper.factories.Client();
      request(app)
        .post('/api/clients')
        .send(attrs)
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          assert(!err);
          assert(res.body.secret);
          next();
        });
    });
  });
});

describe('GET /api/clients/:client_id', function() {
  describe('when the Client resource exists', function() {
    var resource;

    beforeEach(function(next) {
      Client.create(helper.factories.Client(), function(err, client) {
        if (err) throw err;
        resource = client;
        next();
      });
    });

    it('should respond with the Client resource', function(next) {
      request(app)
        .get('/api/clients/' + resource.id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          assert.equal(res.body.secret, resource.secret);
          next();
        })
    });
  });

  describe('when the resource does not exist ', function() {
    it('should return 404', function(next) {
      request(app)
        .get('/api/clients/123')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function() {
          next();
        });
    });
  });
});

describe('PUT /api/clients/:client_id', function() {
  describe('when the Client resource exists', function() {
    var resource;

    beforeEach(function(next) {
      Client.create(helper.factories.Client(), function(err, client) {
        assert(!err);
        resource = client;
        next();
      });
    });

    describe('with valid attributes', function() {
      it('should update the Client resource', function(next) {
        var newRedirectUri = 'http://anotherexample.com/my_callback';
        request(app)
          .put('/api/clients/' + resource.id)
          .send({
            redirectUri: newRedirectUri
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            assert(!err);
            assert.equal(res.body.redirectUri, newRedirectUri);
            next();
          });
      });
    });
  });
});

describe('DELETE /api/clients/:client_id', function() {
  describe('when the Client resource exists', function() {
    var resource;

    beforeEach(function(next) {
      Client.create(helper.factories.Client(), function(err, client) {
        assert(!err);
        resource = client;
        next();
      });
    });

    it('should destroy the Client', function(next) {
      request(app)
        .delete('/api/clients/' + resource.id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert(!err || !err.keys);
          next();
        });
    });
  });

  describe('when the Client resource does not exist', function() {
    it('should respond 404', function(next) {
      request(app)
        .delete('/api/clients/123')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function(err, res) {
          assert(!err || !err.keys);
          next();
        });
    });
  });
});
