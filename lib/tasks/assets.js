var uglify = require('gulp-uglify');

exports.init = function init(gulp) {

  gulp.task('assets:precompile:css', function() {
    return gulp.src([
        './assets/bower/bootstrap/dist/css/*.min.css',
        './assets/stylesheets'
      ])
      .pipe(gulp.dest('./public/stylesheets'));
  });

  gulp.task('assets:precompile:js', function() {
    return gulp.src([
        './assets/bower/jquery/dist/jquery.min.js',
        './assets/bower/underscore/underscore.js',
        './assets/bower/backbone/backbone.js',
        './assets/bower/marionette/lib/backbone.marionette.min.js',
        './assets/javascripts/**/*.js'
      ])
      .pipe(uglify({
        mangle: false
      }))
      .pipe(gulp.dest('./public/javascripts'));
  });

  gulp.task('assets:precompile', [
    'assets:precompile:css',
    'assets:precompile:js'
  ]);
};
