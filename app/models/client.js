var Schema = require('jugglingdb').Schema;

exports.init = function init(db) {
  var Client = db.define('Client', {
    secret: {
      type: String,
      length: 255
    },
    redirect_uri: {
      type: String,
      length: 500
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });

  Client.validatesPresenceOf('secret', 'redirect_uri');

  return Client;
};