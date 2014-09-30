window.Authority = Backbone.Marionette.Application();

Authority.on('start', function() {
  Backbone.history.start();
});
