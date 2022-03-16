const mongoose = require ('mongoose'), Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const Language = require("./languages");

const taskSchema = mongoose.Schema({
  title: {type: String, required: true},
  name: {
    type: Schema.Types.ObjectId,
    ref:'Admin'},
  task: {type: String, required: true},
  date: {type: String, required: true},
  admin:{type: String, required: true},
  completed:{type:String, required:true},
  accepted:{type:String, required:true},
  adminImagePath:{type: String, required: true},
  acceptAdmin:{type: String, required:true},
  update:{type:String, required:true},
  reallocate:{type:String, required:true}
});



taskSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Task', taskSchema);
