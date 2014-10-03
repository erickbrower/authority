var helper = require('../test_helper'),
  assert = require('assert'),
  RefreshToken = require('../../app/models').models.RefreshToken;

describe('RefreshToken#create', function() {
  describe('with valid attributes', function() {
    var tokenData = helper.factories.RefreshToken()

    it('should save successfully', function(next) {
      RefreshToken.create(tokenData, function(err) {
        assert.equal(err, undefined);
        next();
      });
    });

    it('should generate a token on create', function(next) {
      RefreshToken.create(tokenData, function(err, token) {
        assert(token.token.length > 0);
        next();
      });
    });
  });
});
