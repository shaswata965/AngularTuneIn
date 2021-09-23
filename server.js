const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname+'/dist/tune-in'));

app.get('/*',function (req,res){
  res.sendFile(path.join(__dirname+'/dist/tune-in/index.html'));
});

app.listen(process.env.port || 8080);
