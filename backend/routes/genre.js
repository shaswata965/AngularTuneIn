const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const Genre = require('../models/genres');

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
    cb(error, "src/assets/backend/image/genreImage");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+'-'+Date.now()+'.'+ext);
  }
});

router.get('',(req,res,next)=>{
  Genre.find()
    .then(documents=>{
      console.log(documents);
      res.status(200).json({
        message: "Albums Listed Successfully",
        genres: documents
      });
    });
});

router.post('',multer({storage: storage}).single("image"),(req,res,next)=>{
  const url = req.protocol + '://' + req.get("host");
  const genre = new Genre({
    name: req.body.name,
    imagePath: url + "/image/genreImage/" + req.file.filename,
  });
  genre.save()
    .then(result => {
      res.status(201).json({
        message: 'Genre Created!',
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
    imagePath = url + "/image/genreImage/" + req.file.filename;
  }
  const genre = new Genre({
    _id:req.body.id,
    name: req.body.name,
    imagePath: imagePath,
  });

  Genre.updateOne({_id:req.params.id}, genre)
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
  Genre.findById(req.params.id)
    .then(genre=>{
      if(genre){
        res.status(200).json(genre);
      }else{
        res.status(404).json({
          message:"Genre not Found"
        });
      }
    }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.delete("/:id",(req,res,next)=>{
  Genre.deleteOne({_id: req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({
      message:"Genre Deleted"
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;
