exports.init = function init(gulp) {
  gulp.task('db:migrate', function(done) {
    var db = require('../../models').db;
    db.automigrate(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  gulp.task('db:update', function(done) {
    var db = require('../../models').db;
    db.autoupdate(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  gulp.task('db:test:prepare', function(done) {
    process.env.NODE_ENV = 'test';
    var db = require('../../models').db;
    db.automigrate(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  //Ends task processes that hang after completing
  gulp.on('stop', function() {
    process.nextTick(function() {
      process.exit(0);
    });
  });
};
