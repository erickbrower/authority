var Schema = require('jugglingdb').Schema;

exports.init = function init(db) {
  var AccessToken = db.define('AccessToken', {
    token: {
      type: String,
      length: 255,
      index: true
    },
    expires: {
      type: Date
    }
  });

  AccessToken.validatesPresenceOf('token', 'expires');

  return AccessToken;
};