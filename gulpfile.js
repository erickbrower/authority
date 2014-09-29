var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  prettify = require('gulp-prettify');

gulp.task('default', ['lint', 'prettify']);

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

gulp.task('prettify', function() {
  gulp.src(sources)
    .pipe(prettify({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./')); // edit in place
});

gulp.task('lint', function() {
  return gulp.src(sources)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('db:migrate', function(done) {
  var db = require('./models').db;
  db.automigrate(function(err) {
    if (err) { return done(err); }
    done();
  });
});

gulp.task('db:update', function(done) {
  var db = require('./models').db;
  db.autoupdate(function(err) {
    if (err) { return done(err); }
    done();
  });
});

gulp.task('db:test:prepare', function(done) {
  process.env.NODE_ENV = 'test';
  var db = require('./config/db');
  db.automigrate(function(err) {
    if (err) { throw err; }
    done();
  });
});

//Ends task processes that hang after completing
gulp.on('stop', function () {
  process.nextTick(function () {
    process.exit(0);
  });
});
