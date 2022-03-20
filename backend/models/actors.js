const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const actorSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  role: {type: String, required:true, unique: true},
  awards: {type:String, required:true},
  birth: {type:String, required:true},
  death: {type:String, required:true},
  imagePath: {type: String, required:true},
  birthDay:{type:String, required:true},
  birthMonth:{type:String, required:true},
  deathDay:{type:String, required:true},
  deathMonth:{type:String, required:true}
});

actorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Actor', actorSchema);
