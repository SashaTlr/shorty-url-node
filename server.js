var express = require("express");
var bodyParser = require("body-parser");
var port = 3000;

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.listen(port);

console.log('Running on port' + port);
