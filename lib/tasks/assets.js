var uglify = require('gulp-uglify'),
  sass = require('gulp-sass');

exports.init = function init(gulp) {

  gulp.task('assets:precompile:sass', function() {
    return gulp.src(['./app/assets/stylesheets/*.scss', './app/assets/stylesheets/*.sass'])
      .pipe(sass())
      .pipe(gulp.dest('./public/stylesheets'));
  });

  gulp.task('assets:precompile:vendors:js', function() {
    return gulp.src([
        './app/assets/bower/bootstrap/dist/js/bootstrap.min.js',
        './app/assets/bower/jquery/dist/jquery.min.js',
        './app/assets/bower/underscore/underscore.js',
        './app/assets/bower/backbone/backbone.js',
        './app/assets/bower/marionette/lib/backbone.marionette.min.js',
      ])
      .pipe(uglify({
        mangle: false
      }))
      .pipe(gulp.dest('./public/javascripts/vendors'));
  });

  gulp.task('assets:precompile:js', function() {
    return gulp.src('./app/assets/javascripts/**/*.js')
      .pipe(uglify({
        mangle: false
      }))
      .pipe(gulp.dest('./public/javascripts'));
  });

  gulp.task('assets:precompile:vendors:css', function() {
    return gulp.src('./app/assets/bower/bootstrap/dist/css/*.min.css')
      .pipe(gulp.dest('./public/stylesheets/vendors'));
  });

  gulp.task('assets:precompile:vendors', ['assets:precompile:vendors:js', 'assets:precompile:vendors:css']);

  gulp.task('assets:precompile', [
    'assets:precompile:vendors',
    'assets:precompile:sass',
    'assets:precompile:js'
  ]);
};
