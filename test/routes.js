var should = require('should');
var assert = require('assert');
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

  describe('Create Shortened URL', function(){
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

    // it('', function(done){
    //
    // });
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

    // it('', function(done){
    //
    // });
  });

})
