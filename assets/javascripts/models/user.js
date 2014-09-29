Authority.module('Auth', function(Auth, App, Backbone) {
  Auth.User = Backbone.Model.extend({
    defaults: {
      username: '',
      password: ''
    }
  });
});
