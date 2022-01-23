const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const languageSchema = mongoose.Schema({
  name: {type: String, required: true}
});

languageSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Language', languageSchema);
