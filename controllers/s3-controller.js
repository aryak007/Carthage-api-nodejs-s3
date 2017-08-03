'use strict';
var AWS = require('aws-sdk');
//var formidable = require('formidable');
var multer  = require('multer')
var multerS3 = require('multer-s3')
var s3 = new AWS.S3();


var myBucket = 'aryak-s3-bucket';
var myKey = 'hello-world.txt';


//Create and put object
var uploadFileIntoSpecificBucket = function(req,res){
    //var bucketName = req.bucketName;
    //var myKey = req.param.file;
    var params = {Bucket: myBucket,Key: myKey, Body: req.file.path};

            s3.putObject(params, function(err, data) {

                if (err) {
                    console.log(err)
                    res.json({ error: err })
                } else {

                    console.log("Successfully uploaded data to s3");
                    res.send("Success")
                }
            });
}



var retrieveSpecificFileFromBucket = function(req,res){

    var params = {Bucket: myBucket,Key:req.params.id};
    s3.getObject(params, function(err,data){
        if(err){
            console.log(err)
            res.json({ error: err })
        }
        else{
            console.log("Successfully retrieved data from s3");
            res.send(data);
        }
    })
}

var retrieveAllFiles = function(req,res){
        var params = { 
            Bucket: myBucket,
            Delimiter: '/'
        }

        var result = []

        s3.listObjects(params, function (err, data) {
                if(err){
                    console.log(err)
                    res.json({ error: err })
                }
                else{
                    console.log("Successfully retrieved data from s3");
                    data.Contents.forEach(function(keyObj){
                        result.push(keyObj.Key)
                    })
                    res.send(result)
                }
        });

}

var deleteSpecificFile = function(req,res){
    var params = {
        Bucket:myBucket,
        Key:req.params.id
    }
    s3.deleteObject(params,function(err,data){
        if(err){
            console.log(err)
            res.json({ error: err })
        }
        else{
            console.log("Successfully retrieved data from s3");
            res.send(data);
        }
    })
}

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'aryak-s3-bucket',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = {
    uploadFileIntoSpecificBucket:uploadFileIntoSpecificBucket,
    retrieveSpecificFileFromBucket:retrieveSpecificFileFromBucket,
    retrieveAllFiles:retrieveAllFiles,
    deleteSpecificFile:deleteSpecificFile
}

