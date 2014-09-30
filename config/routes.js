var oauthController = require('../app/controllers/oauth'),
  usersController = require('../app/controllers/users'),
  usersApiController = require('../app/controllers/api/users');

exports.route = function(app) {

  /* --- Page Routes --- */
  var router = require('express').Router();

  router.param('user_id', usersController.userId);
  router.get('/users', usersController.index);
  router.get('/users/new/:user_id', usersController.new);
  router.get('/users/edit/:user_id', usersController.edit);

  app.use(router);

  /* --- API Routes --- */
  var apiRouter = require('express').Router();

  apiRouter.param('user_id', usersController.userId);
  apiRouter.route('/users')
    .get(usersApiController.index)
    .post(usersApiController.create);
  apiRouter.route('/users/:user_id')
    .get(usersApiController.show)
    .put(usersApiController.update)
    .delete(usersApiController.destroy);

  app.use('/api', apiRouter);
};
