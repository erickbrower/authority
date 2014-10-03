var helper = require('../test_helper'),
  assert = require('assert'),
  AccessToken = require('../../app/models').models.AccessToken;

describe('AccessToken#create', function() {
  describe('with valid attributes', function() {
    var tokenData = helper.factories.AccessToken()

    it('should save successfully', function(next) {
      AccessToken.create(tokenData, function(err) {
        assert.equal(err, undefined);
        next();
      });
    });

    it('should generate a token on create', function(next) {
      AccessToken.create(tokenData, function(err, token) {
        assert(token.token.length > 0);
        next();
      });
    });
  });
});
