var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');


var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('index page', function() {
    it('exists', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
});

it('successfully goes to new post page', function(done) {
    chai.request(app)
      .get('/blogs/new')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

it('successfully goes to the edit post page', function(done) {
    chai.request(app)
      .get('/blogs/:id/edit')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });




