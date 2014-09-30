var oauthController = require('../app/controllers/oauth'),
  usersApiController = require('../app/controllers/api/users');

var router = require('express').Router();

exports.route = function(app) {

  /* --- API Routes --- */
  router.param('user_id', usersApiController.params.userId);

  router.route('/users')
    .get(usersApiController.index)
    .post(usersApiController.create);

  router.route('/users/:user_id')
    .get(usersApiController.show)
    .put(usersApiController.update)
    .delete(usersApiController.destroy);

  app.use('/api', router);
};
