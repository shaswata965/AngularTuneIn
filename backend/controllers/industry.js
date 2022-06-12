const Industry = require("../models/industries");
const Album = require("../models/albums");

exports.createIndustry = (req,res,next)=>{

  const industry = new Industry({
    name: req.body.name
  });
  industry.save()
    .then(result => {
      res.status(201).json({
        message: 'Industry Created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.updateIndustry = (req,res,next)=>{
  const Industry = new Industry({
    _id:req.body.id,
    name: req.body.name,
  });
  Industry.updateOne({_id:req.params.id}, industry)
    .then(result => {
      res.status(201).json({
        message: 'Industry updated!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.getIndustry = (req,res,next)=>{
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const industryQuery = Industry.find();
  let industries;
  if(pageSize && currentPage){
    industryQuery
      .skip(pageSize*(currentPage-1))
      .limit(pageSize)
  }
  industryQuery
    .find()
    .then(documents=>{
      industries = documents;
      return Industry.count();
    })
    .then(count=>{
      res.status(200).json({
        message: "Industries Listed Successfully",
        industries: industries,
        count: count
      });
    });
};

exports.getIndustryAlbum = (req,res,next)=>{
  const names = [];
  Album.find({industry: req.params.id})
    .then(documents=>{
      let c = documents.length;
      for(let i = 0; i<c; i++){
        let obj = documents[i];
        names.push(obj.name);
      }
      res.send(names);
    });
};

exports.findIndustry = (req,res,next)=>{
  Industry.findById(req.params.id).then(industry=>{
    if(industry){
      res.status(200).json(industry);
    }else{
      res.status(404).json({
        message:"Industry not Found"
      });
    }
  });
};

exports.deleteIndustry = (req,res,next)=>{
  Industry.deleteOne({_id: req.params.id}).then(result=>{
    res.status(200).json({
      message:"Industry Deleted"
    });
  });
};
