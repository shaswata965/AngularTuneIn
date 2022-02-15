const mongoose = require ('mongoose'), Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const taskSchema = mongoose.Schema({
  title: {type: String, required: true},
  name: {
    type: Schema.Types.ObjectId,
    ref:'Admin'},
  task: {type: String, required: true},
  date: {type: String, required: true},
  admin:{type: String, required: true},
  adminImagePath:{type: String, required: true}
});

taskSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Task', taskSchema);
