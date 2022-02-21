const express = require('express');
const bodyParser = require('body-parser');

const Task = require('../models/tasks');
const Admin = require("../models/admins");

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('',(req,res,next)=>{
  let value = 'No';
  Task.find({completed: value})
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
    const task = new Task({
      title: req.body.title,
      name: req.body.name,
      task: req.body.task,
      date: req.body.date,
      admin: adminName,
      completed: 'No',
      accepted: 'No',
      acceptAdmin: 'N/A',
      adminImagePath: adminData.imagePath,
    });
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

router.get("/:date",(req,res,next)=>{
  Task.find({date:req.params.date}).then(result=>{
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).json({
        message:"Task not Found"
      });
    }
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  })
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

router.get('/mark/:taskId',(req,res,next)=>{
  Task.findOneAndUpdate({_id:req.params.taskId},{
    completed: 'Yes'
  }).then(result=>{
    res.status(201).json({
      message: 'Task updated!',
      result: result
    });
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  });
});

router.get('/accept/:taskId/:currentAdmin',(req,res,next)=>{
  Task.findOneAndUpdate({_id:req.params.taskId},{
    accepted: 'Yes',
    acceptAdmin: req.params.currentAdmin
  }).then(result=>{
    res.status(201).json({
      message: 'Task updated!',
      result: result
    });
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  });
});

router.get('/completed/:complete/:accept',(req,res,next)=>{
  let taskArray = [];
  Task.find({completed:req.params.complete}).then(result=>{
    if(result){
      taskArray = result.filter(x=> x.accepted === req.params.accept);
      res.status(200).json(taskArray);
    }else{
      res.status(404).json({
        message:"Task not Found"
      });
    }
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  });
});

router.get('/accepted/:complete/:accept',(req,res,next)=>{
  let taskArray = [];
  Task.find({completed:req.params.complete}).then(result=>{
    if(result){
      taskArray = result.filter(x=> x.accepted === req.params.accept);
      res.status(200).json(taskArray);
    }else{
      res.status(404).json({
        message:"Task not Found"
      });
    }
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;
