const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const albumController = require('../controllers/album');

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

router.get('', albumController.getAlbum);

router.get('/bollywood-albums', albumController.getBollywoodAlbum);

router.get('/artist-albums/:artistId', albumController.getArtistAlbum);

router.post('',multer({storage: storage}).single("image"), albumController.createAlbum);

router.put("/:id", multer({storage: storage}).single("image"), albumController.updateAlbum);

router.get('/:id', albumController.findAlbum);

router.get('/modal/:id/:genre/:industry', albumController.albumDetails);

router.delete("/:id", albumController.deleteAlbum);

router.get("/imdb/:name", albumController.imdbAlbum);

router.get("/find-language/:languageId", albumController.findLanguageAlbum);

router.get("/find-industry/:industryId", albumController.findIndustryAlbum);

router.get("/find-letter/:filter/:industryId", albumController.findLetterAlbum);

router.get("/find-year/:filter/:industryId", albumController.findYearAlbum);


module.exports = router;
