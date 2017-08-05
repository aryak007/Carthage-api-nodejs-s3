'use strict';
var AWS = require('aws-sdk');
//var formidable = require('formidable');
var multer  = require('multer')
var multerS3 = require('multer-s3')
AWS.config.loadFromPath('./config.json')
var s3 = new AWS.S3();


var myBucket = 'aryak-s3-bucket';


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
            console.log("Successfully deleted file "+req.params.id+" from s3");
            res.send(data);
        }
    })

}

var returnCb = function(err,cb){
    if(err)
        cb("The uploaded file and the filename in the URL do not match. Please make sure that they are same") 
}

var error = false;
var uploadFileToS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'aryak-s3-bucket',
        metadata: function (req, file, cb) {
            if(file.originalname!=req.params.id){
                if(!error){
                    returnCb(true,cb)
                    error = true
                }

            }
            else{
                cb(null, {fieldName: file.fieldname});
            }
                
        },
        key: function (req, file, cb) { 
            if(file.originalname!=req.params.id){
                if(!error){
                    returnCb(true,cb)
                    error = true
                }
            }
            else{
                cb(null, file.originalname)
            
            }    
        }
    })
})
   

module.exports = {
    uploadFileToS3:uploadFileToS3,
    retrieveSpecificFileFromBucket:retrieveSpecificFileFromBucket,
    retrieveAllFiles:retrieveAllFiles,
    deleteSpecificFile:deleteSpecificFile,
}

