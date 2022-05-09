const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const adSchema = mongoose.Schema({
  name: {type: String, required: true},
  imagePath: {type: String, required:true},
  page: {type: String, required:true}
});

adSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Ad', adSchema);
