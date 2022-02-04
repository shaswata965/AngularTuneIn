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
  const song = new Song({
    name: req.body.name,
    language: req.body.language,
    actor: req.body.actor,
    genre: req.body.genre,
    album: req.body.album,
    lowPath:url + "/songs/" +req.files.lowSong[0].filename,
    highPath:url + "/songs/" +req.files.highSong[0].filename,
    imagePath: url + "/image/songImage/" + req.files.image[0].filename,
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

router.put("/:id", multer({storage: storage}).fields([{name:'image',maxCount:1},{name:'lowSong',maxCount:1},{name:'highSong',maxCount:1}]),(req,res,next)=>{
  let imagePath = req.body.imagePath;
  let lowPath = req.body.lowPath;
  let highPath = req.body.highPath
  if(req.files){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/image/songImage/" + req.files.image[0].filename;
    lowPath = url + "/songs/" + req.files.lowSong[0].filename;
    highPath = url + "/songs/" + req.files.highSong[0].filename;
  }
  const song = new Song({
    _id:req.body.id,
    name: req.body.name,
    language: req.body.language,
    actor: req.body.actor,
    genre: req.body.genre,
    album: req.body.album,
    lowPath: lowPath,
    highPath: highPath,
    imagePath: imagePath,
  });
  Song.updateOne({_id:req.params.id}, song)
    .then(result => {
      res.status(201).json({
        message: 'Song updated!',
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
  Song.findById(req.params.id)
    .then(song=>{
      if(song){
        res.status(200).json(song);
      }else{
        res.status(404).json({
          message:"Song not Found"
        });
      }
    }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.get('/modal/:language/:actor/:genre/:album',async (req, res, next) => {
  const songDet = [];

  Language.findById(req.params.language).then(name => {
    songDet.push(name.name);
    Actor.findById(req.params.actor).then(actor => {
      songDet.push(actor.name);
      Genre.findById(req.params.genre).then(genre => {
        songDet.push(genre.name);
        Album.findById(req.params.album).then(album=>{
          songDet.push(album.name);
          res.status(200).json(songDet);
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
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });

});

router.delete("/:id",(req,res,next)=>{
  Song.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Song Deleted"
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;
