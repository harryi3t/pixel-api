var path = require('path');
var fileUpload = require('express-fileupload');
var express = require('express');

var app = express();
app.use(fileUpload());
app.use(detectBrowser);

app.get('/', function (req, res) {
 res.sendFile(__dirname + '/index.html');
});

app.get('/image/:id', function (req, res) {
 console.log('get image ', req.params.id);
 console.log('browser details', req.browser);

 res.send('TODO: send the image from s3 API');
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

function detectBrowser(req, res, next) {
  var ua = req.headers['user-agent'];
  console.log(ua);
  req.browser = {};

  if (/mobile/i.test(ua))
    req.browser.Mobile = true;

  if (/like Mac OS X/.test(ua)) {
    req.browser.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
    req.browser.iPhone = /iPhone/.test(ua);
    req.browser.iPad = /iPad/.test(ua);
  }

  if (/Android/.test(ua))
    req.browser.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];

  if (/webOS\//.test(ua))
    req.browser.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];

  if (/(Intel|PPC) Mac OS X/.test(ua))
    req.browser.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

  if (/Windows NT/.test(ua))
    req.browser.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];

  if (/Linux/.test(ua))
    req.browser.isLinux = true;

  return next();
}
