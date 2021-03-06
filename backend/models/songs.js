const mongoose = require ('mongoose'), Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const songSchema = mongoose.Schema({
  name: {type: String, required: true},
  lowPath: {type: String},
  highPath: {type: String},
  trending: {type: String},
  genre:{
    type: Schema.Types.ObjectId,
    ref:'Genre'
  },
  actor: {
    type: Schema.Types.ObjectId,
    ref:'Actor'
  },
  language:{
    type: Schema.Types.ObjectId,
    ref:'Language'
  },
  album:{
    type: Schema.Types.ObjectId,
    ref:'Album'
  },
  artist:{type: String},
  industry:{type: String},
  imagePath: {type:String},
  duration: {type: String}
});

songSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Song', songSchema);
