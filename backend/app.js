const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const albumRoutes = require("./routes/album");
const languageRoutes = require("./routes/language");
const actorRoutes = require("./routes/actor");
const artistRoutes = require("./routes/artist");
const genreRoutes = require("./routes/genre");

mongoose.connect('mongodb+srv://Shaswata-web:AtlasPassword@cluster0.qqhb3.mongodb.net/Tunein?retryWrites=true&w=majority')
  .then(()=>{
    console.log("Successfully Connected To Database");
  }).catch(()=>{
    console.log("Connection Failure");
});

app.use("/image/user-image/", express.static(path.join("src/assets/backend/image/user-image/")));
app.use("/image/album/", express.static(path.join("src/assets/frontend/image/album/")));
app.use("/image/userImage/", express.static(path.join("src/assets/frontend/image/userImage/")));
app.use("/image/actorImage/", express.static(path.join("src/assets/backend/image/actorImage/")));
app.use("/image/artistImage/", express.static(path.join("src/assets/backend/image/artistImage/")));
app.use("/image/genreImage/", express.static(path.join("src/assets/backend/image/genreImage/")));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS, PUT');
  next()
});

app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/genres", genreRoutes)

module.exports= app;
