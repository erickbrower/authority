var models = require('./models').models;

exports.getAccessToken = function(bearerToken, next) {
  models.AccessToken.findOne({
    where: {
      accessToken: bearerToken
    }
  }, function(err, accessToken) {
    if (err || !accessToken) {
      return next(err);
    }
    next(null, {
      accessToken: accessToken.token,
      clientId: accessToken.clientId,
      expires: accessToken.expires,
      userId: accessToken.userId
    });
  });
};

exports.getClient = function(clientId, clientSecret, next) {
  models.Client.findOne({
    where: {
      id: clientId,
      secret: clientSecret
    }
  }, function(err, client) {
    if (err || !client) {
      return next(err);
    }
    next(null, {
      clientId: client.id,
      clientSecret: client.secret
    });
  });
};

exports.getRefreshToken = function(bearerToken, next) {
  models.RefreshToken.findOne({
    where: {
      token: bearerToken
    }
  }, function(err, refreshToken) {
    if (err || !refreshToken) {
      return next(err);
    }
    next(null, {
      refreshToken: refreshToken.token,
      clientId: refreshToken.clientId,
      expires: refreshToken.expires,
      userId: refreshToken.userId
    });
  });
};

exports.grantTypeAllowed = function(clientId, grantType, next) {
  next(true);
};

exports.saveAccessToken = function(accessToken, clientId, expires, userId, next) {
  models.AccessToken.create({
    accessToken: accessToken,
    clientId: clientId,
    expires: expires,
    userId: userId
  }, function(err) {
    next(err);
  });
};

exports.saveRefreshToken = function(refreshToken, clientId, expires, userId, next) {
  models.RefreshToken.create({
    refreshToken: refreshToken,
    clientId: clientId,
    expires: expires,
    userId: userId
  }, function(err) {
    next(err);
  });
};
