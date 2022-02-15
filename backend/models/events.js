const mongoose = require ('mongoose'), Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const eventSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required:true},
  eventDate: {type: String, required:true},
  eventMonth: {type:String, required:true},
  currentTime: {type:String, required:true},
  currentAdmin: {type:String, required:true},
  admin:{type:String, required:true}
});

eventSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Event', eventSchema);
