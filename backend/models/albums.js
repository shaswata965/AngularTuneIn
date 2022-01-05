const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const albumSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required:true},
  composer: {type: String, required:true},
  lyricist: {type: String, required:true},
  release: {type:String, required:true},
  imagePath: {type:String}
});

albumSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Album', albumSchema);
