var helper = require('../test_helper'),
  assert = require('assert'),
  app = require('../../app'),
  RefreshToken = require('../../app/models').models.RefreshToken,
  request = require('supertest');

describe('GET /api/refresh_tokens', function() {
  it('should return all existing RefreshTokens', function(next) {
    RefreshToken.create(helper.factories.RefreshToken(3), function(err) {
      if (err) throw err;
    });
    request(app)
      .get('/api/refresh_tokens')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        assert(!err || err === {});
        assert.equal(res.body.length, 3);
        next();
      })
  });
});

describe('POST /api/refresh_tokens', function() {
  describe('with valid attributes', function() {
    it('should create a new RefreshToken resource', function(next) {
      var attrs = helper.factories.RefreshToken();
      request(app)
        .post('/api/refresh_tokens')
        .send(attrs)
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          assert(!err || err === {});
          assert(res.body.token);
          next();
        });
    });
  });
});

describe('GET /api/refresh_tokens/:refresh_token_id', function() {
  describe('when the RefreshToken resource exists', function() {
    var resource;

    beforeEach(function(next) {
      RefreshToken.create(helper.factories.RefreshToken(), function(err, token) {
        assert(!err || err === {});
        resource = token;
        next();
      });
    });

    it('should respond with the RefreshToken resource', function(next) {
      request(app)
        .get('/api/refresh_tokens/' + resource.id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert(!err || err === {});
          assert(res.body.token);
          next();
        })
    });
  });

  describe('when the resource does not exist ', function() {
    it('should return 404', function(next) {
      request(app)
        .get('/api/refresh_tokens/123')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function() {
          next();
        });
    });
  });
});
