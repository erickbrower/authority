var helper = require('../test_helper'),
  assert = require('assert'),
  _ = require('lodash'),
  User = require('../../app/models').models.User;

describe('.create', function() {
  describe('with valid attributes', function() {
    it('should save successfully', function(next) {
      User.create(helper.factories.User(), function(err, user) {
        assert.equal(err, undefined);
        next();
      });
    });

    it('should hash the password again if it has changed', function(next) {
      var newPass = '12345678';
      User.create(helper.factories.User(), function(err, user) {
        user.password = newPass;
        user.save(function(err) {
          assert.notEqual(user.password, newPass);
          next();
        });
      });
    });
  });

  describe('with invalid attributes', function() {
    it('should fail if username is not present', function(next) {
      var attrs = helper.factories.User();
      delete attrs.username;
      User.create(attrs, function(err) {
        assert(err);
        next();
      });
    });

    it('should fail if password is not present', function(next) {
      var attrs = helper.factories.User();
      delete attrs.password;
      User.create(attrs, function(err) {
        assert(err);
        next();
      });
    });
  });
});
