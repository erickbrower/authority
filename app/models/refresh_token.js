var Schema = require('jugglingdb').Schema,
  hat = require('hat'),
  moment = require('moment'),
  pagination = require('../../lib/pagination');

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
    token.expires = token.expires || moment().add(30, 'days').format();
    next();
  };

  RefreshToken.paginate = function(page, page_size, next) {
    return pagination.paginate(RefreshToken, page, page_size, next);
  };

  return RefreshToken;
};
