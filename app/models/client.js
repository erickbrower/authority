var Schema = require('jugglingdb').Schema;

exports.init = function init(db) {
  var Client = db.define('Client', {
    secret: {
      type: String,
      length: 255
    },
    redirectUri: {
      type: String,
      length: 500,
      name: 'redirect_uri'
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
    table: 'clients'
  });

  Client.validatesPresenceOf('secret', 'redirectUri');

  return Client;
};
