require.config({
	paths: {
		jquery: './vendors/jquery.min',
		underscore: './vendors/underscore',
		backbone: './vendors/backbone',
		marionette: './vendors/backbone.marionette.min'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},
		marionette: {
			exports: 'Backbone.Marionette',
			deps: ['backbone']
		}
	},
	deps: ['jquery', 'underscore']
});

require([
	'marionette',
    'backbone'
], function (Marionette, Backbone) {
	'use strict';

    var AuthorityDashboard = new Marionette.Application();

    AuthorityDashboard.addRegions({
      mainRegion: '#main'
    });

    AuthorityDashboard.User = Backbone.Model.extend({
      defaults: {
        id: '',
        username: '',
        createdAt: ''
      }
    });

    AuthorityDashboard.UserCollection = Backbone.Collection.extend({
      model: AuthorityDashboard.User
    });

    AuthorityDashboard.UserItemView = Marionette.ItemView.extend({
      template: '#user-grid-tpl'
    });

    AuthorityDashboard.UsersView = Marionette.CollectionView.extend({
      tagName: 'tr',
      childView: AuthorityDashboard.UserItemView
    });

    AuthorityDashboard.StaticView = Marionette.ItemView.extend({
      template: '#user-admin'
    });

    AuthorityDashboard.on('start', function() {
      var users = new AuthorityDashboard.UserCollection([
        {
          id: '124', 
          username: 'BobAwesome',
          createdAt: 'June 12, 2014'
        }
      ]);

      var usersListView = new AuthorityDashboard.UsersView({
        collection: users
      });

      AuthorityDashboard.mainRegion.show(usersListView);
    });

    AuthorityDashboard.start();
});
