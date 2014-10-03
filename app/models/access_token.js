var Schema = require('jugglingdb').Schema,
  hat = require('hat'),
  moment = require('moment'),
  pagination = require('../../lib/pagination');

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
    token.expires = token.expires || moment().add(1, 'hour').format();
    next();
  };

  AccessToken.paginate = function(page, page_size, next) {
    return pagination.paginate(AccessToken, page, page_size, next);
  };

  return AccessToken;
};
