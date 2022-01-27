const mongoose = require ('mongoose'), Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const genreSchema = mongoose.Schema({
  name: {type: String, required: true},
  imagePath: {type:String}
});

genreSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Genre', genreSchema);
