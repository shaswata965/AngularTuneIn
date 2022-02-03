const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const Song = require('../models/songs');
const Album = require('../models/albums');
const Language = require('../models/languages');
const Actor = require('../models/actors');
const Genre = require('../models/genres');

const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'
};

const MIME_TYPE_MAP_SONG = {
  'audio/mpeg' : 'mp3',
};

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if( file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ){
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "src/assets/backend/image/songImage");
      }else{
        let error = new Error("Invalid mime type");
          error = null;
        cb(error, "src/assets/backend/songs/");
      }
    },
    filename: (req, file, cb) => {
      if( file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ){
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + '-' + Date.now() + '.' + ext);
      }else{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP_SONG[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
      }
    }
  });


router.get('',(req,res,next)=>{
  Song.find()
    .then(documents=>{
      res.status(200).json({
        message: "Albums Listed Successfully",
        songs: documents
      });
    });
});

router.post('',multer({storage: storage}).fields([{name:'image',maxCount:1},{name:'lowSong',maxCount:1},{name:'highSong',maxCount:1}]),(req,res,next)=>{
  const url = req.protocol + '://' + req.get("host");
  console.log(req.files.lowSong[0].filename, req.files.highSong[0].filename,req.files.image[0].filename);
  const song = new Song({
    name: req.body.name,
    language: req.body.language,
    actor: req.body.actor,
    genre: req.body.genre,
    album: req.body.album,
    lowPath:url + "/songs" +req.files.lowSong[0].filename,
    highPath:url + "/songs" +req.files.highSong[0].filename,
    imagePath: url + "/image/album/" + req.files.image[0].filename,
  });
  song.save()
    .then(result => {
      res.status(201).json({
        message: 'Song Created!',
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

module.exports = router;
