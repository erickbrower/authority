var Schema = require('jugglingdb').Schema;

exports.init = function init(db) {
  var RefreshToken = db.define('RefreshToken', {
    token: {
      type: String,
      length: 255
    },
    expires: {
      type: Date
    }
  });

  RefreshToken.validatesPresenceOf('token', 'expires');
  return RefreshToken;
};
