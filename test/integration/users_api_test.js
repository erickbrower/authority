var helper = require('../test_helper'),
  assert = require('assert'),
  app = require('../../app'),
  User = require('../../app/models').models.User,
  request = require('supertest');

describe('GET /api/users', function() {
  it('should return all existing Users', function(next) {
    User.create(helper.factories.User(4), function(err) {
      assert(!err);
    });
    request(app)
      .get('/api/users')
      .query({
        page: 1,
        page_size: 2
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert.equal(res.body.length, 2);
        assert.equal(res.get('X-Total-Count'), 4);
        next();
      })
  });
});

describe('POST /api/users', function() {
  describe('with valid attributes', function() {
    it('should create a new User resource', function(next) {
      var attrs = helper.factories.User();
      request(app)
        .post('/api/users')
        .send(attrs)
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          if (err) throw err;
          assert.equal(res.body.userName, attrs.title);
          next();
        });
    });
  });
});

describe('GET /api/users/:user_id', function() {

  describe('when the User resource exists', function() {
    var resource;

    beforeEach(function(next) {
      User.create(helper.factories.User(), function(err, user) {
        if (err) throw err;
        resource = user;
        next();
      });
    });

    it('should respond with the User resource', function(next) {
      request(app)
        .get('/api/users/' + resource.id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          assert.equal(res.body.userName, resource.userName);
          next();
        })
    });
  });

  describe('when the resource does not exist ', function() {
    it('should return 404', function(next) {
      request(app)
        .get('/api/users/123')
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function() {
          next();
        });
    });
  });
});

describe('PUT /api/users/:user_id', function() {

  describe('when the User resource exists', function() {
    var resource;

    beforeEach(function(next) {
      User.create(helper.factories.User(), function(err, user) {
        assert(!err || err === {});
        resource = user;
        next();
      });
    });

    describe('with valid attributes', function() {
      it('should update the User resource', function(next) {
        var username = helper.factories.User().username;
        request(app)
          .put('/api/users/' + resource.id)
          .send({
            username: username
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            assert(!err || err === {});
            assert.equal(res.body.username, username);
            next();
          });
      });
    });
  });
});

describe('DELETE /api/users/:user_id', function() {
  describe('when the User resource exists', function() {
    var resource;

    beforeEach(function(next) {
      User.create(helper.factories.User(), function(err, user) {
        if (err) throw err;
        resource = user;
        next();
      });
    });

    it('should destroy the User', function(next) {
      request(app)
        .delete('/api/users/' + resource.id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert(!err, 'An error was created while destroying the User');
          next();
        });
    });
  });

  describe('when the User resource does not exist', function() {
    it('should respond 404', function() {
      request(app)
        .delete('/api/users/123')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          assert(!err, 'An error was created while destroying the User');
          next();
        });
    });
  });
});
