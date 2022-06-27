const Artist = require("../models/artists");
const Song = require("../models/songs");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

exports.getArtist = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const artistQuery = Artist.find();
  let artists;
  if(pageSize && currentPage){
    artistQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize)
  }
  artistQuery.find()
    .then(documents=>{
      artists = documents;
      return Artist.count();
    })
    .then(count=>{
      res.status(200).json({
        message: "Artists Listed Successfully",
        artists: artists,
        count: count
      });
    });
};

exports.getFeaturedArtist = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const artistQuery = Artist.find();
  let artists = [];
  let updatedArtist ={
    _id: '',
    name: '',
    imagePath:'',
    songs: ''
  }
  if(pageSize && currentPage){
    artistQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize)
  }
  artistQuery.find()
    .then( documents => {
      for (let i = 0; i < documents.length; i++) {
        let n = documents[i].name;
        let m =[];
        m.push(Song.find({artist: n}).count());
        let o = Promise.all(m);
        o.then(result=>{
          artists.push(
            updatedArtist = {
              _id: documents[i]._id,
              name: documents[i].name,
              imagePath:documents[i].imagePath,
              songs: result
            });
          return {documents, artists}
        }).then(r=> {
          if (r.documents.length === r.artists.length){
            res.status(200).json({
              message: "Artists Listed Successfully",
              artists: r.artists,
              count: r.documents.length
            });
          }
            })
      }
    })
    .then(results=>{
      // res.status(200).json({
      //   message: "Artists Listed Successfully",
      //   artists: results,
      //   count: artistCount
      // });
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
