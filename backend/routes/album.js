const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fetch = require('cross-fetch');

const Album = require('../models/albums');
const Language = require('../models/languages');
const Artist = require('../models/artists');
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
    cb(error, "src/assets/frontend/image/album");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+'-'+Date.now()+'.'+ext);
  }
});

router.get('',(req,res,next)=>{
  Album.find()
    .then(documents=>{
      res.status(200).json({
        message: "Albums Listed Successfully",
        albums: documents
      });
    });
});

router.post('',multer({storage: storage}).single("image"),(req,res,next)=>{
  const url = req.protocol + '://' + req.get("host");
  const album = new Album({
    name: req.body.name,
    description: req.body.description,
    cast: req.body.cast,
    castLink: req.body.castLink,
    release: req.body.release,
    year: req.body.year,
    language: req.body.language,
    artist: req.body.artist,
    genre: req.body.genre,
    imagePath: url + "/image/album/" + req.file.filename,
  });
  album.save()
    .then(result => {
      res.status(201).json({
        message: 'Album Created!',
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
    imagePath = url + "/image/album/" + req.file.filename;
  }
  const album = new Album({
    _id:req.body.id,
    name: req.body.name,
    description: req.body.description,
    cast: req.body.cast,
    castLink: req.body.castLink,
    release: req.body.release,
    year: req.body.year,
    language: req.body.language,
    artist: req.body.artist,
    genre: req.body.genre,
    imagePath: imagePath,
  });
  Album.updateOne({_id:req.params.id}, album)
    .then(result => {
      res.status(201).json({
        message: 'Album updated!',
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
  Album.findById(req.params.id)
    .then(album=>{
      if(album){
        res.status(200).json(album);
      }else{
        res.status(404).json({
          message:"Album not Found"
        });
      }
    }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.get('/modal/:id/:artist/:genre',async (req, res, next) => {
  const albumDet = [];

  Language.findById(req.params.id).then(name => {
    albumDet.push(name.name);
    Artist.findById(req.params.artist).then(artist => {
      albumDet.push(artist.name);
      Genre.findById(req.params.genre).then(genre => {
        albumDet.push(genre.name);
        res.status(200).json(albumDet);
      }).catch(err => {
        res.status(500).json({
          error: err
        });
      });
    }).catch(err => {
      res.status(500).json({
        error: err
      });
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });

});


router.delete("/:id",(req,res,next)=>{
  Album.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Album Deleted"
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.get("/imdb/:name",(req,res,next)=>{
  let baseURL = "https://imdb-api.com/en/API/Title/";
  let APIKEY = "k_0g5b61co/"
  let overURL = baseURL.concat(APIKEY,req.params.name);

  fetch(overURL)
    .then(response => response.json())
    .then(data=>{
      res.status(200).json({
        message:" Movie Data Successfully Found ",
        movieData: data
      });
    })
    .catch(err => {
      console.error(err);
    });

});

module.exports = router;
