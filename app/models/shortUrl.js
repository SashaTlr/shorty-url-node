var mongoose = require('mongoose');

var shortUrlSchema = new mongoose.Schema({
  url: String,
  shortcode: String,
  updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('shortUrl', shortUrlSchema);
