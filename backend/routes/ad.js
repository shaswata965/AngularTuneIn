const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const adController = require('../controllers/ad');

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
    cb(error, "src/assets/backend/image/Ad");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+'-'+Date.now()+'.'+ext);
  }
});

router.get('', adController.getAd);

router.post('',multer({storage: storage}).single("image"), adController.createAd);

router.put("/:id", multer({storage: storage}).single("image"), adController.updateAd);

router.get('/:id', adController.findAd);

router.get('/page-ads/:pageData', adController.findPageAd);

router.delete("/:id",adController.deleteAd);

module.exports = router;
