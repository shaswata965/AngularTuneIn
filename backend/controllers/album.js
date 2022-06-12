const Album = require("../models/albums");
const Artist = require("../models/artists");
const Language = require("../models/languages");
const Industry = require('../models/industries');
const Genre = require("../models/genres");
const fetch = require("cross-fetch");

exports.getAlbum = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  let albumQuery = Album.find();
  let albums;

  if(pageSize && currentPage){
    albumQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize)
  }

  albumQuery.find()
    .then(documents=>{
      albums = documents
      return Album.count();
    }).then(count=>{
    res.status(200).json({
      message: "Albums Listed Successfully",
      albums: albums,
      count: count
    });
  })
};

exports.getBollywoodAlbum = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  let albumQuery = Album.find();
  let albums;

  if(pageSize && currentPage){
    albumQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize)
  }

  albumQuery.find({industry: "Bollywood"})
    .then(documents=>{
      albums = documents
      return Album.find({industry: "Bollywood"}).count();
    }).then(count=>{
    res.status(200).json({
      message: "Albums Listed Successfully",
      albums: albums,
      count: count
    });
  })
};

exports.getArtistAlbum = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  let albumQuery = Album.find();
  let albums;

  if(pageSize && currentPage){
    albumQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize)
  }

Artist.findById(req.params.artistId).then(results=>{
  let artistName = results.name;
  albumQuery.find({artist: artistName})
    .then(documents=>{
      albums = documents
      return Album.find({artist: artistName}).count();
    }).then(count=>{
    res.status(200).json({
      message: "Albums Listed Successfully",
      albums: albums,
      count: count
    });
  })
})

};

exports.createAlbum = (req,res,next)=>{
  const url = req.protocol + '://' + req.get("host");
  const album = new Album({
    name: req.body.name,
    description: req.body.description,
    cast: req.body.cast,
    castLink: req.body.castLink,
    release: req.body.release,
    year: req.body.year,
    language: req.body.language,
    artist: req.body.artist,
    genre: req.body.genre,
    industry: req.body.industry,
    imagePath: url + "/image/album/" + req.file.filename,
  });
  album.save()
    .then(result => {
      res.status(201).json({
        message: 'Album Created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.updateAlbum = (req,res,next)=>{
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/image/album/" + req.file.filename;
  }
  const album = new Album({
    _id:req.body.id,
    name: req.body.name,
    description: req.body.description,
    cast: req.body.cast,
    castLink: req.body.castLink,
    release: req.body.release,
    year: req.body.year,
    language: req.body.language,
    artist: req.body.artist,
    genre: req.body.genre,
    industry: req.body.industry,
    imagePath: imagePath,
  });
  Album.updateOne({_id:req.params.id}, album)
    .then(result => {
      res.status(201).json({
        message: 'Album updated!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.findAlbum = (req,res,next)=>{
  Album.findById(req.params.id)
    .then(album=>{
      if(album){
        res.status(200).json(album);
      }else{
        res.status(404).json({
          message:"Album not Found"
        });
      }
    }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
};

exports.albumDetails = async (req, res, next) => {
  const albumDet = [];

  Language.findById(req.params.id).then(name => {
    albumDet.push(name.name);
      Genre.findById(req.params.genre).then(genre => {
        albumDet.push(genre.name);
          res.status(200).json(albumDet);
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

exports.deleteAlbum = (req,res,next)=>{
  Album.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Album Deleted"
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
};

exports.imdbAlbum = (req,res,next)=>{
  let baseURL = "https://imdb-api.com/en/API/Title/";
  let APIKEY = "k_0g5b61co/"
  let overURL = baseURL.concat(APIKEY,req.params.name);

  fetch(overURL)
    .then(response => response.json())
    .then(data=>{
      res.status(200).json({
        message:" Movie Data Successfully Found ",
        movieData: data
      });
    })
    .catch(err => {
      console.error(err);
    });

};

exports.findLanguageAlbum = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const albumQuery = Album.find();
  let albums;
  if(pageSize && currentPage){
    albumQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize);
  }
  albumQuery.find({language: req.params.languageId})
    .then(documents=>{
      albums = documents;
      return Album.find({language: req.params.languageId}).count();
    })
    .then(count=>{
      res.status(200).json({
        message: "Albums Listed Successfully",
        albums: albums,
        count: count
      });
    });
};

exports.findIndustryAlbum = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const albumQuery = Album.find();
  let albums;
  if(pageSize && currentPage){
    albumQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize);
  }
  Industry.findById(req.params.industryId).then(result=>{
    let name = result.name;
    albumQuery.find({industry: name})
      .then(documents=>{
        albums = documents;
        return Album.find({industry: name}).count();
      })
      .then(count=>{
        res.status(200).json({
          message: "Albums Listed Successfully",
          albums: albums,
          count: count
        });
      });
  })

};

exports.findLetterAlbum = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const albumQuery = Album.find();
  let albums;
  let filter = req.params.filter;
  let name;
  if(filter === "All"){
    if(pageSize && currentPage){
      albumQuery
        .skip(pageSize*(currentPage-1))
        .limit(pageSize);
    }
    Industry.findById(req.params.industryId).then(result=>{
      name = result.name;
      albumQuery.find({industry:name})
        .then(documents=>{
          albums = documents;
          return Album.find({industry: name}).count();
        })
        .then(count=>{
          res.status(200).json({
            message: "Albums Listed Successfully",
            albums: albums,
            count: count
          });
        });
    })
  }
  else{
    let regex = new RegExp(`^${req.params.filter}`);
    if(pageSize && currentPage){
      albumQuery
        .skip(pageSize*(currentPage-1))
        .limit(pageSize);
    }
    Industry.findById(req.params.industryId).then(result=>{
      name = result.name;
      albumQuery.find({name: { $regex: regex }, industry: name})
        .then(documents=>{
          albums = documents;
          return Album.find({name: { $regex: regex }, industry: name}).count();
        })
        .then(count=>{
          res.status(200).json({
            message: "Albums Listed Successfully",
            albums: albums,
            count: count
          });
        });
    });

  }

};

exports.findYearAlbum = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const albumQuery = Album.find();
  let albums;
  let filter = req.params.filter;
  let finalArray = [];
  if(filter === "All"){

    if(pageSize && currentPage){
      albumQuery
        .skip(pageSize*(currentPage-1))
        .limit(pageSize);
    }
    albumQuery.find({industry: req.params.industryId})
      .then(documents=>{
        albums = finalArray;
        return Album.find({industry: req.params.industryId}).count();
      })
      .then(count=>{
        res.status(200).json({
          message: "Albums Listed Successfully",
          albums: albums,
          count: count
        });
      });

  }
  else{
    if(pageSize && currentPage){
      albumQuery
        .skip(pageSize*(currentPage-1))
        .limit(pageSize);
    }
    albumQuery.find({year: req.params.filter, industry: req.params.industryId})
      .then(documents=>{
        albums = documents;
        return Album.find({year: req.params.filter, industry: req.params.industryId}).count();
      })
      .then(count=>{
        res.status(200).json({
          message: "Albums Listed Successfully",
          albums: albums,
          count: count
        });
      });
  }

};


