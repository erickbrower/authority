var postsController = require('../controllers/oauth');

var router = require('express').Router();

exports.route = function(app) {

  router.param('post_id', postsController.params.postId);

  router.route('/posts')
    .get(postsController.index)
    .post(postsController.create);

  router.route('/posts/:post_id')
    .get(postsController.show)
    .put(postsController.update)
    .delete(postsController.destroy);

  app.use('/api', router);
};
