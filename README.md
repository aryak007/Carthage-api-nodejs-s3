# Carthage 1.0.0

## List of available APIs

1. GET /api/files - Retrieves a list of files from AWS S3 bucket

2. GET /api/files/:id - Retrieves a spicific file

3. POST /api/files/:id - Uploads a file into S3 bucket 

4. DELETE /api/files/:id - Deletes a specific file from S3 bucket

## Usage
1. Add a `config.json` file in the root of your project in the following manner - 
```
{ 
    "accessKeyId": <<Access Key Id>>, 
    "secretAccessKey": <<Secret access key>>, 
    "region": "ap-south-1" 
}
```

2. Type the following command from the root of the project to fire up the node service:

```docker-compose up -d```

The server will start on port `8080` [The 3000 port of the application is forwarded to 8080]. 
The dockerizing part is done in an efficient manner by taking advantage of the caching mechanism of docker. 

[https://github.com/aryak93/Carthage-api-nodejs-s3/blob/master/Dockerfile](Dockerfile) is mentioned here. 



Question link - [https://gist.github.com/mskutin/065b054fa2fe1e164644bbf1f3d8a546](https://gist.github.com/mskutin/065b054fa2fe1e164644bbf1f3d8a546)



