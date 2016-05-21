var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');

var mongoURI = "mongodb://localhost:27017/test";
var api_url = "http://localhost:3000/"

describe ('Routing', function(){

  before (function(done){
    mongoose.connect(mongoURI);
    var urlShort = {
      url: "http://www.google.com",
      shortcode: "google"
    };

    request(api_url)
      .post('shorten')
      .send(urlShort)
      .end(function(err, res){
        if (err) {
          throw err;
        }
      });
    done();
  });

  describe('Create shortened URL', function(){

    it('should return error 400 if url is blank', function(done){
      var urlShort = {
        url: "",
        shortcode: "apple"
      };

      request(api_url)
        .post('shorten')
        .send(urlShort)
        .end(function(err, res){
          if (err) {
            throw err;
          }
          res.should.have.property('statusCode', 400);
          done();
      });
    });

    it('should create a passing shortcode if shortcode is blank' , function(done){
      var urlShort = {
        url: "www.apple.com",
        shortcode: ""
      };

      request(api_url)
        .post('shorten')
        .send(urlShort)
        .end(function(err, res){
          if (err) {
            throw err;
          }
          res.body.shortcode.should.match(/^[0-9a-zA-Z_]{6}$/);
          done();
      });
    });

    it('should return error 409 if shortcode already exists', function(done){
      var urlShort = {
        url: "http://www.google.com",
        shortcode: "google"
      };

      request(api_url)
        .post('shorten')
        .send(urlShort)
        .end(function(err, res){
          if (err) {
            throw err;
          }
          res.should.have.property('statusCode', 409);
          done();
      });
    });

    it('should return error 422 if shortcode fails to meet regex /^[0-9a-zA-Z_]{4,}$/' , function(done){
      var urlShort = {
        url: "http://www.apple.com",
        shortcode: "###"
      };

      request(api_url)
        .post('shorten')
        .send(urlShort)
        .end(function(err, res){
          if (err) {
            throw err;
          }
          res.should.have.property('statusCode', 422);
          done();
      });
    });

    it('should return status 201 and json content type if post is successful' , function(done){
      var urlShort = {
        url: "http://www.apple.com",
        shortcode: "appl"
      };

      request(api_url)
        .post('shorten')
        .send(urlShort)
        .end(function(err, res){
          if (err) {
            throw err;
          }
          res.should.have.property('statusCode', 201);
          res.headers.should.have.property('content-type', 'application/json; charset=utf-8');
          done();
      });
    });
  });

  describe('Get encoded shortcode', function(){
    it('should return error 404 if shortcode cannot be found', function(done){
      request(api_url)
        .get('test')
        // .send(urlShort)
        .end(function(err, res){
          if (err) {
            throw err
          }
          res.should.have.property('statusCode', 404);
          done();
        });
    });

    it('should return status 302 if shortcode is found', function(done){
      request(api_url)
        .get('google')
        // .send(urlShort)
        .end(function(err, res){
          if (err) {
            throw err
          }
          res.should.have.property('statusCode', 302);
          done();
        });
    });

    it('should return header location "http://www.google.com" if shortcode is found', function(done){
      request(api_url)
        .get('google')
        // .send(urlShort)
        .end(function(err, res){
          if (err) {
            throw err
          }
          res.header.should.have.property('location', 'http://www.google.com');
          done();
        });
    });
  });

  after (function(done){
    mongoose.connection.db.dropDatabase();
    mongoose.connection.close();
    done();
  });

})
