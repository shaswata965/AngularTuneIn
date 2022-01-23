const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

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

router.post('',multer({storage: Userstorage}).single("image"),(req,res,next)=>{
  bcrypt.hash(req.body.password, 10)
    .then(hash=> {
      const url = req.protocol + '://' + req.get("host");
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        imagePath: url + "/image/userImage/" + req.file.filename,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User Created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
      console.log(user);
    });
});

router.post('/social',(req,res,next)=>{
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    imagePath: req.body.image
  });
  user.save();
  console.log(user);
});

router.get('',(req, res, next)=>{
  User.find()
    .then(documents=>{
      console.log(documents);
      res.status(200).json({
        message: "Users Listed Successfully",
        users: documents
      });
    });
});

router.delete("/:id",(req,res,next)=>{
  User.deleteOne({_id: req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({
      message:"User Deleted"
    });
  });
});

router.post('/login',(req,res,next)=>{
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user=>{
      if(!user){
        return res.status(401).json({
          message: " Auth Failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result=>{
      if(!result){
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      const token = jwt.sign({name: fetchedUser.name, email: fetchedUser.email}, 'This_is_the_secret',
        {expiresIn: '1h'});
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        currentUser: fetchedUser.name,
        currentEmail: fetchedUser.email,
        currentImage: fetchedUser.imagePath
      });
    })
    .catch(err=>{
      return res.status(401).json({
        message: "Auth Failed"
      });
    });

});

router.post('/social/login',(req,res,next)=>{
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user=>{
      if(!user){
        return res.status(401).json({
          message: " Auth Failed"
        });
      }
      fetchedUser = user;
      const token = jwt.sign({name: fetchedUser.name, email: fetchedUser.email}, 'This_is_the_secret',
        {expiresIn: '1h'});
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        currentUser: fetchedUser.name,
        currentEmail: fetchedUser.email,
        currentImage: fetchedUser.imagePath
      });
    });
});

module.exports = router;
