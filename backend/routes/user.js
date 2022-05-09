const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const userController = require('../controllers/user');

const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'
};

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

const Userstorage = multer.diskStorage({
  destination: (req, file, cb) =>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
    }
    cb(error, "src/assets/frontend/image/userImage");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+'-'+Date.now()+'.'+ext);
  }
});

router.post('',multer({storage: Userstorage}).single("image"), userController.createUser);

router.post('/social', userController.createSocialUser);

router.get('',userController.getUser);

router.delete("/:id",userController.deleteUser);

router.post('/login', userController.logInUser);

router.post('/social/login', userController.socialLogIn);

module.exports = router;
