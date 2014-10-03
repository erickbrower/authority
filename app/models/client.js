var Schema = require('jugglingdb').Schema,
  bcryptHash = require('../../lib/bcrypt_hash'),
  pagination = require('../../lib/pagination');

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

  Client.beforeCreate = function(next, client) {
    hashSecret(client, next);
  };

  Client.beforeSave = function(next, client) {
    if (this.propertyChanged('secret') && client.id) {
      return hashSecret(client, next);
    } else {
      next();
    }
  };

  Client.paginate = function(page, page_size, next) {
    return pagination.paginate(Client, page, page_size, next);
  };

  function hashSecret(client, next) {
    bcryptHash(client.secret, function(err, hash) {
      if (err) return next(err);
      client.secret = hash;
      next();
    });
  };

  return Client;
};
