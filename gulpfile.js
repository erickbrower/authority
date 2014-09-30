var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  prettify = require('gulp-prettify'),
  docco = require('gulp-docco'),
  dbTasks = require('./lib/tasks/db'),
  assetsTasks = require('./lib/tasks/assets'),
  ProgressBar = require('progress'),
  fs = require('fs'),
  http = require('http'),
  path = require('path'),
  wget = require('wget');

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

gulp.task('deps:selenium', function(done) {
  var filename = 'selenium-server-standalone-2.43.1.jar',
    out = path.join(__dirname, 'tmp', filename),
    uri = 'http://selenium-release.storage.googleapis.com/2.43/' + filename;
  http.get(uri, function(res) {
    var len = parseInt(res.headers['content-length'], 10);
    var file = fs.createWriteStream(out, {
      flags: 'a'
    });
    res.pipe(file);
  });
});

dbTasks.init(gulp);

assetsTasks.init(gulp);
