var db = require('../../config/db'),
  AccessToken = require('./access_token').init(db),
  RefreshToken = require('./refresh_token').init(db),
  Client = require('./client').init(db),
  User = require('./user').init(db);

/* AccessToken -> User */
AccessToken.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id'
});

/* User <- AccessToken */
User.hasMany(AccessToken, {
  as: 'accessTokens',
  foreignKey: 'user_id'
});

/* AccessToken -> Client */
AccessToken.belongsTo(Client, {
  as: 'client',
  foreignKey: 'client_id'
});

/* Client <- AccessToken */
Client.hasMany(AccessToken, {
  as: 'accessTokens', 
  foreignKey: 'access_token_id'
});

/* RefreshToken -> User */
RefreshToken.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id'
});

/* User <- RefreshToken */
User.hasMany(RefreshToken, {
  as: 'refreshTokens',
  foreignKey: 'user_id'
});

/* RefreshToken -> Client */
RefreshToken.belongsTo(Client, {
  as: 'client',
  foreign_key: 'client_id'
});

/* Client <- RefreshToken */
Client.hasMany(RefreshToken, {
  as: 'refreshTokens', 
  foreignKey: 'client_id'
});

// Make the updated db object available
module.exports = {
  db: db,
  models: db.models
};
