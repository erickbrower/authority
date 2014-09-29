var Schema = require('jugglingdb').Schema;

exports.init = function init(db) {
  var User = db.define('User', {
    username: {
      type: String,
      length: 255
    },
    password: {
      type: String,
      length: 255
    }
  });
};
