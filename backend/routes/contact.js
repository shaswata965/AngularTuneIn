const express = require('express');
const bodyParser = require('body-parser');

const Contact = require('../models/contacts');
const Actor = require("../models/actors");

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

router.get('/starred/:id/:starred',(req,res,next)=>{

  const contact = new Contact({
    _id:req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
    starred: req.params.starred,
    currentTime: req.params.currentTime,
  });

  Contact.updateOne({_id:req.params.id}, contact)
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Contact updated!',
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
