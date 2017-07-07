var chai = require('chai');
var chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');


const Blog = require("../models/blogSchemes");


var should = chai.should();


chai.use(chaiHttp);

describe('index page', function () {

    before(function() {
        return runServer();
    });


    // before(function(done) {
    //     Blog.remove({}, function() {
    //         done();
    //     });
    // });

    after(function() {
        // Blog.remove({}, function() {
            return closeServer();
            // done();
        //});
    });

    it('exists', function (done) {
        chai.request(app)
            .get('/')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    
    it('successfully goes to new post page', function (done) {
        chai.request(app)
            .get('/blogs/new')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('successfully goes to the edit post page', function (done) {
        chai.request(app)
            .get('/blogs/:id/edit')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('successfuly goes to the show post page', function(done) {
        chai.request(app)
        .get('/blogs/:id/')
        .end(function (err, res) {
            res.should.have.status(200);
            done();
        });
    });

    it('successfully deletes a post', function(done) {
        chai.request(app)
        .delete('/blogs/:id')
        .end(function (err, res) {
            res.should.have.status(200);
            done();
        })
    })

    it('successfully updates a post', function(done) {
        chai.request(app)
        .put('/blogs/:id')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({title: 'test', movieName:'blah', body: 'hi', image: ''})
        .end(function (err, res) {
            res.should.have.status(200);
            done();
        });
    })

    it('successfully completes post and returns to index page', function(done) {
        chai.request(app)
        .post('/blogs')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({title: 'test', movieName:'blah', body: 'hi', image: ''})
        .end(function (err, res) {
            res.should.have.status(200);
            done();
        })
    })

});






