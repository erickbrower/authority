var uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  env = process.env.NODE_ENV || 'development';

exports.init = function init(gulp) {

  gulp.task('assets:precompile:scss', function() {
    var g = gulp.src('./app/assets/stylesheets/*.scss')
    if (env !== 'development') {
      g.pipe(sass());
    }
    return g.pipe(gulp.dest('./public/stylesheets'));
  });

  gulp.task('assets:precompile:vendors:js', function() {
    return gulp.src([
        './app/assets/bower/bootstrap/dist/js/bootstrap.min.js',
        './app/assets/bower/jquery/dist/jquery.min.js',
        './app/assets/bower/underscore/underscore.js',
        './app/assets/bower/backbone/backbone.js',
        './app/assets/bower/requirejs/require.js',
        './app/assets/bower/marionette/lib/backbone.marionette.min.js'
      ])
      .pipe(uglify({
        mangle: false
      }))
      .pipe(gulp.dest('./public/javascripts/vendors'));
  });

  gulp.task('assets:precompile:js', function() {
    var g = gulp.src('./app/assets/javascripts/**/*.js');
    if (env !== 'development') {
      g.pipe(uglify({
        mangle: false
      }))
    }
    return g.pipe(gulp.dest('./public/javascripts'));
  });

  gulp.task('assets:precompile:vendors:css', function() {
    return gulp.src('./app/assets/bower/bootstrap/dist/css/bootstrap.min.css')
      .pipe(gulp.dest('./public/stylesheets/vendors'));
  });

  gulp.task('assets:precompile', [
    'assets:precompile:vendors:css',
    'assets:precompile:vendors:js',
    'assets:precompile:scss',
    'assets:precompile:js'
  ]);

  gulp.task('watch', function(done) {
    gulp.watch('./app/assets/javascripts/**/*.js', ['assets:precompile:js'])
      .on('change', function(event) {
        console.log('js file ' + event.path + ' was ' + event.type + ', compiling...');
      });

    gulp.watch('./app/assets/stylesheets/**/*.scss', ['assets:precompile:scss'])
      .on('change', function(event) {
        console.log('scss file ' + event.path + ' was ' + event.type + ', compiling...');
      });
  });
};
