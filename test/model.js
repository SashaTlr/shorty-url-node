var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var mongoURI = "mongodb://localhost:27017/test";

var api_url = "http://localhost:3000/"

var shortUrl = require('../app/models/shortUrl.js')

describe ('Shortened URL model tests', function(){

  var dbcount;
  before (function(done){
    mongoose.connect(mongoURI);
    mongoose.connection.db.dropDatabase();
    done();
  });

  describe ('Add objects to URL model', function() {
    it('valid url and shortcode should be added to database', function(done){
      new_url = {"shortcode":"abcdef", "url":"www.google.com"}
      var addShortCode = new shortUrl(new_url);
      addShortCode.save(function (err, docs){
        if (err){
          throw err
        }
          shortUrl.count(new_url, function(err, count){
          count.should.equal(1);
          done();
        });
      });
    });

    it('blank url should not be added to database', function(done){
      new_url = {"shortcode":"abcdef", "url":""}
      var addShortCode = new shortUrl(new_url);
      addShortCode.save(function (err, docs){
          shortUrl.count(new_url, function(err, count){
          count.should.equal(0);
          done();
        });
      });
    });

  });

  after (function(done){
    mongoose.connection.close();
    done();
  });

});
