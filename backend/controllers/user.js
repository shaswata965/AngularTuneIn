const bcrypt = require("bcrypt");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

exports.createUser = (req,res,next)=>{
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
    });
};

exports.createSocialUser = (req,res,next)=>{
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    imagePath: req.body.image
  });
  user.save().then(result=>{
  }).catch(error=>{
    console.log(error);
  });
};

exports.getUser = (req, res, next)=>{
  User.find()
    .then(documents=>{
      res.status(200).json({
        message: "Users Listed Successfully",
        users: documents
      });
    });
};

exports.deleteUser = (req,res,next)=>{
  User.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"User Deleted"
    });
  });
};

exports.logInUser = (req,res,next)=>{
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

};

exports.socialLogIn = (req,res,next)=>{
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
    }).catch(error=>{
    console.log(error);
  });
};
