const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const adminController = require('../controllers/admin');

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
    cb(error, "src/assets/backend/image/user-image");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+'-'+Date.now()+'.'+ext);
  }
});

router.post('', multer({storage: storage}).single("image"), adminController.createAdmin);

router.get('', adminController.getAdmin);

router.post('/login', adminController.logIn);

router.delete("/:id",adminController.deleteAdmin);

router.put("/:id", multer({storage: storage}).single("image"), adminController.updateAdmin);

router.get('/:id',adminController.findAdmin);

module.exports = router;
