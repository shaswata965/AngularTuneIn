const express = require('express');
const app = express();

const mongoose = require('mongoose');
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const albumRoutes = require("./routes/album");

mongoose.connect('mongodb+srv://Shaswata-web:AtlasPassword@cluster0.qqhb3.mongodb.net/Tunein?retryWrites=true&w=majority')
  .then(()=>{
    console.log("Successfully Connected To Database");
  }).catch(()=>{
    console.log("Connection Failure");
});

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS, PUT');
  next()
});

app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/albums", albumRoutes);

module.exports= app;
