const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const industrySchema = mongoose.Schema({
  name: {type: String, required: true}
});

industrySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Industry', industrySchema);
