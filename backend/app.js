const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb+srv://Shaswata-web:AtlasPassword@cluster0.qqhb3.mongodb.net/Tunein?retryWrites=true&w=majority')
  .then(()=>{
    console.log("Successfully Connected To Database");
  }).catch(()=>{
    console.log("Connection Failure");
});

const User = require('./models/users');
const Admin = require('./models/admins');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS, PUT');
  next()
});

app.post('/api/users',(req,res,next)=>{
  bcrypt.hash(req.body.password, 10)
    .then(hash=> {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
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

app.post('/api/social/users',(req,res,next)=>{
      const user = new User({
        name: req.body.name,
        email: req.body.email,
      });
      user.save()
      console.log(user);
});

app.get('/api/users',(req, res, next)=>{
  res.status(200).json({
    message: "Posts fetched successfully",
  });
});

app.post('/api/users/login',(req,res,next)=>{
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
        expiresIn: 3600
      });
    })
    .catch(err=>{
      return res.status(401).json({
        message: "Auth Failed"
      });
    });

});

app.post('/api/social/users/login',(req,res,next)=>{
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
        expiresIn: 3600
      });
    });
});

app.post('/api/admins',(req,res,next)=>{
  bcrypt.hash(req.body.password, 10)
    .then(hash=> {
      const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
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
      console.log(admin);
    });
});

app.get('/api/admins',(req,res,next)=>{
  Admin.find()
    .then(documents=>{
      console.log(documents);
      res.status(200).json({
        message: "Admins Listed Successfully",
        admins: documents
      });
    });
});

app.post('/api/admins/login',(req,res,next)=>{
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
        expiresIn: 3600
      });
    })
    .catch(err=>{
      return res.status(401).json({
        message: "Auth Failed"
      });
    });

});

app.delete("/api/admins/:id",(req,res,next)=>{
  Admin.deleteOne({_id: req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({
      message:"Admin Deleted"
    });
  });
});

app.put("/api/admins/:id",(req,res,next)=>{
  bcrypt.hash(req.body.password, 10)
    .then(hash=> {
      const admin = new Admin({
        _id:req.body.id,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
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

app.get('/api/admins/:id',(req,res,next)=>{
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

module.exports= app;
