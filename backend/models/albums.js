const mongoose = require ('mongoose'), Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const albumSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required:true},
  cast: {type: String, required:true},
  castLink: {type:String, required:true},
  release: {type:String, required:true},
  year: {type:String, required:true},
  genre:{
    type: Schema.Types.ObjectId,
    ref:'Genre'
  },
  artist: {type: String},
  language:{
    type: Schema.Types.ObjectId,
    ref:'Language'
  },
  industry:{type: String},
  imagePath: {type:String}
});

albumSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Album', albumSchema);
