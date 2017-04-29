var s3 = require('s3');
var client = null;
var awsCreds = {};
var BUCKET_URL = 'https://s3-us-west-2.amazonaws.com/harryi3t/';

try {
  awsCreds = require('../aws.cred.js');
} catch(e) {
  console.log('failed to get aws.cred.js file. Trying for environment vars');
  awsCreds.accessKeyId = process.env.accessKeyId
  awsCreds.secretAccessKey = process.env.secretAccessKey
}

var s3Utilities = {
  init: function () {
    if (!client)
      client = s3.createClient({
        maxAsyncS3: 20,     // this is the default
        s3RetryCount: 3,    // this is the default
        s3RetryDelay: 1000, // this is the default
        multipartUploadThreshold: 20971520, // this is the default (20 MB)
        multipartUploadSize: 15728640, // this is the default (15 MB)
        s3Options: {
          accessKeyId: awsCreds.accessKeyId,
          secretAccessKey: awsCreds.secretAccessKey,
          region: "us-west-2"
          // any other options are passed to new AWS.S3()
          // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
        }
      });
  },

  upload: function (imageObj, cb) {
    if (!client)
      return cb('s3 not initialized');

    var params = {
      localFile: imageObj.path,

      s3Params: {
        Bucket: "harryi3t",
        Key: imageObj.name,
        // other options supported by putObject, except Body and ContentLength.
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
      }
    };

    var uploader = client.uploadFile(params);
    uploader.on('error', function(err) {
      console.error("unable to upload:", err.stack);
      return cb(err);
    });
    uploader.on('progress', function() {
      console.log("progress", uploader.progressMd5Amount,
        uploader.progressAmount, uploader.progressTotal);
    });
    uploader.on('end', function() {
      console.log("done uploading");
      return cb();
    });
  },

  getImageUrl: function (name) {
    return BUCKET_URL + name;
  }
};

module.exports = s3Utilities;

s3Utilities.init();
