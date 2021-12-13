const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,"This_is_the_secret");
    next();
  }catch(error){
    res.status(401).json({message: "Auth Failed"});
  }
};
