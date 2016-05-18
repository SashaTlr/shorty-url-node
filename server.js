var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var shortUrl = require("./app/models/shortUrl");
var port = 3000;

var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

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

//routes
var router = express.Router();

router.get('/', function(req, res){
  res.json({message: "shorty url api"});
});
// routes will go here

app.use('/', router);

app.listen(port);
console.log('Running on port ' + port);
