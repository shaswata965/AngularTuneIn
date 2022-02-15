const express = require('express');
const bodyParser = require('body-parser');

const Task = require('../models/tasks');
const Admin = require("../models/admins");
const Album = require("../models/albums");

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('',(req,res,next)=>{
  Task.find()
    .then(documents=>{
      res.status(200).json({
        message: "Tasks Listed Successfully",
        tasks: documents
      });
    });
});

router.post('',(req,res,next)=>{
  Admin.findById(req.body.name).then(adminData=>{
   let adminName = adminData.name;
   console.log(adminName);
    const task = new Task({
      title: req.body.title,
      name: req.body.name,
      task: req.body.task,
      date: req.body.date,
      admin: adminName,
      adminImagePath: adminData.imagePath,
    });
    console.log(task);
    task.save()
      .then(result => {
        res.status(201).json({
          message: 'Task Created!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.delete("/:id",(req,res,next)=>{
  Task.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Task Deleted"
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;
