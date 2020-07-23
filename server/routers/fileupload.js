const express = require('express');
const connection = require('./connector');
const { generateGetUrl, generatePutUrl } = require('../fileuploader');

var router = express.Router();

// Key = image name
router.get('/generate-get-url', (req, res) => {
    const Key = req.query.imgName;
    generateGetUrl(Key)
    .then(getUrl => {
        res.status(200).send(getUrl);
    })
    .catch(err => {
        res.status(400).send({msg: err});
    })
})

// Key is the image name
// ContentType is the image type, i.e. image/jpeg
router.post('/generate-put-url', (req, res) => {
    const { Key, ContentType } = req.body.params;
    generatePutUrl(Key, ContentType)
    .then(putURL => {
        res.status(200).send({putURL});
    })
    .catch(err => {
        res.status(400).send({msg: err});
    })
})

module.exports = router;