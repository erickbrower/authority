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

  User.beforeSave = function(next, user) {
    if (!user.propertyChanged('password')) {
      return next();
    }
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  };

  User.validatesPresenceOf('username', 'password');

  return User;
};
