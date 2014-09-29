var oauthController = require('../controllers/oauth'),
  usersController = require('../controllers/users');

var router = require('express').Router();

exports.route = function(app) {

  router.param('user_id', usersController.params.userId);

  router.route('/users')
    .get(usersController.index)
    .post(usersController.create);

  router.route('/users/:user_id')
    .get(usersController.show)
    .put(usersController.update)
    .delete(usersController.destroy);

  app.use('/api', router);
};
