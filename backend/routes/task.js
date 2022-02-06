const express = require('express');
const bodyParser = require('body-parser');

const Task = require('../models/tasks');
const Song = require("../models/songs");

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
  const task = new Task({
    title: req.body.title,
    name: req.body.name,
    task: req.body.task,
    date: req.body.date,
  });
  console.log(task);
  task.save()
    .then(result => {
      res.status(201).json({
        message: 'Song Created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
