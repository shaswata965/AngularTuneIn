const Genre = require("../models/genres");

exports.getGenre = (req,res,next)=>{
  Genre.find()
    .then(documents=>{
      res.status(200).json({
        message: "Albums Listed Successfully",
        genres: documents
      });
    });
};

exports.createGenre = (req,res,next)=>{
  const url = req.protocol + '://' + req.get("host");
  const genre = new Genre({
    name: req.body.name,
    imagePath: url + "/image/genreImage/" + req.file.filename,
  });
  genre.save()
    .then(result => {
      res.status(201).json({
        message: 'Genre Created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.updateGenre = (req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/image/genreImage/" + req.file.filename;
  }
  const genre = new Genre({
    _id:req.body.id,
    name: req.body.name,
    imagePath: imagePath,
  });

  Genre.updateOne({_id:req.params.id}, genre)
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

exports.findGenre = (req,res,next)=>{
  Genre.findById(req.params.id)
    .then(genre=>{
      if(genre){
        res.status(200).json(genre);
      }else{
        res.status(404).json({
          message:"Genre not Found"
        });
      }
    }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
};

exports.deleteGenre = (req,res,next)=>{
  Genre.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Genre Deleted"
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
};
