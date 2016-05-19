var mongoose = require('mongoose');

var shortUrlSchema = new mongoose.Schema({
  url: {type: String, required: [true, 'url is not present']},
  shortcode: {type: String, validate: [/^[0-9a-zA-Z_]{4,}$/, 'The shortcode fails to meet the following regexp: ^[0-9a-zA-Z_]{4,}$.']},
  updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('shortUrl', shortUrlSchema);
