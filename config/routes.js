var oauthController = require('../app/controllers/oauth'),
  usersController = require('../app/controllers/users'),
  usersApiController = require('../app/controllers/api/users'),
  clientsApiController = require('../app/controllers/api/clients'),
  clientsController = require('../app/controllers/clients'),
  accessTokensApiController = require('../app/controllers/api/access_tokens'),
  accessTokensController = require('../app/controllers/access_tokens'),
  refreshTokensApiController = require('../app/controllers/api/refresh_tokens'),
  refreshTokensController = require('../app/controllers/refresh_tokens');


exports.route = function(app) {

  /* --- Page Routes --- */
  var router = require('express').Router();

  app.all('/admin*', function(req, res) {
    res.render('index');
  });

  app.use('/admin', router);

  /* --- API Routes --- */
  var api= require('express').Router();

  api.param('user_id', usersController.userId);
  api.route('/users')
    .get(usersApiController.index)
    .post(usersApiController.create);
  api.route('/users/:user_id')
    .get(usersApiController.show)
    .put(usersApiController.update)
    .delete(usersApiController.destroy);

  api.param('client_id', clientsController.clientId);
  api.route('/clients')
    .get(clientsApiController.index)
    .post(clientsApiController.create);
  api.route('/clients/:client_id')
    .get(clientsApiController.show)
    .put(clientsApiController.update)
    .delete(usersApiController.destroy);

  api.param('access_token_id', accessTokensController.accessTokenId);
  api.route('/access_tokens')
    .get(accessTokensApiController.index)
    .post(accessTokensApiController.create);
  api.route('/access_tokens/:access_token_id')
    .get(accessTokensApiController.show)
    .put(accessTokensApiController.update)
    .delete(accessTokensApiController.destroy);

  api.param('refresh_token_id', refreshTokensController.refreshTokenId);
  api.route('/refresh_tokens')
    .get(refreshTokensApiController.index)
    .post(refreshTokensApiController.create);
  api.route('/refresh_tokens/:refresh_token_id')
    .get(refreshTokensApiController.show)
    .put(refreshTokensApiController.update)
    .delete(refreshTokensApiController.destroy);

  app.use('/api', api);
};
