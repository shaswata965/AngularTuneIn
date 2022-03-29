const mongoose = require ('mongoose'), Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const contactSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required:true},
  email: {type: String, required:true},
  subject: {type:String, required:true},
  text: {type:String, required:true},
  starred: {type:String, required:true},
  currentTime:{type:String, required:true}
});

contactSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Contact', contactSchema);
