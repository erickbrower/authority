require.config({
	paths: {
		underscore: './underscore',
		backbone: './backbone',
		marionette: './backbone.marionette.min',
		jquery: './jquery.min',
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
	'app',
	'backbone',
	'routers/index',
	'controllers/index'
], function (app, Backbone, Router, Controller) {
	'use strict';

	app.start();

	new Router({ controller: Controller });

	Backbone.history.start();
});
