var s3 = require('./s3.js');
var base64Img = require('base64-img');
var fs = require('fs');

module.exports = {
  upload: function (imgObj, cb) {
    fs.writeFile(imgObj.path, imgObj.data, 'base64', function(err) {
      if (err)
        return cb(err);

      s3.upload(imgObj, function (err) {
        fs.unlink(imgObj.path, function () {
          return cb(err);
        });
      });
    });
  },

  getImageUrl: s3.getImageUrl
};
