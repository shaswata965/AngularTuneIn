const express = require('express');
const bodyParser = require('body-parser');

const Contact = require('../models/contacts');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('',(req,res,next)=>{

  const contact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
    starred: "N/A",
    currentTime: req.body.currentTime
  });
  contact.save()
    .then(result => {
      res.status(201).json({
        message: 'Message Created!',
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
  Contact.find()
    .then(documents=>{
      res.status(200).json({
        message: "Contacts Listed Successfully",
        contacts: documents
      });
    });
});

router.put('/starred/:id',(req,res,next)=>{
  const contact = new Contact({
    _id:req.params.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
    starred: req.body.starred,
    currentTime: req.body.currentTime,
  });

  Contact.updateOne({_id:req.params.id}, contact)
    .then(result => {
      res.status(201).json({
        message: 'Message updated!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:id",(req,res,next)=>{
  Contact.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Contact Deleted"
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;
