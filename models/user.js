var Schema = require('jugglingdb').Schema,
  bcrypt = require('bcrypt-nodejs');

exports.init = function init(db) {
  var User = db.define('User', {
    username: {
      type: String,
      length: 255
    },
    password: {
      type: String,
      length: 255
    }
  });

  function generateHash(password, next) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(password, salt, null, function(err, hash) {
        if (err) return next(err);
        next(null, hash);
      });
    });
  }

  function updatePassword(user, next) {
    generateHash(user.password, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  };

  User.beforeCreate = function(next, user) {
    updatePassword(user, next);
  };

  User.beforeSave = function(next, user) {
    if (this.propertyChanged('password')) {
      updatePassword(user, next);
    }
  };

  User.validatesPresenceOf('username', 'password');

  return User;
};
