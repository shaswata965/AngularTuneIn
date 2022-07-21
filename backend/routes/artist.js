const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const Artist = require('../models/artists');
const artistController = require('../controllers/artist');

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

router.get('', artistController.getArtist);

router.get('/featured-artists', artistController.getFeaturedArtist);

router.get('/artistName/:artistName', artistController.getNameArtist);

router.post('',multer({storage: storage}).single("image"),artistController.createArtist);

router.put("/:id", multer({storage: storage}).single("image"), artistController.updateArtist);

router.get('/:id',artistController.findArtist);

router.delete("/:id",artistController.deleteArtist);

module.exports = router;
