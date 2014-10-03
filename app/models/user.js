var Schema = require('jugglingdb').Schema,
  pagination = require('../../lib/pagination'),
  bcryptHash = require('../../lib/bcrypt_hash');

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
    return updatePassword(user, next);
  };

  User.beforeSave = function(next, user) {
    if (this.propertyChanged('password') && user.id) {
      return updatePassword(user, next);
    } else {
      next();
    }
  };

  User.validatesPresenceOf('username', 'password');

  User.paginate = function(page, page_size, next) {
    return pagination.paginate(User, page, page_size, next);
  };

  // private
  function updatePassword(user, next) {
    bcryptHash(user.password, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  }

  return User;
};
