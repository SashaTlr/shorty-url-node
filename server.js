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

// routes will go here
router.route('/shorten')

  .post(function(req, res){
    var short_url = new shortUrl();
    short_url.url = req.body.url;
    short_url.shortcode = req.body.shortcode;

    short_url.save(function(err){
      if (err) {
        res.send(err);
      }
      else {
        res.status(200).type('application/json').json({ shortcode: short_url.shortcode });
        res.end();
      }
    });
  });


  //return all short codes
  router.route('/short_urls')
    .get(function(req, res) {
      shortUrl.find(function(err, short_urls){
        if (err) {
          res.send(err);
        }
        else {
          res.json(short_urls);
        }
      });
    });

// return url for given shortcode
  router.route('/:shortcode')
    .get(function(req, res){
      shortUrl.findOne(
        {
          shortcode: req.params.shortcode
        }, function(err, obj) {
        if (err) {
          res.send(err);
        }
        else {
          res.writeHead(302, {'Location': obj.url});
          res.end();
        }
    });
  });

app.use('/', router);

app.listen(port);
console.log('Running on port ' + port);
