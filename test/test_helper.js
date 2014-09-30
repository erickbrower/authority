process.env.NODE_ENV = 'test';

var db = require('../app/models').db,
  Faker = require('Faker'),
  _ = require('lodash');

//Drop and create the tables for each test
beforeEach(function(done) {
  db.automigrate(function(err) {
    if (err) throw err;
    done();
  });
});

function build(num, spec) {
  num = num || 1;
  var result = _.times(num, function() {
    return spec();
  });
  if (result.length === 1) {
    return result[0];
  }
  return result;
}

module.exports = {
  factories: {
    User: function(num) {
      return build(num, function() {
        return {
          username: Faker.Internet.userName(),
          password: Faker.Lorem.words()
        };
      });
    }
  }
};
