const express = require('express');
const bodyParser = require('body-parser');

const Event = require('../models/events');
const Admin = require('../models/admins');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('',(req,res,next)=>{

  Admin.findById(req.body.admin).then(documents=>{
    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      admin: documents.name,
      eventDate: req.body.eventDate,
      eventMonth: req.body.eventMonth,
      currentTime: req.body.currentTime,
      currentAdmin: req.body.currentAdmin
    });
    event.save()
      .then(result => {
        res.status(201).json({
          message: 'Event Created!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }).catch(err=>{
    res.status(500).json({
      error: err
    });
  });


});

router.put("/:id",(req,res,next)=>{
  const event = new Event({
    _id:req.body.id,
    title: req.body.title,
    description: req.body.description,
    admin: req.body.admin,
    eventDate: req.body.eventDate,
    eventMonth: req.body.eventMonth,
    currentTime: req.body.currentTime,
    currentAdmin: req.body.currentAdmin
  });
  Event.updateOne({_id:req.params.id}, event)
    .then(result => {
      res.status(201).json({
        message: 'Event updated!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get('',(req,res,next)=>{
  Event.find()
    .then(documents=>{
      res.status(200).json({
        message: "Languages Listed Successfully",
        events: documents
      });
    });
});

router.get('/modal/:id',(req,res,next)=>{
  Admin.findById(req.params.id)
    .then(documents=>{
      res.status(200).json({
        message: "Admins Listed Successfully",
        adminName: documents.name
      });
    });
});

router.get('/:id',(req,res,next)=>{
  Event.findById(req.params.id).then(event=>{
    if(event){
      res.status(200).json(event);
    }else{
      res.status(404).json({
        message:"Event not Found"
      });
    }
  });
});

router.delete("/:id",(req,res,next)=>{
  Event.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Language Deleted"
    });
  });
});

module.exports = router;
