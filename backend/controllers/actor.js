const Actor = require("../models/actors");
const fetch = require("cross-fetch");

exports.getActor = (req,res,next)=>{
  Actor.find()
    .then(documents=>{
      res.status(200).json({
        message: "Albums Listed Successfully",
        actors: documents
      });
    });
};

exports.createActor = (req,res,next)=>{
  const url = req.protocol + '://' + req.get("host");
  let birthDate = [];
  let deathDate= [];
  let deathDay = '';
  let deathMonth = '';
  birthDate = req.body.birth.split('-');
  if(req.body.death === "N/A"){
    deathDay = "N/A";
    deathMonth ="N/A";
  }else{
    deathDate = req.body.death.split('-');
    deathDay = deathDate[0];
    deathMonth = deathDate[1];
  }
  let birthDay = birthDate[0];
  let birthMonth = birthDate[1];
  const actor = new Actor({
    name: req.body.name,
    description: req.body.description,
    awards: req.body.awards,
    role: req.body.role,
    birth: req.body.birth,
    death: req.body.death,
    birthDay: birthDay,
    birthMonth: birthMonth,
    deathDay: deathDay,
    deathMonth: deathMonth,
    imagePath: url + "/image/actorImage/" + req.file.filename,
  });
  actor.save()
    .then(result => {
      res.status(201).json({
        message: 'Actor Created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.updateActor = (req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/image/actorImage/" + req.file.filename;
  }
  const actor = new Actor({
    _id:req.body.id,
    name: req.body.name,
    description: req.body.description,
    awards: req.body.awards,
    role: req.body.role,
    birth: req.body.birth,
    death: req.body.death,
    imagePath: imagePath,
  });

  Actor.updateOne({_id:req.params.id}, actor)
    .then(result => {
      res.status(201).json({
        message: 'Actor updated!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.findActor = (req,res,next)=>{
  Actor.findById(req.params.id)
    .then(actor=>{
      if(actor){
        res.status(200).json(actor);
      }else{
        res.status(404).json({
          message:"Actor not Found"
        });
      }
    }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
};

exports.deleteActor = (req,res,next)=>{
  Actor.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Actor Deleted"
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
};

exports.imdbActor  = (req,res,next)=>{
  let baseURL = "https://imdb-api.com/en/API/Name/";
  let APIKEY = "k_0g5b61co/"
  let overURL = baseURL.concat(APIKEY,req.params.name);

  fetch(overURL)
    .then(response => response.json())
    .then(data=>{
      res.status(200).json({
        message:"Actor Data Successfully Found ",
        actorData: data
      });
    })
    .catch(err => {
      console.error(err);
    });

};
