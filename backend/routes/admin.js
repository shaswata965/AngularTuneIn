const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admins');

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

router.post('', multer({storage: storage}).single("image"),(req,res,next)=>{
  bcrypt.hash(req.body.password, 10)
    .then(hash=> {
      const url = req.protocol + '://' + req.get("host");
      const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        imagePath: url + "/image/user-image/" + req.file.filename,
        password: hash
      });
      admin.save()
        .then(result => {
          res.status(201).json({
            message: 'Admin Created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
Song
    });
});

router.get('',(req,res,next)=>{
  Admin.find()
    .then(documents=>{
      res.status(200).json({
        message: "Admins Listed Successfully",
        admins: documents
      });
    });
});

router.post('/login',(req,res,next)=>{
  let fetchedAdmin;
  Admin.findOne({ email: req.body.email })
    .then(admin=>{
      if(!admin){
        return res.status(401).json({
          message: " Auth Failed"
        });
      }
      fetchedAdmin = admin;
      return bcrypt.compare(req.body.password, admin.password);
    })
    .then(result=>{
      if(!result){
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      const token = jwt.sign({name: fetchedAdmin.name, email: fetchedAdmin.email}, 'This_is_the_secret',
        {expiresIn: '1h'});
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        currentAdmin: fetchedAdmin.name,
        currentAdminImage: fetchedAdmin.imagePath,
      });
    })
    .catch(err=>{
      return res.status(401).json({
        message: "Auth Failed"
      });
    });

});

router.delete("/:id",(req,res,next)=>{
  Admin.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Admin Deleted"
    });
  });
});

router.put("/:id", multer({storage: storage}).single("image"),(req,res,next)=>{
  bcrypt.hash(req.body.password, 10)
    .then(hash=> {
      let imagePath = req.body.imagePath;
      if(req.file){
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/image/user-image/" + req.file.filename;
      }
      const admin = new Admin({
        _id:req.body.id,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        imagePath: imagePath,
        password: hash
      });
      Admin.updateOne({_id:req.params.id}, admin)
        .then(result => {
          res.status(201).json({
            message: 'Admin updated!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });

});

router.get('/:id',(req,res,next)=>{
  Admin.findById(req.params.id).then(admin=>{
    if(admin){
      res.status(200).json(admin);
    }else{
      res.status(404).json({
        message:"Admin not Found"
      });
    }
  });
});

module.exports = router;
