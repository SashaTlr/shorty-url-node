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

    new_url = {
      shortcode: "apple",
      url: "http://www.apple.com",
    }
    var addShortCode = new shortUrl(new_url);
    addShortCode.save(function (err, docs){
      if (err){
        throw err
      }
    });

    done();
  });

  describe ('Add objects to URL model', function() {
    it('valid url and shortcode should be added to database', function(done){
      new_url = {
        shortcode: "google",
        url: "http://www.google.com",
      }
      var addShortCode = new shortUrl(new_url);
      addShortCode.save(function (err, docs){
        if (err){
          throw err
        }
          shortUrl.count({_id: addShortCode.id}, function(err, count){
          count.should.equal(1);
          done();
        });
      });
    });

    it('blank url should not be added to database', function(done){
      new_url = {
        shortcode: "google",
        url: ""
      }
      var addShortCode = new shortUrl(new_url);
      addShortCode.save(function (err, docs){
        shortUrl.count({_id: addShortCode.id}, function(err, count){
          count.should.equal(0);
          done();
        });
      });
    });

    it('blank shortcode should not be added to database', function(done){
      new_url = {
        shortcode: "",
        url: "http://www.google.com",
      }
      var addShortCode = new shortUrl(new_url);
      addShortCode.save(function (err, docs){
        shortUrl.count({_id: addShortCode.id}, function(err, count){
          count.should.equal(0);
          done();
        });
      });
    });

    it('shortcodes should be unique', function(done){
      new_url = {
        shortcode: "apple",
        url: "http://www.apple.com",
      }
      var addShortCode = new shortUrl(new_url);
      addShortCode.save(function (err, docs){
        shortUrl.count({_id: addShortCode.id}, function(err, count){
          count.should.equal(0);
        done();
        });
      });
    });

    it('shortcodes should match reg exp ^[0-9a-zA-Z_]{4,}$.]', function(done){
      new_url = {
        shortcode: "#####",
        url: "http://www.testing.com",
      }
      var addShortCode = new shortUrl(new_url);
      addShortCode.save(function (err, docs){
        shortUrl.count({_id: addShortCode.id}, function(err, count){
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
