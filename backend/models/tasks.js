const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const taskSchema = mongoose.Schema({
  title: {type: String, required: true},
  name: {type: String, required: true},
  task: {type: String, required: true},
  date: {type: String, required: true},
});

taskSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Task', taskSchema);
