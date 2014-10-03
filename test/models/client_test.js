var helper = require('../test_helper'),
  assert = require('assert'),
  Client = require('../../app/models').models.Client;

describe('Client#create', function() {
  describe('with valid attributes', function() {
    it('should save successfully', function(next) {
      Client.create(helper.factories.Client(), function(err, client) {
        assert.equal(err, undefined);
        next();
      });
    });
  });

  describe('with invalid attributes', function() {
    it('should fail if secret is not present', function(next) {
      var attrs = helper.factories.Client();
      delete attrs.secret;
      Client.create(attrs, function(err) {
        assert(err);
        next();
      });
    });

    it('should fail if redirect_uri is not present', function(next) {
      var attrs = helper.factories.Client();
      delete attrs.redirectUri;
      Client.create(attrs, function(err) {
        assert(err);
        next();
      });
    });
  });
});
