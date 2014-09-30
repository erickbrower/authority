var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  prettify = require('gulp-prettify'),
  docco = require('gulp-docco'),
  dbTasks = require('./lib/tasks/db'),
  assetsTasks = require('./lib/tasks/assets');

gulp.task('default', ['lint']);

var sources = [
  './bin/**/*',
  './config/**/*.js',
  './app/**/*.js',
  './test/**/*.js',
  './gulpfile.js',
  './interface.js'
];

gulp.task('lint', function() {
  return gulp.src(sources)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('docs', function() {
  return gulp.src(sources)
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
});

dbTasks.init(gulp);

assetsTasks.init(gulp);
