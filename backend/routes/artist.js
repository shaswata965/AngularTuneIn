const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const Artist = require('../models/artists');

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
    cb(error, "src/assets/backend/image/artistImage");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+'-'+Date.now()+'.'+ext);
  }
});

router.get('',(req,res,next)=>{
  Artist.find()
    .then(documents=>{
      console.log(documents);
      res.status(200).json({
        message: "Albums Listed Successfully",
        artists: documents
      });
    });
});

router.post('',multer({storage: storage}).single("image"),(req,res,next)=>{
  const url = req.protocol + '://' + req.get("host");
  const artist = new Artist({
    name: req.body.name,
    imagePath: url + "/image/artistImage/" + req.file.filename,
  });
  artist.save()
    .then(result => {
      res.status(201).json({
        message: 'Artist Created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.put("/:id", multer({storage: storage}).single("image"),(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/image/artistImage/" + req.file.filename;
  }
  const artist = new Artist({
    _id:req.body.id,
    name: req.body.name,
    imagePath: imagePath,
  });

  Artist.updateOne({_id:req.params.id}, artist)
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
  Artist.findById(req.params.id)
    .then(artist=>{
      if(artist){
        res.status(200).json(artist);
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
  Artist.deleteOne({_id: req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({
      message:"Artist Deleted"
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;
