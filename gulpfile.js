var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  prettify = require('gulp-prettify'),
  dbTasks = require('./lib/tasks/db');
  assetsTasks = require('./lib/tasks/assets');

gulp.task('default', ['lint']);

var sources = [
  './bin/**/*',
  './config/**/*.js',
  './controllers/**/*.js',
  './models/**/*.js',
  './test/**/*.js',
  './app.js',
  './gulpfile.js',
  './interface.js'
];

gulp.task('lint', function() {
  return gulp.src(sources)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

dbTasks.init(gulp);
assetsTasks.init(gulp);
