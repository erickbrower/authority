var db = require('../config/db'),
  AccessToken = require('./access_token').init(db),
  RefreshToken = require('./refresh_token').init(db),
  Client = require('./client').init(db),
  User = require('./user').init(db);

/* AccessToken -> User */
AccessToken.belongsTo(User, {
  as: 'user',
  foreignKey: 'userId'
});

/* User <- AccessToken */
User.hasMany(AccessToken, {
  as: 'accessTokens',
  foreignKey: 'userId'
});

/* AccessToken -> Client */
AccessToken.belongsTo(Client, {
  as: 'client',
  foreignKey: 'clientId'
});

/* Client <- AccessToken */
Client.hasMany(AccessToken, {
  as: 'accessTokens', 
  foreignKey: 'accessTokenId'
});

/* RefreshToken -> User */
RefreshToken.belongsTo(User, {
  as: 'user',
  foreignKey: 'userId'
});

/* User <- RefreshToken */
User.hasMany(RefreshToken, {
  as: 'refreshTokens',
  foreignKey: 'userId'
});

/* RefreshToken -> Client */
RefreshToken.belongsTo(Client, {
  as: 'client',
  foreign_key: 'clientId'
});

/* Client <- RefreshToken */
Client.hasMany(RefreshToken, {
  as: 'refreshTokens', 
  foreignKey: 'clientId'
});

// Make the updated db object available
module.exports = {
  db: db,
  models: db.models
};
