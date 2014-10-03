var Schema = require('jugglingdb').Schema,
  hat = require('hat'),
  moment = require('moment');

exports.init = function init(db) {
  var RefreshToken = db.define('RefreshToken', {
    token: {
      type: String,
      length: 255,
      index: true
    },
    expiresAt: {
      type: Date,
      name: 'expires_at'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      name: 'created_at'
    }
  }, {
    table: 'refresh_tokens'
  });

  RefreshToken.beforeCreate = function beforeCreate(next, token) {
    token.token = hat();
    token.expires = token.expires || moment().add(30, 'minutes').format();
    next();
  };

  return RefreshToken;
};
