const Artist = require("../models/artists");

exports.getArtist = (req,res,next)=>{
  Artist.find()
    .then(documents=>{
      res.status(200).json({
        message: "Albums Listed Successfully",
        artists: documents
      });
    });
};

exports.createArtist = (req,res,next)=>{
  const url = req.protocol + '://' + req.get("host");
  const artist = new Artist({
    name: req.body.name,
    imagePath: url + "/image/artistImage/" + req.file.filename,
  });
  artist.save()
    .then(result => {
      res.status(201).json({
        message: 'Artist Created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.updateArtist = (req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/image/artistImage/" + req.file.filename;
  }
  const artist = new Artist({
    _id:req.body.id,
    name: req.body.name,
    imagePath: imagePath,
  });

  Artist.updateOne({_id:req.params.id}, artist)
    .then(result => {
      res.status(201).json({
        message: 'Actor updated!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.findArtist = (req,res,next)=>{
  Artist.findById(req.params.id)
    .then(artist=>{
      if(artist){
        res.status(200).json(artist);
      }else{
        res.status(404).json({
          message:"Actor not Found"
        });
      }
    }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
};

exports.deleteArtist = (req,res,next)=>{
  Artist.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Artist Deleted"
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
};
