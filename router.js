const express = require('express');
const router = express.Router();

var AWS = require('aws-sdk');
var multer  = require('multer')
var multerS3 = require('multer-s3')
var s3 = new AWS.S3();
const s3Controller = require('./controllers/s3-controller.js')


router.route('/files/:id')
    .get(s3Controller.retrieveSpecificFileFromBucket)

router.route('/files')
    .get(s3Controller.retrieveAllFiles)

router.route('/files/:id')
    .delete(s3Controller.deleteSpecificFile)

router.route('/files/:id')
    .post(s3Controller.uploadFileToS3.single('file'),function(req,res,next){
        //console.log("in callback")
        res.send('Successfully uploaded ' + req.file.originalname + ' to s3 bucket')
            //next()
    })


module.exports = router;
