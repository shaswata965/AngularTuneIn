const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fetch = require('cross-fetch');

const Actor = require('../models/actors');

const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'
};

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
    }
    cb(error, "src/assets/backend/image/actorImage");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+'-'+Date.now()+'.'+ext);
  }
});

router.get('',(req,res,next)=>{
  Actor.find()
    .then(documents=>{
      console.log(documents);
      res.status(200).json({
        message: "Albums Listed Successfully",
        actors: documents
      });
    });
});

router.post('',multer({storage: storage}).single("image"),(req,res,next)=>{
  const url = req.protocol + '://' + req.get("host");
  const actor = new Actor({
    name: req.body.name,
    description: req.body.description,
    awards: req.body.awards,
    role: req.body.role,
    birth: req.body.birth,
    death: req.body.death,
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
  console.log(actor);
});

router.put("/:id", multer({storage: storage}).single("image"),(req,res,next)=>{
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
});

router.get('/:id',(req,res,next)=>{
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
});

router.delete("/:id",(req,res,next)=>{
  Actor.deleteOne({_id: req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({
      message:"Actor Deleted"
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.get("/imdb/:name",(req,res,next)=>{
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

});

module.exports = router;