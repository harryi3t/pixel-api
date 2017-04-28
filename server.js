var path = require('path');
 var express = require('express');
 var app = express();

 app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html');
 });

 app.get('/image/:id', function (req, res) {
   console.log('get image ', req.params.id);
   res.send('hello');
 });

 app.post('/image', function (req, res) {
   res.send('image posted');
 });

 app.listen(3000, function () {
   console.log('Example app listening on port 3000!');
 });
