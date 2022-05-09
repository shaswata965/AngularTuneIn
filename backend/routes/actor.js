const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const actorController = require('../controllers/actor');

const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
    }
    cb(error, "src/assets/backend/image/actorImage");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+'-'+Date.now()+'.'+ext);
  }
});

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));



router.get('', actorController.getActor);

router.post('',multer({storage: storage}).single("image"), actorController.createActor);

router.put("/:id", multer({storage: storage}).single("image"), actorController.updateActor);

router.get('/:id',actorController.findActor);

router.delete("/:id",actorController.deleteActor);

router.get("/imdb/:name",actorController.imdbActor);

module.exports = router;
