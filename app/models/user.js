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
    },
    createdAt: {
      type: Date,
      default: Date.now,
      name: 'created_at'
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      name: 'updated_at'
    }
  }, {
    table: 'users'
  });

  User.beforeCreate = function(next, user) {
    updatePassword(user, next);
  };

  User.beforeSave = function(next, user) {
    if (this.propertyChanged('password') && user.id) {
      return updatePassword(user, next);
    } else {
      next();
    }
  };

  User.validatesPresenceOf('username', 'password');

  // private
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
  }

  return User;
};
