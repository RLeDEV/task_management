require('dotenv').config(); 
const AWS = require('aws-sdk'); 

// Configuring AWS
AWS.config = new AWS.Config({
  accessKeyId: process.env.S3_KEY, 
  secretAccessKey: process.env.S3_SECRET, 
  region: process.env.BUCKET_REGION 
});

// Creating a S3 instance
const s3 = new AWS.S3({apiVersion: "2006-03-01"});

// Retrieving the bucket name from env variable
const Bucket = process.env.BUCKET_NAME;

// GET URL Generator
function generateGetUrl(Key) {
  return new Promise(async (resolve, reject) => {
    const params = {
      Bucket,
      Key,
     // Expires: 120 // 2 minutes
    };
    try {
      const headCode = await s3.headObject(params).promise();
      s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    }
    catch(err) {
      resolve(err.code);
    }
  });
}

// PUT URL Generator
function generatePutUrl(Key, ContentType) {
  return new Promise((resolve, reject) => {
    const params = { Bucket, Key, ContentType };
    s3.getSignedUrl('putObject', params, function(err, url) {
      if (err) {
        reject(err);
      }
      resolve(url);
    });
  });
}

module.exports = { generateGetUrl, generatePutUrl };