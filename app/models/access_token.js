var Schema = require('jugglingdb').Schema,
  hat = require('hat'),
  moment = require('moment');

exports.init = function init(db) {
  var AccessToken = db.define('AccessToken', {
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
    table: 'access_tokens'
  });

  AccessToken.beforeCreate = function beforeCreate(next, token) {
    token.token = hat();
    token.expires = token.expires || moment().add(30, 'minutes').format();
    next();
  };

  return AccessToken;
};
