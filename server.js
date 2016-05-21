  var express = require("express");
  var mongoose = require("mongoose");
  var bodyParser = require("body-parser");
  var shortUrl = require("./app/models/shortUrl");
  var routes = require("./app/routes/shortUrl")
  var RandExp = require('randexp');

var port = 3000;

var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('/', routes);

//mongoDB connection
var mongoURI = "mongodb://localhost:27017/test";
mongoose.connect(mongoURI);

mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server");
});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server");
  return console.log(err);
});



app.listen(port);
console.log('Running on port ' + port);
