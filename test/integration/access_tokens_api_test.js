var helper = require('../test_helper'),
  assert = require('assert'),
  app = require('../../app'),
  AccessToken = require('../../app/models').models.AccessToken,
  request = require('supertest');

describe('GET /api/access_tokens', function() {
  it('should return all existing AccessTokens', function(next) {
    AccessToken.create(helper.factories.AccessToken(3), function(err) {
      if (err) throw err;
    });
    request(app)
      .get('/api/access_tokens')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        assert(!err || err === {});
        assert.equal(res.body.length, 3);
        next();
      })
  });
});

describe('POST /api/access_tokens', function() {
  describe('with valid attributes', function() {
    it('should create a new AccessToken resource', function(next) {
      var attrs = helper.factories.AccessToken();
      request(app)
        .post('/api/access_tokens')
        .send(attrs)
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          assert(!err || err === {});
          next();
        });
    });
  });
});

describe('GET /api/access_tokens/:access_token_id', function() {
  describe('when the AccessToken resource exists', function() {
    var resource;

    beforeEach(function(next) {
      AccessToken.create(helper.factories.AccessToken(), function(err, token) {
        assert(!err || err === {});
        resource = token;
        next();
      });
    });

    it('should respond with the AccessToken resource', function(next) {
      request(app)
        .get('/api/access_tokens/' + resource.id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert(!err || err === {});
          next();
        })
    });
  });

  describe('when the resource does not exist ', function() {
    it('should return 404', function(next) {
      request(app)
        .get('/api/access_tokens/123')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function() {
          next();
        });
    });
  });
});
