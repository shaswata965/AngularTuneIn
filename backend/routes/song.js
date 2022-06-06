const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const Song = require('../models/songs');
const Album = require('../models/albums');
const Language = require('../models/languages');
const Actor = require('../models/actors');
const Genre = require('../models/genres')
const songController = require('../controllers/song');
const albumController = require("../controllers/album");

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


router.get('', songController.getSong);

router.get('/bollywood', songController.getBollywoodSong);

router.post('',multer({storage: storage}).fields([{name:'image',maxCount:1},{name:'lowSong',maxCount:1},{name:'highSong',maxCount:1}]),songController.createSong);

router.put("/:id", multer({storage: storage}).fields([{name:'image',maxCount:1},{name:'lowSong',maxCount:1},{name:'highSong',maxCount:1}]), songController.updateSong);

router.get('/:id',songController.findSong);

router.get('/modal/:language/:actor/:genre/:album', songController.findSongDetails);

router.delete("/:id",songController.deleteSong);

router.get("/find-language/:languageId", songController.findLanguageSong);

module.exports = router;
