var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient
var port = 3000;

var app = express();

var mongoURI = "mongodb://localhost:27017/test";
mongoose.connect(mongoURI);

mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server");
  //return start_up();
});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server");
  return console.log(err);
});


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var router = express.Router();
// routes will go here


app.listen(port);

console.log('Running on port ' + port);
