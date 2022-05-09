const Ad = require("../models/ad");

exports.getAd = (req,res,next)=>{
  Ad.find()
    .then(documents=>{
      res.status(200).json({
        message: "Albums Listed Successfully",
        ads: documents
      });
    });
};

exports.createAd = (req,res,next)=>{
  const url = req.protocol + '://' + req.get("host");
  const ad = new Ad({
    name: req.body.name,
    imagePath: url + "/image/Ad/" + req.file.filename,
    page: req.body.page
  });
  ad.save()
    .then(result => {
      res.status(201).json({
        message: 'Ad Created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.updateAd = (req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/image/Ad/" + req.file.filename;
  }
  const ad = new Ad({
    _id:req.body.id,
    name: req.body.name,
    imagePath: imagePath,
    page: page,
  });

  Ad.updateOne({_id:req.params.id}, ad)
    .then(result => {
      res.status(201).json({
        message: 'Ad updated!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.findAd = (req,res,next)=>{
  Ad.findById(req.params.id)
    .then(artist=>{
      if(artist){
        res.status(200).json(artist);
      }else{
        res.status(404).json({
          message:"Ad not Found"
        });
      }
    }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
};

exports.deleteAd = (req,res,next)=>{
  Ad.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Ad Deleted"
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
};
