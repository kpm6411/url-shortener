const express = require('express');
const app = express();
const mongo = require('mongodb').MongoClient;
const shortener = require('./app/shortener.js');
var dbUrl = 'mongodb://localhost:27017/url-shortener';

mongo.connect(dbUrl, function(err, db){
  if (err) throw err;
  db.createCollection("sites", {
    capped: true,
    size: 5242880,
    max: 5000
  });
  
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  
  shortener(app, db);
  
  app.listen(8080, function () {
    console.log('App listening on port 8080!');
  });
});