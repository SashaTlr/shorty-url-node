var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var mongoURI = "mongodb://localhost:27017/test";

var api_url = "http://localhost:3000/"

var shortUrl = require('../app/models/shortUrl.js')

describe ('Shortened URL model tests', function(){

  before (function(done){
    mongoose.connect(mongoURI);
    done();
  });

  describe('', function(){

    xit('', function(done){

    });

  });

  after (function(done){
    mongoose.connection.close();
    done();
  });

})
