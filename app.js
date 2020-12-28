// jshint esversion:6

const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
   res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 5000, function(){
   console.log('Server is running');
});