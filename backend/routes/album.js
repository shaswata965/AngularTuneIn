const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const Album = require('../models/albums');

const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'
};

const router = express.Router();

router.use("/image/album/", express.static(path.join("src/assets/frontend/image/album/")));

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

router.post('',multer({storage: storage}).single("image"),(req,res,next)=>{
      const url = req.protocol + '://' + req.get("host");
      const album = new Album({
        name: req.body.name,
        description: req.body.description,
        composer: req.body.composer,
        lyricist: req.body.lyricist,
        release: req.body.release,
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
      console.log(album);
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
        composer: req.body.composer,
        lyricist: req.body.lyricist,
        release: req.body.release,
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

module.exports = router;
