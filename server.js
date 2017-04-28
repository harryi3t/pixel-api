var path = require('path');
var fileUpload = require('express-fileupload');
var express = require('express');

var app = express();
app.use(fileUpload());

app.get('/', function (req, res) {
 res.sendFile(__dirname + '/index.html');
});

app.get('/image/:id', function (req, res) {
 console.log('get image ', req.params.id);
 res.send('hello');
});

app.post('/image', function (req, res) {
  if (!res.files.selectedImage)
    return res.send('No file selected');

  var fileName = res.files.selectedImage.name;
  var data = res.files.selectedImage.data;
});

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
