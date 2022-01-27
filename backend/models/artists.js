const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const artistSchema = mongoose.Schema({
  name: {type: String, required: true},
  imagePath: {type: String, required:true}
});

artistSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Artist', artistSchema);
