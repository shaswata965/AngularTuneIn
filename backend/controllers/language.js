const Language = require("../models/languages");
const Album = require("../models/albums");

exports.createLanguage = (req,res,next)=>{

  const language = new Language({
    name: req.body.name
  });
  language.save()
    .then(result => {
      res.status(201).json({
        message: 'Language Created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.updateLanguage = (req,res,next)=>{
  const language = new Language({
    _id:req.body.id,
    name: req.body.name,
  });
  Language.updateOne({_id:req.params.id}, language)
    .then(result => {
      res.status(201).json({
        message: 'Language updated!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.getLanguage = (req,res,next)=>{
  Language.find()
    .then(documents=>{
      res.status(200).json({
        message: "Languages Listed Successfully",
        languages: documents
      });
    });
};

exports.getLanguageAlbum = (req,res,next)=>{
  const names = [];
  Album.find({language: req.params.id})
    .then(documents=>{
      let c = documents.length;
      for(let i = 0; i<c; i++){
        let obj = documents[i];
        names.push(obj.name);
      }
      res.send(names);
    });
};

exports.findLanguage = (req,res,next)=>{
  Language.findById(req.params.id).then(language=>{
    if(language){
      res.status(200).json(language);
    }else{
      res.status(404).json({
        message:"Language not Found"
      });
    }
  });
};

exports.deleteLanguage = (req,res,next)=>{
  Language.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Language Deleted"
    });
  });
};
