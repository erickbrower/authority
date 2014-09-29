Authority.module('models', function(Todos, App, Backbone) {
  models.User = Backbone.Model.extend({
    defaults: {
      username: '',
      password: ''
    }
  });
});
