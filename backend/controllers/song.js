const Song = require("../models/songs");
const Language = require("../models/languages");
const Actor = require("../models/actors");
const Genre = require("../models/genres");
const Album = require("../models/albums");
const fetch = require("cross-fetch");
const fs = require('fs');

exports.getSong = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const songQuery = Song.find();
  let songs;
  if(pageSize && currentPage){
    songQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize);
  }
    songQuery.find()
      .then(documents=>{
        songs =documents;
        return Song.count();
      })
      .then(count=>{
        res.status(200).json({
          message: "Albums Listed Successfully",
          songs: songs,
          count: count
        });
      });

};

exports.getArtistSongs = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const songQuery = Song.find();
  let songs;
  if(pageSize && currentPage){
    songQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize);
  }
  songQuery.find({artist: req.params.artistName})
    .then(documents=>{
      songs = documents;
      return Song.find({artist: req.params.artistName}).count();
    })
    .then(count=>{
      res.status(200).json({
        message: "Albums Listed Successfully",
        songs: songs,
        count: count
      });
    });

};

exports.getBollywoodSong = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const songQuery = Song.find();
  let songs;
  if(pageSize && currentPage){
    songQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize);
  }
  songQuery.find({industry:"Bollywood"})
    .then(documents=>{
      songs =documents;
      return Song.find({industry:"Bollywood"}).count();
    })
    .then(count=>{
      res.status(200).json({
        message: "Albums Listed Successfully",
        songs: songs,
        count: count
      });
    });

};

exports.createSong = (req,res,next)=>{
  const url = req.protocol + '://' + req.get("host");
  const song = new Song({
    name: req.body.name,
    language: req.body.language,
    actor: req.body.actor,
    genre: req.body.genre,
    album: req.body.album,
    artist: req.body.artist,
    industry: req.body.industry,
    trending: req.body.trending,
    duration: req.body.duration,
    lowPath:url + "/songs/" +req.files.lowSong[0].filename,
    highPath:url + "/songs/" +req.files.highSong[0].filename,
    imagePath: url + "/image/songImage/" + req.files.image[0].filename,
  });
  song.save()
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
};

exports.updateSong = (req,res,next)=>{
  let imagePath = req.body.imagePath;
  let lowPath = req.body.lowPath;
  let highPath = req.body.highPath;
  if (req.files){
  if(req.files.image && req.files.lowSong && req.files.highSong){

  const url = req.protocol + '://' + req.get("host");
  imagePath = url + "/image/songImage/" + req.files.image[0].filename;
  lowPath = url + "/songs/" + req.files.lowSong[0].filename;
  highPath = url + "/songs/" + req.files.highSong[0].filename;

}
else if(req.files.image && req.files.lowSong){

  const url = req.protocol + '://' + req.get("host");
  imagePath = url + "/image/songImage/" + req.files.image[0].filename;
  lowPath = url + "/songs/" + req.files.lowSong[0].filename;
  highPath = req.body.highPath;

}
else if(req.files.image){

  const url = req.protocol + '://' + req.get("host");
  imagePath = url + "/image/songImage/" + req.files.image[0].filename;
  highPath = req.body.highPath;
  lowPath = req.body.lowPath;

}
else if( req.files.lowSong && req.files.highSong){

  const url = req.protocol + '://' + req.get("host");
  imagePath = req.body.imagePath;
  lowPath = url + "/songs/" + req.files.lowSong[0].filename;
  highPath = url + "/songs/" + req.files.highSong[0].filename;

}
else if( req.files.lowSong){
  const url = req.protocol + '://' + req.get("host");
  imagePath = req.body.imagePath;
  lowPath = url + "/songs/" + req.files.lowSong[0].filename;
  highPath = req.body.highPath;

}
else if(req.files.image && req.files.highSong){

  const url = req.protocol + '://' + req.get("host");
  imagePath = url + "/image/songImage/" + req.files.image[0].filename;
  lowPath = req.body.lowPath;
  highPath =url + "/songs/" + req.files.highSong[0].filename;

}
else if( req.files.highSong){
  const url = req.protocol + '://' + req.get("host");
  imagePath = req.body.imagePath;
  lowPath = req.body.lowPath;
  highPath = url + "/songs/" + req.files.highSong[0].filename;

}
}

  const song = new Song({
    _id:req.body.id,
    name: req.body.name,
    language: req.body.language,
    actor: req.body.actor,
    genre: req.body.genre,
    album: req.body.album,
    artist: req.body.artist,
    industry: req.body.industry,
    trending: req.body.trending,
    duration: req.body.duration,
    lowPath: lowPath,
    highPath: highPath,
    imagePath: imagePath,
  });
  Song.updateOne({_id:req.params.id}, song)
    .then(result => {
      res.status(201).json({
        message: 'Song updated!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.findSong = (req,res,next)=>{
  Song.findById(req.params.id)
    .then(song=>{
      if(song){
        res.status(200).json(song);
      }else{
        res.status(404).json({
          message:"Song not Found"
        });
      }
    }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
};

exports.findSongDetails = async (req, res, next) => {
  const songDet = [];
  Language.findById(req.params.language).then(name => {
    songDet.push(name.name);
    Actor.findById(req.params.actor).then(actor => {
      songDet.push(actor.name);
      Genre.findById(req.params.genre).then(genre => {
        songDet.push(genre.name);
        Album.findById(req.params.album).then(album=>{
          songDet.push(album.name);
          res.status(200).json(songDet);
        }).catch(err => {
          res.status(500).json({
            error: err
          });
        });
      }).catch(err => {
        res.status(500).json({
          error: err
        });
      });
    }).catch(err => {
      res.status(500).json({
        error: err
      });
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });

};

exports.deleteSong = (req,res,next)=>{
  Song.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Song Deleted"
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
};

exports.findLanguageSong = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const songQuery = Song.find();
  let songs;
  if(pageSize && currentPage){
    songQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize);
  }
  songQuery.find({language: req.params.languageId})
    .then(documents=>{
      songs = documents;
      return Song.find({language: req.params.languageId}).count();
    })
    .then(count=>{
      res.status(200).json({
        message: "Albums Listed Successfully",
        songs: songs,
        count: count
      });
    });
};

exports.findAlbumSong = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const songQuery = Song.find();
  let songs;
  if(pageSize && currentPage){
    songQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize);
  }
  songQuery.find({album:req.params.albumId})
    .then(documents=>{
      songs =documents;
      return Song.find({album:req.params.albumId}).count();
    })
    .then(count=>{
      res.status(200).json({
        message: "Albums Listed Successfully",
        songs: songs,
        count: count
      });
    });

};

exports.getDownloadBuffer = (req,res,next)=>{
  let loc = "src/assets/backend/songs/"+ req.params.songPath;
  fs.readFile(loc, function (err, data) {
    if (err) throw err;
    res.status(200).json({
      message: "Downloaded Successfully",
      data: data
    });
  });
}
