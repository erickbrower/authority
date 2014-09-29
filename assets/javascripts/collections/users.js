Authority.module('Auth', function(Auth, App, Backbone) {
  Auth.UserList = Backbone.Collection.extend({
    model: Auth.User,
    comparator: 'createdAt'
  });
};
